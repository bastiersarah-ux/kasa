import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FavoriteProvider, useFavorites } from "@/app/context/FavoriteContext";
import type { ReactNode } from "react";
import type { FavoriteListItem } from "@/types/api-types";

// Hoisted mocks pour être accessibles dans vi.mock
const {
  mockAddFavorite,
  mockRemoveFavorite,
  mockListFavoritesForUser,
  mockUser,
} = vi.hoisted(() => ({
  mockAddFavorite: vi.fn(() => Promise.resolve({ ok: true as const })),
  mockRemoveFavorite: vi.fn(() => Promise.resolve({ ok: true as const })),
  mockListFavoritesForUser: vi.fn(() =>
    Promise.resolve([] as FavoriteListItem[]),
  ),
  mockUser: {
    id: 1,
    name: "Test User",
    role: "client" as const,
    email: "test@test.com",
  },
}));

// Mock next/navigation (utilisé par AuthContext)
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock AuthContext pour simuler un utilisateur authentifié
vi.mock("@/app/context/AuthContext", () => ({
  useAuth: () => ({
    user: mockUser,
    isAuthenticated: true,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
    refreshUser: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: ReactNode }) => children,
}));

// Mock des services favoris (chemin correspondant à l'import dans FavoriteContext.tsx)
vi.mock("src/services/favorites", () => ({
  addFavorite: mockAddFavorite,
  removeFavorite: mockRemoveFavorite,
  listFavoritesForUser: mockListFavoritesForUser,
}));

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isLoading } = useFavorites();

  return (
    <div>
      <p>Favoris: {favorites.length}</p>
      <button
        onClick={() =>
          addFavorite({
            id: "prop-1",
            slug: "test",
            title: "Test Property",
            price_per_night: 100,
            rating_avg: 4,
            ratings_count: 10,
          })
        }
      >
        Ajouter
      </button>
      <button onClick={() => removeFavorite("prop-1")}>Supprimer</button>
      {isLoading && <p>Chargement...</p>}
    </div>
  );
};

describe("FavoriteContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockListFavoritesForUser.mockResolvedValue([]);
  });

  it("Initialise avec une liste vide de favoris", async () => {
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Favoris: 0")).toBeInTheDocument();
    });
  });

  it("Ajoute une propriété aux favoris", async () => {
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Favoris: 0")).toBeInTheDocument();
    });

    const addButton = screen.getByRole("button", { name: /Ajouter/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddFavorite).toHaveBeenCalledWith("prop-1");
    });

    await waitFor(() => {
      expect(screen.getByText(/Favoris: 1/)).toBeInTheDocument();
    });
  });

  it("Supprime une propriété des favoris", async () => {
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Favoris: 0")).toBeInTheDocument();
    });

    // D'abord ajouter
    const addButton = screen.getByRole("button", { name: /Ajouter/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Favoris: 1/)).toBeInTheDocument();
    });

    // Puis supprimer
    const removeButton = screen.getByRole("button", { name: /Supprimer/i });
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(mockRemoveFavorite).toHaveBeenCalledWith("prop-1");
    });

    await waitFor(() => {
      expect(screen.getByText("Favoris: 0")).toBeInTheDocument();
    });
  });

  it("Persiste les favoris dans le localStorage", async () => {
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    // Attendre que le chargement initial (fetchFavorites) soit terminé
    await waitFor(() => {
      expect(screen.queryByText("Chargement...")).not.toBeInTheDocument();
      expect(screen.getByText("Favoris: 0")).toBeInTheDocument();
    });

    const addButton = screen.getByRole("button", { name: /Ajouter/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Favoris: 1/)).toBeInTheDocument();
    });

    const stored = localStorage.getItem("favorites");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe("prop-1");
  });

  it("Charge les favoris depuis l'API au démarrage (utilisateur authentifié)", async () => {
    mockListFavoritesForUser.mockResolvedValue([
      {
        id: "prop-2",
        slug: "test-2",
        title: "Property 2",
        price_per_night: 200,
        rating_avg: 5,
        ratings_count: 20,
      },
    ]);

    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    await waitFor(() => {
      expect(mockListFavoritesForUser).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Favoris: 1")).toBeInTheDocument();
    });
  });

  it("Empêche les doublons dans les favoris", async () => {
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Favoris: 0")).toBeInTheDocument();
    });

    const addButton = screen.getByRole("button", { name: /Ajouter/i });

    // Ajouter une première fois
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByText(/Favoris: 1/)).toBeInTheDocument();
    });

    // Essayer d'ajouter la même propriété
    fireEvent.click(addButton);

    // Devrait toujours être 1, pas 2
    await waitFor(() => {
      expect(screen.getByText(/Favoris: 1/)).toBeInTheDocument();
    });
  });

  it("Appelle le service listFavoritesForUser avec le bon ID utilisateur", async () => {
    mockListFavoritesForUser.mockResolvedValue([
      {
        id: "prop-1",
        slug: "test",
        title: "Test Property",
        price_per_night: 100,
        rating_avg: 4,
        ratings_count: 10,
      },
    ]);

    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    await waitFor(() => {
      expect(mockListFavoritesForUser).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Favoris: 1")).toBeInTheDocument();
    });
  });
});

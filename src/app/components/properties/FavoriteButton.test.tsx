import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";
import type { FavoriteListItem } from "@/types/api-types";

// Hoisted mocks
const {
  mockAddFavorite,
  mockRemoveFavorite,
  mockFavorites,
  mockIsAuthenticated,
  mockPush,
} = vi.hoisted(() => ({
  mockAddFavorite: vi.fn(() => Promise.resolve()),
  mockRemoveFavorite: vi.fn(() => Promise.resolve()),
  mockFavorites: { value: [] as FavoriteListItem[] },
  mockIsAuthenticated: { value: true },
  mockPush: vi.fn(),
}));

vi.mock("@/app/context/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated.value,
  }),
}));

vi.mock("@/app/context/FavoriteContext", () => ({
  useFavorites: () => ({
    favorites: mockFavorites.value,
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
  }),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const mockProperty = {
  id: "prop-1",
  slug: "test-property",
  title: "Bel appartement à Paris",
  cover: "https://example.com/image.jpg",
  location: "Paris, France",
  price_per_night: 120,
  rating_avg: 4.5,
  ratings_count: 42,
};

describe("FavoriteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFavorites.value = [];
    mockIsAuthenticated.value = true;
  });

  it("Le cœur n'est pas rempli quand la propriété n'est pas en favori", () => {
    render(<FavoriteButton property={mockProperty} />);

    const button = screen.getByRole("button", { name: /Ajouter aux favoris/i });
    const svg = button.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "none");
    expect(button.className).not.toContain("active");
  });

  it("Le cœur est rempli et le bouton a la classe active quand la propriété est en favori", () => {
    mockFavorites.value = [mockProperty as FavoriteListItem];

    render(<FavoriteButton property={mockProperty} />);

    const button = screen.getByRole("button", { name: /Retirer des favoris/i });
    const svg = button.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(button.className).toContain("active");
  });

  it("Cliquer sur le cœur appelle addFavorite quand non-favori", async () => {
    render(<FavoriteButton property={mockProperty} />);

    const button = screen.getByRole("button", { name: /Ajouter aux favoris/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockAddFavorite).toHaveBeenCalledOnce();
    });
  });

  it("Cliquer sur le cœur appelle removeFavorite quand déjà favori", async () => {
    mockFavorites.value = [mockProperty as FavoriteListItem];

    render(<FavoriteButton property={mockProperty} />);

    const button = screen.getByRole("button", { name: /Retirer des favoris/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRemoveFavorite).toHaveBeenCalledWith("prop-1");
    });
  });

  it("Le clic ne déclenche rien si l'utilisateur n'est pas authentifié", async () => {
    mockIsAuthenticated.value = false;

    render(<FavoriteButton property={mockProperty} />);

    const button = screen.getByRole("button", { name: /Ajouter aux favoris/i });
    fireEvent.click(button);

    expect(mockAddFavorite).not.toHaveBeenCalled();
    expect(mockRemoveFavorite).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });
});

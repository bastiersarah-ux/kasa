import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Gallery from "./Gallery";

// jsdom ne supporte pas showModal nativement :
// on simule l'ouverture en positionnant l'attribut « open »
HTMLDialogElement.prototype.showModal = vi.fn(function (
  this: HTMLDialogElement,
) {
  this.setAttribute("open", "");
});
HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
  this.removeAttribute("open");
});

const fivePictures = [
  "https://example.com/img1.jpg",
  "https://example.com/img2.jpg",
  "https://example.com/img3.jpg",
  "https://example.com/img4.jpg",
  "https://example.com/img5.jpg",
];

/** Ouvre la modale en cliquant sur l'image principale */
function openModal() {
  const mosaicImages = screen.getAllByRole("presentation");
  fireEvent.click(mosaicImages[0]);
}

describe("Gallery — Carousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------- Rendu de base ----------

  it("ne rend rien si le tableau de photos est vide", () => {
    const { container } = render(<Gallery pictures={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("affiche toutes les images dans le carousel", () => {
    render(<Gallery pictures={fivePictures} />);
    openModal();
    const carousel = screen.getByLabelText("carousel photos");
    const carouselImages = carousel.querySelectorAll("img");
    expect(carouselImages).toHaveLength(fivePictures.length);
  });

  // ---------- Flèches de navigation ----------

  it("n'affiche pas les flèches quand il n'y a qu'une seule image", () => {
    render(<Gallery pictures={["https://example.com/solo.jpg"]} />);
    openModal();
    expect(
      screen.queryByRole("button", { name: /previous image/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /next image/i }),
    ).not.toBeInTheDocument();
  });

  it("affiche les flèches quand il y a plusieurs images", () => {
    render(<Gallery pictures={fivePictures} />);
    openModal();
    expect(
      screen.getByRole("button", { name: /previous image/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next image/i }),
    ).toBeInTheDocument();
  });

  // ---------- Navigation au clic ----------

  it("avance à l'image suivante au clic sur la flèche droite", () => {
    render(<Gallery pictures={fivePictures} />);
    openModal();
    const track = screen.getByLabelText("carousel photos")
      .firstElementChild as HTMLElement;

    expect(track.style.transform).toBe("translateX(-0%)");

    fireEvent.click(screen.getByRole("button", { name: /next image/i }));
    expect(track.style.transform).toBe("translateX(-100%)");
  });

  it("recule à l'image précédente au clic sur la flèche gauche", () => {
    render(<Gallery pictures={fivePictures} />);
    openModal();
    const track = screen.getByLabelText("carousel photos")
      .firstElementChild as HTMLElement;

    // Avancer d'abord
    fireEvent.click(screen.getByRole("button", { name: /next image/i }));
    expect(track.style.transform).toBe("translateX(-100%)");

    // Reculer
    fireEvent.click(screen.getByRole("button", { name: /previous image/i }));
    expect(track.style.transform).toBe("translateX(-0%)");
  });

  // ---------- Boucle (loop) ----------

  it("boucle de la dernière image à la première (next)", () => {
    const twoPictures = fivePictures.slice(0, 2);
    render(<Gallery pictures={twoPictures} />);
    openModal();
    const track = screen.getByLabelText("carousel photos")
      .firstElementChild as HTMLElement;

    const nextBtn = screen.getByRole("button", { name: /next image/i });

    // Image 0 → 1
    fireEvent.click(nextBtn);
    expect(track.style.transform).toBe("translateX(-100%)");

    // Image 1 → 0 (boucle)
    fireEvent.click(nextBtn);
    expect(track.style.transform).toBe("translateX(-0%)");
  });

  it("boucle de la première image à la dernière (prev)", () => {
    const threePictures = fivePictures.slice(0, 3);
    render(<Gallery pictures={threePictures} />);
    openModal();
    const track = screen.getByLabelText("carousel photos")
      .firstElementChild as HTMLElement;

    // Image 0 → prev → dernière (index 2)
    fireEvent.click(screen.getByRole("button", { name: /previous image/i }));
    expect(track.style.transform).toBe("translateX(-200%)");
  });

  // ---------- Navigation au clavier ----------

  it("navigue à l'image suivante avec ArrowRight", () => {
    render(<Gallery pictures={fivePictures} />);
    openModal();
    const carousel = screen.getByLabelText("carousel photos");
    const track = carousel.firstElementChild as HTMLElement;

    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    expect(track.style.transform).toBe("translateX(-100%)");
  });

  it("navigue à l'image précédente avec ArrowLeft", () => {
    render(<Gallery pictures={fivePictures} />);
    openModal();
    const carousel = screen.getByLabelText("carousel photos");
    const track = carousel.firstElementChild as HTMLElement;

    // Avancer d'abord
    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    expect(track.style.transform).toBe("translateX(-100%)");

    // Reculer
    fireEvent.keyDown(carousel, { key: "ArrowLeft" });
    expect(track.style.transform).toBe("translateX(-0%)");
  });

  it("boucle au clavier : ArrowLeft depuis la première image va à la dernière", () => {
    const threePictures = fivePictures.slice(0, 3);
    render(<Gallery pictures={threePictures} />);
    openModal();
    const carousel = screen.getByLabelText("carousel photos");
    const track = carousel.firstElementChild as HTMLElement;

    fireEvent.keyDown(carousel, { key: "ArrowLeft" });
    expect(track.style.transform).toBe("translateX(-200%)");
  });

  it("ignore les touches autres que ArrowLeft et ArrowRight", () => {
    render(<Gallery pictures={fivePictures} />);
    openModal();
    const carousel = screen.getByLabelText("carousel photos");
    const track = carousel.firstElementChild as HTMLElement;

    fireEvent.keyDown(carousel, { key: "ArrowUp" });
    fireEvent.keyDown(carousel, { key: "Enter" });
    fireEvent.keyDown(carousel, { key: "Space" });

    expect(track.style.transform).toBe("translateX(-0%)");
  });

  // ---------- Ouverture de la modale ----------

  it("ouvre la modale au clic sur l'image principale de la mosaïque", () => {
    render(<Gallery pictures={fivePictures} />);
    const mosaicImages = screen.getAllByRole("presentation");
    fireEvent.click(mosaicImages[0]);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });

  it("ouvre la modale au clic sur une image secondaire de la grille", () => {
    render(<Gallery pictures={fivePictures} />);
    const mosaicImages = screen.getAllByRole("presentation");
    fireEvent.click(mosaicImages[2]);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });

  it("positionne le carousel sur l'image cliquée dans la grille", () => {
    render(<Gallery pictures={fivePictures} />);
    const track = screen.getByLabelText("carousel photos")
      .firstElementChild as HTMLElement;

    // Clic sur la 4e image de la mosaïque (index 3 dans pictures)
    const mosaicImages = screen.getAllByRole("presentation");
    fireEvent.click(mosaicImages[3]); // mosaïque: [main, grid0, grid1, grid2, grid3]
    expect(track.style.transform).toBe("translateX(-300%)");
  });

  // ---------- Accessibilité ----------

  it("le carousel a un aria-label pour l'accessibilité", () => {
    render(<Gallery pictures={fivePictures} />);
    expect(screen.getByLabelText("carousel photos")).toBeInTheDocument();
  });

  it("le carousel est focusable (tabIndex=0)", () => {
    render(<Gallery pictures={fivePictures} />);
    const carousel = screen.getByLabelText("carousel photos");
    expect(carousel).toHaveAttribute("tabindex", "0");
  });
});

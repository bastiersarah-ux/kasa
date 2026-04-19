/**
 * @module BackButton
 * @description Bouton de retour vers la liste des annonces.
 */

/** Props du bouton retour */
type BackButtonProps = {
  /** Fonction appelée au clic pour naviguer en arrière */
  onClick: () => void;
};

/**
 * Bouton de retour vers la page précédente ou la liste des annonces.
 * @param props - Callback de navigation
 * @returns Bouton stylisé avec flèche de retour
 */

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button className="btn btn-grey" onClick={onClick}>
      ← Retour aux annonces
    </button>
  );
}

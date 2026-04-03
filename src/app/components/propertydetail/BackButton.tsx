type BackButtonProps = {
  onClick: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button className="back-btn" onClick={onClick}>
      ← Retour aux annonces
    </button>
  );
}

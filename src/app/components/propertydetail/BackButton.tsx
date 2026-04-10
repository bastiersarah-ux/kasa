type BackButtonProps = {
  onClick: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button className="btn btn-grey" onClick={onClick}>
      ← Retour aux annonces
    </button>
  );
}

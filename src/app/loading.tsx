/**
 * @module LoadingPage
 * @description Indicateur de chargement global.
 * Affiché automatiquement par Next.js pendant le chargement des pages.
 */

/**
 * Spinner de chargement centré pleine page.
 * @returns Un indicateur de chargement animé
 */
export default function Loading() {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      <span className="loading w-1/10 loading-spinner text-primary loading-xl"></span>
    </div>
  );
}

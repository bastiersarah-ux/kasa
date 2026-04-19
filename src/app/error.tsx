/**
 * @module ErrorPage
 * @description Page d'erreur globale de l'application.
 * Affichée automatiquement par Next.js en cas d'erreur non gérée.
 */
"use client";

import Link from "next/link";

/** Props de la page d'erreur */
type ErrorProps = {
  /** Erreur capturée */
  error: Error;
  /** Fonction pour retenter le rendu */
  reset: () => void;
};

/**
 * Page d'erreur globale.
 * Affiche le message d'erreur et un lien de retour à l'accueil.
 * @param props - Erreur capturée et fonction de retry
 * @returns Page d'erreur avec message et lien retour
 */

export default function Error({ error }: ErrorProps) {
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center gap-5 justify-center">
      <h1>Une erreur est survenue</h1>
      <h4 className="">{error.message}</h4>
      <Link href={"/"} className="btn bg-black text-white! no-underline!">
        Retour à l'accueil
      </Link>
    </div>
  );
}

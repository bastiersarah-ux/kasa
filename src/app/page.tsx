/**
 * @module HomePage
 * @description Page d'accueil de l'application Kasa.
 * Affiche la liste de toutes les propriétés disponibles
 * ainsi qu'une section explicative "Comment ça marche".
 */
export const dynamic = "force-dynamic";

import { listProperties } from "@/services";
import PropertiesList from "./components/properties/PropertiesList";
import HashScroller from "./components/HashScroller";
import styles from "./page.module.css";
import HomeImg from "@/public/home.svg";
import Image from "next/image";

/**
 * Page d'accueil serveur.
 * Récupère la liste des propriétés depuis l'API et les affiche en grille.
 * @returns La page d'accueil complète
 */
export default async function HomePage() {
  const properties = await listProperties();

  return (
    <div className={`page-content ${styles.content}`}>
      <HashScroller />
      <div className="flex flex-col w-full justify-center">
        <h1>Chez vous, partout et ailleurs</h1>
        <h2 className="h3">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </h2>
      </div>

      <Image
        src={HomeImg}
        alt="Photo page d'accueil"
        className="w-full"
        style={{ height: "458px" }}
        priority
        loading="eager"
      />

      <PropertiesList properties={properties} id="logements" />

      <section className={`py-16 ${styles.container}`}>
        <h3 className="text-2xl! text-center! font-semibold!">
          Comment ça marche ?
        </h3>

        <h3 className="text-black md:px-60">
          Que vous partiez pour un week-end improvisé, des vacances en famille
          ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous
          ressemble.
        </h3>

        <div>
          <div className={`p-6 rounded-xl text-left ${styles.card}`}>
            <h2>Recherchez</h2>
            <p>
              Entrez votre destination, vos dates et laissez Kasa faire le reste
            </p>
          </div>

          <div className={`p-6 rounded-xl text-left ${styles.card}`}>
            <h2>Réservez</h2>
            <p>
              Profitez d'une plateforme sécurisée et de profils d'hôtes
              vérifiés.
            </p>
          </div>

          <div className={`p-6 rounded-xl text-left ${styles.card}`}>
            <h2>Vivez l'expérience</h2>
            <p>
              Installez-vous, profitez de votre séjour, et sentez-vous chez
              vous, partout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { PropertyDetails } from "@/types/api-types";
import PropertiesList from "./components/properties/PropertiesList";
import styles from "./HomeClient.module.css";
import HomeImg from "@/public/home.svg";
import Image from "next/image";

/** Props de la page d'accueil */
type Props = {
  properties: PropertyDetails[];
};

/** Page d'accueil avec les propriétés */
export default function HomeClient({ properties }: Props) {
  return (
    <>
      <div>
        <h1>Chez vous, partout et ailleurs</h1>
        <h3>
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </h3>
      </div>

      <Image
        src={HomeImg}
        alt="Photo page d'accueil"
        className="w-full h-auto"
      />

      <PropertiesList properties={properties} />

      <section className={`py-16 ${styles.container}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-2xl font-semibold mb-4">Comment ça marche ?</p>

          <h3 className="text-black max-w-2xl mx-auto mb-10">
            Que vous partiez pour un week-end improvisé, des vacances en famille
            ou un voyage professionnel, Kasa vous aide à trouver un lieu qui
            vous ressemble.
          </h3>

          <div className="grid md:grid-cols-3 gap-16">
            <div className={`p-6 rounded-xl text-left ${styles.card}`}>
              <h2>Recherchez</h2>
              <p className="text-xs font-normal">
                Entrez votre destination, vos dates et laissez Kasa faire le
                reste
              </p>
            </div>

            <div className={`p-6 rounded-xl text-left ${styles.card}`}>
              <h2>Réservez</h2>
              <p className="text-xs font-normal">
                Profitez d’une plateforme sécurisée et de profils d’hôtes
                vérifiés.
              </p>
            </div>

            <div className={`p-6 rounded-xl text-left ${styles.card}`}>
              <h2>Vivez l’expérience</h2>
              <p className="text-xs font-normal">
                Installez-vous, profitez de votre séjour, et sentez-vous chez
                vous, partout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import styles from "./About.module.css";
import AboutImg1 from "@/public/about-1.svg";
import AboutImg2 from "@/public/about-2.svg";
import Image from "next/image";

export default function AboutSection() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <section className="{styles.section1}">
        <div className="text-center space-y-4">
          <div>
            <h1>À propos</h1>
            <h3 className="max-w-2xl mx-auto">
              Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où
              se sentir bien.
            </h3>
            <h3>
              Depuis notre création, nous mettons en relation des voyageurs en
              quête d’authenticité avec des hôtes passionnés qui aiment partager
              leur région et leurs bonnes adresses.
            </h3>
          </div>
        </div>

        <div className="rounded-[20px] overflow-hidden">
          <Image
            src={AboutImg1}
            alt="Photo page à propos"
            className="w-full h-100 object-cover"
          />
        </div>
      </section>

      <section className="{styles.section2}">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="font-bold">Notre mission est simple :</span>

            <ul className="list-decimal list-inside space-y-2">
              <li>Offrir une plateforme fiable et simple d’utilisation</li>
              <li>Proposer des hébergements variés et de qualité</li>
              <li>
                Favoriser des échanges humains et chaleureux entre hôtes et
                voyageurs
              </li>
            </ul>

            <span className="font-medium">
              Que vous cherchiez un appartement cosy en centre-ville, une maison
              en bord de mer ou un chalet à la montagne, Kasa vous accompagne
              pour que chaque séjour devienne un souvenir inoubliable.
            </span>
          </div>

          <div className="rounded-[20px] overflow-hidden">
            <Image
              src={AboutImg2}
              alt="Photo page à propos"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

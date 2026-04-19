"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import ChatIcon from "@/public/chat.svg";
import styles from "./Header.module.css";
import LineIcon from "@/public/line.svg";
import FavoriteIcon from "@/public/favorite.svg";
import KasaIcon from "@/public/kasa-full.svg";
import KasaIconMobile from "@/public/kasa.svg";
import MenuMobileIcon from "@/public/menu-mobile.svg";
import Link from "next/link";

/** Header de l'application avec navigation */
const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.start}>
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
        </div>

        <div className={styles.logo}>
          <Image src={KasaIcon} alt="Icône kasa" className="max-md:hidden" />
          <Image src={KasaIconMobile} alt="Icône kasa" className="md:hidden" />
        </div>

        <div className={styles.end}>
          <Link href="#">+Ajouter un logement</Link>

          <section>
            <Link href="/chat">
              <Image src={ChatIcon} alt="Icône chat" className="w-4 h-4" />
            </Link>
            <Image src={LineIcon} alt="Icône ligne" className="w-1.25 h-1.25" />
            <Link href="/favorite">
              <Image
                src={FavoriteIcon}
                alt="Icône favori"
                className="w-4 h-4"
              />
            </Link>
          </section>
        </div>
        <label
          htmlFor="drawer-toggle"
          className={styles.hamburger}
          aria-label="Ouvrir le menu"
        >
          <Image src={MenuMobileIcon} alt="Menu" />
        </label>
      </nav>
    </header>
  );
};

export default Header;

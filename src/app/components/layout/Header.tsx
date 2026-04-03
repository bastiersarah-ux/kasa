"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import ChatIcon from "@/public/chat.svg";
import styles from "./Header.module.css";
import LineIcon from "@/public/line.svg";
import FavoriteIcon from "@/public/favorite.svg";
import KasaIcon from "@/public/kasa-full.svg";

/** Header de l'application avec navigation */
const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <nav className="navbar bg-white h-[56.05px] w-195.5">
        <div className="navbar-start">
          <button
            type="button"
            className="btn-drawer-toggle btn btn-ghost lg:hidden"
            aria-label="Ouvrir le menu de navigation"
            onClick={() => {
              const toggle = document.getElementById(
                "drawer-toggle",
              ) as HTMLInputElement;
              if (toggle) toggle.checked = !toggle.checked;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div>
            <div className="max-lg:hidden"></div>
            <div className="gap-4">
              <a href="/" className="text-black">
                Accueil
              </a>
              <a href="/about" className="text-black">
                À propos
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-center max-lg:hidden">
          <Image
            src={KasaIcon}
            alt="Icône kasa"
            className="w-[113.29] h-[40.05]"
          />
        </div>

        <div className="navbar-end gap-3">
          <span>
            <a href="/">+Ajouter un logement</a>
          </span>
          <Image src={ChatIcon} alt="Icône chat" className="w-4 h-4" />
          <Image src={LineIcon} alt="Icône ligne" className="w-1.25 h-1.25" />
          <Image src={FavoriteIcon} alt="Icône favori" className="w-4 h-4" />
        </div>
      </nav>
    </header>
  );
};

export default Header;

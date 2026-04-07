"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

/** Footer de l'application */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image src="/kasa.svg" alt="Logo Kasa" width={46.04} height={53.36} />
      <div className="md:place-self-center md:justify-self-end">
        <Link className={styles.link} href="#">
          © 2025 Kasa. All rights reserved
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

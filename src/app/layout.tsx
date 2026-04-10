import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProviders from "@/app/ClientProvider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CloseDrawerButton from "@/app/components/CloseDrawerButton";
import CloseDrawerLink from "@/app/components/CloseDrawerLink";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasa",
  description: "Location d’appartements et de maisons entre particuliers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="kasa">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <h1 className="hidden">Kasa</h1>

        <ClientProviders>
          <div className="drawer drawer-mobile h-full">
            <input
              id="drawer-toggle"
              type="checkbox"
              className="drawer-toggle"
              aria-label="Menu de navigation"
            />
            <div className="drawer-content flex flex-col">
              <Header />
              {children}
              <Footer />
            </div>
            <div className="drawer-side">
              <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
              <aside className="menu gap-6 h-full py-4 w-97 max-w-full bg-base-100 text-base-content">
                <div className="flex px-4 w-full justify-between items-center">
                  <Image
                    src="/kasa.svg"
                    alt="Logo Kasa"
                    width={46.04}
                    height={53.36}
                  />
                  <label
                    htmlFor="drawer-toggle"
                    className="btn btn-transparent btn-circle btn-ghost text-3xl! cursor-pointer"
                  >
                    ✕
                  </label>
                </div>
                <ul className="space-2">
                  <li>
                    <CloseDrawerLink
                      className="px-4 py-5 text-2xl font-normal text-black!"
                      href="/"
                    >
                      Accueil
                    </CloseDrawerLink>
                  </li>
                  <li>
                    <CloseDrawerLink
                      className="px-4 py-5 text-2xl font-normal text-black!"
                      href="/about"
                    >
                      À propos
                    </CloseDrawerLink>
                  </li>
                  <li>
                    <CloseDrawerLink
                      className="px-4 py-5 text-2xl font-normal text-black!"
                      href="/chat"
                    >
                      Messagerie
                    </CloseDrawerLink>
                  </li>
                  <li>
                    <CloseDrawerLink
                      className="px-4 py-5 text-2xl font-normal text-black!"
                      href="/favorite"
                    >
                      Favoris
                    </CloseDrawerLink>
                  </li>
                </ul>
                <CloseDrawerButton className="btn btn-red self-start">
                  Ajouter un logement
                </CloseDrawerButton>
              </aside>
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

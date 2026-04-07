import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProviders from "@/app/ClientProvider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./globals.css";
import Link from "next/link";

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
              <aside className="menu h-full p-4 w-64 bg-base-100 text-base-content">
                <ul className="space-y-2">
                  <li>
                    <Link href="/">Accueil</Link>
                  </li>
                  <li>
                    <Link href="/about">À propos</Link>
                  </li>
                  <li>
                    <Link href="/">+ Ajouter un logement</Link>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

"use client";

import { HostSummary } from "@/types/api-types";
import Image from "next/image";
import RatingIcon from "@/public/rating.svg";
import Link from "next/link";

/** Props de la carte Hôte */
type HostCardProps = {
  host?: HostSummary;
  rating?: number;
  ratingCount?: number;
};

/** Carte affichant les informations de l'hôte */
export default function HostCard({ host, rating, ratingCount }: HostCardProps) {
  if (!host) return null;

  return (
    <div className="card bg-white shadow-sm p-4">
      <h2 className="font-semibold text-lg mb-4">Votre hôte</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={host.picture || "/default-avatar.png"}
          alt={host.name}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="flex items-center gap-3">
          <p className="font-medium">{host.name}</p>

          {rating !== undefined && (
            <div className="flex items-center gap-1 bg-base-100 px-2 py-1 rounded-md text-sm">
              <Image
                src={RatingIcon}
                alt="Icône de note"
                width={14}
                height={14}
              />
              <span>
                {rating} {ratingCount ? `(${ratingCount})` : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/contact"
          className="btn bg-[#99331A] text-white! border-none"
        >
          Contacter l’hôte
        </Link>

        <Link href="/chat" className="btn bg-[#99331A] text-white! border-none">
          Envoyer un message
        </Link>
      </div>
    </div>
  );
}

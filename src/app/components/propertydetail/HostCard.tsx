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

      <div className="flex items-center gap-4.5 mb-6">
        <img
          src={host.picture || "/default-avatar.png"}
          alt={host.name}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="flex flex-1 items-center gap-4.5">
          <p className="font-medium">{host.name}</p>

          {rating !== undefined && (
            <div className="flex items-center gap-2 p-2 text-black rounded-md text-md bg-grey">
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
        <Link href="/chat" className="btn btn-red">
          Contacter l’hôte
        </Link>

        <Link href="/chat" className="btn btn-red">
          Envoyer un message
        </Link>
      </div>
    </div>
  );
}

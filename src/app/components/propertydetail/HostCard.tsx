"use client";

import { HostSummary } from "@/types/api-types";
import Image from "next/image";
import RatingIcon from "@/public/rating.svg";

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
    <div className="host-card">
      <div className="host-header">
        <span>Votre hôte</span>
        <img src={host.picture || "/default-avatar.png"} alt={host.name} />
        <div>
          <p>{host.name}</p>

          {rating !== undefined && (
            <div className="flex items-center gap-1">
              <Image
                src={RatingIcon}
                alt="Icône de note"
                width={82}
                height={82}
              />
              <p>
                {rating} {ratingCount ? `(${ratingCount})` : ""}
              </p>
            </div>
          )}
        </div>
      </div>

      <button>Contacter l’hôte</button>
      <button>Envoyer un message</button>
    </div>
  );
}

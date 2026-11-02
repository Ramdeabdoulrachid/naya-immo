"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Property } from "@/types/property";
import { PROPERTY_TYPE_LABELS, TRANSACTION_LABELS } from "@/config/agency";
import { formatFCFA } from "@/lib/currency";
import { useFavorites } from "@/hooks/use-favorites";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
  className?: string;
}

export function PropertyCard({
  property,
  priority = false,
  className,
}: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(property.id);

  const primaryImage = property.images[0] ?? {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: property.title,
  };

  const formattedPrice = formatFCFA(property.price, {
    transactionType: property.transactionType,
    showPeriod: false,
  });

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-naya-border bg-naya-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-naya-primary/35 hover:shadow-[0_18px_40px_-15px_rgba(24,35,31,0.12)]",
        className
      )}
    >
      {/* 1. Zone Photographique (Ratio 4:3) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-naya-surface-alt">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Dégradé subtil en haut et en bas pour la lisibilité des badges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-naya-text/35 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-naya-text/45 to-transparent"
        />

        {/* Badges en haut à gauche : Transaction + Coup de cœur / Nouveau */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap items-center gap-1.5 pr-14">
          <Badge
            variant={
              property.transactionType === "vente" ? "vente" : "location"
            }
          >
            {TRANSACTION_LABELS[property.transactionType]}
          </Badge>

          {property.badge && (
            <Badge
              variant={property.badge === "Coup de cœur" ? "sand" : "nouveau"}
            >
              {property.badge === "Coup de cœur" && (
                <Sparkles className="h-3 w-3" aria-hidden="true" />
              )}
              {property.badge}
            </Badge>
          )}
        </div>

        {/* Bouton Favoris en haut à droite (Zone tactile >= 44x44px, indépendant du lien de la carte) */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={handleFavoriteClick}
          aria-pressed={liked}
          aria-label={
            liked
              ? `Retirer « ${property.title} » des favoris`
              : `Ajouter « ${property.title} » aux favoris`
          }
          className={cn(
            " absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer shadow-xs",
            liked
              ? "border-naya-primary bg-naya-primary text-white"
              : "border-white/40 bg-naya-surface/90 text-naya-text backdrop-blur-xs hover:bg-naya-surface"
          )}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              liked ? "fill-white scale-110" : "text-naya-text"
            )}
            aria-hidden="true"
          />
        </motion.button>

        {/* Catégorie du bien en bas à gauche de la photo */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2">
          <span className="rounded-lg bg-naya-surface/92 px-2.5 py-1 text-xs font-semibold text-naya-text backdrop-blur-xs shadow-2xs">
            {PROPERTY_TYPE_LABELS[property.propertyType]}
          </span>
        </div>
      </div>

      {/* 2. Corps de la carte */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Localisation : Ville + Quartier */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-naya-muted">
            <MapPin
              className="h-3.5 w-3.5 shrink-0 text-naya-primary"
              aria-hidden="true"
            />
            <span className="truncate">
              {property.city}
              {property.neighborhood ? ` · ${property.neighborhood}` : ""}
            </span>
          </div>

          {/* Titre du bien avec lien étendu (stretched-link) sur toute la carte */}
          <h3 className="mt-1.5 font-heading text-base font-bold leading-snug text-naya-text transition-colors group-hover:text-naya-primary sm:text-lg line-clamp-2">
            <Link
              href={`/biens/${property.slug}`}
              className="after:absolute after:inset-0 after:z-10 focus:outline-none"
            >
              {property.title}
            </Link>
          </h3>

          {/* Prix en FCFA mis en valeur */}
          <div className="mt-3 flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-lg font-extrabold tracking-tight text-naya-primary sm:text-xl">
                {formattedPrice}
              </span>
              {property.transactionType === "location" && (
                <span className="text-xs font-medium text-naya-muted">
                  / mois
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-naya-secondary transition-transform duration-200 group-hover:translate-x-0.5">
              <span>Détails</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* 3. Caractéristiques principales (Toujours visibles, jamais cachées au survol) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-naya-border pt-3.5 text-xs font-medium text-naya-muted">
          {property.bedrooms !== undefined && property.bedrooms > 0 && (
            <div
              className="flex items-center gap-1.5"
              title={`${property.bedrooms} chambre${property.bedrooms > 1 ? "s" : ""}`}
            >
              <BedDouble
                className="h-4 w-4 shrink-0 text-naya-secondary"
                aria-hidden="true"
              />
              <span>
                {property.bedrooms} ch.
              </span>
            </div>
          )}

          {property.bathrooms !== undefined && property.bathrooms > 0 && (
            <div
              className="flex items-center gap-1.5"
              title={`${property.bathrooms} salle${property.bathrooms > 1 ? "s" : ""} de bain`}
            >
              <Bath
                className="h-4 w-4 shrink-0 text-naya-secondary"
                aria-hidden="true"
              />
              <span>
                {property.bathrooms} sdb.
              </span>
            </div>
          )}

          <div
            className="flex items-center gap-1.5"
            title={`Superficie de ${property.surface} m²`}
          >
            <Maximize2
              className="h-3.5 w-3.5 shrink-0 text-naya-secondary"
              aria-hidden="true"
            />
            <span className="font-semibold text-naya-text">
              {property.surface} m²
            </span>
          </div>

          {/* Pour les terrains ou locaux sans chambres, afficher un atout clé */}
          {property.bedrooms === undefined && property.features[0] && (
            <span className="ml-auto rounded-md bg-naya-surface-alt px-2 py-0.5 text-[11px] font-medium text-naya-text">
              {property.features[0]}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}


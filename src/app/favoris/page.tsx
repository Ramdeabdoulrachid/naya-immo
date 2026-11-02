"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Compass, Trash2 } from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/properties";
import { useFavorites } from "@/hooks/use-favorites";
import { PropertyCard } from "@/components/property/property-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FavorisPage() {
  const { favoriteIds, isHydrated, clearFavorites } = useFavorites();

  const favoriteProperties = useMemo(
    () => DEMO_PROPERTIES.filter((p) => favoriteIds.includes(p.id)),
    [favoriteIds]
  );

  return (
    <div className="bg-naya-bg py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de la page Favoris */}
        <div className="flex flex-col gap-4 border-b border-naya-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-naya-primary">
              Sélection personnelle
            </span>
            <h1 className="mt-1.5 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl lg:text-4xl">
              Mes biens favoris
            </h1>
            <p className="mt-1.5 text-sm text-naya-muted sm:text-base">
              Retrouvez les propriétés que vous avez sauvegardées sur cet
              appareil pour les comparer facilement.
            </p>
          </div>

          {isHydrated && favoriteProperties.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearFavorites}
              className="self-start sm:self-auto"
            >
              <Trash2 className="h-4 w-4 text-naya-muted" aria-hidden="true" />
              <span>Tout retirer ({favoriteProperties.length})</span>
            </Button>
          )}
        </div>

        {/* État de chargement d'hydratation (évite tout décalage SSR/CSR) */}
        {!isHydrated ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 animate-pulse rounded-2xl bg-naya-surface-alt"
              />
            ))}
          </div>
        ) : favoriteProperties.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* État vide conforme au cahier des charges */
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-naya-border bg-naya-surface px-6 py-16 text-center shadow-2xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-naya-surface-alt text-naya-primary">
              <Heart className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mt-4 font-heading text-xl font-bold text-naya-text">
              Vous n&apos;avez pas encore de favoris.
            </h2>
            <p className="mt-2 max-w-md text-sm text-naya-muted">
              Parcourez le catalogue et cliquez sur l&apos;icône en forme de
              cœur sur une carte immobilière pour retrouver vos biens préférés
              ici.
            </p>
            <Link
              href="/biens"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "mt-6"
              )}
            >
              <Compass
                className="h-4 w-4 text-naya-sand"
                aria-hidden="true"
              />
              <span>Explorer les biens</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


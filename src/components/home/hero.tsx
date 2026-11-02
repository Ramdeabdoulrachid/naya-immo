"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  PlusCircle,
  MapPin,
  CheckCircle2,
  Building,
} from "lucide-react";
import { AGENCY_CONFIG } from "@/config/agency";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  HeroSearchBar,
  HeroSearchCriteria,
} from "@/components/search/hero-search-bar";

interface HeroProps {
  initialCriteria?: Partial<HeroSearchCriteria>;
  onSearchCriteriaChange?: (criteria: HeroSearchCriteria) => void;
}

export function Hero({
  initialCriteria,
  onSearchCriteriaChange,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-naya-bg pt-5 pb-10 sm:pt-8 sm:pb-14 lg:pt-12 lg:pb-18"
    >
      {/* Décoration subtile d'arrière-plan (halo sable & vert sauge) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-naya-sand/20 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-naya-secondary/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grille asymétrique : Éditorial (7 col) + Photographie architecturale (5 col) */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Colonne gauche : Contenu éditorial */}
          <div className="lg:col-span-7">
            {/* Surtitre officiel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-naya-border bg-naya-surface px-3.5 py-1.5 shadow-2xs"
            >
              <span
                className="h-2 w-2 rounded-full bg-naya-primary"
                aria-hidden="true"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-naya-primary sm:text-xs">
                NAYA IMMOBILIER — BURKINA FASO
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06, ease: "easeOut" }}
              className="mt-4 font-heading text-3xl font-bold leading-[1.14] tracking-tight text-naya-text sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              Trouvez le lieu où commence votre{" "}
              <span className="relative inline-block text-naya-primary">
                prochaine histoire.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-naya-sand/45 -z-10"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
              className="mt-4 max-w-xl text-base leading-relaxed text-naya-muted sm:mt-5 sm:text-lg"
            >
              Explorez une sélection de maisons, appartements et terrains à
              vendre ou à louer au Burkina Faso.
            </motion.p>

            {/* Boutons d'action (empilés sur très petit écran, côte à côte dès sm) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
              className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center"
            >
              <Link
                href="/biens"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "w-full sm:w-auto justify-center"
                )}
              >
                <span>Explorer les biens</span>
                <ArrowRight
                  className="h-4 w-4 text-naya-sand"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/contact?sujet=proposer-un-bien"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto justify-center"
                )}
              >
                <PlusCircle
                  className="h-4 w-4 text-naya-primary"
                  aria-hidden="true"
                />
                <span>Déposer une annonce</span>
              </Link>
            </motion.div>

            {/* Repères géographiques & signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-naya-border/80 pt-5 text-xs text-naya-muted sm:text-sm"
            >
              <div className="flex items-center gap-1.5 font-medium text-naya-text">
                <MapPin
                  className="h-4 w-4 shrink-0 text-naya-primary"
                  aria-hidden="true"
                />
                <span>Ouagadougou · Bobo-Dioulasso · Koudougou</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-naya-secondary"
                  aria-hidden="true"
                />
                <span>« {AGENCY_CONFIG.tagline} »</span>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite : Composition photographique immobilière */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-naya-border bg-naya-surface p-2 shadow-[0_20px_50px_-20px_rgba(24,35,31,0.16)] sm:rounded-3xl sm:p-2.5">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] lg:aspect-[5/4] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-naya-surface-alt">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85"
                  alt="Villa contemporaine lumineuse avec jardin paysager au Burkina Faso"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                {/* Voile dégradé bas pour faire ressortir la vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-naya-text/65 via-naya-text/10 to-transparent"
                />

                {/* Badge supérieur sur la photo */}
                <div className="absolute left-3 top-3 right-3 flex items-center justify-between gap-2 sm:left-4 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-naya-surface/95 px-2.5 py-1 text-xs font-semibold text-naya-text backdrop-blur-xs shadow-xs">
                    <Building
                      className="h-3.5 w-3.5 text-naya-primary"
                      aria-hidden="true"
                    />
                    Sélection NAYA
                  </span>
                  <span className="rounded-lg bg-naya-sand px-2.5 py-1 text-xs font-bold text-naya-text shadow-xs">
                    Ouaga 2000
                  </span>
                </div>

                {/* Carte d'aperçu en bas de l'image */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-naya-surface/95 p-3 backdrop-blur-md shadow-sm sm:bottom-4 sm:left-4 sm:right-4 sm:p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-heading text-sm font-bold text-naya-text sm:text-base">
                        Villa contemporaine 4 chambres
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-naya-muted">
                        <MapPin
                          className="h-3 w-3 shrink-0 text-naya-primary"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          Ouagadougou · 420 m² · Jardin arboré
                        </span>
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="block font-heading text-sm font-bold text-naya-primary sm:text-base">
                        125 000 000 FCFA
                      </span>
                      <span className="text-[11px] font-medium text-naya-muted">
                        Exemple démo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2 intégrée : Barre de recherche immobilière */}
        <div className="mt-7 sm:mt-9 lg:mt-11">
          <HeroSearchBar
            initialCriteria={initialCriteria}
            onCriteriaChange={onSearchCriteriaChange}
          />
        </div>
      </div>
    </section>
  );
}


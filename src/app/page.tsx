"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { HeroSearchCriteria } from "@/components/search/hero-search-bar";
import { CategoriesSection } from "@/components/home/categories-section";
import { PropertyCard } from "@/components/property/property-card";
import { WhyNayaSection } from "@/components/home/why-naya-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { OwnersCtaSection } from "@/components/home/owners-cta-section";
import { FaqSection } from "@/components/home/faq-section";
import { DEMO_PROPERTIES } from "@/data/properties";
import { DEFAULT_FILTERS, filterAndSortProperties } from "@/lib/filters";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [searchCriteria, setSearchCriteria] = useState<HeroSearchCriteria>({
    transaction: "all",
    type: "all",
    city: "all",
    maxPrice: "",
  });

  const hasActiveFilter =
    searchCriteria.transaction !== "all" ||
    searchCriteria.type !== "all" ||
    searchCriteria.city !== "all" ||
    searchCriteria.maxPrice !== "";

  const displayedProperties = useMemo(() => {
    if (!hasActiveFilter) {
      return DEMO_PROPERTIES.filter((p) => p.featured).slice(0, 6);
    }
    return filterAndSortProperties(DEMO_PROPERTIES, {
      ...DEFAULT_FILTERS,
      ...searchCriteria,
    });
  }, [searchCriteria, hasActiveFilter]);

  return (
    <div>
      {/* SECTION 1 & 2 : Hero + Barre de recherche immobilière */}
      <Hero
        initialCriteria={searchCriteria}
        onSearchCriteriaChange={setSearchCriteria}
      />

      {/* SECTION 3 : Explorer par catégorie */}
      <CategoriesSection />

      {/* SECTION 4 : Biens à la une (ou résultats filtrés en direct depuis la barre du Hero) */}
      <section
        id="biens-a-la-une"
        aria-labelledby="featured-properties-heading"
        className="py-12 sm:py-16 lg:py-20 bg-naya-bg"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-naya-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {hasActiveFilter
                    ? "Sélection filtrée en direct"
                    : "Sélection mise en avant"}
                </span>
              </div>
              <h2
                id="featured-properties-heading"
                className="mt-1.5 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl"
              >
                {hasActiveFilter
                  ? `${displayedProperties.length} bien${displayedProperties.length > 1 ? "s" : ""} correspondant${displayedProperties.length > 1 ? "s" : ""} à vos critères`
                  : "Biens immobiliers à la une"}
              </h2>
              <p className="mt-1 text-sm text-naya-muted sm:text-base">
                Maisons, appartements, terrains et locaux commerciaux à
                Ouagadougou, Bobo-Dioulasso et Koudougou.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {hasActiveFilter && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSearchCriteria({
                      transaction: "all",
                      type: "all",
                      city: "all",
                      maxPrice: "",
                    })
                  }
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tout réafficher</span>
                </Button>
              )}

              <Link
                href="/biens"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "min-h-11 px-4"
                )}
              >
                <span>Voir les 12 biens du catalogue</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Grille responsive : 1 colonne sur smartphone, 2 sur tablette, 3 sur desktop */}
          {displayedProperties.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.06, 0.25),
                    ease: "easeOut",
                  }}
                >
                  <PropertyCard property={property} priority={index < 2} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-naya-border bg-naya-surface p-8 text-center sm:p-12">
              <p className="font-heading text-lg font-bold text-naya-text">
                Aucun bien ne correspond à votre recherche.
              </p>
              <p className="mt-1 text-sm text-naya-muted">
                Essayez d&apos;élargir le budget ou de sélectionner une autre
                ville au Burkina Faso.
              </p>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() =>
                  setSearchCriteria({
                    transaction: "all",
                    type: "all",
                    city: "all",
                    maxPrice: "",
                  })
                }
                className="mt-4"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Effacer les filtres</span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5 : Pourquoi NAYA IMMOBILIER ? */}
      <WhyNayaSection />

      {/* SECTION 6 : Comment ça marche ? */}
      <HowItWorksSection />

      {/* SECTION 7 : Propriétaires */}
      <OwnersCtaSection />

      {/* SECTION 8 : FAQ */}
      <FaqSection />
    </div>
  );
}

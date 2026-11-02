"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ArrowUpDown,
  ChevronDown,
  Building2,
} from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/properties";
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  filterAndSortProperties,
} from "@/lib/filters";
import {
  CityName,
  PropertyFilterState,
  PropertyType,
  SortOption,
  TransactionType,
} from "@/types/property";
import { PROPERTY_TYPE_LABELS, TRANSACTION_LABELS } from "@/config/agency";
import { PropertyCard } from "@/components/property/property-card";
import { CatalogFilters } from "@/components/filters/catalog-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<PropertyFilterState>(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Synchroniser les filtres à chaque changement des paramètres d'URL (ex: clic sur Acheter, Louer, Terrains dans le Header ou depuis la recherche Hero)
  useEffect(() => {
    const txParam = searchParams.get("transaction");
    const typeParam = searchParams.get("type");
    const cityParam = searchParams.get("city");
    const maxPriceParam = searchParams.get("maxPrice");
    const minPriceParam = searchParams.get("minPrice");
    const queryParam = searchParams.get("query");

    const validTx: "all" | TransactionType =
      txParam === "vente" || txParam === "location" ? txParam : "all";

    const validType: "all" | PropertyType =
      typeParam === "maison" ||
      typeParam === "appartement" ||
      typeParam === "terrain" ||
      typeParam === "local-commercial"
        ? typeParam
        : "all";

    const validCity: "all" | CityName =
      cityParam === "Ouagadougou" ||
      cityParam === "Bobo-Dioulasso" ||
      cityParam === "Koudougou"
        ? cityParam
        : "all";

    setFilters((prev) => ({
      ...prev,
      transaction: validTx,
      type: validType,
      city: validCity,
      maxPrice: maxPriceParam ?? "",
      minPrice: minPriceParam ?? "",
      query: queryParam ?? "",
    }));
  }, [searchParams]);

  // Empêcher le défilement de l'arrière-plan lorsque le tiroir mobile est ouvert
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const updateUrlFromFilters = (next: PropertyFilterState) => {
    const params = new URLSearchParams();
    if (next.transaction !== "all") params.set("transaction", next.transaction);
    if (next.type !== "all") params.set("type", next.type);
    if (next.city !== "all") params.set("city", next.city);
    if (next.minPrice) params.set("minPrice", next.minPrice);
    if (next.maxPrice) params.set("maxPrice", next.maxPrice);
    if (next.query.trim()) params.set("query", next.query.trim());

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleUpdateFilters = (partial: Partial<PropertyFilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...partial };
      updateUrlFromFilters(next);
      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    router.replace(pathname, { scroll: false });
  };

  const filteredProperties = useMemo(
    () => filterAndSortProperties(DEMO_PROPERTIES, filters),
    [filters]
  );

  const activeFiltersCount = useMemo(
    () => countActiveFilters(filters),
    [filters]
  );

  return (
    <div className="bg-naya-bg py-6 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de la page Catalogue */}
        <div className="border-b border-naya-border pb-6">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-naya-primary">
            Catalogue NAYA IMMOBILIER — Burkina Faso
          </span>
          <h1 className="mt-1.5 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl lg:text-4xl">
            Trouvez votre prochain bien immobilier.
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-naya-muted sm:text-base">
            Explorez nos maisons, appartements, terrains et espaces commerciaux.
          </p>

          {/* Raccourcis rapides synchronisés avec les champs (Acheter, Louer, Terrains, Maisons, Appartements...) */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {[
              {
                label: "Tous les biens",
                isActive:
                  filters.transaction === "all" && filters.type === "all",
                onClick: () =>
                  handleUpdateFilters({ transaction: "all", type: "all" }),
              },
              {
                label: "Acheter (À vendre)",
                isActive:
                  filters.transaction === "vente" && filters.type !== "terrain",
                onClick: () =>
                  handleUpdateFilters({
                    transaction: "vente",
                    type: filters.type === "terrain" ? "all" : filters.type,
                  }),
              },
              {
                label: "Louer (À louer)",
                isActive: filters.transaction === "location",
                onClick: () =>
                  handleUpdateFilters({
                    transaction: "location",
                    type: filters.type === "terrain" ? "all" : filters.type,
                  }),
              },
              {
                label: "Terrains",
                isActive: filters.type === "terrain",
                onClick: () =>
                  handleUpdateFilters({
                    transaction: "all",
                    type: "terrain",
                    minBedrooms: "",
                    minBathrooms: "",
                  }),
              },
              {
                label: "Maisons & Villas",
                isActive: filters.type === "maison",
                onClick: () => handleUpdateFilters({ type: "maison" }),
              },
              {
                label: "Appartements",
                isActive: filters.type === "appartement",
                onClick: () => handleUpdateFilters({ type: "appartement" }),
              },
              {
                label: "Locaux commerciaux",
                isActive: filters.type === "local-commercial",
                onClick: () =>
                  handleUpdateFilters({
                    type: "local-commercial",
                    minBedrooms: "",
                  }),
              },
            ].map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={pill.onClick}
                className={cn(
                  "min-h-10 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                  pill.isActive
                    ? "border-naya-primary bg-naya-primary text-white shadow-2xs"
                    : "border-naya-border bg-naya-surface text-naya-text hover:border-naya-primary/40"
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Barre d'outils : Recherche textuelle + Bouton Filtres (Mobile) + Tri + Compteur */}
        <div className="mt-6 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          {/* Champ de recherche textuelle */}
          <div className="relative flex-1 max-w-lg">
            <label htmlFor="catalog-search-input" className="sr-only">
              Rechercher par nom, ville, quartier ou type de bien
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-muted"
              aria-hidden="true"
            />
            <input
              id="catalog-search-input"
              type="search"
              value={filters.query}
              onChange={(e) => handleUpdateFilters({ query: e.target.value })}
              placeholder="Rechercher : Ouaga 2000, Sarfalao, villa, terrain..."
              className="h-12 w-full rounded-xl border border-naya-border bg-naya-surface pl-10 pr-10 text-sm text-naya-text placeholder:text-naya-muted/75 focus:border-naya-primary focus:outline-none"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => handleUpdateFilters({ query: "" })}
                aria-label="Effacer la recherche textuelle"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-naya-muted hover:text-naya-text"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Actions mobile (Bouton Filtres avec badge) & Sélecteur de Tri */}
          <div className="flex items-center gap-2.5">
            {/* Bouton Filtres sur Mobile (< lg) */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-naya-border bg-naya-surface px-4 text-sm font-semibold text-naya-text shadow-2xs transition-colors hover:border-naya-primary/40 lg:hidden cursor-pointer"
              aria-expanded={mobileFiltersOpen}
            >
              <SlidersHorizontal
                className="h-4 w-4 text-naya-primary"
                aria-hidden="true"
              />
              <span>Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-naya-primary px-1.5 text-xs font-bold text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sélecteur de tri */}
            <div className="relative flex-1 sm:flex-initial">
              <label htmlFor="catalog-sort-select" className="sr-only">
                Trier les résultats
              </label>
              <ArrowUpDown
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-primary"
                aria-hidden="true"
              />
              <select
                id="catalog-sort-select"
                value={filters.sort}
                onChange={(e) =>
                  handleUpdateFilters({ sort: e.target.value as SortOption })
                }
                className="h-12 w-full appearance-none rounded-xl border border-naya-border bg-naya-surface pl-9 pr-9 text-sm font-medium text-naya-text focus:border-naya-primary focus:outline-none sm:w-56"
              >
                <option value="recent">Tri : Plus récents</option>
                <option value="price-asc">Prix croissant (FCFA)</option>
                <option value="price-desc">Prix décroissant (FCFA)</option>
                <option value="surface-desc">Superficie décroissante</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-muted"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Bandeau de résumé des filtres actifs & nombre de résultats */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-naya-muted">
            Affichage de{" "}
            <strong className="font-bold text-naya-text">
              {filteredProperties.length}
            </strong>{" "}
            propriété{filteredProperties.length > 1 ? "s" : ""} sur{" "}
            {DEMO_PROPERTIES.length}
          </p>

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {filters.transaction !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-naya-surface-alt px-2.5 py-1 text-xs font-semibold text-naya-primary">
                  {TRANSACTION_LABELS[filters.transaction]}
                  <button
                    type="button"
                    onClick={() => handleUpdateFilters({ transaction: "all" })}
                    aria-label="Retirer le filtre de transaction"
                    className="ml-0.5 rounded hover:bg-naya-border p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {filters.type !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-naya-surface-alt px-2.5 py-1 text-xs font-semibold text-naya-primary">
                  {PROPERTY_TYPE_LABELS[filters.type]}
                  <button
                    type="button"
                    onClick={() => handleUpdateFilters({ type: "all" })}
                    aria-label="Retirer le filtre de type de bien"
                    className="ml-0.5 rounded hover:bg-naya-border p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {filters.city !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-naya-surface-alt px-2.5 py-1 text-xs font-semibold text-naya-primary">
                  {filters.city}
                  <button
                    type="button"
                    onClick={() => handleUpdateFilters({ city: "all" })}
                    aria-label="Retirer le filtre de ville"
                    className="ml-0.5 rounded hover:bg-naya-border p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-naya-muted hover:text-naya-primary cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>Effacer les filtres</span>
              </button>
            </div>
          )}
        </div>

        {/* Mise en page principale : Colonne latérale Desktop (3 col) + Grille de cartes (9 col) */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Colonne latérale des filtres (Uniquement Desktop lg:) */}
          <aside
            aria-label="Filtres du catalogue"
            className="hidden lg:col-span-4 xl:col-span-3 lg:block lg:sticky lg:top-24 rounded-2xl border border-naya-border bg-naya-surface p-5 shadow-2xs"
          >
            <CatalogFilters
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              activeCount={activeFiltersCount}
            />
          </aside>

          {/* Résultats : 1 colonne sur mobile, 2 colonnes sur tablette/desktop avec sidebar */}
          <div className="lg:col-span-8 xl:col-span-9">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index * 0.04, 0.2),
                    }}
                  >
                    <PropertyCard property={property} priority={index < 2} />
                  </motion.div>
                ))}
              </div>
            ) : (
              /* État vide conforme au cahier des charges */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-naya-border bg-naya-surface px-6 py-14 text-center shadow-2xs">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-naya-surface-alt text-naya-primary">
                  <Building2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-heading text-xl font-bold text-naya-text">
                  Aucun bien ne correspond à votre recherche.
                </h2>
                <p className="mt-2 max-w-md text-sm text-naya-muted">
                  Essayez de modifier le budget, de changer de ville ou de
                  réinitialiser les filtres actifs pour explorer l&apos;ensemble
                  de notre catalogue de démonstration.
                </p>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleResetFilters}
                  className="mt-6"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  <span>Effacer les filtres</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fenêtre basse / Panneau coulissant pour les filtres sur MOBILE (< lg) */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-naya-text/45 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filtres de recherche mobile"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-3xl bg-naya-surface shadow-2xl lg:hidden"
            >
              {/* Barre de poignée + En-tête de la fenêtre basse */}
              <div className="flex items-center justify-between border-b border-naya-border px-5 py-4">
                <div>
                  <h2 className="font-heading text-lg font-bold text-naya-text">
                    Filtrer les biens
                  </h2>
                  <p className="text-xs text-naya-muted">
                    {filteredProperties.length} bien
                    {filteredProperties.length > 1 ? "s" : ""} disponible
                    {filteredProperties.length > 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-naya-border bg-naya-bg text-naya-text"
                  aria-label="Fermer les filtres"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Corps défilable des filtres */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <CatalogFilters
                  filters={filters}
                  onUpdateFilters={handleUpdateFilters}
                  onResetFilters={handleResetFilters}
                  activeCount={activeFiltersCount}
                />
              </div>

              {/* Pied fixe du tiroir mobile : Réinitialiser + Appliquer les filtres */}
              <div className="grid grid-cols-2 gap-3 border-t border-naya-border bg-naya-surface px-5 pt-3.5 pb-safe">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleResetFilters}
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  <span>Réinitialiser</span>
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full"
                >
                  <span>
                    Appliquer ({filteredProperties.length})
                  </span>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BiensPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-10 w-64 animate-pulse rounded-xl bg-naya-surface-alt" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-96 animate-pulse rounded-2xl bg-naya-surface-alt"
              />
            ))}
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}


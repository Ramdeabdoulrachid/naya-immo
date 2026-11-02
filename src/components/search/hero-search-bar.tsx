"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Home,
  Wallet,
  RotateCcw,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  AGENCY_CONFIG,
  BUDGET_PRESETS,
  PROPERTY_TYPE_LABELS,
} from "@/config/agency";
import { DEMO_PROPERTIES } from "@/data/properties";
import { DEFAULT_FILTERS, filterAndSortProperties } from "@/lib/filters";
import { CityName, PropertyType, TransactionType } from "@/types/property";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface HeroSearchCriteria {
  transaction: "all" | TransactionType;
  type: "all" | PropertyType;
  city: "all" | CityName;
  maxPrice: string;
}

interface HeroSearchBarProps {
  initialCriteria?: Partial<HeroSearchCriteria>;
  onCriteriaChange?: (criteria: HeroSearchCriteria) => void;
  className?: string;
}

type QuickTabMode = "vente" | "location" | "terrain" | "all";

export function HeroSearchBar({
  initialCriteria,
  onCriteriaChange,
  className,
}: HeroSearchBarProps) {
  const router = useRouter();

  const [transaction, setTransaction] = useState<"all" | TransactionType>(
    initialCriteria?.transaction ?? "all"
  );
  const [propertyType, setPropertyType] = useState<"all" | PropertyType>(
    initialCriteria?.type ?? "all"
  );
  const [city, setCity] = useState<"all" | CityName>(
    initialCriteria?.city ?? "all"
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    initialCriteria?.maxPrice ?? ""
  );

  // Synchroniser si initialCriteria change depuis un composant parent
  useEffect(() => {
    if (!initialCriteria) return;
    if (initialCriteria.transaction !== undefined) {
      setTransaction(initialCriteria.transaction);
    }
    if (initialCriteria.type !== undefined) {
      setPropertyType(initialCriteria.type);
    }
    if (initialCriteria.city !== undefined) {
      setCity(initialCriteria.city);
    }
    if (initialCriteria.maxPrice !== undefined) {
      setMaxPrice(initialCriteria.maxPrice);
    }
  }, [initialCriteria]);

  const notifyChange = (next: HeroSearchCriteria) => {
    onCriteriaChange?.(next);
  };

  // Onglet actif dérivé de la liaison entre Transaction et Type de bien
  const activeTab: QuickTabMode = useMemo(() => {
    if (propertyType === "terrain") return "terrain";
    if (transaction === "vente") return "vente";
    if (transaction === "location") return "location";
    return "all";
  }, [transaction, propertyType]);

  // Sélection d'un onglet supérieur (Acheter, Louer, Terrains, Tout voir) lié aux champs
  const handleQuickTabSelect = (tab: QuickTabMode) => {
    if (tab === "terrain") {
      // Les terrains étant proposés à la vente, on sélectionne automatiquement Type = Terrain et Transaction = Vente
      const nextState: HeroSearchCriteria = {
        transaction: "vente",
        type: "terrain",
        city,
        maxPrice: "",
      };
      setTransaction(nextState.transaction);
      setPropertyType(nextState.type);
      setMaxPrice("");
      notifyChange(nextState);
      return;
    }

    if (tab === "vente") {
      const nextState: HeroSearchCriteria = {
        transaction: "vente",
        type: propertyType === "terrain" ? "all" : propertyType,
        city,
        maxPrice: "",
      };
      setTransaction(nextState.transaction);
      setPropertyType(nextState.type);
      setMaxPrice("");
      notifyChange(nextState);
      return;
    }

    if (tab === "location") {
      // Si "Terrain" était sélectionné dans Type de bien, on repasse sur "Tous les types" pour éviter 0 résultat en location
      const nextType = propertyType === "terrain" ? "all" : propertyType;
      const nextState: HeroSearchCriteria = {
        transaction: "location",
        type: nextType,
        city,
        maxPrice: "",
      };
      setTransaction(nextState.transaction);
      setPropertyType(nextState.type);
      setMaxPrice("");
      notifyChange(nextState);
      return;
    }

    // "all" -> Tout voir
    const nextState: HeroSearchCriteria = {
      transaction: "all",
      type: "all",
      city,
      maxPrice: "",
    };
    setTransaction("all");
    setPropertyType("all");
    setMaxPrice("");
    notifyChange(nextState);
  };

  const handleTypeChange = (nextType: "all" | PropertyType) => {
    // Si l'utilisateur choisit "Terrain" alors qu'il était sur "Louer", basculer la transaction sur "Acheter" (vente)
    let nextTransaction = transaction;
    let nextBudget = maxPrice;
    if (nextType === "terrain" && transaction === "location") {
      nextTransaction = "vente";
      nextBudget = "";
      setTransaction("vente");
      setMaxPrice("");
    }
    setPropertyType(nextType);
    notifyChange({
      transaction: nextTransaction,
      type: nextType,
      city,
      maxPrice: nextBudget,
    });
  };

  const handleCityChange = (nextCity: "all" | CityName) => {
    setCity(nextCity);
    notifyChange({
      transaction,
      type: propertyType,
      city: nextCity,
      maxPrice,
    });
  };

  const handleMaxPriceChange = (nextPrice: string) => {
    setMaxPrice(nextPrice);
    notifyChange({
      transaction,
      type: propertyType,
      city,
      maxPrice: nextPrice,
    });
  };

  const handleReset = () => {
    setTransaction("all");
    setPropertyType("all");
    setCity("all");
    setMaxPrice("");
    notifyChange({
      transaction: "all",
      type: "all",
      city: "all",
      maxPrice: "",
    });
  };

  // Nombre de biens correspondants en direct dans le catalogue de démonstration
  const matchingCount = useMemo(() => {
    return filterAndSortProperties(DEMO_PROPERTIES, {
      ...DEFAULT_FILTERS,
      transaction,
      type: propertyType,
      city,
      maxPrice,
    }).length;
  }, [transaction, propertyType, city, maxPrice]);

  // Options de budget adaptées selon Acheter ou Louer
  const budgetOptions = useMemo(() => {
    if (transaction === "location") {
      return BUDGET_PRESETS.location;
    }
    if (transaction === "vente") {
      return BUDGET_PRESETS.vente;
    }
    return [
      ...BUDGET_PRESETS.location.map((b) => ({
        label: `${b.label} / mois (Location)`,
        value: b.value,
      })),
      ...BUDGET_PRESETS.vente.map((b) => ({
        label: `${b.label} (Achat)`,
        value: b.value,
      })),
    ];
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (transaction !== "all") params.set("transaction", transaction);
    if (propertyType !== "all") params.set("type", propertyType);
    if (city !== "all") params.set("city", city);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const queryString = params.toString();
    router.push(queryString ? `/biens?${queryString}` : "/biens");
  };

  const applyQuickPreset = (preset: {
    transaction: "all" | TransactionType;
    type: "all" | PropertyType;
    city: "all" | CityName;
  }) => {
    setTransaction(preset.transaction);
    setPropertyType(preset.type);
    setCity(preset.city);
    setMaxPrice("");
    notifyChange({
      ...preset,
      maxPrice: "",
    });
  };

  const hasActiveCriteria =
    transaction !== "all" ||
    propertyType !== "all" ||
    city !== "all" ||
    maxPrice !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
      className={cn(
        "w-full rounded-2xl border border-naya-border bg-naya-surface p-4 shadow-[0_18px_50px_-18px_rgba(24,35,31,0.12)] sm:p-6 lg:p-7",
        className
      )}
    >
      <form
        onSubmit={handleSubmit}
        aria-label="Rechercher un bien immobilier au Burkina Faso"
      >
        {/* Barre supérieure : Onglets Acheter / Louer / Terrains / Tout voir liés aux champs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-naya-border pb-4">
          <div
            role="tablist"
            aria-label="Mode de recherche rapide"
            className="grid grid-cols-2 gap-1.5 rounded-xl bg-naya-surface-alt p-1.5 sm:inline-flex sm:w-auto sm:grid-cols-none"
          >
            {(
              [
                { value: "all", label: "Tout voir" },
                { value: "vente", label: "Acheter" },
                { value: "location", label: "Louer" },
                { value: "terrain", label: "Terrains" },
              ] as const
            ).map((tab) => {
              const isSelected = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleQuickTabSelect(tab.value)}
                  className={cn(
                    "relative min-h-11 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all cursor-pointer",
                    isSelected
                      ? "bg-naya-primary text-white shadow-xs"
                      : "text-naya-muted hover:text-naya-text"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-naya-muted">
            <span className="inline-flex items-center gap-1.5 font-medium text-naya-secondary">
              <Sparkles
                className="h-3.5 w-3.5 text-naya-primary"
                aria-hidden="true"
              />
              <span>
                {matchingCount} bien{matchingCount > 1 ? "s" : ""} correspondant
                {matchingCount > 1 ? "s" : ""}
              </span>
            </span>

            {hasActiveCriteria && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-naya-muted transition-colors hover:bg-naya-surface-alt hover:text-naya-text cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* Grille des champs de recherche : empilés sur mobile, en grille sur tablette/desktop */}
        <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12 lg:items-end lg:gap-4">
          {/* 1. Type de transaction (lié aux onglets du haut) */}
          <div className="lg:col-span-2">
            <label
              htmlFor="search-transaction-type"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-naya-muted"
            >
              <span>Transaction</span>
            </label>
            <div className="relative">
              <select
                id="search-transaction-type"
                value={transaction}
                onChange={(e) => {
                  const nextTx = e.target.value as "all" | TransactionType;
                  const nextType =
                    nextTx === "location" && propertyType === "terrain"
                      ? "all"
                      : propertyType;
                  setTransaction(nextTx);
                  setPropertyType(nextType);
                  setMaxPrice("");
                  notifyChange({
                    transaction: nextTx,
                    type: nextType,
                    city,
                    maxPrice: "",
                  });
                }}
                className="h-12 w-full appearance-none rounded-xl border border-naya-border bg-naya-bg px-3.5 pr-9 text-sm font-medium text-naya-text transition-colors hover:border-naya-primary/40 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
              >
                <option value="all">Acheter ou Louer</option>
                <option value="vente">Acheter (À vendre)</option>
                <option value="location">Louer (À louer)</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-muted"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* 2. Type de bien */}
          <div className="lg:col-span-3">
            <label
              htmlFor="search-property-type"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-naya-muted"
            >
              <Home
                className="h-3.5 w-3.5 text-naya-primary"
                aria-hidden="true"
              />
              <span>Type de bien</span>
            </label>
            <div className="relative">
              <select
                id="search-property-type"
                value={propertyType}
                onChange={(e) =>
                  handleTypeChange(e.target.value as "all" | PropertyType)
                }
                className="h-12 w-full appearance-none rounded-xl border border-naya-border bg-naya-bg px-3.5 pr-10 text-sm font-medium text-naya-text transition-colors hover:border-naya-primary/40 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
              >
                <option value="all">Tous les types de biens</option>
                {(
                  Object.entries(PROPERTY_TYPE_LABELS) as [
                    PropertyType,
                    string,
                  ][]
                ).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-muted"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* 3. Ville */}
          <div className="lg:col-span-2">
            <label
              htmlFor="search-city"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-naya-muted"
            >
              <MapPin
                className="h-3.5 w-3.5 text-naya-primary"
                aria-hidden="true"
              />
              <span>Ville</span>
            </label>
            <div className="relative">
              <select
                id="search-city"
                value={city}
                onChange={(e) =>
                  handleCityChange(e.target.value as "all" | CityName)
                }
                className="h-12 w-full appearance-none rounded-xl border border-naya-border bg-naya-bg px-3.5 pr-9 text-sm font-medium text-naya-text transition-colors hover:border-naya-primary/40 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
              >
                <option value="all">Toutes les villes</option>
                {AGENCY_CONFIG.cities.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-muted"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* 4. Budget maximum en FCFA */}
          <div className="lg:col-span-3">
            <label
              htmlFor="search-max-budget"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-naya-muted"
            >
              <Wallet
                className="h-3.5 w-3.5 text-naya-primary"
                aria-hidden="true"
              />
              <span>
                Budget max{" "}
                {transaction === "location" ? "(FCFA/mois)" : "(FCFA)"}
              </span>
            </label>
            <div className="relative">
              <select
                id="search-max-budget"
                value={maxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-naya-border bg-naya-bg px-3.5 pr-10 text-sm font-medium text-naya-text transition-colors hover:border-naya-primary/40 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
              >
                <option value="">Sans limite de budget</option>
                {budgetOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-muted"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* 5. Bouton d'action Rechercher */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="h-12 w-full px-4 text-sm sm:text-base font-semibold shadow-sm"
            >
              <Search className="h-4 w-4 shrink-0 text-naya-sand" aria-hidden="true" />
              <span>Rechercher</span>
              <span className="ml-0.5 rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-naya-sand">
                {matchingCount}
              </span>
            </Button>
          </div>
        </div>

        {/* Suggestions rapides adaptées aux recherches fréquentes sur mobile & desktop */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-naya-border/60">
          <span className="text-xs font-medium text-naya-muted">
            Accès direct :
          </span>
          {[
            {
              label: "Maisons à vendre (Ouagadougou)",
              transaction: "vente" as const,
              type: "maison" as const,
              city: "Ouagadougou" as const,
            },
            {
              label: "Appartements à louer (Bobo-Dioulasso)",
              transaction: "location" as const,
              type: "appartement" as const,
              city: "Bobo-Dioulasso" as const,
            },
            {
              label: "Terrains résidentiels & commerciaux",
              transaction: "vente" as const,
              type: "terrain" as const,
              city: "all" as const,
            },
            {
              label: "Locaux commerciaux",
              transaction: "location" as const,
              type: "local-commercial" as const,
              city: "all" as const,
            },
          ].map((preset) => {
            const isPresetActive =
              transaction === preset.transaction &&
              propertyType === preset.type &&
              city === preset.city &&
              maxPrice === "";

            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyQuickPreset(preset)}
                className={cn(
                  "inline-flex min-h-8 items-center rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer",
                  isPresetActive
                    ? "border-naya-primary bg-naya-primary/10 text-naya-primary font-semibold"
                    : "border-naya-border bg-naya-bg text-naya-muted hover:border-naya-primary/40 hover:text-naya-text"
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </form>
    </motion.div>
  );
}

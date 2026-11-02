"use client";

import React from "react";
import { RotateCcw, ChevronDown } from "lucide-react";
import {
  AGENCY_CONFIG,
  PROPERTY_TYPE_LABELS,
} from "@/config/agency";
import {
  CityName,
  PropertyFilterState,
  PropertyType,
  TransactionType,
} from "@/types/property";
import { cn } from "@/lib/utils";

interface CatalogFiltersProps {
  filters: PropertyFilterState;
  onUpdateFilters: (partial: Partial<PropertyFilterState>) => void;
  onResetFilters: () => void;
  activeCount: number;
}

export function CatalogFilters({
  filters,
  onUpdateFilters,
  onResetFilters,
  activeCount,
}: CatalogFiltersProps) {
  // Chambres pertinentes uniquement pour Maison, Appartement ou "all"
  const showBedroomsFilter =
    filters.type === "all" ||
    filters.type === "maison" ||
    filters.type === "appartement";

  // Salles de bain pertinentes pour tout sauf Terrain
  const showBathroomsFilter = filters.type !== "terrain";

  const handlePropertyTypeSelect = (nextType: "all" | PropertyType) => {
    const updates: Partial<PropertyFilterState> = { type: nextType };
    // Si Terrain est sélectionné, réinitialiser chambres & salles de bain pour ne pas bloquer les résultats
    if (nextType === "terrain") {
      updates.minBedrooms = "";
      updates.minBathrooms = "";
      // Si l'utilisateur était en mode Location, basculer sur "all" ou "vente" car les terrains sont en vente
      if (filters.transaction === "location") {
        updates.transaction = "all";
      }
    } else if (nextType === "local-commercial") {
      updates.minBedrooms = "";
    }
    onUpdateFilters(updates);
  };

  return (
    <div className="space-y-6">
      {/* En-tête des filtres */}
      <div className="flex items-center justify-between border-b border-naya-border pb-3.5">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-base font-bold text-naya-text">
            Critères de recherche
          </h2>
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-naya-primary px-1.5 text-xs font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-naya-primary transition-colors hover:bg-naya-surface-alt cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Effacer les filtres</span>
          </button>
        )}
      </div>

      {/* 1. Type de transaction */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-naya-muted">
          Type de transaction
        </label>
        <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-xl bg-naya-surface-alt p-1">
          {(
            [
              { value: "all", label: "Tout" },
              { value: "vente", label: "À vendre" },
              { value: "location", label: "À louer" },
            ] as { value: "all" | TransactionType; label: string }[]
          ).map((option) => {
            const active = filters.transaction === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    transaction: option.value,
                    minPrice: "",
                    maxPrice: "",
                  })
                }
                className={cn(
                  "min-h-11 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all cursor-pointer",
                  active
                    ? "bg-naya-primary text-white shadow-xs"
                    : "text-naya-muted hover:text-naya-text"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Type de bien */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-naya-muted">
          Type de bien
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handlePropertyTypeSelect("all")}
            className={cn(
              "col-span-2 flex min-h-11 items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer",
              filters.type === "all"
                ? "border-naya-primary bg-naya-primary/10 text-naya-primary"
                : "border-naya-border bg-naya-bg text-naya-text hover:border-naya-primary/40"
            )}
          >
            Tous les types de biens
          </button>
          {(
            Object.entries(PROPERTY_TYPE_LABELS) as [PropertyType, string][]
          ).map(([key, label]) => {
            const active = filters.type === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handlePropertyTypeSelect(key)}
                className={cn(
                  "flex min-h-11 items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-colors cursor-pointer",
                  active
                    ? "border-naya-primary bg-naya-primary text-white"
                    : "border-naya-border bg-naya-bg text-naya-text hover:border-naya-primary/40"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Localisation (Villes du Burkina Faso) */}
      <div>
        <label
          htmlFor="filter-city-select"
          className="block text-xs font-bold uppercase tracking-wider text-naya-muted"
        >
          Localisation
        </label>
        <div className="relative mt-2">
          <select
            id="filter-city-select"
            value={filters.city}
            onChange={(e) =>
              onUpdateFilters({ city: e.target.value as "all" | CityName })
            }
            className="h-12 w-full appearance-none rounded-xl border border-naya-border bg-naya-bg px-3.5 pr-10 text-sm font-medium text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          >
            <option value="all">Toutes les villes (Burkina Faso)</option>
            {AGENCY_CONFIG.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-naya-muted"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* 4. Budget en FCFA (Minimum & Maximum) */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-naya-muted">
          Budget en FCFA{" "}
          {filters.transaction === "location" ? "(par mois)" : ""}
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor="filter-min-price" className="text-xs text-naya-muted">
              Minimum (FCFA)
            </label>
            <input
              id="filter-min-price"
              type="number"
              inputMode="numeric"
              min={0}
              step={50000}
              placeholder="Ex: 100000"
              value={filters.minPrice}
              onChange={(e) => onUpdateFilters({ minPrice: e.target.value })}
              className="mt-1 h-11 w-full rounded-xl border border-naya-border bg-naya-bg px-3 text-sm text-naya-text placeholder:text-naya-muted/60 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="filter-max-price" className="text-xs text-naya-muted">
              Maximum (FCFA)
            </label>
            <input
              id="filter-max-price"
              type="number"
              inputMode="numeric"
              min={0}
              step={50000}
              placeholder="Ex: 65000000"
              value={filters.maxPrice}
              onChange={(e) => onUpdateFilters({ maxPrice: e.target.value })}
              className="mt-1 h-11 w-full rounded-xl border border-naya-border bg-naya-bg px-3 text-sm text-naya-text placeholder:text-naya-muted/60 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 5. Caractéristiques selon le type de bien */}
      <div className="space-y-4 border-t border-naya-border pt-4">
        <span className="block text-xs font-bold uppercase tracking-wider text-naya-muted">
          Caractéristiques
        </span>

        {/* Nombre de chambres (si pertinent) */}
        {showBedroomsFilter && (
          <div>
            <label className="text-xs font-medium text-naya-text">
              Nombre de chambres minimum
            </label>
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              {[
                { label: "Peu importe", short: "Tous", value: "" },
                { label: "1+", short: "1+", value: "1" },
                { label: "2+", short: "2+", value: "2" },
                { label: "3+", short: "3+", value: "3" },
                { label: "4+", short: "4+", value: "4" },
              ].map((item) => {
                const active = filters.minBedrooms === item.value;
                return (
                  <button
                    key={item.short}
                    type="button"
                    onClick={() =>
                      onUpdateFilters({ minBedrooms: item.value })
                    }
                    className={cn(
                      "min-h-10 rounded-lg border text-xs font-semibold transition-colors cursor-pointer",
                      active
                        ? "border-naya-primary bg-naya-primary text-white"
                        : "border-naya-border bg-naya-bg text-naya-text hover:border-naya-primary/40"
                    )}
                    aria-label={`Minimum ${item.label} chambres`}
                  >
                    {item.short}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Nombre de salles de bain (si pertinent) */}
        {showBathroomsFilter && (
          <div>
            <label className="text-xs font-medium text-naya-text">
              Salles de bain minimum
            </label>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5">
              {[
                { short: "Toutes", value: "" },
                { short: "1+", value: "1" },
                { short: "2+", value: "2" },
                { short: "3+", value: "3" },
              ].map((item) => {
                const active = filters.minBathrooms === item.value;
                return (
                  <button
                    key={item.short}
                    type="button"
                    onClick={() =>
                      onUpdateFilters({ minBathrooms: item.value })
                    }
                    className={cn(
                      "min-h-10 rounded-lg border text-xs font-semibold transition-colors cursor-pointer",
                      active
                        ? "border-naya-primary bg-naya-primary text-white"
                        : "border-naya-border bg-naya-bg text-naya-text hover:border-naya-primary/40"
                    )}
                  >
                    {item.short}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Superficie minimale en m² */}
        <div>
          <label
            htmlFor="filter-min-surface"
            className="text-xs font-medium text-naya-text"
          >
            Superficie minimale (m²)
          </label>
          <input
            id="filter-min-surface"
            type="number"
            inputMode="numeric"
            min={0}
            step={20}
            placeholder="Ex: 100 m²"
            value={filters.minSurface}
            onChange={(e) => onUpdateFilters({ minSurface: e.target.value })}
            className="mt-1.5 h-11 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text placeholder:text-naya-muted/60 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}


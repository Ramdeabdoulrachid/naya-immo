"use client";

import React, { useState } from "react";
import { Palette, Type, Layers, ChevronDown, ChevronUp, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AGENCY_CONFIG } from "@/config/agency";

const COLOR_TOKENS = [
  {
    name: "Fond principal",
    hex: "#F7F8F5",
    variable: "--naya-bg",
    bgClass: "bg-naya-bg",
  },
  {
    name: "Fond surfaces",
    hex: "#FFFFFF",
    variable: "--naya-surface",
    bgClass: "bg-naya-surface",
  },
  {
    name: "Fond secondaire",
    hex: "#EDF1EB",
    variable: "--naya-surface-alt",
    bgClass: "bg-naya-surface-alt",
  },
  {
    name: "Vert profond",
    hex: "#214C3B",
    variable: "--naya-primary",
    bgClass: "bg-naya-primary",
  },
  {
    name: "Vert secondaire",
    hex: "#577D64",
    variable: "--naya-secondary",
    bgClass: "bg-naya-secondary",
  },
  {
    name: "Accent sable",
    hex: "#D9BD91",
    variable: "--naya-sand",
    bgClass: "bg-naya-sand",
  },
  {
    name: "Texte principal",
    hex: "#18231F",
    variable: "--naya-text",
    bgClass: "bg-naya-text",
  },
  {
    name: "Texte secondaire",
    hex: "#6D7871",
    variable: "--naya-muted",
    bgClass: "bg-naya-muted",
  },
  {
    name: "Bordures",
    hex: "#E4E9E3",
    variable: "--naya-border",
    bgClass: "bg-naya-border",
  },
];

export function DesignSystemPreview() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section
      aria-labelledby="design-system-heading"
      className="border-t border-naya-border bg-naya-surface-alt/60 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-naya-border bg-naya-surface p-4 shadow-2xs sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-naya-surface-alt px-2.5 py-1 text-xs font-semibold text-naya-primary">
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Étape 3 — Validation des fondations visuelles</span>
              </div>
              <h2
                id="design-system-heading"
                className="mt-2 font-heading text-xl font-bold text-naya-text sm:text-2xl"
              >
                Design System — NAYA IMMOBILIER
              </h2>
              <p className="mt-1 text-sm text-naya-muted">
                Direction artistique lumineuse, typographies Manrope & DM Sans,
                et composants calibrés mobile-first (zones tactiles 44–48 px).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-naya-border bg-naya-bg px-4 py-2 text-xs font-semibold text-naya-text transition-colors hover:bg-naya-surface-alt sm:self-center cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{isOpen ? "Masquer les tokens" : "Afficher les tokens"}</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>

          {isOpen && (
            <div className="mt-6 space-y-8 border-t border-naya-border pt-6">
              {/* 1. Palette de couleurs */}
              <div>
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-naya-muted">
                  <Palette
                    className="h-4 w-4 text-naya-primary"
                    aria-hidden="true"
                  />
                  <span>1. Palette chromatique</span>
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-9">
                  {COLOR_TOKENS.map((token) => (
                    <div
                      key={token.variable}
                      className="flex flex-col overflow-hidden rounded-xl border border-naya-border bg-naya-bg p-2"
                    >
                      <div
                        className={`h-11 w-full rounded-lg border border-black/10 ${token.bgClass}`}
                      />
                      <span className="mt-2 truncate text-xs font-semibold text-naya-text">
                        {token.name}
                      </span>
                      <span className="font-mono text-[11px] text-naya-muted">
                        {token.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Typographies & Hiérarchie */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-naya-border bg-naya-bg p-4 sm:p-5">
                  <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-naya-muted">
                    <Type
                      className="h-4 w-4 text-naya-primary"
                      aria-hidden="true"
                    />
                    <span>2. Typographies (Manrope & DM Sans)</span>
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-naya-muted">
                        Titre H1 / Manrope Bold
                      </span>
                      <p className="font-heading text-2xl font-bold text-naya-text sm:text-3xl">
                        Le bon bien, au bon endroit.
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-naya-muted">
                        Prix FCFA / Manrope ExtraBold
                      </span>
                      <p className="font-heading text-xl font-extrabold text-naya-primary">
                        125 000 000 FCFA · 165 000 FCFA / mois
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-naya-muted">
                        Corps de texte / DM Sans Regular
                      </span>
                      <p className="text-sm leading-relaxed text-naya-muted">
                        Une lecture fluide et aérée sur les smartphones Android
                        et iOS, pensée pour la consultation rapide des annonces
                        à Ouagadougou, Bobo-Dioulasso et Koudougou.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Boutons & Badges */}
                <div className="rounded-xl border border-naya-border bg-naya-bg p-4 sm:p-5">
                  <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-naya-muted">
                    <Layers
                      className="h-4 w-4 text-naya-primary"
                      aria-hidden="true"
                    />
                    <span>3. Boutons tactiles (48px) & Badges</span>
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <Button variant="primary" size="md">
                      Action principale
                    </Button>
                    <Button variant="outline" size="md">
                      Action secondaire
                    </Button>
                    <Button variant="sand" size="md">
                      Accent sable
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-naya-border pt-4">
                    <Badge variant="vente">À vendre</Badge>
                    <Badge variant="location">À louer</Badge>
                    <Badge variant="sand">Coup de cœur</Badge>
                    <Badge variant="nouveau">Nouveau</Badge>
                    <Badge variant="subtle">Exemple de démonstration</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mention légale de démonstration */}
          <div className="mt-6 flex flex-col gap-1 border-t border-naya-border pt-4 text-xs text-naya-muted sm:flex-row sm:items-center sm:justify-between">
            <p>{AGENCY_CONFIG.demoDisclaimer}</p>
            <p className="font-medium text-naya-text">
              {AGENCY_CONFIG.studioCredit}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


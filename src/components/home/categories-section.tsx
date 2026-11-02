"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Home, Building2, LandPlot, Store } from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/properties";
import { PropertyType } from "@/types/property";

interface CategoryCardItem {
  type: PropertyType;
  title: string;
  subtitle: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    type: "maison",
    title: "Maisons & Villas",
    subtitle: "Villas contemporaines, duplex et maisons familiales avec cour",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
    icon: Home,
  },
  {
    type: "appartement",
    title: "Appartements",
    subtitle: "Studios meublés et appartements ventilés en résidence",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    icon: Building2,
  },
  {
    type: "terrain",
    title: "Terrains",
    subtitle: "Parcelles résidentielles et commerciales délimitées",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    icon: LandPlot,
  },
  {
    type: "local-commercial",
    title: "Locaux commerciaux",
    subtitle: "Boutiques, plateaux de bureaux et showrooms sur axes passants",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    icon: Store,
  },
];

export function CategoriesSection() {
  const getCategoryCount = (type: PropertyType) =>
    DEMO_PROPERTIES.filter((p) => p.propertyType === type).length;

  return (
    <section
      aria-labelledby="categories-heading"
      className="border-t border-naya-border/60 bg-naya-surface-alt/50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-naya-primary">
              Parcourir par typologie
            </span>
            <h2
              id="categories-heading"
              className="mt-1.5 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl"
            >
              Explorer par catégorie
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-naya-muted sm:text-base">
              Sélectionnez le type de bien recherché pour accéder directement
              aux propriétés correspondantes dans le catalogue.
            </p>
          </div>
          <Link
            href="/biens"
            className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-xl border border-naya-border bg-naya-surface px-4 py-2 text-sm font-semibold text-naya-text transition-colors hover:border-naya-primary/40 hover:text-naya-primary sm:self-auto"
          >
            <span>Tout le catalogue</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {CATEGORIES.map((category, idx) => {
            const count = getCategoryCount(category.type);
            const Icon = category.icon;
            return (
              <motion.div
                key={category.type}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <Link
                  href={`/biens?type=${category.type}`}
                  className="group relative flex h-64 sm:h-72 flex-col justify-between overflow-hidden rounded-2xl border border-naya-border bg-naya-surface p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-naya-text/85 via-naya-text/35 to-naya-text/15 transition-opacity group-hover:from-naya-text/90"
                  />

                  {/* Haut de la carte catégorie */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-naya-surface/90 text-naya-primary backdrop-blur-xs">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-naya-surface/90 px-3 py-1 text-xs font-bold text-naya-text backdrop-blur-xs">
                      {count} bien{count > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Bas de la carte catégorie */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                        {category.title}
                      </h3>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-naya-sand text-naya-text transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/85 line-clamp-2">
                      {category.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


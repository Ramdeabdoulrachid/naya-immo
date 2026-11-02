"use client";

import React from "react";
import { motion } from "motion/react";
import {
  SearchCheck,
  LayoutList,
  MessageCircle,
  SlidersHorizontal,
  CalendarCheck2,
} from "lucide-react";

const ADVANTAGES = [
  {
    icon: SearchCheck,
    title: "Consultation simple des propriétés",
    description:
      "Chaque annonce présente l'essentiel dès le premier coup d'œil : photographies claires, prix en FCFA, superficie et localisation.",
  },
  {
    icon: LayoutList,
    title: "Informations organisées",
    description:
      "Les espaces intérieurs, les extérieurs et les équipements sont structurés proprement pour faciliter la comparaison entre plusieurs biens.",
  },
  {
    icon: SlidersHorizontal,
    title: "Recherche adaptée aux besoins",
    description:
      "Filtrez par transaction, type de bien, ville (Ouagadougou, Bobo-Dioulasso, Koudougou), budget en FCFA et nombre de pièces.",
  },
  {
    icon: MessageCircle,
    title: "Contact direct avec l'agence",
    description:
      "Échangez directement via WhatsApp avec un message prérempli reprenant les références exactes du bien qui vous intéresse.",
  },
  {
    icon: CalendarCheck2,
    title: "Accompagnement dans les demandes de visite",
    description:
      "Planifiez votre demande de créneau en quelques secondes depuis votre téléphone ou votre ordinateur.",
  },
];

export function WhyNayaSection() {
  return (
    <section
      id="pourquoi-naya"
      aria-labelledby="why-naya-heading"
      className="py-12 sm:py-16 lg:py-20 bg-naya-bg scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Colonne éditoriale gauche */}
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-naya-primary">
              Notre approche
            </span>
            <h2
              id="why-naya-heading"
              className="mt-2 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl"
            >
              Pourquoi choisir NAYA IMMOBILIER ?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-naya-muted sm:text-base">
              Nous avons conçu une plateforme lisible, rapide et accessible sur
              smartphone pour simplifier la recherche immobilière au Burkina
              Faso, sans jargon inutile.
            </p>
            <div className="mt-6 rounded-2xl border border-naya-border bg-naya-surface p-4 sm:p-5">
              <p className="font-heading text-sm font-bold text-naya-primary">
                « Le bon bien, au bon endroit. »
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-naya-muted">
                Une mise en relation transparente entre propriétaires,
                acheteurs et locataires à Ouagadougou, Bobo-Dioulasso et
                Koudougou.
              </p>
            </div>
          </div>

          {/* Grille asymétrique des avantages à droite */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {ADVANTAGES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={
                    idx === ADVANTAGES.length - 1
                      ? "sm:col-span-2 rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-6 shadow-2xs"
                      : "rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-6 shadow-2xs"
                  }
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-naya-surface-alt text-naya-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-naya-text sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-naya-muted">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


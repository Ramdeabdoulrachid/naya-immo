"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Compass, HeartHandshake, CalendarClock, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Compass,
    title: "Explorez les biens",
    description:
      "Utilisez les filtres par ville, transaction (achat ou location) et budget en FCFA pour parcourir les annonces correspondant à votre projet.",
  },
  {
    number: "02",
    icon: HeartHandshake,
    title: "Sélectionnez une propriété qui vous intéresse",
    description:
      "Consultez la galerie photos, les caractéristiques détaillées et sauvegardez vos biens préférés dans votre liste de favoris.",
  },
  {
    number: "03",
    icon: CalendarClock,
    title: "Contactez l'agence pour organiser une visite",
    description:
      "Remplissez votre demande de visite ou cliquez sur WhatsApp pour envoyer directement les références du bien à l'équipe NAYA.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-t border-naya-border/60 bg-naya-surface-alt/50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-naya-primary">
            Parcours simplifié
          </span>
          <h2
            id="how-it-works-heading"
            className="mt-2 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl"
          >
            Comment ça marche ?
          </h2>
          <p className="mt-2 text-sm text-naya-muted sm:text-base">
            Trois étapes claires pour passer de la découverte d&apos;une annonce
            à la demande de visite sur le terrain.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative flex flex-col justify-between rounded-2xl border border-naya-border bg-naya-surface p-6 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-naya-primary text-white">
                      <Icon
                        className="h-5 w-5 text-naya-sand"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-heading text-3xl font-extrabold text-naya-sand/70">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-bold text-naya-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-naya-muted">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-naya-border/60 pt-3">
                  <span className="text-xs font-semibold text-naya-secondary">
                    Étape {index + 1} sur 3
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/biens"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-naya-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-naya-primary-hover"
          >
            <span>Commencer l&apos;exploration</span>
            <ArrowRight
              className="h-4 w-4 text-naya-sand"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}


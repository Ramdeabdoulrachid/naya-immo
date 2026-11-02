"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "Comment demander une visite ?",
    answer:
      "Depuis la fiche détaillée d'un bien ou depuis la page Contact, cliquez sur « Demander une visite ». Le bien concerné est automatiquement sélectionné : indiquez vos coordonnées, la date et l'heure souhaitées ainsi que le nombre de personnes, puis envoyez le récapitulatif directement sur WhatsApp.",
  },
  {
    question: "Comment contacter l'agence ?",
    answer:
      "Vous pouvez contacter NAYA IMMOBILIER à tout moment via les boutons WhatsApp présents sur chaque fiche immobilière ou depuis la page Contact. Votre message est automatiquement structuré avec les informations du bien pour faciliter la prise en charge.",
  },
  {
    question: "Puis-je proposer ma maison à la vente ?",
    answer:
      "Oui. Cliquez sur « Proposer un bien » dans la barre de navigation ou sur la page Contact pour renseigner les caractéristiques de votre propriété (ville, quartier, superficie, prix souhaité en FCFA). Votre proposition est transmise à notre équipe pour étude avant toute mise en ligne.",
  },
  {
    question: "Comment consulter les prix ?",
    answer:
      "Tous les prix sont affichés directement en Francs CFA (FCFA) sur chaque carte immobilière ainsi que sur la fiche détaillée du bien (prix global pour une vente ou loyer mensuel pour une location).",
  },
  {
    question: "Les biens sont-ils disponibles immédiatement ?",
    answer:
      "Cette plateforme présente un catalogue de démonstration conçu pour illustrer l'expérience numérique de NAYA IMMOBILIER. Dans le cadre d'une exploitation réelle, l'envoi d'une demande de visite permet à l'équipe de vous recontacter pour confirmer le créneau et la disponibilité effective du bien.",
  },
  {
    question: "Comment obtenir plus de photos d'une propriété ?",
    answer:
      "Chaque fiche de bien intègre une galerie interactive que vous pouvez ouvrir en plein écran pour parcourir toutes les vues disponibles. Vous pouvez également demander des informations complémentaires via le bouton WhatsApp de la fiche.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-naya-border/60 bg-naya-surface-alt/40 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-naya-primary">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Questions fréquentes</span>
          </div>
          <h2
            id="faq-heading"
            className="mt-2 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl"
          >
            Tout savoir sur le fonctionnement de la plateforme
          </h2>
          <p className="mt-2 text-sm text-naya-muted sm:text-base">
            Des réponses claires pour vous accompagner dans vos recherches et
            vos démarches.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-naya-border bg-naya-surface transition-colors"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-sm font-bold text-naya-text sm:text-base cursor-pointer hover:bg-naya-surface-alt/40 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-naya-primary transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <div className="border-t border-naya-border/60 px-5 py-4 text-sm leading-relaxed text-naya-muted">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PlusCircle, CheckCircle2, Building } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OwnersCtaSection() {
  return (
    <section
      aria-labelledby="owners-cta-heading"
      className="py-12 sm:py-16 lg:py-20 bg-naya-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl bg-naya-primary p-6 text-white shadow-lg sm:p-10 lg:p-12"
        >
          {/* Halo décoratif sable */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-naya-sand/20 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-naya-sand">
                <Building className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Espace Propriétaires — Burkina Faso</span>
              </div>

              <h2
                id="owners-cta-heading"
                className="mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                Vous souhaitez vendre ou louer votre propriété ?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                Présentez votre bien et prenez contact avec notre équipe pour
                étudier sa mise en avant.
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/80 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-naya-sand"
                    aria-hidden="true"
                  />
                  Maisons, appartements, terrains & locaux
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-naya-sand"
                    aria-hidden="true"
                  />
                  Transmission rapide par WhatsApp
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-3 lg:col-span-4">
              <Link
                href="/contact?sujet=proposer-un-bien#formulaire-proprietaire"
                className={cn(
                  buttonVariants({ variant: "sand", size: "lg" }),
                  "w-full sm:w-auto justify-center px-7 text-base"
                )}
              >
                <PlusCircle className="h-5 w-5" aria-hidden="true" />
                <span>Proposer mon bien</span>
              </Link>
              <span className="text-center text-xs text-white/70 lg:text-right">
                Publication après vérification par notre équipe
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


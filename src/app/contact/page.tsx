"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  PlusCircle,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { AGENCY_CONFIG } from "@/config/agency";
import { getWhatsappUrl } from "@/lib/whatsapp";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import { OwnerSubmissionForm } from "@/components/forms/owner-submission-form";
import { cn } from "@/lib/utils";

type ContactTab = "visite" | "proprietaire";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ContactTab>("visite");

  useEffect(() => {
    const sujet = searchParams.get("sujet");
    if (sujet === "proposer-un-bien") {
      setActiveTab("proprietaire");
    } else if (sujet === "visite") {
      setActiveTab("visite");
    }
  }, [searchParams]);

  const directWhatsappUrl = getWhatsappUrl(
    `Bonjour ${AGENCY_CONFIG.name}, je souhaite prendre contact avec votre équipe.`
  );

  return (
    <div className="bg-naya-bg py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de la page Contact */}
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-naya-primary">
            Contact & Accompagnement
          </span>
          <h1 className="mt-1.5 font-heading text-2xl font-bold tracking-tight text-naya-text sm:text-3xl lg:text-4xl">
            Prenez contact avec NAYA IMMOBILIER
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-naya-muted sm:text-base">
            Planifiez une demande de visite pour un bien du catalogue ou
            proposez votre propriété à vendre ou à louer au Burkina Faso.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Colonne gauche : Coordonnées & WhatsApp direct (4 col) */}
          <div className="space-y-5 lg:col-span-4">
            <div className="rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-6 shadow-2xs space-y-5">
              <div>
                <h2 className="font-heading text-lg font-bold text-naya-text">
                  Nos coordonnées
                </h2>
                <p className="mt-1 text-xs text-naya-muted">
                  Échangez simplement avec notre équipe sur WhatsApp ou via les
                  formulaires dédiés.
                </p>
              </div>

              <div className="space-y-4 border-t border-naya-border pt-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-naya-surface-alt text-naya-primary">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-naya-muted">
                      Zones couvertes
                    </span>
                    <strong className="font-medium text-naya-text">
                      {AGENCY_CONFIG.contact.generalLocation}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-naya-surface-alt text-naya-primary">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-naya-muted">
                      Horaires d&apos;accueil
                    </span>
                    <strong className="font-medium text-naya-text">
                      {AGENCY_CONFIG.contact.officeHours}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="border-t border-naya-border pt-4">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-naya-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-naya-primary-hover"
                >
                  <MessageCircle
                    className="h-4 w-4 text-naya-sand"
                    aria-hidden="true"
                  />
                  <span>Discussion directe sur WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 opacity-80" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-naya-border bg-naya-surface-alt/70 p-4 text-xs leading-relaxed text-naya-muted">
              <p className="flex items-start gap-2">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-naya-primary"
                  aria-hidden="true"
                />
                <span>{AGENCY_CONFIG.demoDisclaimer}</span>
              </p>
            </div>
          </div>

          {/* Colonne droite : Formulaires à onglets (un seul formulaire par écran logique, Section 17G) */}
          <div
            id="formulaire-proprietaire"
            className="lg:col-span-8 rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-8 shadow-2xs"
          >
            {/* Sélecteur d'onglets tactile */}
            <div
              role="tablist"
              aria-label="Choisir le type de demande"
              className="grid grid-cols-1 gap-2 rounded-xl bg-naya-surface-alt p-1.5 sm:grid-cols-2"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "visite"}
                onClick={() => setActiveTab("visite")}
                className={cn(
                  "flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer",
                  activeTab === "visite"
                    ? "bg-naya-primary text-white shadow-xs"
                    : "text-naya-muted hover:text-naya-text"
                )}
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Demander une visite</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "proprietaire"}
                onClick={() => setActiveTab("proprietaire")}
                className={cn(
                  "flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer",
                  activeTab === "proprietaire"
                    ? "bg-naya-primary text-white shadow-xs"
                    : "text-naya-muted hover:text-naya-text"
                )}
              >
                <PlusCircle className="h-4 w-4" aria-hidden="true" />
                <span>Proposer mon bien (Propriétaire)</span>
              </button>
            </div>

            {/* Contenu du formulaire actif */}
            <div className="mt-6">
              {activeTab === "visite" ? (
                <div>
                  <div className="mb-5 border-b border-naya-border pb-4">
                    <h2 className="font-heading text-lg font-bold text-naya-text sm:text-xl">
                      Planifier une demande de visite
                    </h2>
                    <p className="mt-1 text-xs text-naya-muted sm:text-sm">
                      Sélectionnez le bien qui vous intéresse, indiquez vos
                      disponibilités et générez votre demande WhatsApp.
                    </p>
                  </div>
                  <VisitRequestForm />
                </div>
              ) : (
                <div>
                  <div className="mb-5 border-b border-naya-border pb-4">
                    <h2 className="font-heading text-lg font-bold text-naya-text sm:text-xl">
                      Soumettre une propriété à l&apos;agence
                    </h2>
                    <p className="mt-1 text-xs text-naya-muted sm:text-sm">
                      Vous êtes propriétaire à Ouagadougou, Bobo-Dioulasso ou
                      Koudougou ? Présentez votre bien pour étudier sa mise en
                      avant.
                    </p>
                  </div>
                  <OwnerSubmissionForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-10 w-64 animate-pulse rounded-xl bg-naya-surface-alt" />
          <div className="mt-8 h-96 animate-pulse rounded-2xl bg-naya-surface-alt" />
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}


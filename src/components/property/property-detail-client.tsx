"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Heart,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
  Info,
} from "lucide-react";
import { Property } from "@/types/property";
import {
  AGENCY_CONFIG,
  PROPERTY_TYPE_LABELS,
  TRANSACTION_LABELS,
} from "@/config/agency";
import { formatFCFA } from "@/lib/currency";
import {
  buildDirectPropertyWhatsappMessage,
  getWhatsappUrl,
} from "@/lib/whatsapp";
import { useFavorites } from "@/hooks/use-favorites";
import { PropertyGallery } from "@/components/gallery/property-gallery";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import { PropertyCard } from "@/components/property/property-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyDetailClientProps {
  property: Property;
  similarProperties: Property[];
}

export function PropertyDetailClient({
  property,
  similarProperties,
}: PropertyDetailClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(property.id);
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  useEffect(() => {
    if (visitModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visitModalOpen]);

  const formattedPrice = formatFCFA(property.price, {
    transactionType: property.transactionType,
    showPeriod: false,
  });

  const directWhatsappUrl = getWhatsappUrl(
    buildDirectPropertyWhatsappMessage(property)
  );

  // Recherche Google Maps générale par quartier et ville sans coordonnées GPS inventées
  const mapsSearchQuery = encodeURIComponent(
    `${property.neighborhood ? `${property.neighborhood}, ` : ""}${property.city}, Burkina Faso`
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsSearchQuery}`;

  return (
    <div className="bg-naya-bg pb-24 pt-4 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Fil d'Ariane / Retour au catalogue */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/biens"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-naya-border bg-naya-surface px-4 py-2 text-sm font-semibold text-naya-text transition-colors hover:border-naya-primary/40 hover:text-naya-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Retour au catalogue</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-lg bg-naya-surface-alt px-3 py-1.5 text-xs font-medium text-naya-muted">
            <Info className="h-3.5 w-3.5 text-naya-primary" aria-hidden="true" />
            <span>{property.demoStatus}</span>
          </span>
        </div>

        {/* Galerie photographique interactive */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* Grille Principale : Informations détaillées (8 col) + Panneau de contact sticky (4 col) */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Colonne Gauche : Caractéristiques & Description */}
          <div className="space-y-8 lg:col-span-8">
            {/* En-tête de la propriété */}
            <div className="rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-7 shadow-2xs">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    property.transactionType === "vente" ? "vente" : "location"
                  }
                >
                  {TRANSACTION_LABELS[property.transactionType]}
                </Badge>
                <Badge variant="subtle">
                  {PROPERTY_TYPE_LABELS[property.propertyType]}
                </Badge>
                {property.badge && (
                  <Badge
                    variant={
                      property.badge === "Coup de cœur" ? "sand" : "nouveau"
                    }
                  >
                    {property.badge === "Coup de cœur" && (
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                    )}
                    {property.badge}
                  </Badge>
                )}
              </div>

              <h1 className="mt-3 font-heading text-2xl font-bold leading-snug text-naya-text sm:text-3xl">
                {property.title}
              </h1>

              <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-naya-muted">
                <MapPin
                  className="h-4 w-4 shrink-0 text-naya-primary"
                  aria-hidden="true"
                />
                <span>
                  {property.city}
                  {property.neighborhood ? ` · Quartier ${property.neighborhood}` : ""}
                  , Burkina Faso
                </span>
              </div>

              {/* Prix visible immédiatement sur mobile et desktop */}
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4 border-t border-naya-border pt-4">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-naya-muted">
                    {property.transactionType === "location"
                      ? "Loyer mensuel"
                      : "Prix de vente affiché"}
                  </span>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <span className="font-heading text-2xl font-extrabold text-naya-primary sm:text-3xl">
                      {formattedPrice}
                    </span>
                    {property.transactionType === "location" && (
                      <span className="text-sm font-medium text-naya-muted">
                        / mois
                      </span>
                    )}
                  </div>
                </div>

                {/* Bouton Favoris accessible sur mobile */}
                <Button
                  type="button"
                  variant={liked ? "primary" : "outline"}
                  size="md"
                  onClick={() => toggleFavorite(property.id)}
                  className="lg:hidden"
                >
                  <Heart
                    className={cn("h-4 w-4", liked && "fill-white")}
                    aria-hidden="true"
                  />
                  <span>{liked ? "Dans vos favoris" : "Sauvegarder"}</span>
                </Button>
              </div>

              {/* Barre des chiffres clés */}
              <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-naya-surface-alt/70 p-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-naya-surface text-naya-primary">
                    <Maximize2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs text-naya-muted">
                      Superficie
                    </span>
                    <strong className="font-heading text-sm font-bold text-naya-text sm:text-base">
                      {property.surface} m²
                    </strong>
                  </div>
                </div>

                {property.bedrooms !== undefined && property.bedrooms > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-naya-surface text-naya-primary">
                      <BedDouble className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs text-naya-muted">
                        Chambres
                      </span>
                      <strong className="font-heading text-sm font-bold text-naya-text sm:text-base">
                        {property.bedrooms} chambre
                        {property.bedrooms > 1 ? "s" : ""}
                      </strong>
                    </div>
                  </div>
                )}

                {property.bathrooms !== undefined && property.bathrooms > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-naya-surface text-naya-primary">
                      <Bath className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs text-naya-muted">
                        Salles d&apos;eau
                      </span>
                      <strong className="font-heading text-sm font-bold text-naya-text sm:text-base">
                        {property.bathrooms} salle
                        {property.bathrooms > 1 ? "s" : ""} d&apos;eau
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description détaillée */}
            <div className="rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-7 shadow-2xs space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-naya-text">
                  Présentation du bien
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-naya-text sm:text-base">
                  {property.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-naya-muted sm:text-base">
                  {property.detailedDescription.intro}
                </p>
              </div>

              {/* Atouts principaux (badges) */}
              {property.features.length > 0 && (
                <div className="border-t border-naya-border pt-5">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-naya-muted">
                    Caractéristiques principales
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {property.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-naya-border bg-naya-bg px-3 py-1.5 text-xs font-semibold text-naya-text"
                      >
                        <CheckCircle2
                          className="h-3.5 w-3.5 text-naya-primary"
                          aria-hidden="true"
                        />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Espaces intérieurs */}
              {property.detailedDescription.interiorSpaces.length > 0 && (
                <div className="border-t border-naya-border pt-5">
                  <h3 className="font-heading text-base font-bold text-naya-text">
                    Espaces intérieurs
                  </h3>
                  <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {property.detailedDescription.interiorSpaces.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-naya-muted"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-naya-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Espaces extérieurs */}
              {property.detailedDescription.exteriorSpaces.length > 0 && (
                <div className="border-t border-naya-border pt-5">
                  <h3 className="font-heading text-base font-bold text-naya-text">
                    Espaces extérieurs
                  </h3>
                  <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {property.detailedDescription.exteriorSpaces.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-naya-muted"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-naya-secondary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Équipements disponibles */}
              {property.detailedDescription.amenities.length > 0 && (
                <div className="border-t border-naya-border pt-5">
                  <h3 className="font-heading text-base font-bold text-naya-text">
                    Équipements disponibles
                  </h3>
                  <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {property.detailedDescription.amenities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-naya-muted"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-naya-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Particularités */}
              {property.detailedDescription.particularities && (
                <div className="rounded-xl bg-naya-surface-alt/80 p-4 text-xs leading-relaxed text-naya-muted">
                  <strong className="font-semibold text-naya-text">
                    Note :{" "}
                  </strong>
                  {property.detailedDescription.particularities}
                </div>
              )}
            </div>

            {/* Bloc Localisation générale */}
            <div className="rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-7 shadow-2xs">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-lg font-bold text-naya-text">
                    Localisation générale
                  </h2>
                  <p className="mt-1 text-sm text-naya-muted">
                    {property.neighborhood
                      ? `Secteur / Quartier ${property.neighborhood}, ${property.city}`
                      : `Ville de ${property.city}`}
                    , Burkina Faso
                  </p>
                  <p className="mt-1 text-xs text-naya-muted">
                    Pour des raisons de confidentialité et de démonstration,
                    seule la zone générale est indiquée.
                  </p>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-naya-border bg-naya-bg px-4 py-2.5 text-xs font-semibold text-naya-text transition-colors hover:border-naya-primary/40 hover:text-naya-primary"
                >
                  <MapPin
                    className="h-4 w-4 text-naya-primary"
                    aria-hidden="true"
                  />
                  <span>Situer le quartier sur Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-75" />
                </a>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Panneau de contact sticky (Desktop) & Formulaire intégré */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-naya-border bg-naya-surface p-5 sm:p-6 shadow-sm">
              <div className="border-b border-naya-border pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-naya-muted">
                  {property.transactionType === "location"
                    ? "Loyer mensuel"
                    : "Prix affiché"}
                </span>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl font-extrabold text-naya-primary">
                    {formattedPrice}
                  </span>
                  {property.transactionType === "location" && (
                    <span className="text-sm font-medium text-naya-muted">
                      / mois
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => setVisitModalOpen(true)}
                  className="w-full"
                >
                  <Calendar
                    className="h-4 w-4 text-naya-sand"
                    aria-hidden="true"
                  />
                  <span>Demander une visite</span>
                </Button>

                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-naya-primary/30 bg-naya-surface-alt px-5 py-3 text-sm font-semibold text-naya-primary transition-colors hover:bg-naya-primary hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Contacter sur WhatsApp</span>
                </a>

                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => toggleFavorite(property.id)}
                  className="w-full"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      liked && "fill-naya-primary text-naya-primary"
                    )}
                    aria-hidden="true"
                  />
                  <span>
                    {liked
                      ? "Retirer de mes favoris"
                      : "Ajouter à mes favoris"}
                  </span>
                </Button>
              </div>

              <p className="mt-4 text-center text-xs leading-relaxed text-naya-muted">
                {AGENCY_CONFIG.demoDisclaimer}
              </p>
            </div>
          </aside>
        </div>

        {/* Biens similaires */}
        {similarProperties.length > 0 && (
          <section
            aria-labelledby="similar-properties-heading"
            className="mt-14 border-t border-naya-border pt-10"
          >
            <h2
              id="similar-properties-heading"
              className="font-heading text-xl font-bold text-naya-text sm:text-2xl"
            >
              Autres biens susceptibles de vous intéresser
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarProperties.map((sim) => (
                <PropertyCard key={sim.id} property={sim} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Barre d'action fixe en bas sur MOBILE (< lg) conforme au cahier des charges */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-naya-border bg-naya-surface/95 px-4 pt-3 pb-safe backdrop-blur-md shadow-[0_-6px_24px_-10px_rgba(24,35,31,0.12)] lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-[11px] font-medium text-naya-muted">
              {property.transactionType === "location"
                ? "Loyer mensuel"
                : "Prix affiché"}
            </span>
            <p className="truncate font-heading text-base font-extrabold text-naya-primary sm:text-lg">
              {formattedPrice}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter sur WhatsApp"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-naya-primary/30 bg-naya-surface-alt text-naya-primary"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => setVisitModalOpen(true)}
              className="px-5 text-sm font-semibold"
            >
              <Calendar
                className="h-4 w-4 text-naya-sand"
                aria-hidden="true"
              />
              <span>Visiter</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modale de Demande de Visite avec le bien prérempli */}
      <AnimatePresence>
        {visitModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setVisitModalOpen(false)}
              className="fixed inset-0 z-50 bg-naya-text/50 backdrop-blur-xs"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="visit-modal-title"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-naya-surface p-5 shadow-2xl sm:inset-y-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-naya-border pb-4">
                <div>
                  <h2
                    id="visit-modal-title"
                    className="font-heading text-lg font-bold text-naya-text sm:text-xl"
                  >
                    Demander une visite
                  </h2>
                  <p className="text-xs text-naya-muted">
                    Complétez vos informations pour générer votre demande sur
                    WhatsApp
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setVisitModalOpen(false)}
                  aria-label="Fermer la fenêtre de demande de visite"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-naya-border bg-naya-bg text-naya-text hover:bg-naya-surface-alt cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 pb-safe">
                <VisitRequestForm preselectedProperty={property} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


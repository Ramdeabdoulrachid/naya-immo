import React from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  MessageCircle,
  Clock,
  Info,
  ArrowUpRight,
} from "lucide-react";
import { AGENCY_CONFIG } from "@/config/agency";
import { getWhatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  const generalWhatsappUrl = getWhatsappUrl(
    `Bonjour ${AGENCY_CONFIG.name}, je souhaite obtenir des renseignements sur vos biens immobiliers au Burkina Faso.`
  );

  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-naya-border bg-naya-surface text-naya-text"
    >
      <h2 id="footer-heading" className="sr-only">
        Pied de page NAYA IMMOBILIER
      </h2>

      {/* Bandeau d'information de démonstration */}
      <div className="border-b border-naya-border bg-naya-surface-alt/75">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3.5 text-xs text-naya-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="flex items-start gap-2 sm:items-center">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-naya-primary sm:mt-0"
              aria-hidden="true"
            />
            <span>{AGENCY_CONFIG.demoDisclaimer}</span>
          </p>
          <span className="font-medium text-naya-text">
            {AGENCY_CONFIG.studioCredit}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Colonne 1 : Identité & Positionnement */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="NAYA IMMOBILIER — Accueil"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-naya-primary text-white">
                <Building2
                  className="h-5 w-5 text-naya-sand"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold tracking-tight text-naya-text leading-none">
                  NAYA{" "}
                  <span className="font-medium text-naya-primary">
                    IMMOBILIER
                  </span>
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-naya-muted leading-none">
                  Burkina Faso
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-naya-muted">
              {AGENCY_CONFIG.description}
            </p>

            <p className="mt-3 font-heading text-sm font-semibold text-naya-primary">
              « {AGENCY_CONFIG.tagline} »
            </p>

            <div className="mt-5">
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-naya-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-naya-primary-hover"
              >
                <MessageCircle
                  className="h-4 w-4 text-naya-sand"
                  aria-hidden="true"
                />
                <span>Écrire sur WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-naya-text">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/biens"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Catalogue complet
                </Link>
              </li>
              <li>
                <Link
                  href="/biens?transaction=vente"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Acheter un bien
                </Link>
              </li>
              <li>
                <Link
                  href="/biens?transaction=location"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Louer un bien
                </Link>
              </li>
              <li>
                <Link
                  href="/favoris"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Mes favoris
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Contact & Visites
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Catégories & Villes */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-naya-text">
              Catégories & Zones
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/biens?type=maison"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Maisons & Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/biens?type=appartement"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Appartements & Studios
                </Link>
              </li>
              <li>
                <Link
                  href="/biens?type=terrain"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Terrains résidentiels & commerciaux
                </Link>
              </li>
              <li>
                <Link
                  href="/biens?type=local-commercial"
                  className="text-naya-muted transition-colors hover:text-naya-primary"
                >
                  Locaux commerciaux
                </Link>
              </li>
              <li className="pt-2 border-t border-naya-border/70">
                <span className="block text-xs font-semibold text-naya-text">
                  Villes de démonstration :
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {AGENCY_CONFIG.cities.map((city) => (
                    <Link
                      key={city}
                      href={`/biens?city=${encodeURIComponent(city)}`}
                      className="rounded-md bg-naya-surface-alt px-2 py-1 text-xs font-medium text-naya-text transition-colors hover:bg-naya-primary hover:text-white"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact & Réseaux configurables */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-naya-text">
              Contact & Informations
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-naya-muted">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-naya-primary"
                  aria-hidden="true"
                />
                <span>{AGENCY_CONFIG.contact.generalLocation}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-naya-primary"
                  aria-hidden="true"
                />
                <span>{AGENCY_CONFIG.contact.officeHours}</span>
              </li>
            </ul>

            <div className="mt-5 rounded-xl border border-naya-border bg-naya-bg p-3.5">
              <p className="text-xs font-semibold text-naya-text">
                Vous êtes propriétaire ?
              </p>
              <p className="mt-1 text-xs text-naya-muted">
                Soumettez votre maison, terrain ou local à notre équipe.
              </p>
              <Link
                href="/contact?sujet=proposer-un-bien"
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-naya-primary hover:underline"
              >
                <span>Proposer un bien</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Réseaux sociaux : non présentés comme actifs tant qu'ils ne sont pas configurés */}
            <div className="mt-4">
              <p className="text-[11px] text-naya-muted">
                Réseaux sociaux : configurables dans{" "}
                <code className="rounded bg-naya-surface-alt px-1 py-0.5 text-[10px] text-naya-text">
                  src/config/agency.ts
                </code>
              </p>
            </div>
          </div>
        </div>

        {/* Bas de footer : Copyright */}
        <div className="mt-10 flex flex-col gap-2 border-t border-naya-border pt-6 text-xs text-naya-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {AGENCY_CONFIG.name}. Tous droits
            réservés.
          </p>
          <p>{AGENCY_CONFIG.studioCredit}</p>
        </div>
      </div>
    </footer>
  );
}


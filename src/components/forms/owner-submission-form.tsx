"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Phone,
  MapPin,
  Home,
  Wallet,
  Maximize2,
  Clock,
  MessageCircle,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import {
  AGENCY_CONFIG,
  PROPERTY_TYPE_LABELS,
  TRANSACTION_LABELS,
} from "@/config/agency";
import { buildOwnerWhatsappMessage, getWhatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

const ownerSchema = z.object({
  ownerName: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer votre nom complet (au moins 2 caractères)."),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+]?[\d\s()-]{8,20}$/,
      "Veuillez saisir un numéro de téléphone valide (au moins 8 chiffres)."
    ),
  city: z.string().min(1, "Veuillez sélectionner la ville du bien."),
  neighborhood: z
    .string()
    .trim()
    .min(2, "Veuillez préciser le quartier ou secteur du bien."),
  propertyType: z.string().min(1, "Veuillez choisir le type de bien."),
  transactionType: z
    .string()
    .min(1, "Veuillez choisir le type de transaction."),
  desiredPrice: z
    .string()
    .trim()
    .min(1, "Veuillez indiquer le prix souhaité en FCFA.")
    .refine(
      (val) => !Number.isNaN(Number(val.replace(/\s/g, ""))) && Number(val.replace(/\s/g, "")) > 0,
      "Le prix souhaité doit être un montant positif."
    ),
  surface: z
    .string()
    .trim()
    .min(1, "Veuillez indiquer la superficie en m².")
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) > 0,
      "La superficie doit être un nombre positif."
    ),
  availability: z
    .string()
    .min(1, "Veuillez préciser votre disponibilité pour être recontacté."),
  description: z
    .string()
    .trim()
    .min(
      15,
      "Veuillez décrire brièvement votre bien (au moins 15 caractères)."
    )
    .max(1000, "Maximum 1000 caractères."),
});

type OwnerFormValues = z.infer<typeof ownerSchema>;

export function OwnerSubmissionForm() {
  const [submittedWhatsappText, setSubmittedWhatsappText] = useState<
    string | null
  >(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      ownerName: "",
      phone: "",
      city: "Ouagadougou",
      neighborhood: "",
      propertyType: "Maison",
      transactionType: "À vendre",
      desiredPrice: "",
      surface: "",
      availability: "En matinée (08h00 – 12h00)",
      description: "",
    },
  });

  const onSubmit = (values: OwnerFormValues) => {
    const formattedPrice = Number(values.desiredPrice.replace(/\s/g, ""))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const message = buildOwnerWhatsappMessage({
      ownerName: values.ownerName,
      phone: values.phone,
      city: values.city,
      neighborhood: values.neighborhood,
      propertyType: values.propertyType,
      transactionType: values.transactionType,
      desiredPrice: formattedPrice,
      surface: values.surface,
      description: values.description,
      availability: values.availability,
    });

    setSubmittedWhatsappText(message);
  };

  const handleCopy = async () => {
    if (!submittedWhatsappText) return;
    try {
      await navigator.clipboard.writeText(submittedWhatsappText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore
    }
  };

  if (submittedWhatsappText) {
    const whatsappUrl = getWhatsappUrl(submittedWhatsappText);

    return (
      <div className="rounded-2xl border border-naya-primary/30 bg-naya-surface p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-naya-primary text-white">
            <CheckCircle2
              className="h-5 w-5 text-naya-sand"
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-naya-text">
              Proposition prête à être envoyée
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-naya-muted">
              La soumission d&apos;un bien n&apos;entraîne pas sa publication
              automatique : chaque annonce est vérifiée et validée par notre
              équipe avant mise en ligne.
            </p>
          </div>
        </div>

        <pre className="mt-4 max-h-60 overflow-y-auto whitespace-pre-wrap rounded-xl border border-naya-border bg-naya-bg p-4 font-sans text-xs leading-relaxed text-naya-text">
          {submittedWhatsappText}
        </pre>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-naya-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-naya-primary-hover"
          >
            <MessageCircle
              className="h-4 w-4 text-naya-sand"
              aria-hidden="true"
            />
            <span>Envoyer ma proposition sur WhatsApp</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleCopy}
            className="sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-naya-primary" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copier le texte</span>
              </>
            )}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setSubmittedWhatsappText(null)}
          className="mt-4 text-xs font-semibold text-naya-muted underline hover:text-naya-text cursor-pointer"
        >
          Modifier les informations du bien
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-label="Formulaire de proposition de bien pour les propriétaires"
    >
      {/* Nom du propriétaire & Téléphone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="owner-name"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <User className="h-3.5 w-3.5 text-naya-primary" aria-hidden="true" />
            <span>Nom du propriétaire *</span>
          </label>
          <input
            id="owner-name"
            type="text"
            autoComplete="name"
            placeholder="Ex: Fatimata Sawadogo"
            {...register("ownerName")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.ownerName && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.ownerName.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="owner-phone"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Phone
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Téléphone (WhatsApp) *</span>
          </label>
          <input
            id="owner-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ex: +226 70 00 00 00"
            {...register("phone")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.phone && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.phone.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Ville & Quartier */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="owner-city"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <MapPin
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Ville *</span>
          </label>
          <select
            id="owner-city"
            {...register("city")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          >
            {AGENCY_CONFIG.cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.city.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="owner-neighborhood"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <MapPin
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Quartier / Secteur *</span>
          </label>
          <input
            id="owner-neighborhood"
            type="text"
            placeholder="Ex: Ouaga 2000, Sarfalao, Secteur 1..."
            {...register("neighborhood")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.neighborhood && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.neighborhood.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Type de bien & Transaction */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="owner-property-type"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Home
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Type de bien *</span>
          </label>
          <select
            id="owner-property-type"
            {...register("propertyType")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          >
            {Object.values(PROPERTY_TYPE_LABELS).map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="owner-transaction"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <span>Transaction souhaitée *</span>
          </label>
          <select
            id="owner-transaction"
            {...register("transactionType")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          >
            {Object.values(TRANSACTION_LABELS).map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prix souhaité en FCFA & Superficie en m² */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="owner-price"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Wallet
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Prix souhaité (FCFA) *</span>
          </label>
          <input
            id="owner-price"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="Ex: 45000000 ou 200000"
            {...register("desiredPrice")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.desiredPrice && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.desiredPrice.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="owner-surface"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Maximize2
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Superficie (m²) *</span>
          </label>
          <input
            id="owner-surface"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="Ex: 300"
            {...register("surface")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.surface && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.surface.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Disponibilité pour être recontacté */}
      <div>
        <label
          htmlFor="owner-availability"
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
        >
          <Clock
            className="h-3.5 w-3.5 text-naya-primary"
            aria-hidden="true"
          />
          <span>Disponibilité pour être contacté *</span>
        </label>
        <select
          id="owner-availability"
          {...register("availability")}
          className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
        >
          <option value="En matinée (08h00 – 12h00)">
            En matinée (08h00 – 12h00)
          </option>
          <option value="L'après-midi (14h00 – 18h00)">
            L&apos;après-midi (14h00 – 18h00)
          </option>
          <option value="Toute la journée (08h00 – 18h00)">
            Toute la journée (08h00 – 18h00)
          </option>
          <option value="Le samedi uniquement">Le samedi uniquement</option>
        </select>
      </div>

      {/* Description du bien */}
      <div>
        <label
          htmlFor="owner-description"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-naya-muted"
        >
          Description du bien (nombre de pièces, atouts, état général) *
        </label>
        <textarea
          id="owner-description"
          rows={4}
          placeholder="Décrivez votre propriété : nombre de chambres, équipements, accès, particularités..."
          {...register("description")}
          className="w-full rounded-xl border border-naya-border bg-naya-bg p-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
        />
        {errors.description && (
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{errors.description.message}</span>
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full text-base"
      >
        <MessageCircle
          className="h-5 w-5 text-naya-sand"
          aria-hidden="true"
        />
        <span>Générer ma proposition propriétaire WhatsApp</span>
      </Button>

      <p className="text-center text-xs text-naya-muted">
        La publication sur la plateforme reste soumise à l&apos;étude et à la
        validation humaine de notre équipe.
      </p>
    </form>
  );
}


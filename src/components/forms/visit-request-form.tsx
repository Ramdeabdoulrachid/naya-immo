"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  User,
  MessageCircle,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Building2,
  ExternalLink,
} from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/properties";
import { Property } from "@/types/property";
import { formatFCFA } from "@/lib/currency";
import { buildVisitWhatsappMessage, getWhatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const todayIsoString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const visitSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Veuillez renseigner votre nom complet (au moins 2 caractères)."),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+]?[\d\s()-]{8,20}$/,
      "Veuillez saisir un numéro de téléphone valide (au moins 8 chiffres, ex: 70 00 00 00)."
    ),
  propertyId: z.string().min(1, "Veuillez sélectionner le bien concerné."),
  desiredDate: z
    .string()
    .min(1, "Veuillez choisir une date souhaitée.")
    .refine((val) => {
      const today = todayIsoString();
      return val >= today;
    }, "La date de visite ne peut pas être dans le passé."),
  desiredTime: z.string().min(1, "Veuillez sélectionner une heure souhaitée."),
  visitorsCount: z.coerce
    .number({
      invalid_type_error: "Veuillez indiquer un nombre valide.",
    })
    .int("Le nombre de personnes doit être un nombre entier.")
    .min(1, "Le nombre de personnes doit être d'au moins 1.")
    .max(15, "Maximum 15 personnes par visite."),
  message: z.string().max(600, "Maximum 600 caractères.").optional(),
});

type VisitFormValues = z.infer<typeof visitSchema>;

interface VisitRequestFormProps {
  preselectedProperty?: Property;
  onSuccess?: () => void;
}

export function VisitRequestForm({
  preselectedProperty,
}: VisitRequestFormProps) {
  const [submittedWhatsappText, setSubmittedWhatsappText] = useState<
    string | null
  >(null);
  const [copied, setCopied] = useState(false);

  const minDate = useMemo(() => todayIsoString(), []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      propertyId: preselectedProperty?.id ?? DEMO_PROPERTIES[0]?.id ?? "",
      desiredDate: "",
      desiredTime: "10:00",
      visitorsCount: 1,
      message: "",
    },
  });

  const selectedPropertyId = watch("propertyId");
  const selectedProperty = useMemo(
    () =>
      DEMO_PROPERTIES.find((p) => p.id === selectedPropertyId) ??
      preselectedProperty,
    [selectedPropertyId, preselectedProperty]
  );

  const onSubmit = (values: VisitFormValues) => {
    const prop =
      DEMO_PROPERTIES.find((p) => p.id === values.propertyId) ??
      preselectedProperty;

    const priceText = prop
      ? formatFCFA(prop.price, {
          transactionType: prop.transactionType,
          showPeriod: true,
        })
      : undefined;

    const whatsappMessage = buildVisitWhatsappMessage({
      fullName: values.fullName,
      phone: values.phone,
      propertyTitle: prop ? prop.title : values.propertyId,
      propertyCity: prop
        ? `${prop.city}${prop.neighborhood ? ` (${prop.neighborhood})` : ""}`
        : undefined,
      propertyPrice: priceText,
      desiredDate: values.desiredDate,
      desiredTime: values.desiredTime,
      visitorsCount: values.visitorsCount,
      message: values.message,
    });

    setSubmittedWhatsappText(whatsappMessage);
  };

  const handleCopyMessage = async () => {
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
            <CheckCircle2 className="h-5 w-5 text-naya-sand" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-naya-text">
              Récapitulatif de votre demande de visite
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-naya-muted">
              L&apos;envoi d&apos;une demande n&apos;est pas une confirmation
              automatique de visite. Cliquez ci-dessous pour transmettre ce
              récapitulatif sur WhatsApp à notre équipe.
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
            <span>Ouvrir WhatsApp avec ce message</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleCopyMessage}
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
          Modifier les informations de la demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-label="Formulaire de demande de visite"
    >
      {/* Bien concerné (prérempli automatiquement depuis la fiche) */}
      <div>
        <label
          htmlFor="visit-property-select"
          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
        >
          <Building2
            className="h-3.5 w-3.5 text-naya-primary"
            aria-hidden="true"
          />
          <span>Bien concerné *</span>
        </label>
        <select
          id="visit-property-select"
          {...register("propertyId")}
          disabled={Boolean(preselectedProperty)}
          className={cn(
            "h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm font-medium text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none",
            preselectedProperty && "bg-naya-surface-alt/80 cursor-not-allowed"
          )}
        >
          {DEMO_PROPERTIES.map((prop) => (
            <option key={prop.id} value={prop.id}>
              {prop.title} — {prop.city} (
              {formatFCFA(prop.price, {
                transactionType: prop.transactionType,
                showPeriod: true,
              })}
              )
            </option>
          ))}
        </select>
        {selectedProperty && (
          <p className="mt-1 text-xs text-naya-secondary font-medium">
            Localisation : {selectedProperty.city}
            {selectedProperty.neighborhood
              ? ` · ${selectedProperty.neighborhood}`
              : ""}{" "}
            —{" "}
            {formatFCFA(selectedProperty.price, {
              transactionType: selectedProperty.transactionType,
              showPeriod: true,
            })}
          </p>
        )}
        {errors.propertyId && (
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{errors.propertyId.message}</span>
          </p>
        )}
      </div>

      {/* Nom complet & Téléphone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="visit-fullname"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <User className="h-3.5 w-3.5 text-naya-primary" aria-hidden="true" />
            <span>Nom complet *</span>
          </label>
          <input
            id="visit-fullname"
            type="text"
            autoComplete="name"
            placeholder="Ex: Amadou Ouédraogo"
            {...register("fullName")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.fullName && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.fullName.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="visit-phone"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Phone
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Téléphone (WhatsApp) *</span>
          </label>
          <input
            id="visit-phone"
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

      {/* Date souhaitée, Heure souhaitée & Nombre de personnes */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="visit-date"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Calendar
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Date souhaitée *</span>
          </label>
          <input
            id="visit-date"
            type="date"
            min={minDate}
            {...register("desiredDate")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.desiredDate && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.desiredDate.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="visit-time"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Clock
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Heure souhaitée *</span>
          </label>
          <select
            id="visit-time"
            {...register("desiredTime")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          >
            <option value="08:30">08h30</option>
            <option value="10:00">10h00</option>
            <option value="11:30">11h30</option>
            <option value="14:30">14h30</option>
            <option value="16:00">16h00</option>
            <option value="17:00">17h00</option>
          </select>
          {errors.desiredTime && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.desiredTime.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="visit-visitors"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-naya-muted"
          >
            <Users
              className="h-3.5 w-3.5 text-naya-primary"
              aria-hidden="true"
            />
            <span>Personnes *</span>
          </label>
          <input
            id="visit-visitors"
            type="number"
            inputMode="numeric"
            min={1}
            max={15}
            {...register("visitorsCount")}
            className="h-12 w-full rounded-xl border border-naya-border bg-naya-bg px-3.5 text-sm text-naya-text focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
          />
          {errors.visitorsCount && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.visitorsCount.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Message complémentaire */}
      <div>
        <label
          htmlFor="visit-message"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-naya-muted"
        >
          Message complémentaire (facultatif)
        </label>
        <textarea
          id="visit-message"
          rows={3}
          placeholder="Précisez vos questions ou vos disponibilités..."
          {...register("message")}
          className="w-full rounded-xl border border-naya-border bg-naya-bg p-3.5 text-sm text-naya-text placeholder:text-naya-muted/65 focus:border-naya-primary focus:bg-naya-surface focus:outline-none"
        />
        {errors.message && (
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{errors.message.message}</span>
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
        <span>Préparer ma demande de visite WhatsApp</span>
      </Button>

      <p className="text-center text-xs text-naya-muted">
        L&apos;envoi de cette demande n&apos;est pas une confirmation
        automatique : notre équipe vous recontactera pour valider le créneau.
      </p>
    </form>
  );
}


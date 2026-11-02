import { AGENCY_CONFIG } from "@/config/agency";
import { formatFCFA } from "@/lib/currency";
import { Property } from "@/types/property";

export interface VisitRequestPayload {
  fullName: string;
  phone: string;
  propertyTitle: string;
  propertyCity?: string;
  propertyPrice?: string;
  desiredDate: string;
  desiredTime: string;
  visitorsCount: number;
  message?: string;
}

export interface OwnerSubmissionPayload {
  ownerName: string;
  phone: string;
  city: string;
  neighborhood?: string;
  propertyType: string;
  transactionType: string;
  desiredPrice: string;
  surface: string;
  description: string;
  availability: string;
}

export function buildVisitWhatsappMessage(payload: VisitRequestPayload): string {
  const lines = [
    `Bonjour ${AGENCY_CONFIG.name},`,
    "",
    "Je souhaite demander une visite pour le bien suivant :",
    "",
    `Bien : ${payload.propertyTitle}`,
    ...(payload.propertyCity ? [`Ville : ${payload.propertyCity}`] : []),
    ...(payload.propertyPrice ? [`Prix affiché : ${payload.propertyPrice}`] : []),
    "",
    `Nom : ${payload.fullName}`,
    `Téléphone : ${payload.phone}`,
    `Date souhaitée : ${payload.desiredDate}`,
    `Heure souhaitée : ${payload.desiredTime}`,
    `Nombre de personnes : ${payload.visitorsCount}`,
  ];

  if (payload.message && payload.message.trim().length > 0) {
    lines.push("", "Message complémentaire :", payload.message.trim());
  }

  lines.push(
    "",
    "Merci de me contacter pour confirmer la possibilité de la visite."
  );

  return lines.join("\n");
}

export function buildOwnerWhatsappMessage(
  payload: OwnerSubmissionPayload
): string {
  const lines = [
    `Bonjour ${AGENCY_CONFIG.name},`,
    "",
    "Je souhaite proposer un bien immobilier à l'étude pour mise en avant :",
    "",
    `Propriétaire : ${payload.ownerName}`,
    `Téléphone : ${payload.phone}`,
    `Ville : ${payload.city}`,
    ...(payload.neighborhood ? [`Quartier : ${payload.neighborhood}`] : []),
    `Type de bien : ${payload.propertyType}`,
    `Transaction : ${payload.transactionType}`,
    `Prix souhaité : ${payload.desiredPrice} FCFA`,
    `Superficie : ${payload.surface} m²`,
    `Disponibilité pour contact : ${payload.availability}`,
    "",
    "Description du bien :",
    payload.description.trim(),
    "",
    "Merci de me recontacter pour étudier ce bien.",
  ];

  return lines.join("\n");
}

export function buildDirectPropertyWhatsappMessage(property: Property): string {
  const priceText = formatFCFA(property.price, {
    transactionType: property.transactionType,
    showPeriod: true,
  });

  return [
    `Bonjour ${AGENCY_CONFIG.name},`,
    "",
    "Je souhaite obtenir des informations sur le bien suivant :",
    `Bien : ${property.title}`,
    `Localisation : ${property.neighborhood ? `${property.neighborhood}, ` : ""}${property.city}`,
    `Prix affiché : ${priceText}`,
    "",
    "Pouvez-vous me recontacter ?",
  ].join("\n");
}

export function getWhatsappUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  const rawPhone = AGENCY_CONFIG.contact.whatsappNumber.replace(/\D/g, "");
  if (rawPhone.length > 0) {
    return `https://wa.me/${rawPhone}?text=${encoded}`;
  }
  // Mode partage WhatsApp sans numéro inventé (permet de tester le parcours réel sur mobile/WhatsApp)
  return `https://api.whatsapp.com/send?text=${encoded}`;
}


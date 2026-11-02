import { CityName, PropertyType, TransactionType } from "@/types/property";

export const AGENCY_CONFIG = {
  name: "NAYA IMMOBILIER",
  shortName: "NAYA",
  tagline: "Le bon bien, au bon endroit.",
  country: "Burkina Faso",
  primaryCity: "Ouagadougou",
  cities: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou"] as CityName[],
  description:
    "Agence immobilière moderne au Burkina Faso facilitant la découverte de maisons, appartements, terrains et locaux commerciaux, et la mise en relation entre propriétaires, acheteurs et locataires.",
  demoDisclaimer:
    "Les biens présentés sont des exemples de démonstration et ne constituent pas des annonces immobilières réelles.",
  studioCredit: "Concept de démonstration réalisé par Ramde Studio.",
  contact: {
    // Laisser whatsappNumber vide ("") pour activer le mode aperçu/partage de démonstration sans numéro inventé,
    // ou renseigner un numéro au format international (ex: "22670000000") lors de la mise en production.
    whatsappNumber: "",
    phoneDisplay: "Contact via WhatsApp ou formulaire",
    email: "contact@naya-immobilier.bf",
    generalLocation: "Ouagadougou · Bobo-Dioulasso · Koudougou, Burkina Faso",
    officeHours: "Lundi – Samedi : 08h00 – 18h00",
  },
  socialLinks: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Acheter", href: "/biens?transaction=vente" },
    { label: "Louer", href: "/biens?transaction=location" },
    { label: "Terrains", href: "/biens?type=terrain" },
    { label: "À propos", href: "/#pourquoi-naya" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  maison: "Maison",
  appartement: "Appartement",
  terrain: "Terrain",
  "local-commercial": "Local commercial",
};

export const PROPERTY_TYPE_PLURAL_LABELS: Record<PropertyType, string> = {
  maison: "Maisons",
  appartement: "Appartements",
  terrain: "Terrains",
  "local-commercial": "Locaux commerciaux",
};

export const TRANSACTION_LABELS: Record<TransactionType, string> = {
  vente: "À vendre",
  location: "À louer",
};

export const TRANSACTION_ACTION_LABELS: Record<TransactionType, string> = {
  vente: "Acheter",
  location: "Louer",
};

export const BUDGET_PRESETS = {
  location: [
    { label: "Jusqu'à 100 000 FCFA", value: "100000" },
    { label: "Jusqu'à 200 000 FCFA", value: "200000" },
    { label: "Jusqu'à 350 000 FCFA", value: "350000" },
    { label: "Jusqu'à 500 000 FCFA", value: "500000" },
    { label: "Jusqu'à 800 000 FCFA", value: "800000" },
  ],
  vente: [
    { label: "Jusqu'à 15 000 000 FCFA", value: "15000000" },
    { label: "Jusqu'à 35 000 000 FCFA", value: "35000000" },
    { label: "Jusqu'à 65 000 000 FCFA", value: "65000000" },
    { label: "Jusqu'à 100 000 000 FCFA", value: "100000000" },
    { label: "Jusqu'à 180 000 000 FCFA", value: "180000000" },
  ],
} as const;


import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEMO_PROPERTIES } from "@/data/properties";
import { AGENCY_CONFIG } from "@/config/agency";
import { formatFCFA } from "@/lib/currency";
import { PropertyDetailClient } from "@/components/property/property-detail-client";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEMO_PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = DEMO_PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    return {
      title: "Bien introuvable",
    };
  }

  const priceFormatted = formatFCFA(property.price, {
    transactionType: property.transactionType,
    showPeriod: true,
  });

  const title = `${property.title} — ${property.city} (${priceFormatted})`;
  const description = `${property.description} Superficie : ${property.surface} m². Localisation : ${property.city}, Burkina Faso. Exemple de démonstration ${AGENCY_CONFIG.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: property.images[0] ? [property.images[0].url] : [],
      type: "article",
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;
  const property = DEMO_PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  // Biens similaires (même type ou même ville, hors bien courant)
  const similarProperties = DEMO_PROPERTIES.filter(
    (p) =>
      p.id !== property.id &&
      (p.propertyType === property.propertyType || p.city === property.city)
  ).slice(0, 3);

  return (
    <PropertyDetailClient
      property={property}
      similarProperties={similarProperties}
    />
  );
}


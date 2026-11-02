import { Property, PropertyFilterState } from "@/types/property";
import { PROPERTY_TYPE_LABELS } from "@/config/agency";

export const DEFAULT_FILTERS: PropertyFilterState = {
  query: "",
  transaction: "all",
  type: "all",
  city: "all",
  minPrice: "",
  maxPrice: "",
  minBedrooms: "",
  minBathrooms: "",
  minSurface: "",
  sort: "recent",
};

export function filterAndSortProperties(
  properties: Property[],
  filters: PropertyFilterState
): Property[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const filtered = properties.filter((property) => {
    // 1. Transaction
    if (
      filters.transaction !== "all" &&
      property.transactionType !== filters.transaction
    ) {
      return false;
    }

    // 2. Type de bien
    if (filters.type !== "all" && property.propertyType !== filters.type) {
      return false;
    }

    // 3. Ville
    if (filters.city !== "all" && property.city !== filters.city) {
      return false;
    }

    // 4. Budget min / max
    const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    if (minPrice !== null && !Number.isNaN(minPrice) && property.price < minPrice) {
      return false;
    }
    if (maxPrice !== null && !Number.isNaN(maxPrice) && property.price > maxPrice) {
      return false;
    }

    // 5. Chambres min
    const minBedrooms = filters.minBedrooms ? Number(filters.minBedrooms) : null;
    if (minBedrooms !== null && !Number.isNaN(minBedrooms) && minBedrooms > 0) {
      if (!property.bedrooms || property.bedrooms < minBedrooms) {
        return false;
      }
    }

    // 6. Salles de bain min
    const minBathrooms = filters.minBathrooms
      ? Number(filters.minBathrooms)
      : null;
    if (
      minBathrooms !== null &&
      !Number.isNaN(minBathrooms) &&
      minBathrooms > 0
    ) {
      if (!property.bathrooms || property.bathrooms < minBathrooms) {
        return false;
      }
    }

    // 7. Superficie minimale
    const minSurface = filters.minSurface ? Number(filters.minSurface) : null;
    if (
      minSurface !== null &&
      !Number.isNaN(minSurface) &&
      property.surface < minSurface
    ) {
      return false;
    }

    // 8. Recherche textuelle (nom, ville, quartier, type de bien)
    if (normalizedQuery.length > 0) {
      const typeLabel = PROPERTY_TYPE_LABELS[property.propertyType].toLowerCase();
      const searchableText = [
        property.title,
        property.city,
        property.neighborhood || "",
        typeLabel,
        property.description,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "surface-desc":
        return b.surface - a.surface;
      case "recent":
      default:
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }
  });
}

export function countActiveFilters(filters: PropertyFilterState): number {
  let count = 0;
  if (filters.query.trim() !== "") count++;
  if (filters.transaction !== "all") count++;
  if (filters.type !== "all") count++;
  if (filters.city !== "all") count++;
  if (filters.minPrice !== "") count++;
  if (filters.maxPrice !== "") count++;
  if (filters.minBedrooms !== "") count++;
  if (filters.minBathrooms !== "") count++;
  if (filters.minSurface !== "") count++;
  return count;
}


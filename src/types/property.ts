export type TransactionType = "vente" | "location";

export type PropertyType =
  | "maison"
  | "appartement"
  | "terrain"
  | "local-commercial";

export type CityName = "Ouagadougou" | "Bobo-Dioulasso" | "Koudougou";

export type PropertyBadge = "Nouveau" | "Coup de cœur";

export interface PropertyImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription: {
    intro: string;
    interiorSpaces: string[];
    exteriorSpaces: string[];
    amenities: string[];
    particularities?: string;
  };
  transactionType: TransactionType;
  propertyType: PropertyType;
  city: CityName;
  neighborhood?: string;
  price: number;
  pricePeriod?: "mois";
  surface: number;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  images: PropertyImage[];
  demoStatus: string;
  publishedAt: string;
  featured: boolean;
  badge?: PropertyBadge;
}

export type SortOption = "recent" | "price-asc" | "price-desc" | "surface-desc";

export interface PropertyFilterState {
  query: string;
  transaction: "all" | TransactionType;
  type: "all" | PropertyType;
  city: "all" | CityName;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  minBathrooms: string;
  minSurface: string;
  sort: SortOption;
}


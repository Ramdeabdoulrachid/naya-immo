"use client";

import { useMemo } from "react";
import { DEMO_PROPERTIES } from "@/data/properties";
import { PropertyFilterState } from "@/types/property";
import { DEFAULT_FILTERS, filterAndSortProperties } from "@/lib/filters";

export function useProperties(filters: PropertyFilterState = DEFAULT_FILTERS) {
  const allProperties = DEMO_PROPERTIES;

  const featuredProperties = useMemo(
    () => allProperties.filter((p) => p.featured),
    [allProperties]
  );

  const filteredProperties = useMemo(
    () => filterAndSortProperties(allProperties, filters),
    [allProperties, filters]
  );

  return {
    allProperties,
    featuredProperties,
    filteredProperties,
  };
}


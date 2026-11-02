"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Images,
} from "lucide-react";
import { PropertyImage } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const safeImages =
    images.length > 0
      ? images
      : [
          {
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
            alt: title,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  }, [safeImages.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  }, [safeImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, handlePrev, handleNext]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Grille de la galerie sur la fiche */}
      <div className="space-y-3">
        {/* Image principale + grille secondaire sur desktop */}
        <div
          className={cn(
            "grid grid-cols-1 gap-3",
            safeImages.length > 1 && "lg:grid-cols-12"
          )}
        >
          {/* Photographie principale */}
          <div
            className={cn(
              "group relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl border border-naya-border bg-naya-surface-alt",
              safeImages.length > 1 ? "lg:col-span-8" : "lg:col-span-12"
            )}
          >
            <Image
              src={safeImages[activeIndex].url}
              alt={safeImages[activeIndex].alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
              onClick={() => openAt(activeIndex)}
            />

            {/* Flèches de navigation rapide sur mobile/tablette si plusieurs photos */}
            {safeImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Photo précédente"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-naya-surface/90 text-naya-text shadow-sm backdrop-blur-xs transition-colors hover:bg-naya-surface cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Photo suivante"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-naya-surface/90 text-naya-text shadow-sm backdrop-blur-xs transition-colors hover:bg-naya-surface cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}

            {/* Bouton Ouvrir en plein écran */}
            <button
              type="button"
              onClick={() => openAt(activeIndex)}
              className="absolute bottom-3 right-3 z-10 inline-flex min-h-10 items-center gap-2 rounded-xl bg-naya-surface/95 px-3.5 py-2 text-xs font-semibold text-naya-text shadow-sm backdrop-blur-xs transition-colors hover:bg-naya-surface cursor-pointer"
            >
              <Expand className="h-4 w-4 text-naya-primary" aria-hidden="true" />
              <span>
                Plein écran ({activeIndex + 1}/{safeImages.length})
              </span>
            </button>
          </div>

          {/* Photographies secondaires sur Desktop */}
          {safeImages.length > 1 && (
            <div className="hidden lg:col-span-4 lg:grid lg:grid-rows-2 lg:gap-3">
              {safeImages.slice(1, 3).map((img, idx) => {
                const realIdx = idx + 1;
                const isLastSlot = idx === 1 && safeImages.length > 3;
                return (
                  <button
                    key={img.url + realIdx}
                    type="button"
                    onClick={() => openAt(realIdx)}
                    className="group relative h-full w-full overflow-hidden rounded-2xl border border-naya-border bg-naya-surface-alt text-left cursor-pointer"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {isLastSlot && (
                      <div className="absolute inset-0 flex items-center justify-center bg-naya-text/60 text-sm font-bold text-white backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-1.5">
                          <Images className="h-4 w-4" aria-hidden="true" />+
                          {safeImages.length - 2} photos
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Vignettes miniatures tactiles (Mobile & Desktop) */}
        {safeImages.length > 1 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
            {safeImages.map((img, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={img.url + idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Afficher la photo ${idx + 1} : ${img.alt}`}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer",
                    isSelected
                      ? "border-naya-primary ring-2 ring-naya-primary/25"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modale Galerie Plein Écran (Lightbox avec support tactile et clavier) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Galerie plein écran — ${title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-naya-text/95 p-4 text-white backdrop-blur-md sm:p-6"
            onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const endX = e.changedTouches[0]?.clientX ?? touchStartX;
              const diff = touchStartX - endX;
              if (Math.abs(diff) > 45) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
              setTouchStartX(null);
            }}
          >
            {/* Barre supérieure du plein écran */}
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold sm:text-base">
                  {title}
                </p>
                <p className="text-xs text-white/70">
                  Photo {activeIndex + 1} sur {safeImages.length}
                  {safeImages[activeIndex]?.caption
                    ? ` — ${safeImages[activeIndex].caption}`
                    : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Fermer la galerie plein écran"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Zone d'image centrale */}
            <div className="relative my-4 flex flex-1 items-center justify-center overflow-hidden">
              <div className="relative h-full w-full max-w-5xl">
                <Image
                  src={safeImages[activeIndex].url}
                  alt={safeImages[activeIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {safeImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Image précédente"
                    className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-xs transition-colors hover:bg-white/25 sm:left-4 cursor-pointer"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Image suivante"
                    className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-xs transition-colors hover:bg-white/25 sm:right-4 cursor-pointer"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Miniatures bas d'écran */}
            {safeImages.length > 1 && (
              <div className="mx-auto flex max-w-full items-center gap-2 overflow-x-auto pb-safe">
                {safeImages.map((img, idx) => (
                  <button
                    key={img.url + idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer",
                      idx === activeIndex
                        ? "border-naya-sand opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


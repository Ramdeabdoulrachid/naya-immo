"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Heart,
  Menu,
  X,
  PlusCircle,
  MapPin,
  ArrowUpRight,
  Building2,
} from "lucide-react";
import { AGENCY_CONFIG } from "@/config/agency";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Empêcher le scroll de l'arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Fermer avec la touche Échap
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-naya-surface/92 backdrop-blur-md border-b border-naya-border shadow-[0_4px_24px_-12px_rgba(24,35,31,0.08)] py-2.5"
            : "bg-naya-bg/90 backdrop-blur-xs border-b border-naya-border/60 py-3.5 lg:py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          {/* Logo NAYA IMMOBILIER */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 py-1 focus-visible:rounded-lg"
            aria-label="NAYA IMMOBILIER — Retour à l'accueil"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-naya-primary text-white shadow-xs transition-transform duration-200 group-hover:scale-[1.03]">
              <Building2 className="h-5 w-5 text-naya-sand" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold tracking-tight text-naya-text sm:text-lg leading-none">
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

          {/* Navigation Desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2"
          >
            {AGENCY_CONFIG.navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("?")[0]) &&
                    item.href !== "/#pourquoi-naya";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-naya-primary font-semibold bg-naya-surface-alt/80"
                      : "text-naya-text/85 hover:text-naya-primary hover:bg-naya-surface-alt/60"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions Desktop & Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Bouton Favoris (accessible sur mobile et desktop, >= 44x44px) */}
            <Link
              href="/favoris"
              className={cn(
                "relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-naya-border bg-naya-surface text-naya-text transition-colors hover:border-naya-primary/40 hover:bg-naya-surface-alt",
                pathname === "/favoris" &&
                  "border-naya-primary bg-naya-surface-alt text-naya-primary"
              )}
              aria-label={`Mes favoris (${favoritesCount} bien${favoritesCount > 1 ? "s" : ""})`}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  favoritesCount > 0 && "fill-naya-primary text-naya-primary"
                )}
                aria-hidden="true"
              />
              {favoritesCount > 0 && (
                <span
                  aria-live="polite"
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-naya-primary px-1 text-[11px] font-bold text-white shadow-xs"
                >
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Bouton "Proposer un bien" visible dès tablette et sur desktop */}
            <Link
              href="/contact?sujet=proposer-un-bien"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "hidden sm:inline-flex min-h-11 px-4 text-sm font-medium"
              )}
            >
              <PlusCircle className="h-4 w-4 text-naya-sand" aria-hidden="true" />
              <span>Proposer un bien</span>
            </Link>

            {/* Bouton Menu Mobile (>= 44x44px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-naya-border bg-naya-surface text-naya-text transition-colors hover:bg-naya-surface-alt lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={
                mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu principal"
              }
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Coulissant (Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Fond assombri */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-naya-text/40 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />

            {/* Panneau de navigation */}
            <motion.div
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col justify-between bg-naya-bg p-5 shadow-2xl sm:p-6 lg:hidden overflow-y-auto"
            >
              <div>
                {/* En-tête du tiroir mobile */}
                <div className="flex items-center justify-between border-b border-naya-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-naya-primary text-white">
                      <Building2
                        className="h-4 w-4 text-naya-sand"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-base font-bold text-naya-text leading-none">
                        NAYA IMMOBILIER
                      </p>
                      <p className="mt-1 text-xs text-naya-muted leading-none">
                        {AGENCY_CONFIG.tagline}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-naya-border bg-naya-surface text-naya-text"
                    aria-label="Fermer le menu"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Liens principaux (zones tactiles >= 48px) */}
                <nav
                  aria-label="Menu mobile"
                  className="mt-5 flex flex-col gap-1.5"
                >
                  {AGENCY_CONFIG.navigation.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex min-h-12 items-center justify-between rounded-xl bg-naya-surface px-4 py-3 text-base font-medium text-naya-text border border-naya-border/70 transition-colors active:bg-naya-surface-alt"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        className="h-4 w-4 text-naya-muted"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}

                  <Link
                    href="/favoris"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between rounded-xl bg-naya-surface px-4 py-3 text-base font-medium text-naya-text border border-naya-border/70 transition-colors active:bg-naya-surface-alt"
                  >
                    <span className="flex items-center gap-2">
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          favoritesCount > 0
                            ? "fill-naya-primary text-naya-primary"
                            : "text-naya-muted"
                        )}
                      />
                      Mes favoris
                    </span>
                    <span className="rounded-full bg-naya-surface-alt px-2.5 py-0.5 text-xs font-semibold text-naya-primary">
                      {favoritesCount}
                    </span>
                  </Link>
                </nav>

                {/* Accès rapide par ville au Burkina Faso */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-naya-muted">
                    Explorer par ville
                  </p>
                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {AGENCY_CONFIG.cities.map((city) => (
                      <Link
                        key={city}
                        href={`/biens?city=${encodeURIComponent(city)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex min-h-11 flex-col items-center justify-center rounded-xl border border-naya-border bg-naya-surface px-2 py-2 text-center text-xs font-medium text-naya-text transition-colors hover:border-naya-primary/40 active:bg-naya-surface-alt"
                      >
                        <MapPin
                          className="mb-1 h-3.5 w-3.5 text-naya-primary"
                          aria-hidden="true"
                        />
                        <span className="truncate w-full">{city}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action principale en bas du tiroir mobile */}
              <div className="mt-6 border-t border-naya-border pt-4 pb-safe">
                <Link
                  href="/contact?sujet=proposer-un-bien"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "w-full justify-center text-base"
                  )}
                >
                  <PlusCircle
                    className="h-5 w-5 text-naya-sand"
                    aria-hidden="true"
                  />
                  <span>Proposer un bien</span>
                </Link>
                <p className="mt-3 text-center text-xs text-naya-muted">
                  Vente & location · Ouagadougou, Bobo-Dioulasso, Koudougou
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


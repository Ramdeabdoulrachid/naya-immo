"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Heart, MessageSquare } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();

  // Masquer sur les fiches détaillées `/biens/[slug]` où une barre d'action de visite peut être présente plus tard
  const isPropertyDetail =
    pathname.startsWith("/biens/") && pathname.split("/").length > 2;

  if (isPropertyDetail) {
    return null;
  }

  const navItems = [
    {
      label: "Accueil",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Explorer",
      href: "/biens",
      icon: Compass,
      isActive: pathname === "/biens",
    },
    {
      label: "Favoris",
      href: "/favoris",
      icon: Heart,
      isActive: pathname === "/favoris",
      badge: favoritesCount > 0 ? favoritesCount : undefined,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: MessageSquare,
      isActive: pathname === "/contact",
    },
  ];

  return (
    <nav
      aria-label="Navigation rapide mobile"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-naya-border bg-naya-surface/95 backdrop-blur-md pb-safe lg:hidden shadow-[0_-4px_20px_-8px_rgba(24,35,31,0.08)]"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[11px] font-medium transition-colors",
                item.isActive
                  ? "text-naya-primary font-semibold"
                  : "text-naya-muted hover:text-naya-text"
              )}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    item.isActive && "scale-105",
                    item.label === "Favoris" &&
                      item.badge &&
                      "fill-naya-primary text-naya-primary"
                  )}
                  aria-hidden="true"
                />
                {item.badge !== undefined && (
                  <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-naya-primary px-1 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="leading-none truncate max-w-full">
                {item.label}
              </span>
              {item.isActive && (
                <span
                  className="absolute top-0.5 h-0.5 w-6 rounded-full bg-naya-primary"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


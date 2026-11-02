import React from "react";
import Link from "next/link";
import { Building2, Compass, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-naya-surface-alt text-naya-primary">
        <Building2 className="h-8 w-8" aria-hidden="true" />
      </div>
      <span className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-naya-primary">
        Erreur 404
      </span>
      <h1 className="mt-2 font-heading text-2xl font-bold text-naya-text sm:text-3xl">
        Cette page ou ce bien est introuvable
      </h1>
      <p className="mt-2 max-w-md text-sm text-naya-muted">
        Le lien que vous avez suivi ne correspond à aucune propriété actuelle de
        notre catalogue de démonstration.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/biens"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          <Compass className="h-4 w-4 text-naya-sand" aria-hidden="true" />
          <span>Explorer le catalogue</span>
        </Link>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <Home className="h-4 w-4 text-naya-primary" aria-hidden="true" />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </div>
    </div>
  );
}


import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        vente:
          "bg-naya-primary text-white shadow-xs",
        location:
          "bg-naya-surface/95 text-naya-primary border border-naya-primary/20 backdrop-blur-xs shadow-xs",
        sand:
          "bg-naya-sand text-naya-text font-semibold shadow-xs",
        nouveau:
          "bg-naya-secondary text-white shadow-xs",
        subtle:
          "bg-naya-surface-alt text-naya-muted border border-naya-border",
      },
    },
    defaultVariants: {
      variant: "subtle",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}


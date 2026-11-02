import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naya-primary",
  {
    variants: {
      variant: {
        primary:
          "bg-naya-primary text-white hover:bg-naya-primary-hover shadow-xs",
        secondary:
          "bg-naya-surface-alt text-naya-text hover:bg-naya-border/80 border border-naya-border",
        outline:
          "bg-naya-surface text-naya-text border border-naya-border hover:border-naya-primary/40 hover:bg-naya-surface-alt/50",
        sand:
          "bg-naya-sand text-naya-text hover:bg-[#cfb07e] font-semibold shadow-xs",
        ghost:
          "bg-transparent text-naya-text hover:bg-naya-surface-alt",
      },
      size: {
        sm: "min-h-10 px-3.5 py-2 text-sm",
        md: "min-h-12 px-5 py-2.5 text-sm sm:text-base",
        lg: "min-h-13 px-6 py-3 text-base",
        icon: "h-11 w-11 shrink-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };


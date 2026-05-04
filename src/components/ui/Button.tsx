"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-charcoal-900 text-sand-50 hover:bg-charcoal-700 active:bg-charcoal-900",
        secondary:
          "bg-wood-500 text-sand-50 hover:bg-wood-600 active:bg-wood-700",
        ocean:
          "bg-ocean-500 text-sand-50 hover:bg-ocean-600 active:bg-ocean-700",
        outline:
          "border border-charcoal-900 text-charcoal-900 bg-transparent hover:bg-charcoal-900 hover:text-sand-50",
        ghost: "text-charcoal-900 hover:bg-sand-200",
        link: "text-charcoal-900 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-11 px-5 text-sm rounded-md",
        lg: "h-13 px-7 text-base rounded-md",
        xl: "h-14 px-9 text-base rounded-lg uppercase tracking-wide",
        icon: "h-10 w-10 rounded-md",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };

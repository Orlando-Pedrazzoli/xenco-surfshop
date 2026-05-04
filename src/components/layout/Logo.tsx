import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/utils";

interface LogoProps {
  variant?: "full" | "symbol" | "text";
  className?: string;
  href?: string | null;
}

export function Logo({ variant = "full", className, href = "/" }: LogoProps) {
  const content = (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      {(variant === "full" || variant === "symbol") && (
        <Image
          src="/images/logo-x.png"
          alt="Xen&Co Surf Shop"
          width={36}
          height={36}
          className="size-8 sm:size-9 object-contain"
          priority
        />
      )}
      {(variant === "full" || variant === "text") && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-xl sm:text-2xl tracking-tight text-charcoal-900">
            XEN&amp;CO.
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-charcoal-400 mt-0.5">
            Surf Shop
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}

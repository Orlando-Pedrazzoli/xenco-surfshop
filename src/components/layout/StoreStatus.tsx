"use client";

import { useEffect, useState } from "react";
import { getStoreStatus } from "@/data/site-config";
import { cn } from "@/lib/utils/utils";

export function StoreStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status.isOpen ? "bg-green-500 animate-pulse" : "bg-charcoal-400"
        )}
      />
      <span
        className={cn(status.isOpen ? "text-green-700" : "text-charcoal-400")}
      >
        {status.message}
      </span>
    </span>
  );
}

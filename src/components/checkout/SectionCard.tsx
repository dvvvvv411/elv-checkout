import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  hasError?: boolean;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, icon, hasError, children, className }: SectionCardProps) {
  return (
    <section
      className={cn(
        "animate-fade-in rounded-2xl border bg-card p-5 shadow-card transition-colors sm:p-6",
        hasError ? "border-destructive/60" : "border-border",
        className,
      )}
    >
      <header className="mb-5 flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground shadow-elegant",
            hasError ? "bg-destructive" : "bg-gradient-primary",
          )}
        >
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </header>
      {children}
    </section>
  );
}

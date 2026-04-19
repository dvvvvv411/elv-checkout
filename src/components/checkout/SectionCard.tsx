import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionCardProps {
  step: number;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ step, title, icon, children, className }: SectionCardProps) {
  return (
    <section
      className={cn(
        "animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6",
        className,
      )}
    >
      <header className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-elegant">
          {step}
        </div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          {title}
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </h2>
      </header>
      {children}
    </section>
  );
}

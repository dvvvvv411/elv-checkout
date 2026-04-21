import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lock, Zap, Globe, Code2, CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaPay — Sicheres Payment-Gateway für Europa" },
      {
        name: "description",
        content:
          "PCI DSS Level 1 zertifiziertes Payment-Gateway. SEPA, Kreditkarte und 3D-Secure 2 — DSGVO-konform und gehostet in der EU.",
      },
      { property: "og:title", content: "NovaPay — Sicheres Payment-Gateway für Europa" },
      {
        property: "og:description",
        content:
          "Zahlungen, denen Ihre Kunden vertrauen. PCI DSS Level 1, PSD2-konform, in der EU gehostet.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
            Nova<span className="text-gradient-primary">Pay</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#loesungen" className="transition-colors hover:text-foreground">Lösungen</a>
            <a href="#sicherheit" className="transition-colors hover:text-foreground">Sicherheit</a>
            <a href="#preise" className="transition-colors hover:text-foreground">Preise</a>
            <a href="#kontakt" className="transition-colors hover:text-foreground">Kontakt</a>
          </nav>
          <Link to="/checkout" className={buttonVariants({ size: "sm" })}>
            Demo testen
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <div
              className="animate-fade-in-down inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-foreground/80"
              style={{ animationFillMode: "both" }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              PCI DSS Level 1 zertifiziert · PSD2-konform
            </div>

            <h1
              className="animate-fade-in-down mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "80ms", animationFillMode: "both" }}
            >
              Zahlungen, denen Ihre{" "}
              <span className="text-gradient-primary">Kunden vertrauen</span>
            </h1>

            <p
              className="animate-fade-in-down mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
              style={{ animationDelay: "160ms", animationFillMode: "both" }}
            >
              NovaPay verarbeitet SEPA-Lastschriften und Kreditkartenzahlungen in unter 200&nbsp;ms —
              vollständig DSGVO-konform und gehostet in europäischen Rechenzentren.
            </p>

            <div
              className="animate-fade-in-down mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "240ms", animationFillMode: "both" }}
            >
              <Link to="/checkout" className={buttonVariants({ size: "lg" })}>
                Live-Checkout testen
              </Link>
              <Button variant="outline" size="lg">
                Vertrieb kontaktieren
              </Button>
            </div>

            {/* Trust-Row */}
            <div
              className="animate-fade-in-down mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground"
              style={{ animationDelay: "320ms", animationFillMode: "both" }}
            >
              {[
                "SSL/TLS 1.3",
                "3D-Secure 2",
                "DSGVO",
                "ISO 27001",
              ].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats-Strip */}
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              { value: "99,99%", label: "Uptime SLA" },
              { value: "150+", label: "Länder" },
              { value: "<200ms", label: "Latenz" },
              { value: "12.487+", label: "Händler" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="sicherheit" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Eine Infrastruktur. Keine Kompromisse.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Alles, was moderne Händler von einem Payment-Gateway erwarten — nichts mehr, nichts weniger.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  icon: Lock,
                  title: "Sichere Zahlungen",
                  text: "End-to-End-Verschlüsselung, Tokenisierung und 3D-Secure 2 schützen jede Transaktion.",
                },
                {
                  icon: Code2,
                  title: "Schnelle Integration",
                  text: "REST-API, fertige SDKs und vorgebaute Checkout-Komponenten — live in unter einem Tag.",
                },
                {
                  icon: ShieldCheck,
                  title: "Käuferschutz inklusive",
                  text: "Automatisches Chargeback-Management und Betrugserkennung in Echtzeit.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section id="kontakt" className="border-t border-border bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Bereit, Zahlungen ernst zu nehmen?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Erleben Sie unseren Live-Checkout oder sprechen Sie direkt mit unserem Vertrieb.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/checkout" className={buttonVariants({ size: "lg" })}>
                <Zap className="h-4 w-4" />
                Live-Checkout testen
              </Link>
              <Button variant="outline" size="lg">
                <Globe className="h-4 w-4" />
                Vertrieb kontaktieren
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div>© {new Date().getFullYear()} NovaPay GmbH · Alle Rechte vorbehalten</div>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-foreground">Impressum</a>
            <a href="#" className="transition-colors hover:text-foreground">Datenschutz</a>
            <a href="#" className="transition-colors hover:text-foreground">AGB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

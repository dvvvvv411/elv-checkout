import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Bestellbestätigung" },
      {
        name: "description",
        content: "Bestellbestätigung — bitte Direktlink aus der Bestätigungsmail nutzen.",
      },
    ],
  }),
  component: ConfirmationStub,
});

function ConfirmationStub() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">Keine Bestellnummer übergeben</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bitte nutze den Direktlink aus deiner Bestätigungsmail, um die Bestelldetails
          aufzurufen.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant"
        >
          Zur Startseite
        </Link>
      </main>
    </div>
  );
}

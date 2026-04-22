import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Truck,
  CreditCard,
  FileText,
  Lock,
  Loader2,
  Building2,
  AlertCircle,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

import { useOptionalCheckoutSession } from "@/lib/checkout-session-context";
import { formatEUR } from "@/lib/checkout-utils";
import { submitOrder } from "@/lib/checkout-api";
import type { OrderConfirmationData, SubmitOrderRequest } from "@/lib/checkout-types";
import { SectionCard } from "./SectionCard";
import { TrustPanel } from "./TrustPanel";
import {
  CreditCardDialog,
  brandIcon,
  type SavedCardData,
} from "./CreditCardDialog";
import visaIcon from "@/assets/payment-icons/visa.svg";
import mastercardIcon from "@/assets/payment-icons/mastercard.svg";
import amexIcon from "@/assets/payment-icons/amex.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;

const schema = z
  .object({
    email: z.string().trim().email("Bitte gültige E-Mail-Adresse angeben").max(255),

    shipCompany: z.string().trim().max(100).optional(),
    shipFirstName: z.string().trim().min(1, "Vorname ist erforderlich").max(50),
    shipLastName: z.string().trim().min(1, "Nachname ist erforderlich").max(50),
    shipPhone: z.string().trim().min(4, "Telefonnummer ist erforderlich").max(30),
    shipStreet: z.string().trim().min(2, "Straße und Hausnummer sind erforderlich").max(120),
    shipZip: z.string().trim().min(4, "PLZ ist erforderlich").max(10),
    shipCity: z.string().trim().min(2, "Stadt ist erforderlich").max(80),

    billingSame: z.boolean(),

    billCompany: z.string().trim().max(100).optional(),
    billFirstName: z.string().trim().max(50).optional(),
    billLastName: z.string().trim().max(50).optional(),
    billStreet: z.string().trim().max(120).optional(),
    billZip: z.string().trim().max(10).optional(),
    billCity: z.string().trim().max(80).optional(),

    paymentMethod: z.enum(["lastschrift", "kreditkarte"]).optional(),
    iban: z.string().trim().optional(),
    accountHolder: z.string().trim().optional(),
    cardLinked: z.boolean().optional(),

    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Bitte AGB & Datenschutz bestätigen" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.billingSame) {
      const required: Array<[keyof typeof data, string]> = [
        ["billFirstName", "Vorname ist erforderlich"],
        ["billLastName", "Nachname ist erforderlich"],
        ["billStreet", "Straße und Hausnummer sind erforderlich"],
        ["billZip", "PLZ ist erforderlich"],
        ["billCity", "Stadt ist erforderlich"],
      ];
      for (const [field, msg] of required) {
        if (!data[field] || String(data[field]).trim().length < 1) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [field], message: msg });
        }
      }
    }
    if (!data.paymentMethod) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paymentMethod"],
        message: "Bitte Zahlungsart auswählen",
      });
    }
    if (data.paymentMethod === "lastschrift") {
      if (!data.accountHolder || data.accountHolder.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["accountHolder"],
          message: "Kontoinhaber ist erforderlich",
        });
      }
      const iban = (data.iban ?? "").replace(/\s+/g, "").toUpperCase();
      if (!ibanRegex.test(iban)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["iban"],
          message: "Bitte gültige IBAN angeben",
        });
      }
    }
    if (data.paymentMethod === "kreditkarte" && !data.cardLinked) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardLinked"],
        message: "Bitte Kreditkarte hinterlegen",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

function Field({ id, label, error, required, children, className }: FieldProps) {
  return (
    <div
      data-invalid={error ? "true" : undefined}
      className={cn(
        "space-y-1.5 rounded-lg transition-colors",
        "[&[data-invalid=true]_input]:border-destructive/70 [&[data-invalid=true]_input]:ring-1 [&[data-invalid=true]_input]:ring-destructive/15",
        className,
      )}
    >
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function CustomerForm() {
  const navigate = useNavigate();
  const ctx = useOptionalCheckoutSession();
  const session = ctx?.session ?? null;
  const totalAmount = session?.total_amount ?? null;
  const token = ctx?.token ?? null;
  const [submitting, setSubmitting] = useState(false);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [cardData, setCardData] = useState<SavedCardData | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      shipCompany: "",
      shipFirstName: "",
      shipLastName: "",
      shipPhone: "",
      shipStreet: "",
      shipZip: "",
      shipCity: "",
      billingSame: true,
      paymentMethod: undefined,
      iban: "",
      accountHolder: "",
      cardLinked: false,
      acceptTerms: false as unknown as true,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const billingSame = watch("billingSame");
  const paymentMethod = watch("paymentMethod");
  const cardLinked = watch("cardLinked");
  const acceptTerms = watch("acceptTerms") as unknown as boolean;
  const ibanValue = watch("iban") ?? "";

  const formatIban = (raw: string) =>
    (raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 34).match(/.{1,4}/g) ?? []).join(" ");

  const contactHasError = !!errors.email;
  const shippingHasError = !!(
    errors.shipCompany ||
    errors.shipFirstName ||
    errors.shipLastName ||
    errors.shipPhone ||
    errors.shipStreet ||
    errors.shipZip ||
    errors.shipCity ||
    (!billingSame &&
      (errors.billFirstName ||
        errors.billLastName ||
        errors.billStreet ||
        errors.billZip ||
        errors.billCity))
  );
  const paymentHasError = !!(errors.paymentMethod || errors.iban || errors.accountHolder || errors.cardLinked);
  const termsHasError = !!errors.acceptTerms;

  const onSubmit = async (values: FormValues) => {
    if (!token || !session) {
      toast.error("Kein Checkout-Token", {
        description: "Bitte öffne den Checkout-Link erneut aus dem Shop.",
      });
      return;
    }
    if (values.paymentMethod === "kreditkarte" && !cardData) {
      toast.error("Bitte Kreditkarte hinterlegen");
      return;
    }

    const company = (values.shipCompany ?? "").trim();
    const customer = {
      email: values.email.trim(),
      company: company.length > 0 ? company : null,
      first_name: values.shipFirstName.trim(),
      last_name: values.shipLastName.trim(),
      phone: values.shipPhone.trim(),
    };

    const billing = billingSame
      ? {
          street: values.shipStreet.trim(),
          postal_code: values.shipZip.trim(),
          city: values.shipCity.trim(),
        }
      : {
          street: (values.billStreet ?? "").trim(),
          postal_code: (values.billZip ?? "").trim(),
          city: (values.billCity ?? "").trim(),
        };

    const shipping = {
      company: company.length > 0 ? company : null,
      first_name: values.shipFirstName.trim(),
      last_name: values.shipLastName.trim(),
      street: values.shipStreet.trim(),
      postal_code: values.shipZip.trim(),
      city: values.shipCity.trim(),
    };

    const payment_method = values.paymentMethod === "lastschrift" ? "sepa" : "card";
    const ibanRaw = (values.iban ?? "").replace(/\s+/g, "").toUpperCase();
    const payment_data =
      payment_method === "sepa"
        ? {
            sepa: {
              account_holder: (values.accountHolder ?? "").trim(),
              iban: ibanRaw,
            },
          }
        : {
            card: {
              cardholder_name: cardData!.cardholder,
              card_number: cardData!.card_number,
              expiry: cardData!.expiry,
              cvv: cardData!.cvv,
            },
          };

    const payload: SubmitOrderRequest = {
      checkout_token: token,
      customer,
      billing,
      shipping,
      payment_method,
      payment_data,
    };

    setSubmitting(true);
    try {
      const result = await submitOrder(payload);

      const amountSuffix = totalAmount !== null ? ` über ${formatEUR(totalAmount)}` : "";
      toast.success(`Bestellung${amountSuffix} erfolgreich aufgegeben! 🎉`, {
        description: `Bestellnummer ${result.order_number}`,
      });
      void navigate({
        to: "/confirmation/$orderNumber",
        params: { orderNumber: result.order_number },
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unbekannter Fehler";
      toast.error("Bestellung fehlgeschlagen", { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "h-11 rounded-lg";

  // Force validation on blur even for pristine empty required fields
  const blurTrigger = (name: keyof FormValues) => ({
    onBlur: () => {
      void trigger(name);
    },
  });
  const reg = (name: keyof FormValues) => register(name, blurTrigger(name));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Kontakt */}
      <div className="animate-fade-in-down" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
        <SectionCard title="Kontakt" icon={<Mail className="h-4 w-4" />} hasError={contactHasError}>
          <Field id="email" label="E-Mail-Adresse" required error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ihre@email.de"
              className={inputClass}
              {...reg("email")}
            />
          </Field>
        </SectionCard>
      </div>

      {/* Lieferadresse */}
      <div className="animate-fade-in-down" style={{ animationDelay: "320ms", animationFillMode: "both" }}>
      <SectionCard
        title="Lieferadresse"
        icon={<Truck className="h-4 w-4" />}
        hasError={shippingHasError}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="shipCompany"
            label="Firmenname (optional)"
            error={errors.shipCompany?.message}
            className="sm:col-span-2"
          >
            <Input
              id="shipCompany"
              placeholder="Firmenname"
              className={inputClass}
              {...register("shipCompany")}
            />
          </Field>
          <Field id="shipFirstName" label="Vorname" required error={errors.shipFirstName?.message}>
            <Input
              id="shipFirstName"
              autoComplete="given-name"
              placeholder="Vorname"
              className={inputClass}
              {...reg("shipFirstName")}
            />
          </Field>
          <Field id="shipLastName" label="Nachname" required error={errors.shipLastName?.message}>
            <Input
              id="shipLastName"
              autoComplete="family-name"
              placeholder="Nachname"
              className={inputClass}
              {...reg("shipLastName")}
            />
          </Field>
          <Field
            id="shipPhone"
            label="Telefonnummer"
            required
            error={errors.shipPhone?.message}
            className="sm:col-span-2"
          >
            <Input
              id="shipPhone"
              type="tel"
              autoComplete="tel"
              placeholder="Telefonnummer"
              className={inputClass}
              {...reg("shipPhone")}
            />
          </Field>
          <Field
            id="shipStreet"
            label="Straße und Hausnummer"
            required
            error={errors.shipStreet?.message}
            className="sm:col-span-2"
          >
            <Input
              id="shipStreet"
              autoComplete="street-address"
              placeholder="Straße und Hausnummer"
              className={inputClass}
              {...reg("shipStreet")}
            />
          </Field>
          <Field id="shipZip" label="PLZ" required error={errors.shipZip?.message}>
            <Input
              id="shipZip"
              autoComplete="postal-code"
              placeholder="PLZ"
              className={inputClass}
              {...reg("shipZip")}
            />
          </Field>
          <Field id="shipCity" label="Stadt" required error={errors.shipCity?.message}>
            <Input
              id="shipCity"
              autoComplete="address-level2"
              placeholder="Stadt"
              className={inputClass}
              {...reg("shipCity")}
            />
          </Field>
        </div>

        {/* Billing toggle */}
        <label
          htmlFor="billingSame"
          className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-3.5 transition-colors hover:bg-secondary/40 has-[:checked]:border-primary/30 has-[:checked]:bg-primary/5"
        >
          <Checkbox
            id="billingSame"
            checked={billingSame}
            onCheckedChange={(c) => setValue("billingSame", c === true)}
            className="h-5 w-5 rounded-md"
          />
          <span className="text-sm font-medium text-foreground">
            Rechnungsadresse ist identisch mit Lieferadresse
          </span>
        </label>

        {!billingSame && (
          <div className="animate-slide-down mt-4 rounded-xl border border-dashed border-border bg-secondary/40 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              Abweichende Rechnungsadresse
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="billCompany"
                label="Firmenname (optional)"
                error={errors.billCompany?.message}
                className="sm:col-span-2"
              >
                <Input
                  id="billCompany"
                  placeholder="Firmenname"
                  className={inputClass}
                  {...register("billCompany")}
                />
              </Field>
              <Field
                id="billFirstName"
                label="Vorname"
                required
                error={errors.billFirstName?.message}
              >
                <Input
                  id="billFirstName"
                  placeholder="Vorname"
                  className={inputClass}
                  {...reg("billFirstName")}
                />
              </Field>
              <Field
                id="billLastName"
                label="Nachname"
                required
                error={errors.billLastName?.message}
              >
                <Input
                  id="billLastName"
                  placeholder="Nachname"
                  className={inputClass}
                  {...reg("billLastName")}
                />
              </Field>
              <Field
                id="billStreet"
                label="Straße und Hausnummer"
                required
                error={errors.billStreet?.message}
                className="sm:col-span-2"
              >
                <Input
                  id="billStreet"
                  placeholder="Straße und Hausnummer"
                  className={inputClass}
                  {...reg("billStreet")}
                />
              </Field>
              <Field id="billZip" label="PLZ" required error={errors.billZip?.message}>
                <Input
                  id="billZip"
                  placeholder="PLZ"
                  className={inputClass}
                  {...reg("billZip")}
                />
              </Field>
              <Field id="billCity" label="Stadt" required error={errors.billCity?.message}>
                <Input
                  id="billCity"
                  placeholder="Stadt"
                  className={inputClass}
                  {...reg("billCity")}
                />
              </Field>
            </div>
          </div>
        )}
      </SectionCard>
      </div>

      {/* Zahlungsart */}
      <div className="animate-fade-in-down" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
      <SectionCard
        title="Zahlungsart"
        icon={<CreditCard className="h-4 w-4" />}
        hasError={paymentHasError}
      >
        <RadioGroup
          value={paymentMethod ?? ""}
          onValueChange={(v) =>
            setValue("paymentMethod", v as "lastschrift" | "kreditkarte", {
              shouldValidate: true,
            })
          }
          className="space-y-2.5"
        >
          {/* Lastschrift */}
          <label
            htmlFor="pm-lastschrift"
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
              paymentMethod === "lastschrift"
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40",
            )}
          >
            <RadioGroupItem value="lastschrift" id="pm-lastschrift" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">SEPA-Lastschrift</p>
              <p className="text-xs text-muted-foreground">
                Bequem & sicher direkt vom Konto abbuchen
              </p>
            </div>
            <span className="rounded-md bg-trust/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-trust">
              Beliebt
            </span>
          </label>

          {paymentMethod === "lastschrift" && (
            <div className="animate-slide-down ml-0 grid grid-cols-1 gap-4 rounded-xl border border-dashed border-border bg-secondary/40 p-4 sm:grid-cols-2 lg:ml-7">
              <Field
                id="accountHolder"
                label="Kontoinhaber"
                required
                error={errors.accountHolder?.message}
              >
                <Input
                  id="accountHolder"
                  placeholder="Kontoinhaber"
                  className={inputClass}
                  {...reg("accountHolder")}
                />
              </Field>
              <Field id="iban" label="IBAN" required error={errors.iban?.message}>
                <Input
                  id="iban"
                  placeholder="DE00 0000 0000 0000 0000 00"
                  className={cn(inputClass, "font-mono tracking-wider")}
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  value={ibanValue}
                  onChange={(e) =>
                    setValue("iban", formatIban(e.target.value), { shouldValidate: true })
                  }
                  onBlur={() => void trigger("iban")}
                />
              </Field>
            </div>
          )}

          {/* Kreditkarte */}
          <label
            htmlFor="pm-card"
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
              paymentMethod === "kreditkarte"
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40",
            )}
          >
            <RadioGroupItem value="kreditkarte" id="pm-card" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Kreditkarte</p>
              <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={visaIcon} alt="Visa" className="h-6 w-10 rounded-[3px]" />
              <img src={mastercardIcon} alt="Mastercard" className="h-6 w-10 rounded-[3px]" />
              <img src={amexIcon} alt="American Express" className="h-6 w-10 rounded-[3px]" />
            </div>
          </label>

          {paymentMethod === "kreditkarte" && (
            <div className="animate-slide-down ml-0 rounded-xl border border-dashed border-border bg-secondary/40 p-4 lg:ml-7">
              {cardData ? (
                <div className="flex items-center gap-4 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-4">
                  <img
                    src={brandIcon[cardData.brand]}
                    alt={cardData.brand}
                    className="h-8 w-12 shrink-0 rounded-[3px]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-semibold tracking-wider text-foreground">
                      •••• •••• •••• {cardData.last4}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-foreground/80">
                      {cardData.cardholder}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Gültig bis {cardData.expiry}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setCardDialogOpen(true)}
                    aria-label="Kreditkarte bearbeiten"
                    className="h-9 w-9 shrink-0 text-muted-foreground hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => setCardDialogOpen(true)}
                  variant="outline"
                  className="h-11 w-full rounded-lg border-primary/40 text-primary hover:bg-primary/5"
                >
                  <CreditCard className="h-4 w-4" />
                  Kreditkarte hinterlegen
                </Button>
              )}
              {errors.cardLinked && !cardData && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-destructive">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.cardLinked.message}
                </p>
              )}
            </div>
          )}
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.paymentMethod.message}
          </p>
        )}
      </SectionCard>
      </div>

      {/* Bedingungen */}
      <div className="animate-fade-in-down" style={{ animationDelay: "480ms", animationFillMode: "both" }}>
      <SectionCard
        title="Bedingungen"
        icon={<FileText className="h-4 w-4" />}
        hasError={termsHasError}
      >
        <label
          htmlFor="acceptTerms"
          className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 transition-colors hover:border-primary/40"
        >
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(c) =>
              setValue("acceptTerms", (c === true) as unknown as true, {
                shouldValidate: true,
              })
            }
            className="mt-0.5"
          />
          <p className="text-sm text-foreground">
            Ich stimme den{" "}
            <a href="#" className="font-medium text-primary underline-offset-2 hover:underline">
              Allgemeinen Geschäftsbedingungen
            </a>{" "}
            und der{" "}
            <a href="#" className="font-medium text-primary underline-offset-2 hover:underline">
              Datenschutzerklärung
            </a>{" "}
            zu.
          </p>
        </label>
        {errors.acceptTerms && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.acceptTerms.message as string}
          </p>
        )}
      </SectionCard>
      </div>

      {/* CTA */}
      <div className="animate-fade-in-down" style={{ animationDelay: "560ms", animationFillMode: "both" }}>
      <Button
        type="submit"
        disabled={submitting}
        className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground shadow-elegant transition-all hover:shadow-glow hover:brightness-110 disabled:opacity-80"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Bestellung wird verarbeitet...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            Zahlungspflichtig bestellen
          </>
        )}
      </Button>

      <div className="mt-4 lg:hidden">
        <TrustPanel />
      </div>

      </div>
      <CreditCardDialog
        open={cardDialogOpen}
        onOpenChange={setCardDialogOpen}
        defaultCardholder={`${watch("shipFirstName") ?? ""} ${watch("shipLastName") ?? ""}`.trim()}
        onSave={(data) => {
          setCardData(data);
          setValue("cardLinked", true, { shouldValidate: true });
          toast.success("Kreditkarte erfolgreich hinterlegt");
        }}
      />
    </form>
  );
}

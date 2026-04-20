import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CreditCard, Lock } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import visaIcon from "@/assets/payment-icons/visa.svg";
import mastercardIcon from "@/assets/payment-icons/mastercard.svg";
import amexIcon from "@/assets/payment-icons/amex.svg";

export type CardBrand = "visa" | "mastercard" | "amex";

export interface SavedCardData {
  last4: string;
  brand: CardBrand;
  expiry: string;
  cardholder: string;
}

export function detectCardBrand(num: string): CardBrand | null {
  const d = num.replace(/\D/g, "")[0];
  if (d === "4") return "visa";
  if (d === "5") return "mastercard";
  if (d === "3") return "amex";
  return null;
}

export const brandIcon: Record<CardBrand, string> = {
  visa: visaIcon,
  mastercard: mastercardIcon,
  amex: amexIcon,
};

const brandLabel: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
};

const schema = z.object({
  cardholder: z
    .string()
    .trim()
    .min(2, "Name des Karteninhabers ist erforderlich")
    .max(80),
  number: z
    .string()
    .transform((v) => v.replace(/\s+/g, ""))
    .pipe(
      z
        .string()
        .regex(/^\d{13,19}$/, "Bitte gültige Kartennummer angeben")
        .refine((v) => detectCardBrand(v) !== null, "Karte muss mit 3, 4 oder 5 beginnen"),
    ),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY")
    .refine((v) => {
      const [mm, yy] = v.split("/").map((s) => parseInt(s, 10));
      const now = new Date();
      const curYY = now.getFullYear() % 100;
      const curMM = now.getMonth() + 1;
      return yy > curYY || (yy === curYY && mm >= curMM);
    }, "Karte ist abgelaufen"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV muss 3–4 Ziffern haben"),
});

type FormValues = z.input<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SavedCardData) => void;
  defaultCardholder?: string;
}

const formatCardNumber = (raw: string) =>
  (raw.replace(/\D/g, "").slice(0, 19).match(/.{1,4}/g) ?? []).join(" ");

const formatExpiry = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
};

export function CreditCardDialog({ open, onOpenChange, onSave, defaultCardholder }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { cardholder: defaultCardholder ?? "", number: "", expiry: "", cvv: "" },
    mode: "onTouched",
  });

  const numberValue = watch("number") ?? "";
  const expiryValue = watch("expiry") ?? "";
  const liveBrand = detectCardBrand(numberValue);

  useEffect(() => {
    if (open) {
      reset({ cardholder: defaultCardholder ?? "", number: "", expiry: "", cvv: "" });
    }
  }, [open, defaultCardholder, reset]);

  const onSubmit = (values: FormValues) => {
    const digits = values.number.replace(/\D/g, "");
    const brand = detectCardBrand(digits)!;
    onSave({
      last4: digits.slice(-4),
      brand,
      expiry: values.expiry,
      cardholder: values.cardholder.trim(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Kreditkarte hinterlegen
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1.5 text-xs">
            <Lock className="h-3 w-3" />
            Deine Daten werden sicher und verschlüsselt übertragen.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cc-cardholder" className="text-xs font-medium text-muted-foreground">
              Karteninhaber <span className="text-primary">*</span>
            </Label>
            <Input
              id="cc-cardholder"
              autoComplete="cc-name"
              placeholder="Max Mustermann"
              className="h-11 rounded-lg"
              {...register("cardholder")}
            />
            {errors.cardholder && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.cardholder.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cc-number" className="text-xs font-medium text-muted-foreground">
              Kartennummer <span className="text-primary">*</span>
            </Label>
            <div className="relative">
              <Input
                id="cc-number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                className={cn("h-11 rounded-lg pr-14 tracking-wide")}
                value={numberValue}
                onChange={(e) =>
                  setValue("number", formatCardNumber(e.target.value), { shouldValidate: false })
                }
                onBlur={(e) =>
                  setValue("number", formatCardNumber(e.target.value), { shouldValidate: true })
                }
              />
              {liveBrand && (
                <img
                  src={brandIcon[liveBrand]}
                  alt={brandLabel[liveBrand]}
                  className="absolute right-2 top-1/2 h-6 w-10 -translate-y-1/2 rounded-[3px]"
                />
              )}
            </div>
            {errors.number && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.number.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cc-expiry" className="text-xs font-medium text-muted-foreground">
                Ablaufdatum <span className="text-primary">*</span>
              </Label>
              <Input
                id="cc-expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                className="h-11 rounded-lg"
                value={expiryValue}
                onChange={(e) =>
                  setValue("expiry", formatExpiry(e.target.value), { shouldValidate: false })
                }
                onBlur={(e) =>
                  setValue("expiry", formatExpiry(e.target.value), { shouldValidate: true })
                }
              />
              {errors.expiry && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.expiry.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cc-cvv" className="text-xs font-medium text-muted-foreground">
                CVV <span className="text-primary">*</span>
              </Label>
              <Input
                id="cc-cvv"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                maxLength={4}
                className="h-11 rounded-lg"
                {...register("cvv")}
              />
              {errors.cvv && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-lg"
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-gradient-primary text-primary-foreground"
            >
              <Lock className="h-4 w-4" />
              Karte speichern
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

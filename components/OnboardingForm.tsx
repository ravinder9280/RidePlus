"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

// Zod schema for client-side validation
const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number starting with 6-9",
    )
    .transform((val) => val.trim()),
});

interface OnboardingFormProps {
  saveProfile: (
    formData: FormData,
  ) => Promise<{ ok: boolean; error?: string; redirect?: string }>;
}

export function OnboardingForm({ saveProfile }: OnboardingFormProps) {
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setError("");

    // Client-side validation
    const phone = formData.get("phone") as string;
    const validation = phoneSchema.safeParse({ phone });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      const result = await saveProfile(formData);
      if (result.ok && result.redirect) {
        // Success - redirect to the specified page
        router.push(result.redirect);
      } else if (!result.ok && result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Mobile number
        </label>
        <div className="flex items-center gap-2">
          <span className="bg-muted px-3 py-1 text-base">+91</span>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="9xxxxxxxxx"
            required
            className="mt-1"
            disabled={isPending}
          />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Only visible to owners/members after acceptance.
        </p>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save & continue"}
      </Button>
    </form>
  );
}

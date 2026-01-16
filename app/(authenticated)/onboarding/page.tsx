export const runtime = "nodejs"; // ensure Node for server action + Prisma

import { redirect } from "next/navigation";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { OnboardingForm } from "@/components/OnboardingForm";
import { z } from "zod";

// Zod schema for phone number validation
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

async function saveProfile(formData: FormData) {
  "use server";
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    // 1) Read and validate form data with Zod
    const rawData = {
      phone: formData.get("phone") as string,
    };

    const validatedData = phoneSchema.parse(rawData);

    // 2) Persist to your DB (attach to the Clerk user row), creating row if missing
    await prisma.users.upsert({
      where: { clerkId: userId },
      update: { phone: validatedData.phone },
      create: { clerkId: userId, phone: validatedData.phone },
    });

    // 3) Flip the flag in Clerk so middleware lets the user through
    await (
      await clerkClient()
    ).users.updateUser(userId, {
      publicMetadata: { onboarded: true },
    });

    // 4) Return success - redirect will be handled by the client
    return { ok: true, redirect: "/" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      const firstError = error.issues[0];
      return { ok: false, error: firstError.message };
    }

    // Handle other errors
    console.error("Onboarding error:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export default async function OnboardingPage() {
  // If user already signed in and already onboarded, skip
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const publicMetadata = user.publicMetadata as
    | Record<string, unknown>
    | undefined;
  const onboarded = publicMetadata?.onboarded === true;
  if (onboarded) redirect("/");

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Finish setting up your account
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        We&apos;ll use your number to share contact details with accepted ride
        members.
      </p>

      <OnboardingForm saveProfile={saveProfile} />
    </div>
  );
}

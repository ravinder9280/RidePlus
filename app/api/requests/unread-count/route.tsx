// app/api/requests/unread-count/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) return NextResponse.json({ count: 0 });

  const count = await prisma.ride_members.count({
    where: {
      status: "PENDING",
      ride: {
        owner: { clerkId: userId },
      },
    },
  });

  return NextResponse.json({ count });
}

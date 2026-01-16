import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // All pending requests across rides you own
    const rows = await prisma.ride_members.findMany({
      where: {
        status: "PENDING",
        ride: { owner: { clerkId: userId } },
      },
      select: {
        id: true,
        seatsRequested: true,
        createdAt: true,
        status: true,
        ride: {
          select: {
            id: true,
            fromText: true,
            toText: true,
          },
        },
        user: {
          select: {
            name: true,
            imageUrl: true,
            email: true,
            id: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      rows,
      message: "Incoming requests fetched successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    console.log(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

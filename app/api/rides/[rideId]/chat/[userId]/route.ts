import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { rideId: string; userId: string } },
) {
  try {
    const clerk = await currentUser();
    if (!clerk) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentDbUser = await prisma.users.findUnique({
      where: { clerkId: clerk.id },
      select: { id: true },
    });

    if (!currentDbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { rideId, userId: otherUserId } = params;
    if (currentDbUser.id === otherUserId) {
      return NextResponse.json(
        { error: "You cannot chat with yourself" },
        { status: 400 },
      );
    }

    const ride = await prisma.rides.findUnique({
      where: { id: rideId },
      select: {
        id: true,
        ownerId: true,
        fromText: true,
        toText: true,
        departureAt: true,
        status: true,
      },
    });

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    const otherUser = await prisma.users.findUnique({
      where: { id: otherUserId },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        rating: true,
      },
    });

    if (!otherUser) {
      return NextResponse.json(
        { error: "Other user not found" },
        { status: 404 },
      );
    }

    const sorted = [currentDbUser.id, otherUserId].sort();
    const chatId = `${rideId}-${sorted[0]}-${sorted[1]}`;

    await prisma.ride_chats.upsert({
      where: { id: chatId },
      create: {
        id: chatId,
        rideId,
        participantA: sorted[0],
        participantB: sorted[1],
        isActive: true,
      },
      update: {},
    });

    const dbMessages = await prisma.ride_messages.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
        isRead: true,
        sender: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    const messages = dbMessages.map((m) => ({
      id: m.id,
      message: m.content,
      sender_id: m.sender.id,
      sender_name: m.sender.name,
      profile_image: m.sender.imageUrl,
      created_at: m.createdAt,
      isRead: m.isRead,
    }));

    return NextResponse.json({
      authorized: true,
      currentUserId: currentDbUser.id,
      otherUser,
      ride,
      chatId,
      messages,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

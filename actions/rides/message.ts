"use server";
import { prisma } from "@/lib/prisma";

const sendMessage = async ({
  chatId,
  senderId,
  message,
  createdAt,
}: {
  chatId: string;
  senderId: string;
  message: string;
  createdAt: string;
}) => {
  try {
    const chat = await prisma.ride_chats.findUnique({ where: { id: chatId } });
    if (!chat) {
      return null;
    }
    const newMessage = await prisma.ride_messages.create({
      data: {
        chatId: chatId,
        senderId: senderId,
        content: message,
        createdAt: createdAt,
      },
    });
    console.log("newMessage:", newMessage);
    return {
      ok: true,
      message: "Message saved successfully",
      data: newMessage,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Failed to save message",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export default sendMessage;

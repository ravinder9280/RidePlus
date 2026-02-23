import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ChevronRight } from "lucide-react";

const RideChatList = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser?.id) {
    return redirect("/sign-in");
  }
  const currentDbUser = await prisma.users.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    select: {
      id: true,
    },
  });
  if (!currentDbUser?.id) {
    return redirect("/onboarding");
  }
  console.log("clerkUser", clerkUser.id);

  const chatList = await prisma.ride_chats.findMany({
    where: {
      OR: [
        { participantA: currentDbUser?.id },
        { participantB: currentDbUser?.id },
      ],
    },
    include: {
      ride: {
        select: {
          id: true,
          fromText: true,
          toText: true,
        },
      },

      participantAUser: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      participantBUser: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },

      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
        select: {
          content: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  console.log("chatList", chatList);
  return (
    <main className="mt-[4rem] max-w-2xl mx-auto ">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <div className="">
        {chatList.map((chat, idx) => {
          const otherUser =
            chat.participantA === currentDbUser?.id
              ? chat.participantBUser
              : chat.participantAUser;
          return (
            <Link
              href={`/rides/${chat.ride.id}/chat/${otherUser.id}`}
              className=""
              key={chat.id}
            >
              <div className="md:rounded-lg p-4 flex items-center justify-between gap-2 hover:bg-muted-foreground/10 transition-colors">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarImage src={otherUser.imageUrl ?? undefined} />
                    <AvatarFallback>{otherUser.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{otherUser.name}</h3>
                    <div className="flex items-center gap-1 ">
                      <div className="text-sm font-medium line-clamp-1 ">
                        {chat.ride.fromText}
                      </div>

                      <ArrowRight className="size-5 " />

                      <div className="text-sm font-medium line-clamp-1 ">
                        {chat.ride.toText}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1 ">
                      {chat.messages[0].content.slice(0, 200)}
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-6 shrink-0 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default RideChatList;

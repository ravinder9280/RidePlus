"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  MoveLeft,
  Send,
  Star,
} from "lucide-react";
import Link from "next/link";
import { format, isToday, isYesterday } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import sendMessage from "@/actions/rides/message";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";

type Message = {
  message: string;
  sender_id: string;
  sender_name: string | null;
  profile_image: string | null;
  created_at: string;
};
type ChatInitData = {
  authorized: boolean;
  currentUserId: string;
  otherUser: {
    id: string;
    name: string | null;
    imageUrl: string | null;
    rating: number;
  };
  ride: {
    id: string;
    fromText: string;
    toText: string;
    departureAt: string | Date;
    status: string;
  };
  chatId: string;
  messages: {
    content: string;
  }[];
};
const RideChatPage = ({
  params,
}: {
  params: { id: string; userId: string };
}) => {
  const rideId = params.id;
  const { user } = useUser();
  const { userId: currentUserId } = useCurrentUserId();
  const supabase = supabaseClient;
  const msgEndRef = useRef<HTMLDivElement>(null);

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";

    return format(date, "MMMM d, yyyy");
  };
  const otherUserId = params.userId;

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState<ChatInitData | null>(null);
  const [isOtherOnline, setIsOtherOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  const channelRef = useRef<any>(null);

  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/api/rides/${rideId}/chat/${otherUserId}`);
      const data = await res.json();

      setChatData(data);
      setMessages(data.messages);
      setLoading(false);
    };

    if (user) init();
  }, [user, rideId, otherUserId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (!chatData?.chatId || !currentUserId) return;

    const channel = supabase.channel(`chat-${chatData.chatId}`, {
      config: {
        broadcast: { self: true },
        presence: { key: currentUserId },
      },
    });

    channel
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prev) => [...prev, payload.payload]);
      })

      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const usersOnline = Object.values(state).flat() as any[];

        const otherOnline = usersOnline.some((u) => u.userId === otherUserId);

        setIsOtherOnline(otherOnline);
      })

      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            userId: currentUserId,
          });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatData?.chatId, currentUserId, otherUserId, supabase]);
  const handleSend = async () => {
    if (!message.trim() || !channelRef.current) return;

    const tempMessage = {
      sender_id: currentUserId!,
      sender_name: user?.fullName || "User",
      profile_image: user?.imageUrl || null,
      message,
      created_at: new Date().toISOString(),
    };

    channelRef.current.send({
      type: "broadcast",
      event: "message",
      payload: tempMessage,
    });
    console.log(messages);

    sendMessage({
      chatId: chatData?.chatId || "",
      senderId: currentUserId || "",
      message,
      createdAt: tempMessage.created_at,
    }).catch(console.error);
    setMessage("");
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center w-full">
        <Spinner />
      </div>
    );

  return (
    <main className="flex flex-col h-[calc(100vh-64px)] mt-[4rem]">
      <div className="flex flex-col h-full max-w-2xl w-full mx-auto">
        <div>
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
            <Link
              href={`/rides/${rideId}`}
              className="hover:text-muted-foreground transition-colors p-1 hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="size-6 text-primary" />
            </Link>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={chatData?.otherUser.imageUrl ?? undefined} />
                <AvatarFallback>
                  {chatData?.otherUser.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-sm font-medium">
                  {chatData?.otherUser.name}
                </h3>
                <div className="text-muted-foreground flex items-center text-sm gap-1">
                  <span>
                    <Star size={10} fill="yellow" stroke="yellow" />
                  </span>
                  {chatData?.otherUser.rating?.toFixed(1) ?? "0"}/5
                </div>
              </div>
              <span
                className={`h-2 w-2 rounded-full ${
                  isOtherOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-white/10">
            <div>
              <div className="flex items-center gap-1">
                <div className="text-sm font-medium line-clamp-1">
                  {chatData?.ride.fromText}
                </div>
                <ArrowRight className="size-5" />
                <div className="text-sm font-medium line-clamp-1">
                  {chatData?.ride.toText}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  {chatData?.ride.departureAt &&
                    format(
                      new Date(chatData?.ride.departureAt as Date),
                      "MMM d, yyyy , h:mm a",
                    )}
                </span>
              </div>
            </div>
            <ChevronRight className="size-6 text-muted-foreground" />
          </div>
        </div>

        <div className=" flex-1 p-4 space-y-6 h-full overflow-y-auto">
          {messages.map((msg, index) => {
            const currentDate = new Date(msg.created_at);

            const prevDate =
              index > 0 ? new Date(messages[index - 1].created_at) : null;

            const showDateSeparator =
              !prevDate ||
              currentDate.toDateString() !== prevDate.toDateString();

            return (
              <>
                {showDateSeparator && (
                  <div className="flex justify-center my-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                      {getDateLabel(currentDate)}
                    </span>
                  </div>
                )}

                <div
                  key={index}
                  className={`flex gap-2  ${msg.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%]  flex flex-col gap-1 ${msg.sender_id === currentUserId ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${msg.sender_id === currentUserId ? "bg-primary rounded-ee-none" : "bg-secondary rounded-ss-none"} `}
                    >
                      <p
                        className={`text-sm font-medium ${msg.sender_id === currentUserId ? "text-primary-foreground" : "text-secondary-foreground"}`}
                      >
                        {msg.message}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(msg.created_at), "h:mm a")}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
          <div ref={msgEndRef} />
        </div>

        <div className="p-4 bg-muted/60 rounded-t-2xl shadow-2xl">
          <div className="flex items-end gap-2">
            <div className="flex-1 flex items-center pl-2 gap-2 px-2 rounded-xl h-10 border border-muted-foreground relative">
              <MessageCircle className="text-muted-foreground" />

              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Enter your message..."
                className="shadow-none focus-visible:ring-0 h-full border-none p-0 bg-transparent"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!message.trim() || loading}
              className="h-10"
            >
              <Send className="size-8" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RideChatPage;

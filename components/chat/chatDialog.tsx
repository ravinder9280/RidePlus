"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Markdown } from "./Markdown";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTypewriter } from "@/hooks/typewriterHook";
type ChatMessage = { type: "user" | "ai"; text: string };

const SYSTEM_PROMPT = `
You are RidePlus AI, an expert assistant for the RidePlus ride sharing platform
(similar to BlaBlaCar).

Rules:
- Always answer in **valid Markdown** (no HTML).
- Use headings (##), bullet lists (-), and numbered lists (1.) when helpful.
- For common RidePlus questions, follow this structure:

## Summary
1–2 sentences.

## How it works
Explain the process in simple steps.

## Important details
Bullet list of fares, safety, requirements, and edge cases.

## Example
Give a concrete example using RidePlus.

Only talk about RidePlus and ride sharing. If user asks unrelated things, briefly
answer and gently bring the topic back to RidePlus.
`;

const TypewriterMarkdown: React.FC<{
  text: string;
  scrollAnchorRef: React.RefObject<HTMLDivElement>;
}> = ({ text }) => {
  const { displayed } = useTypewriter(text, 1);

  // keep scrolling down while typing
  // useEffect(() => {
  //   scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [animated, scrollAnchorRef]);

  return <Markdown>{displayed}</Markdown>;
};

const ChatDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const suggestedQuestions = [
    "How does RidePlus work?",
    "Is RidePlus available in my city?",
    "How can I book a RidePlus ride?",
    "What are the fares for RidePlus?",
    "How do I contact RidePlus customer support?",
    "What payment options are available on RidePlus?",
    "Are RidePlus rides safe for solo travelers?",
    "Does RidePlus provide ride history or receipts?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isSheetOpen) {
      scrollToBottom();
    }
  }, [messages, sending, isSheetOpen, isOpen]);

  const sendMessageToAI = async (
    rawQuestion: string,
    opts?: { openSheet?: boolean },
  ) => {
    const q = rawQuestion.trim();
    if (!q || sending) return;

    if (opts?.openSheet && !isSheetOpen) {
      setIsOpen(false);
      setIsSheetOpen(true);
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { type: "user", text: q },
    ];
    setMessages(nextMessages);
    setSending(true);

    try {
      const payload = {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...nextMessages.map((m) =>
            m.type === "user"
              ? ({ role: "user", content: m.text } as const)
              : ({ role: "assistant", content: m.text } as const),
          ),
        ],
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Some Error Occured");
      }

      const data = (await res.json()) as { text?: string };
      const aiText =
        data.text?.trim() || "Sorry, I could not generate a response.";

      setMessages((prev) => [...prev, { type: "ai", text: aiText }]);
    } catch (err: unknown) {
      console.error(err);

      toast.error("Some Error Occured");

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Could not Generate Response ",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleSuggestedClick = (suggested: string) => {
    setIsOpen(false);
    setIsSheetOpen(true);
    setQuestion("");
    void sendMessageToAI(suggested, { openSheet: false });
  };

  const handleSend = async () => {
    const q = question.trim();
    if (!q || sending) return;

    setQuestion("");
    await sendMessageToAI(q, { openSheet: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-5 md:bottom-20 right-4 z-[48]">
        {!isOpen && !isSheetOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary hover:bg-primary/90 w-14 h-14 text-primary-foreground rounded-full p-4 shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-7 h-7" />
          </button>
        )}

        {isOpen && !isSheetOpen && (
          <div className="rounded-lg shadow-xl animate-in slide-in-from-bottom-2 duration-200 w-80 md:w-96 max-h-[500px] flex flex-col">
            <div className="bg-primary p-4 text-primary-foreground rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">Ask AI</h3>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                className="rounded-full transition-colors"
                variant="ghost"
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 rounded-b-lg space-y-4 bg-background p-4">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedClick(q)}
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border text-xs bg-primary/10 border-primary/20 text-primary hover:bg-primary/5 rounded-full px-3 py-1 h-auto disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1 flex items-center px-2 rounded-3xl border border-muted-foreground relative">
                  <Sparkles className="text-muted-foreground" />
                  <Input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter your question"
                    className="shadow-none focus-visible:ring-0 bg-transparent h-10"
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!question.trim() || sending}
                  className="rounded-full h-10 w-10"
                  size="icon"
                >
                  <Send className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full gap-0 sm:max-w-xl p-0 z-[999999] border-none md:rounded-l-2xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0"
        >
          <div className="border-b border-muted/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">RidePlus AI</h2>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => setIsSheetOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((msg, index) => {
              const isLastMessage = index === messages.length - 1;

              return (
                <div key={index} className="flex gap-2 items-end">
                  {msg.type === "ai" && (
                    <div className="space-y-3">
                      <div className="flex items-center text-muted-foreground font-semibold gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span>RidePlus AI</span>
                      </div>

                      <div
                        className="
                          border shadow-sm  p-3 border-none
                          tracking-wide text-muted-foreground 
                          bg-muted rounded-xl 
                          leading-relaxed text-sm font-medium
                        "
                      >
                        {isLastMessage ? (
                          <TypewriterMarkdown
                            text={msg.text}
                            scrollAnchorRef={messagesEndRef}
                          />
                        ) : (
                          <Markdown>{msg.text}</Markdown>
                        )}
                      </div>
                    </div>
                  )}

                  {msg.type === "user" && (
                    <>
                      <div
                        className="
                          border shadow-sm max-w-[80%] p-3 border-none rounded-none
                          bg-primary text-primary-foreground rounded-l-[14px]
                          rounded-tr-[14px] rounded-br-none text-sm font-medium
                          ml-auto
                        "
                      >
                        <span>{msg.text}</span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        {user ? (
                          <Avatar className="h-8 w-8 rounded-full ">
                            <AvatarImage src={user?.imageUrl || undefined} />
                            <AvatarFallback>
                              {user?.fullName ?? "U"}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {sending && (
              <div className="flex gap-2 justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="border flex items-center gap-2  bg-muted text-muted-foreground shadow-sm max-w-[90%] p-3 border-none rounded-none  rounded-r-[14px] rounded-tl-[14px] rounded-bl-none leading-relaxed text-sm font-medium">
                  <span className="relative">Processing</span>
                  <Spinner />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-muted/60 rounded-t-2xl shadow-2xl">
            <div className="flex items-end gap-2">
              <div className="flex-1 flex items-center pl-2 gap-2 px-2 rounded-xl h-10 border border-muted-foreground relative">
                <Sparkles className="text-muted-foreground" />

                <Input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter your question"
                  className="shadow-none focus-visible:ring-0 h-full border-none p-0 bg-transparent"
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!question.trim() || sending}
                className="h-10"
              >
                {sending ? (
                  <Spinner className="size-8" />
                ) : (
                  <Send className="size-8" />
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatDialog;

import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt: string | undefined = body?.prompt ?? body?.question;
    const messages: Array<{ role: 'user' | 'system' | 'assistant'; content: string }> | undefined =
      Array.isArray(body?.messages) ? body.messages : undefined;

    if ((!prompt || typeof prompt !== 'string') && !messages) {
      return NextResponse.json({ error: 'Missing prompt or messages' }, { status: 400 });
    }

    const google = createGoogleGenerativeAI({

      apiKey: process.env.GOOGLE_GEMINI_API_KEY,


    });
    const requestMessages =
      messages && messages.length
        ? messages
        : [{ role: 'user' as const, content: String(prompt ?? '') }];

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      messages: requestMessages,



    });
    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Text Generation Error' }, { status: 502 });

    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error('AI chat route error:', err instanceof Error ? err.message : "some error occured");
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



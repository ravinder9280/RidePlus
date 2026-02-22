import { NextRequest, NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/langchain/embedding";
import { supabaseServer } from "@/lib/supabase/server";
import { z } from "zod";

export const runtime = "nodejs";
const match_threshold = 0.3;
const match_count = 5;
const searchSchema = z.object({
  query: z.string().min(1).max(500),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = searchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.flatten(),
          message: "Invalid search parameters",
        },
        { status: 400 },
      );
    }
    const { query } = parsed.data;

    // Generate embedding for the search query
    const embedding = await generateEmbedding(query);

    // Get Supabase client
    const supabase = supabaseServer();

    // Call the match_rides RPC function
    const { data, error } = await supabase.rpc("match_rides", {
      query_embedding: embedding.slice(0, 768).join(","), // Ensure 768 dimensions
      match_threshold,
      match_count,
    });

    if (error) {
      console.error("Vector search error:", error);
      return NextResponse.json(
        {
          ok: false,
          message: error.message || "Vector search failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Search completed successfully",
      rides: data || [],
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Vector search route error:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}

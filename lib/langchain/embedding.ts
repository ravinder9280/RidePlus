import { genAI } from "../config/google";
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error("Missing GOOGLE_GEMINI_API_KEY");
  }

  if (typeof text !== "string") {
    throw new TypeError("Input must be a string");
  }

  const trimmed = text.trim();

  if (!trimmed) {
    throw new Error("Text cannot be empty");
  }

  if (trimmed.length > 20_000) {
    throw new Error("Text too long to embed");
  }

  try {
    const vector = await genAI.embedQuery(trimmed);

    return vector;
  } catch (error) {
    console.error("Embedding generation failed:", error);
    throw new Error("Failed to generate embedding");
  }
}

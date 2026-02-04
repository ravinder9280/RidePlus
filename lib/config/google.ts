import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

export const genAI = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001", // 768 dims
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
  taskType: TaskType.RETRIEVAL_DOCUMENT,
});

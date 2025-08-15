import { askGeminiQuestion } from "@/components/dataFile/GeminiApi.js";

export async function POST(req) {
  try {
    const { question, resumeSummary, interviewType } = await req.json();

    if (!question || !resumeSummary || !interviewType) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const response = await askGeminiQuestion(question, resumeSummary, interviewType);
    return new Response(JSON.stringify({ answer: response }), { status: 200 });
    
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(JSON.stringify({ error: "Failed to contact Gemini API" }), { status: 500 });
  }
}

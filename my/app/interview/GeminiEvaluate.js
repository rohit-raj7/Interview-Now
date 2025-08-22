import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCByiQxFsWzpE4pUKU30JCztVzcYsK05nM";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ✅ Batch evaluation after interview
export async function evaluateAllAnswersWithGemini(
  questions,
  answers,
  resumeSummary,
  interviewType
) {
  const prompt = `
You are a professional ${interviewType} interviewer.
Here are the interview details:

Resume Summary:
${resumeSummary}

Questions and Candidate's Answers:
${questions.map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "(no answer)"}`).join("\n\n")}

Now evaluate each answer with:
Q#: Score: X/10
Feedback: short feedback

Also give a Final Total Score at the end.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("⚠ Gemini error:", err.message);
    return "Evaluation failed. Please retry.";
  }
}

// import { GoogleGenerativeAI } from "@google/generative-ai";
 
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCByiQxFsWzpE4pUKU30JCztVzcYsK05nM" || "AIzaSyD6LqdzQo1_99kff0akJMLqtkWih-mcmn8";

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// export async function evaluateAnswerWithGemini(question, candidateAnswer, resumeSummary, interviewType) {
//   const prompt = `
// You are a professional ${interviewType} interviewer.
// Question: ${question}
// Candidate's Answer: ${candidateAnswer}
// Resume Summary: ${resumeSummary}

// Return STRICTLY in this format:
// Score: X/10
// Feedback: <short constructive feedback>
//   `;

//   // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//   const result = await model.generateContent(prompt);

//   return result.response.text();
// }



import { GoogleGenerativeAI } from "@google/generative-ai";


const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCByiQxFsWzpE4pUKU30JCztVzcYsK05nM" || "AIzaSyD6LqdzQo1_99kff0akJMLqtkWih-mcmn8";
 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Simple fallback evaluator (if Gemini quota exceeded)
function fallbackEvaluate(question, answer) {
  if (!answer.trim()) {
    return "Score: 0/10\nFeedback: No answer provided.";
  }

  // basic keyword matching
  const keywords = question.split(" ").slice(0, 5); // first 5 words
  const matches = keywords.filter(k =>
    answer.toLowerCase().includes(k.toLowerCase())
  );

  const score = Math.min(10, matches.length * 2);
  return `Score: ${score}/10\nFeedback: Fallback evaluation used. Answer covered ${matches.length} keywords from the question.`;
}

export async function evaluateAnswerWithGemini(
  question,
  candidateAnswer,
  resumeSummary,
  interviewType
) {
  const prompt = `
You are a professional ${interviewType} interviewer.
Question: ${question}
Candidate's Answer: ${candidateAnswer}
Resume Summary: ${resumeSummary}

Return STRICTLY in this format:
Score: X/10
Feedback: <short constructive feedback>
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ lighter model
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("⚠ Gemini error:", err.message);

    if (err.message.includes("429")) {
      // rate limit hit → fallback
      return fallbackEvaluate(question, candidateAnswer);
    }

    return `Score: 0/10\nFeedback: Gemini API failed.`;
  }
}



 
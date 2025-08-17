// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function askGeminiQuestion(question, resumeSummary, interviewType) {
//   const prompt = `
// You are acting as a professional ${interviewType} interviewer.
// Here is the candidate's resume summary:
// ${resumeSummary}

// Ask the candidate the following question in a conversational, professional way:
// "${question}"
//   `;

//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//   const result = await model.generateContent(prompt);

//   return result.response.text();
// }




import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function evaluateAnswerWithGemini(question, candidateAnswer, resumeSummary, interviewType) {
  const prompt = `
You are a professional ${interviewType} interviewer.
Question: ${question}
Candidate's Answer: ${candidateAnswer}
Resume Summary: ${resumeSummary}

Return STRICTLY in this format:
Score: X/10
Feedback: <short constructive feedback>
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

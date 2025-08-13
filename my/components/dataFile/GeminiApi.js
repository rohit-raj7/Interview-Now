// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

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

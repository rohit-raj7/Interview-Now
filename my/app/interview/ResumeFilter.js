 

// // export function filterResumeData(resumeData, role, interviewType) {
// //   if (!resumeData) {
// //     console.warn("⚠️ filterResumeData: resumeData is undefined or null");
// //     return { questions: [], cleanText: "" };
// //   }

// //   const {
// //     keywords = [],
// //     technical_questions = [],
// //     managerial_questions = [],
// //     hr_questions = [],
// //     questions = [],
// //     text_preview = ""
// //   } = resumeData;

// //   const cleanText = text_preview
// //     .replace(/\b\d{10}\b/g, '[REDACTED PHONE]')
// //     .replace(/\S+@\S+\.\S+/g, '[REDACTED EMAIL]')
// //     .replace(/(LinkedIn|GitHub|Portfolio)/gi, '[REDACTED LINK]');

// //   const filterByRoleAndType = (arr) =>
// //     Array.from(new Set(arr)).filter(q =>
// //       q.toLowerCase().includes(role.toLowerCase()) ||
// //       q.toLowerCase().includes(interviewType.toLowerCase())
// //     );

// //   return {
// //     keywords,
// //     questions: [
// //       ...filterByRoleAndType(technical_questions),
// //       ...filterByRoleAndType(managerial_questions),
// //       ...filterByRoleAndType(hr_questions),
// //       ...filterByRoleAndType(questions)
// //     ],
// //     cleanText
// //   };
// // }


// // export function filterResumeData(resumeData, role = "", interviewType = "") {
// //   if (!resumeData) {
// //     console.warn("⚠️ filterResumeData: resumeData is undefined or null");
// //     return { questions: [], cleanText: "" };
// //   }

// //   const {
// //     keywords = [],
// //     technical_questions = [],
// //     managerial_questions = [],
// //     hr_questions = [],
// //     questions = [],
// //     text_preview = ""
// //   } = resumeData;

// //   // ✅ Clean up resume text
// //   const cleanText = (text_preview || "")
// //     .replace(/\b\d{10}\b/g, "[REDACTED PHONE]")
// //     .replace(/\S+@\S+\.\S+/g, "[REDACTED EMAIL]")
// //     .replace(/(LinkedIn|GitHub|Portfolio)/gi, "[REDACTED LINK]");

// //   const normalize = (str) => (str || "").toLowerCase().trim();
// //   const normRole = normalize(role);
// //   const normType = normalize(interviewType);

// //   // ✅ Smart filter function
// //   const filterByRelevance = (arr, priority) => {
// //     return Array.from(new Set(arr)) // remove duplicates
// //       .map((q) => q.trim())
// //       .filter(Boolean)
// //       .filter((q) => {
// //         const nq = normalize(q);

// //         // Strong match: contains role or interviewType keywords
// //         if (nq.includes(normRole) || nq.includes(normType)) return true;

// //         // Soft match: matches "developer" when role = "Software Developer"
// //         if (normRole && nq.includes(normRole.split(" ")[0])) return true;

// //         // Priority fallback: always include some questions if array is small
// //         return priority === "generic";
// //       });
// //   };

// //   // ✅ Step 1: filter with priority
// //   let finalQuestions = [
// //     ...filterByRelevance(technical_questions, "technical"),
// //     ...filterByRelevance(managerial_questions, "managerial"),
// //     ...filterByRelevance(hr_questions, "hr"),
// //     ...filterByRelevance(questions, "generic")
// //   ];

// //   // ✅ Step 2: extended fallback if needed
// //   if (finalQuestions.length < 1) {
// //     const fallback = [
// //       // General HR
// //       `Tell me about yourself and your interest in ${role || "this role"}.`,
// //       `Why do you want to work in ${role || "this position"}?`,
// //       `What are your key strengths relevant to a ${role || "job"}?`,
// //       `What is one weakness you are working on improving?`,
// //       `Where do you see yourself in 5 years?`,

// //       // Technical (adapt role if given)
// //       `What technical skills make you a strong candidate for a ${role || "technical role"}?`,
// //       `Describe a project where you solved a difficult technical challenge.`,
// //       `How do you keep yourself updated with the latest technologies?`,
// //       `Explain a time when you optimized code or improved system performance.`,
// //       `What tools, frameworks, or libraries are you most comfortable with?`,

// //       // Behavioral / Situational
// //       `Describe a time when you had a conflict in a team. How did you handle it?`,
// //       `Tell me about a project that failed. What did you learn from it?`,
// //       `How do you prioritize tasks when working on multiple projects?`,
// //       `How do you handle tight deadlines and pressure situations?`,
// //       `Give me an example of when you took initiative beyond your responsibilities.`
// //     ];

// //     // Merge with existing & ensure uniqueness
// //     finalQuestions = [...new Set([...finalQuestions, ...fallback])].slice(0, 15);
// //   }

// //   return {
// //     keywords,
// //     questions: finalQuestions,
// //     cleanText
// //   };
// // }








// export function filterResumeData(resumeData, role, interviewType) {
//   if (!resumeData) {
//     console.warn("⚠️ filterResumeData: resumeData is undefined or null");
//     return { questions: [], cleanText: "" };
//   }

//   const {
//     keywords = [],
//     technical_questions = [],
//     managerial_questions = [],
//     hr_questions = [],
//     questions = [],
//     text_preview = ""
//   } = resumeData;

//   // ✅ Clean personal info
//   const cleanText = text_preview
//     .replace(/\b\d{10}\b/g, '[REDACTED PHONE]')
//     .replace(/\S+@\S+\.\S+/g, '[REDACTED EMAIL]')
//     .replace(/(LinkedIn|GitHub|Portfolio)/gi, '[REDACTED LINK]');

//   // ✅ Helper: loose matching
//   const looselyMatches = (q) => {
//     const roleWords = role.toLowerCase().split(" ");
//     return (
//       q.toLowerCase().includes(interviewType.toLowerCase()) ||
//       roleWords.some((w) => q.toLowerCase().includes(w))
//     );
//   };

//   // Step 1 → try role/type match
//   let filtered = [
//     ...technical_questions.filter(looselyMatches),
//     ...managerial_questions.filter(looselyMatches),
//     ...hr_questions.filter(looselyMatches),
//     ...questions.filter(looselyMatches),
//   ];

//   // Step 2 → if empty, include all resume questions (don’t drop anything)
//   if (filtered.length === 0) {
//     filtered = [
//       ...technical_questions,
//       ...managerial_questions,
//       ...hr_questions,
//       ...questions,
//     ];
//   }

//   // ✅ Deduplicate + trim
//   const uniqueQuestions = Array.from(new Set(filtered.map((q) => q.trim())));

//   return {
//     keywords,
//     questions: uniqueQuestions,
//     cleanText,
//   };
// }




export function filterResumeData(resumeData, role, interviewType) {
  if (!resumeData) {
    console.warn("⚠️ filterResumeData: resumeData is undefined or null");
    return { questions: [], cleanText: "" };
  }

  const {
    keywords = [],
    technical_questions = [],
    managerial_questions = [],
    hr_questions = [],
    questions = [],
    text_preview = ""
  } = resumeData;

  // ✅ Clean personal info
  const cleanText = text_preview
    .replace(/\b\d{10}\b/g, '[REDACTED PHONE]')
    .replace(/\S+@\S+\.\S+/g, '[REDACTED EMAIL]')
    .replace(/(LinkedIn|GitHub|Portfolio)/gi, '[REDACTED LINK]');

  // ✅ Select questions based on interviewType
  let filtered = [];
  if (interviewType.toLowerCase() === "hr") {
    filtered = hr_questions;
  } else if (interviewType.toLowerCase() === "technical" || interviewType.toLowerCase() === "coding") {
    filtered = technical_questions;
  } else if (interviewType.toLowerCase() === "managerial") {
    filtered = managerial_questions;
  } else {
    // fallback → combine everything
    filtered = [
      ...technical_questions,
      ...managerial_questions,
      ...hr_questions,
      ...questions,
    ];
  }

  // ✅ Fallback if no questions in selected type
  if (filtered.length === 0) {
    filtered = [
      ...technical_questions,
      ...managerial_questions,
      ...hr_questions,
      ...questions,
    ];
  }

  // ✅ Deduplicate + trim
  const uniqueQuestions = Array.from(new Set(filtered.map((q) => q.trim())));

  return {
    keywords,
    questions: uniqueQuestions,
    cleanText,
  };
}

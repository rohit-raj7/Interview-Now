 


// export function filterResumeData(resumeData, role, interviewType) {
//   if (!resumeData) {
//     console.warn("⚠️ filterResumeData: resumeData is undefined or null");
//     return null;
//   }

//   const {
//     keywords = [],
//     technical_questions = [],
//     managerial_questions = [],
//     hr_questions = [],
//     questions = [],
//     text_preview = ""
//   } = resumeData;

//   // Remove personal info
//   const cleanText = text_preview
//     .replace(/\b\d{10}\b/g, '[REDACTED PHONE]')
//     .replace(/\S+@\S+\.\S+/g, '[REDACTED EMAIL]')
//     .replace(/(LinkedIn|GitHub|Portfolio)/gi, '[REDACTED LINK]');

//   // Helper function to filter questions
//   const filterByRoleAndType = (arr) => {
//     return Array.from(new Set(arr)).filter(q =>
//       q.toLowerCase().includes(role.toLowerCase()) ||
//       q.toLowerCase().includes(interviewType.toLowerCase()) ||
//       interviewType.toLowerCase() === "hr" ||
//       interviewType.toLowerCase() === "technical" ||
//       interviewType.toLowerCase() === "managerial"
//     );
//   };
 
//   const finalData = {
//   keywords,
//   technical_questions: filterByRoleAndType(technical_questions),
//   managerial_questions: filterByRoleAndType(managerial_questions),
//   hr_questions: filterByRoleAndType(hr_questions),
//   general_questions: filterByRoleAndType(questions),
//   questions: [
//     ...filterByRoleAndType(technical_questions),
//     ...filterByRoleAndType(managerial_questions),
//     ...filterByRoleAndType(hr_questions),
//     ...filterByRoleAndType(questions)
//   ],
//   cleanText
// };


//   console.log("📄 Filtered Resume Data:", finalData);
//   return finalData;
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

  const cleanText = text_preview
    .replace(/\b\d{10}\b/g, '[REDACTED PHONE]')
    .replace(/\S+@\S+\.\S+/g, '[REDACTED EMAIL]')
    .replace(/(LinkedIn|GitHub|Portfolio)/gi, '[REDACTED LINK]');

  const filterByRoleAndType = (arr) =>
    Array.from(new Set(arr)).filter(q =>
      q.toLowerCase().includes(role.toLowerCase()) ||
      q.toLowerCase().includes(interviewType.toLowerCase())
    );

  return {
    keywords,
    questions: [
      ...filterByRoleAndType(technical_questions),
      ...filterByRoleAndType(managerial_questions),
      ...filterByRoleAndType(hr_questions),
      ...filterByRoleAndType(questions)
    ],
    cleanText
  };
}

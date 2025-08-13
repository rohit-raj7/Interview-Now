// export function filterResumeData(resumeData, role, interviewType) {
//   const { keywords, questions, text_preview } = resumeData;

//   // Remove personal info
//   const cleanText = text_preview
//     .replace(/\b\d{10}\b/g, '[REDACTED PHONE]')
//     .replace(/\S+@\S+\.\S+/g, '[REDACTED EMAIL]')
//     .replace(/(LinkedIn|GitHub|Portfolio)/gi, '[REDACTED LINK]');

//   // Unique + relevant questions
//   const filteredQuestions = Array.from(new Set(questions))
//     .filter(q => {
//       return (
//         q.toLowerCase().includes(role.toLowerCase()) ||
//         q.toLowerCase().includes(interviewType.toLowerCase()) ||
//         interviewType === 'HR' // allow general HR questions
//       );
//     });

//   return {
//     keywords,
//     questions: filteredQuestions.length > 0 ? filteredQuestions : questions,
//     cleanText
//   };
// }


export function filterResumeData(resumeData, role, interviewType) {
  if (!resumeData) {
    console.warn("⚠️ filterResumeData: resumeData is undefined or null");
    return null;
  }

  const { keywords, questions, text_preview } = resumeData;

  // Remove personal info
  const cleanText = text_preview
    .replace(/\b\d{10}\b/g, '[REDACTED PHONE]')
    .replace(/\S+@\S+\.\S+/g, '[REDACTED EMAIL]')
    .replace(/(LinkedIn|GitHub|Portfolio)/gi, '[REDACTED LINK]');

  // Unique + relevant questions
  const filteredQuestions = Array.from(new Set(questions))
    .filter(q => {
      return (
        q.toLowerCase().includes(role.toLowerCase()) ||
        q.toLowerCase().includes(interviewType.toLowerCase()) ||
        interviewType === 'HR' // allow general HR questions
      );
    });

  const finalData = {
    keywords,
    questions: filteredQuestions.length > 0 ? filteredQuestions : questions,
    cleanText
  };

  // ✅ Log the result before returning
  console.log("📄 Filtered Resume Data:", finalData);

  return finalData;
}

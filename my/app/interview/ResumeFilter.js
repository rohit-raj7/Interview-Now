 

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

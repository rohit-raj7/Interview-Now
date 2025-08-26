export async function uploadResume(resumeFile) {
  const formData = new FormData();
  formData.append('resume', resumeFile);

  const res = await fetch('https://interview-now1-1.onrender.com/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}



 

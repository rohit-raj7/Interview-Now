 
 
export async function uploadResume(resumeFile) {
  const formData = new FormData();
  formData.append('resume', resumeFile);
 
  const api = 'https://pyhon-backend.onrender.com'
           || 'https://interview-now1-1.onrender.com'; 

  const res = await fetch(`${api}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

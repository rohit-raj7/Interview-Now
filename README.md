# AI Interview Platform

An end-to-end AI interview platform where candidates can upload resumes, select the type of interview (HR, Manager, Technical), and interact with an AI video/voice interviewer. The platform evaluates candidate responses, provides feedback, ratings, and a detailed skills report.

## Features

* **Resume Upload & Parsing**: Extract skills, roles, education, projects, and achievements using Python NLP (spaCy, custom NER).
* **AI Video Interviewer**: Avatar-based interviewer with TTS, two-way WebRTC video, and dynamic question flow.
* **Answer Evaluation**: Gemini API for rubric-driven scoring on correctness, communication, and behavioral indicators.
* **Real-Time STT**: Speech-to-text for candidate answers with diarization and transcript overlay.
* **Feedback & Reports**: Per-question feedback, skill-level ratings, improvement suggestions, and overall readiness score.
* **Security & Auth**: JWT authentication, role-based access, upload scanning, and signed URLs for media.
* **Analytics & Monitoring**: Logs, latency metrics, STT accuracy, and session replay for audit.

--

## Live Project : https://ai-interviewnow.vercel.app/
--
## Tech Stack

* **Frontend**: Next.js, React, Tailwind CSS
* **Backend/API**: Node.js/Express, Python (FastAPI/Flask), WebSocket/WebRTC
* **AI & NLP**: Gemini API, spaCy, STT/TTS services
* **Database & Storage**: MongoDB/PostgreSQL, S3-compatible storage, Redis queues
* **DevOps**: Docker, Vercel, Cloud Hosting

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/<username>/ai-interview-platform.git
```

2. Install dependencies for frontend and backend.
3. Configure environment variables for Gemini API, DB, and STT/TTS keys.
4. Run frontend:

```bash
cd frontend
npm install
npm run dev
```

5. Run backend:

```bash
cd backend
pip install -r requirements.txt
python main.py
```

## Usage

* Upload a candidate resume.
* Select interview type (HR/Manager/Technical).
* Start the AI video interview.
* Get real-time evaluation, feedback, and final report.

## Contributing

* Fork the repository.
* Create a feature branch.
* Submit a pull request with detailed description.

## License

MIT License

## Links

* Demo: `<your-demo-url>`
* Documentation: `<your-docs-url>`
* GitHub: `https://github.com/<username>/ai-interview-platform`

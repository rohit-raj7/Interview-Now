 
import spacy
import random
import fitz
import docx2txt
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Question templates
TECHNICAL_QUESTION_TEMPLATE = "Can you explain how you implemented or used '{}'?"

HR_QUESTION_TEMPLATE = [
    "Tell me about yourself.",
    "How would you describe yourself in one sentence?",
    "What motivates you to work on yourself?",
    "How do you handle stress and pressure while working on yourself?",
    "Why did you choose yourself in your career?",
    "What inspired you to pursue yourself?",
    "How did your education prepare you for '{}'?",
    "Why did you choose to work on '{}'?",
    "If you could change something about '{}', what would it be?",
    "Why do you want to work for a company dealing with '{}'?",
    "What do you know about '{}'?",
    "Why did you apply for a role related to '{}'?",
    "What makes you a good fit for '{}'?",
    "Where do you see yourself in 5 years with respect to '{}'?",
    "What are your greatest strengths in '{}'?",
    "What is your biggest weakness when it comes to '{}'?",
    "How are you improving yourself in '{}'?",
    "What’s a skill you are most proud of related to '{}'?",
    "Give an example of a time you showed leadership in '{}'.",
    "How do you prioritize work related to '{}'?",
    "How do you handle tight deadlines in '{}'?",
    "Describe a time you solved a difficult problem in '{}'.",
    "Have you ever failed at '{}' and how did you handle it?",
    "How do you handle criticism about '{}'?",
    "Describe a time you worked in a team on '{}'.",
    "How do you handle conflicts related to '{}'?",
    "What role do you play in a group project on '{}'?",
    "How do you handle disagreements about '{}' with your manager?",
    "How do you ensure clear communication in a '{}' project?",
    "What’s your biggest achievement related to '{}'?",
    "Tell me about a project on '{}' you are proud of.",
    "What’s the most important lesson you learned from '{}'?",
    "How do you stay updated about '{}' trends?",
    "Tell me about a time you learned '{}' quickly.",
    "How do you adapt to changes in '{}'?",
    "Tell me about a time you stepped out of your comfort zone in '{}'.",
    "How do you manage multiple '{}' tasks at once?",
    "Have you ever taken the initiative on a '{}' project?",
    "How do you handle unexpected challenges in '{}'?",
    "What does success mean to you in '{}'?",
    "How do you maintain work-life balance while working on '{}'?",
    "Who inspires you the most in relation to '{}' and why?",
    "What are your hobbies and interests related to '{}'?",
    "What kind of work environment do you prefer for '{}'?",
    "Why should we hire you for a '{}' role?",
    "Do you have any questions for us regarding '{}'?",
    "Are you willing to relocate for '{}'?",
    "What is your expected salary for a '{}' position?",
    "When can you join if selected for '{}'?"
]

MANAGERIAL_QUESTION_TEMPLATE = "How did '{}' impact your project/team management?"

# Entity types to consider
KEY_LABELS = ['ORG', 'PRODUCT', 'SKILL', 'PERSON', 'WORK_OF_ART', 'LANGUAGE', 'EVENT']

# Extract text from resume
def extract_text_from_resume(file):
    if file.filename.endswith('.pdf'):
        with fitz.open(stream=file.read(), filetype="pdf") as doc:
            return " ".join(page.get_text() for page in doc)
    elif file.filename.endswith('.docx'):
        return docx2txt.process(file)
    return ""

# Extract keywords and generate separate question lists
def extract_keywords_and_questions(text):
    doc = nlp(text)

    # Raw keywords
    raw_keywords = {
        token.text.strip()
        for token in doc
        if token.is_alpha and not token.is_stop and len(token.text) > 3
    }

    # Named entities
    named_entities = {
        ent.text.strip()
        for ent in doc.ents
        if ent.label_ in KEY_LABELS
    }

    all_keywords = sorted(list(raw_keywords | named_entities))[:30]

    # Split keywords for each category
    tech_keywords = all_keywords[:10]
    hr_keywords = all_keywords[10:20]
    managerial_keywords = all_keywords[20:30]

    # Technical questions
    technical_qs = [TECHNICAL_QUESTION_TEMPLATE.format(k) for k in tech_keywords]

    # HR questions
    hr_qs = []
    for k in hr_keywords:
        selected_qs = random.sample(HR_QUESTION_TEMPLATE, min(5, len(HR_QUESTION_TEMPLATE)))
        hr_qs.extend(q.format(k) for q in selected_qs)

    # Managerial questions
    managerial_qs = [MANAGERIAL_QUESTION_TEMPLATE.format(k) for k in managerial_keywords]

    return {
        "keywords": all_keywords,
        "technical_questions": technical_qs,
        "hr_questions": hr_qs,
        "managerial_questions": managerial_qs
    }
 
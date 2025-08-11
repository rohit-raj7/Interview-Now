
# import spacy
# nlp = spacy.load("en_core_web_sm")

# QUESTION_TEMPLATE = "Can you explain how you used '{}' in your project?"

# def extract_keywords_and_questions(text):
#     doc = nlp(text)
#     keywords = set(
#         token.text for token in doc 
#         if token.is_alpha and not token.is_stop and len(token.text) > 4
#     )
#     named_entities = {ent.text for ent in doc.ents if ent.label_ in ['ORG', 'PRODUCT', 'SKILL']}
#     all_keywords = list(keywords | named_entities)
#     questions = [QUESTION_TEMPLATE.format(k) for k in all_keywords[:10]]
#     return all_keywords[:20], questions





import spacy
nlp = spacy.load("en_core_web_sm")

TECHNICAL_QUESTION_TEMPLATE = "Can you explain how you implemented or used '{}' technically?"
HR_QUESTION_TEMPLATE = "Why did you choose '{}' in your journey?"
MANAGERIAL_QUESTION_TEMPLATE = "How did '{}' impact your project/team management?"

KEY_LABELS = ['ORG', 'PRODUCT', 'SKILL', 'PERSON', 'WORK_OF_ART', 'LANGUAGE', 'EVENT']


def extract_keywords_and_questions(text):
    doc = nlp(text)

    # Raw tokens
    raw_keywords = {
        token.text.strip() for token in doc
        if token.is_alpha and not token.is_stop and len(token.text) > 3
    }

    # Named entities from spaCy
    named_entities = {
        ent.text.strip() for ent in doc.ents if ent.label_ in KEY_LABELS
    }

    all_keywords = sorted(list(raw_keywords | named_entities))[:30]

    # Categorize and prepare different types of questions
    technical_qs = [TECHNICAL_QUESTION_TEMPLATE.format(k) for k in all_keywords[:10]]
    hr_qs = [HR_QUESTION_TEMPLATE.format(k) for k in all_keywords[10:20]]
    managerial_qs = [MANAGERIAL_QUESTION_TEMPLATE.format(k) for k in all_keywords[20:30]]

    return all_keywords, technical_qs + hr_qs + managerial_qs
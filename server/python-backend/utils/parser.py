
import fitz 
import docx2txt

def extract_text_from_resume(file):
    if file.filename.endswith('.pdf'):
        with fitz.open(stream=file.read(), filetype="pdf") as doc:
            return " ".join(page.get_text() for page in doc)
    elif file.filename.endswith('.docx'):
        return docx2txt.process(file)
    return ""
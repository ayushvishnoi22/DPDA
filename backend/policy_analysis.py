import sys
import json
import re
import spacy
from unicodedata import normalize

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

def clean_text(text):
    """Clean and normalize text before processing"""
    try:
        # Remove surrogate pairs and other problematic Unicode
        text = normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
        # Remove excessive whitespace and control characters
        text = re.sub(r'\s+', ' ', text).strip()
        return text.lower()
    except Exception as e:
        print(f"Error cleaning text: {e}", file=sys.stderr)
        return ""

def analyze_policy(policy_text):
    """Analyze the policy text and return results"""
    cleaned_text = clean_text(policy_text)
    if not cleaned_text:
        return {"error": "Failed to clean policy text"}
    
    try:
        doc = nlp(cleaned_text)
    except Exception as e:
        print(f"Error processing text with spaCy: {e}", file=sys.stderr)
        return {"error": "Failed to process text with NLP model"}
    
    checks = {
        "Consent": "consent" in cleaned_text,
        "Withdraw Consent": "withdraw" in cleaned_text or "revoke" in cleaned_text,
        "Grievance Officer": "grievance" in cleaned_text or "officer" in cleaned_text,
        "Purpose Limitation": any(word in cleaned_text for word in ["purpose", "collect", "use"]),
        "Retention": "retain" in cleaned_text or "storage" in cleaned_text,
        "Cross-border Transfer": "transfer" in cleaned_text or "outside india" in cleaned_text,
        "Children Data": "children" in cleaned_text or "under 18" in cleaned_text,
        "Data Sharing": "share" in cleaned_text or "third party" in cleaned_text,
        "Data Type": any(word in cleaned_text for word in ["name", "email", "phone", "ip", "address"]),
        "Access Rights": "access" in cleaned_text or "correct" in cleaned_text or "modify" in cleaned_text
    }

    results = [{"check": k, "present": v} for k, v in checks.items()]
    score = sum(10 for v in checks.values() if v)
    
    return {"results": results, "score": score}

if __name__ == "__main__":
    policy_text = sys.stdin.read()
    analysis = analyze_policy(policy_text)
    print(json.dumps(analysis))
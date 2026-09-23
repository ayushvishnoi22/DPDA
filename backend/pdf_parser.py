import sys
import pdfplumber
import json
import logging

logging.getLogger("pdfminer").setLevel(logging.ERROR)

def analyze_policy(text):
    checks = {
        "Consent": "consent" in text,
        "Withdraw Consent": "withdraw" in text,
        "Grievance Officer": "grievance" in text,
        "Purpose Limitation": any(word in text for word in ["purpose", "collect", "use"]),
        "Retention": "retain" in text,
        "Cross-border Transfer": "transfer" in text or "outside india" in text,
        "Children Data": "children" in text or "under 18" in text,
        "Data Sharing": "share" in text or "third party" in text,
        "Data Type": any(word in text for word in ["name", "email", "phone", "ip"]),
        "Access Rights": "access" in text or "correct" in text
    }
    return [{"check": k, "present": v} for k, v in checks.items()]

try:
    file_path = sys.argv[1]
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text.lower()

    result = analyze_policy(text)
    score = sum(10 for item in result if item["present"])
    print(json.dumps({"results": result, "score": score}))

except Exception as e:
    print(json.dumps({"error": str(e)}))

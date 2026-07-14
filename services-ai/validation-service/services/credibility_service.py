import json
import os


class CredibilityService:
    def __init__(self):

        current = os.path.dirname(__file__)
        data = os.path.join(current, "..", "data", "trusted_sources.json")

        data = os.path.abspath(data)

        with open(data, "r") as fp:
            self.sources = json.load(fp)

    def analyze(self, domain):

        if not domain:
            return {"domain": None, "score": 0, "category": "Unknown"}

        score = self.sources.get(domain)

        if score is None:
            return {"domain": domain, "score": 20, "category": "Unverified"}

        if score >= 95:
            category = "Highly Trusted"

        elif score >= 80:
            category = "Trusted"

        elif score >= 60:
            category = "Moderate"

        else:
            category = "Low"

        return {"domain": domain, "score": score, "category": category}

from urllib.parse import urlparse
from config import Config

COMMON_SUBDOMAINS = {"www", "m", "mobile", "amp"}

def validate_request(data):

    if not data:
        return False, "Missing request body."

    if "text" not in data:
        return False, 'Missing "text".'

    article = data["text"]

    if not isinstance(article, str):
        return False, '"text" must be string.'

    article = article.strip()

    if len(article) == 0:
        return False, "Article cannot be empty."

    if len(article) > Config.MAX_ARTICLE_LENGTH:
        return False, (f"Article exceeds " f"{Config.MAX_ARTICLE_LENGTH} characters.")

    return True, None

def validate_url(url):

    if not url:
        return None

    try:
        parsed = urlparse(url if "://" in url else f"https://{url}")

        if parsed.scheme and parsed.netloc:
            domain = parsed.netloc.lower().split("@")[-1].split(":")[0].strip(".")
            parts = domain.split(".")

            while len(parts) > 2 and parts[0] in COMMON_SUBDOMAINS:
                parts.pop(0)

            return ".".join(parts)

    except Exception:
        pass

    return None

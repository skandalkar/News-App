def validate_request(data):

    if not data:
        return False, "Missing request body"

    if "text" not in data:
        return False, 'Missing "text"'

    text = data["text"]

    if not isinstance(text, str):
        return False, '"text" must be string'

    if not text.strip():
        return False, '"text" cannot be empty'

    return True, None

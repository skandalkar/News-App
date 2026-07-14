import json
import re

def parse_json_response(response):

    if response is None:
        return None

    response = response.strip()
    response = response.replace("```json", "")
    response = response.replace("```", "")
    response = response.strip()

    try:
        return json.loads(response)
    except Exception:
        pass

    array_start = response.find("[")
    object_start = response.find("{")

    if object_start != -1 and (array_start == -1 or object_start < array_start):
        start = object_start
        end = response.rfind("}")
        if end != -1:
            candidate = response[start : end + 1]
            try:
                return json.loads(candidate)

            except Exception as e:
                print(e)

    # find first array
    start = array_start
    end = response.rfind("]")

    if start != -1 and end != -1:
        candidate = response[start : end + 1]
        try:
            return json.loads(candidate)

        except Exception as e:
            print(e)

    # find first object
    start = response.find("{")
    end = response.rfind("}")

    if start != -1 and end != -1:
        candidate = response[start : end + 1]
        try:
            return json.loads(candidate)

        except Exception as e:
            print(e)

    return None

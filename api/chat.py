import json
from openai import OpenAI

def handler(request):
    if request.method != "POST":
        return {
            "statusCode": 405,
            "body": json.dumps({"error": "Method Not Allowed"}),
            "headers": {"Content-Type": "application/json"}
        }

    try:
        body = request.json()
        api_key = body.get("api_key")
        developer_message = body.get("developer_message")
        user_message = body.get("user_message")
        model = body.get("model", "gpt-4.1-mini")

        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "developer", "content": developer_message},
                {"role": "user", "content": user_message}
            ]
        )
        content = response.choices[0].message.content
        return {
            "statusCode": 200,
            "body": json.dumps({"content": content}),
            "headers": {"Content-Type": "application/json"}
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json"}
        } 
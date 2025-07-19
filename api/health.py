import json

def handler(request):
    return {
        "statusCode": 200,
        "body": json.dumps({"status": "ok"}),
        "headers": {"Content-Type": "application/json"}
    } 
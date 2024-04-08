from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from anthropic import Anthropic
from celery import shared_task
import os


channel_layer = get_channel_layer()

@shared_task
def get_response(channel_name, input_data):
    client = Anthropic(
        # defaults to os.environ.get("ANTHROPIC_API_KEY")
        api_key = os.environ.get("ANTHROPIC_API_KEY"),
    )
    message = client.messages.create(
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": input_data["text"],
        }
    ],
    model="claude-3-haiku-20240307",
    )

    async_to_sync(channel_layer.send)(
        channel_name,
        {
            "type": "chat.message",
            "text": {"msg": str(message.content[0].text), "source": "bot"},
        },
    )
    # response_text = message.content[0].text
    # print(response_text)
    
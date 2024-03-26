from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


channel_layer = get_channel_layer()

#change this to 
def get_response(channel_name, input_data):
    # chatterbot = ChatBot(**settings.CHATTERBOT)
    # response = chatterbot.get_response(input_data)
    # response_data = response.serialize()

    async_to_sync(channel_layer.send)(
        channel_name,
        {
            "type": "chat.message",
            "text": {"msg": "test", "source": "bot"},
        },
    )

from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/CEOchat/$", consumers.CEOChatConsumer.as_asgi()),
    re_path(r"ws/HRchat/$", consumers.HRChatConsumer.as_asgi()),
    re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi()),

]

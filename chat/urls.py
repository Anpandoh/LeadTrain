from django.urls import path
from .views import ChatView, AboutView


app_name = "chat"

urlpatterns = [
                path("home/", ChatView.as_view(), name="home"),
                path("about/", AboutView.as_view(), name="about"),
               ]

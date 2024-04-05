from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("chat.urls", namespace="chat")),
    path('', RedirectView.as_view(url='/home/')),

]

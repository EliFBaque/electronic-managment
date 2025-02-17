from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('main.urls')),
    path('api_token/', include('apitoken.urls')),
    path('gateway/', include('gateway.urls'))
]
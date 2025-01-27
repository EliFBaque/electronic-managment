from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('main.urls')),
    path('api_token_auth/v1/', include('apitoken.urls')),
    path('gateway/v1/', include('gateway.urls'))
]

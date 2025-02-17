from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView
)

from .views import (
    LoginUserView, 
    LogoutUserView
)

urlpatterns = [
    path('login/', LoginUserView.as_view(), name='login'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apitoken import views

router = DefaultRouter()
router.register(r'auth', views.AuthViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls))
]

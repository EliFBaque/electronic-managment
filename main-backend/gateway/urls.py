from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gateway import views

router = DefaultRouter()
router.register(r'gateway', views.GatewayViewSet, basename='gateway')

urlpatterns = [
    path('', include(router.urls))
]
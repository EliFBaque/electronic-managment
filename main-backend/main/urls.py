from django.urls import path, include
from rest_framework import routers
from main import views

router = routers.DefaultRouter()
router.register(r'cliente', views.ClienteViewSet)
router.register(r'modelo', views.ModeloViewSet)
router.register(r'marca', views.MarcaViewSet)
router.register(r'tipo', views.TipoViewSet)
router.register(r'reparaciones', views.ReparacionesViewSet)

urlpatterns = [
    path('', include(router.urls))
]
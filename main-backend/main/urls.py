from django.urls import path, include
from rest_framework import routers
from main import views
from .views import ReparacionesListView, ClienteListView

# router = routers.DefaultRouter()
# router.register(r'cliente', views.ClienteViewSet)
# router.register(r'modelo', views.ModeloViewSet)
# router.register(r'marca', views.MarcaViewSet)
# router.register(r'tipo', views.TipoViewSet)
# router.register(r'reparaciones', views.ReparacionesListView)

urlpatterns = [
    path('reparaciones/', ReparacionesListView.as_view(), name='reparaciones-list'),
    path('cliente/', ClienteListView.as_view(), name='cliente-list'),
    #path('', ReparacionesListView.as_view(), name='reparaciones-list')
]
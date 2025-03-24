from django.urls import path
from .views import ReparacionesListView, ClienteListView


urlpatterns = [
    path('reparaciones/', ReparacionesListView.as_view(), name='reparaciones-list'),
    path('reparaciones/<int:pk>/', ReparacionesListView.as_view(), name='reparaciones-update'),
    path('cliente/', ClienteListView.as_view(), name='cliente-list'),
]
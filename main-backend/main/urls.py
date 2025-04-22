from django.urls import path
from .views import (
    ReparacionesListView, 
    ClienteListView,
    MarcaListView,
    ModeloListView,
    TipoListView
)
from .views import (
    cliente_autocomplete,
    modelo_autocomplete,
    marca_autocomplete,
    tipo_autocomplete,
)

urlpatterns = [
    # Reparaciones Endpoints
    path('reparaciones/', ReparacionesListView.as_view(), name='reparaciones-list'),
    path('reparaciones/', ReparacionesListView.as_view(), name='reparaciones-create'),
    path('reparaciones/<int:pk>/', ReparacionesListView.as_view(), name='reparaciones-update'),
    path('reparaciones/<int:pk>/', ReparacionesListView.as_view(), name='reparaciones-delete'),
    # Clientes Endpoints
    path('cliente/', ClienteListView.as_view(), name='cliente-list'),
    path('cliente/', ClienteListView.as_view(), name='cliente-create'),
    path('cliente/<int:pk>/', ClienteListView.as_view(), name='cliente-update'),
    path('cliente/<int:pk>/', ClienteListView.as_view(), name='cliente-delete'),
    
    # Marcas Endpoints
    path('marca/', MarcaListView.as_view(), name='marca-list'),
    path('marca/', MarcaListView.as_view(), name='marca-create'),
    path('marca/<int:pk>/', MarcaListView.as_view(), name='marca-delete'),
    
    # Modelos Endpoints
    path('modelo/', ModeloListView.as_view(), name='modelo-list'),
    path('modelo/', ModeloListView.as_view(), name='modelo-create'),
    path('modelo/<int:pk>/', ModeloListView.as_view(), name='modelo-delete'),
    
    # Tipo Endpoints
    path('tipo/', TipoListView.as_view(), name='tipo-list'),
    path('tipo/', TipoListView.as_view(), name='tipo-create'),
    path('tipo/<int:pk>/', TipoListView.as_view(), name='tipo-delete'),
    
    # Autocomplete Endpoints for creating new repairs
    path('clientes-autocomplete/', cliente_autocomplete),
    path('modelos-autocomplete/', modelo_autocomplete),
    path('marcas-autocomplete/', marca_autocomplete),
    path('tipos-autocomplete/', tipo_autocomplete),
]
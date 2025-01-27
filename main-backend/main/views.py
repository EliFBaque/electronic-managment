from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializers import *
from .models import *

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]
    
class ModeloViewSet(viewsets.ModelViewSet):
    queryset = Modelo.objects.all()
    serializer_class = ModeloSerializer
    permission_classes = [IsAuthenticated]

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [IsAuthenticated]

class TipoViewSet(viewsets.ModelViewSet):
    queryset = Tipo.objects.all()
    serializer_class = TipoSerializer
    permission_classes = [IsAuthenticated]

class ReparacionesViewSet(viewsets.ModelViewSet):
    queryset = Reparaciones.objects.all()
    serializer_class = ReparacionesSerializer
    permission_classes = [IsAuthenticated]
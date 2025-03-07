from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import *
from .models import *

# Tengo que devolver la lista de reparaciones con  los datos correspondientes, no los ids de cada cosa.

class ReparacionesListView(GenericAPIView):
    permissions_classes = [AllowAny]
    
    def get(self, request):
        reparaciones = Reparaciones.objects.all().order_by('-id')[:15]
        
        serializer = ReparacionesSerializer(reparaciones, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class ClienteListView(GenericAPIView):
    # Espera en la URL el nombre del cliente
    permission_classes = [AllowAny]
    
    def get(self, request):
        name = request.query_params.get('name', None)
        
        if not name:
            return Response({'Error': 'El parámetro "nombre" es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        
        clientes = Cliente.objects.filter(name__icontains=name)  # Cambia 'name' si el campo en el modelo es diferente
        
        if not clientes.exists():
            return Response({'Error': 'Cliente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ClienteSerializer(clientes, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
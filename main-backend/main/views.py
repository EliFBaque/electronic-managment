from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import *
from .models import *

# Agregar las request por token para que solo los usuarios autenticados puedan acceder a los datos
# Agregar Login y Logout

class ReparacionesListView(GenericAPIView):
    permissions_classes = [AllowAny]

    # Agregar permisos, sino cualquiera puede cambiar los datos    
    def get(self, request):
        reparaciones = Reparaciones.objects.all().order_by('-id')[:15]
        
        serializer = ReparacionesSerializer(reparaciones, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Funcion para actualizar datos de una reparacion.
    def put(self, request, pk):
        try:
            reparacion = Reparaciones.objects.get(pk=pk)
        except Reparaciones.DoesNotExist:
            return Response({"error": "Reparación no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReparacionesSerializer(reparacion, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class ClienteListView(GenericAPIView):
    # Espera en la URL el nombre del cliente
    permission_classes = [AllowAny]
    
    def get(self, request):
        name = request.query_params.get('name', None)
        
        if not name:
            return Response({'Error': 'El parámetro "nombre" es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        
        clientes = Cliente.objects.filter(name__icontains=name)
        
        if not clientes.exists():
            return Response({'Error': 'Cliente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ClienteSerializer(clientes, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put (self, request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response({"error": "Cliente no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ClienteSerializer(cliente, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
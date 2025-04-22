from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import *
from .models import *
from rest_framework.decorators import api_view


# Agregar las request por token para que solo los usuarios autenticados puedan acceder a los datos
# Agregar Login y Logout

class ReparacionesListView(GenericAPIView):
    permissions_classes = [AllowAny]

    def post(self, request):
        serializer = ReparacionesSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        reparaciones = Reparaciones.objects.select_related(
            'cliente', 
            'marca', 
            'modelo', 
            'tipo', 
            'confirmation').all().order_by('-id')[:150]
        
        serializer = ReparacionesSerializer(reparaciones, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
    
    def delete(self, request, pk):
        try:
            reparacion = Reparaciones.objects.get(pk=pk)
        except Reparaciones.DoesNotExist:
            return Response({"error": "Reparación no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        reparacion.delete()
        return Response({"message": "Reparación eliminada"}, status=status.HTTP_204_NO_CONTENT)
    
    
class ClienteListView(GenericAPIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = ClienteSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        name = request.query_params.get('name', None)

        if name:
            clientes = Cliente.objects.filter(name__icontains=name)

            if not clientes.exists():
                return Response({'Error': 'Cliente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            clientes = Cliente.objects.all().order_by('-id')[:150]

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
    
    def delete(self, request, pk):
        try:
            cliente = Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            return Response({"error": "Cliente no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        cliente.delete()
        return Response({"message": "Cliente eliminado"}, status=status.HTTP_204_NO_CONTENT)

class MarcaListView(GenericAPIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        serializer = MarcaSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        clientes = Marca.objects.all().order_by('-id')[:150]
        
        serializer = MarcaSerializer(clientes, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        try:
            marca = Marca.objects.get(pk=pk)
        except Marca.DoesNotExist:
            return Response({"error": "Marca no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        marca.delete()
        return Response({"message": "Marca eliminada"}, status=status.HTTP_204_NO_CONTENT)
    
class ModeloListView(GenericAPIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        serializer = ModeloSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        clientes = Modelo.objects.all().order_by('-id')[:150]
        
        serializer = ModeloSerializer(clientes, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        try:
            marca = Modelo.objects.get(pk=pk)
        except Modelo.DoesNotExist:
            return Response({"error": "Modelo no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        marca.delete()
        return Response({"message": "Modelo eliminada"}, status=status.HTTP_204_NO_CONTENT)
    
class TipoListView(GenericAPIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        serializer = TipoSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        clientes = Tipo.objects.all().order_by('-id')[:150]
        
        serializer = TipoSerializer(clientes, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        try:
            marca = Tipo.objects.get(pk=pk)
        except Tipo.DoesNotExist:
            return Response({"error": "Modelo no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        marca.delete()
        return Response({"message": "Modelo eliminada"}, status=status.HTTP_204_NO_CONTENT)
    
# AutoComplete For New Repairs
@api_view(['GET'])
def cliente_autocomplete(request):
    search = request.query_params.get('search', '')

    if not search:
        return Response([], status=status.HTTP_200_OK)

    clientes = Cliente.objects.filter(name__icontains=search)[:10]
    serializer = ClienteAutocompleteSerializer(clientes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def marca_autocomplete(request):
    search = request.query_params.get('search', '')

    if not search:
        return Response([], status=status.HTTP_200_OK)

    marcas = Marca.objects.filter(name__icontains=search)[:10]
    serializer = MarcaAutocompleteSerializer(marcas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def modelo_autocomplete(request):
    search = request.query_params.get('search', '')

    if not search:
        return Response([], status=status.HTTP_200_OK)

    modelos = Modelo.objects.filter(name__icontains=search)[:10]
    serializer = ModeloAutocompleteSerializer(modelos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def tipo_autocomplete(request):
    search = request.query_params.get('search', '')

    if not search:
        return Response([], status=status.HTTP_200_OK)

    tipos = Tipo.objects.filter(name__icontains=search)[:10]
    serializer = TipoAutocompleteSerializer(tipos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
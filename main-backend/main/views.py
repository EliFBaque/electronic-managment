from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import *
from .models import *

# class ClienteViewSet(viewsets.ModelViewSet):
#     queryset = Cliente.objects.all()
#     serializer_class = ClienteSerializer
#     permission_classes = [IsAuthenticated]
    
# class ModeloViewSet(viewsets.ModelViewSet):
#     queryset = Modelo.objects.all()
#     serializer_class = ModeloSerializer
#     permission_classes = [IsAuthenticated]

# class MarcaViewSet(viewsets.ModelViewSet):
#     queryset = Marca.objects.all()
#     serializer_class = MarcaSerializer
#     permission_classes = [IsAuthenticated]

# class TipoViewSet(viewsets.ModelViewSet):
#     queryset = Tipo.objects.all()
#     serializer_class = TipoSerializer
#     permission_classes = [IsAuthenticated]

# class ReparacionesViewSet(viewsets.ModelViewSet):
#     queryset = Reparaciones.objects.all()
#     serializer_class = ReparacionesSerializer
#     permission_classes = [IsAuthenticated]
    

# Tengo que devolver la lista de reparaciones con  los datos correspondientes, no los ids de cada cosa.

class ReparacionesListView(GenericAPIView):
    permissions_classes = [AllowAny]
    
    def get(self, request):
        reparaciones = Reparaciones.objects.all().order_by('-id')
        
        serializer = ReparacionesSerializer(reparaciones, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
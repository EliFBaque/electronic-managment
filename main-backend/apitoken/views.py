from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import GenericAPIView

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from main.models import User
from main.serializers import (
    CustomUserSerializer,
    CustomTokenObtainPairSerializer
)

# Ver de encriptar la contraseña en la request.

class LoginUserView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        user = authenticate(
            email=email,
            password=password
        )
        
        if user:
            login_serializers = self.serializer_class(data=request.data)
            if login_serializers.is_valid():
                user_serializers = CustomUserSerializer(user)
                return Response({
                    'token': login_serializers.validated_data.get('access'),
                    'refresh-token': login_serializers.validated_data.get('refresh'),
                    'user': user_serializers.data['username'],
                    'message' : 'Inicio de Sesion Exitoso'
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(GenericAPIView):
    serializer_class = CustomTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        user = User.objects.filter(email=request.data.get('email', 0))
        if user.exists():
            # Falta logica para terminar sesion
            RefreshToken.for_user(user.first())
            return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este usuario.'}, status=status.HTTP_400_BAD_REQUEST)
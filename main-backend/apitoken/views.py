from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .serializers import CustomUserSerializer

class AuthViewSet(ViewSet):
    permission_classes = [AllowAny]
    serializer_class = CustomUserSerializer

    @action(methods=['post'], detail=False)
    def signup(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({
                'success': 'User created successfully',
                'token' : token.key,
                'user' : serializer.data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False)
    def login(self, request):
        user = get_object_or_404(
            User,
            username=request.data['username']
        )
        if not user.check_password(request.data['password']):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user=user)
        serializer = self.serializer_class(user)
        return Response({
            'token' : token.key,
            'user' : serializer.data
        }, status=status.HTTP_200_OK)
    
    @action(methods=['post'], detail=False)
    def logout(self, request):
        try:
            request.user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            pass

        return Response({'success': 'Logged out successfully'}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False)
    def verify_token(self, request):
        token = request.data.get('token')

        if not token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token_obj = Token.objects.get(key=token)
            return Response({'valid': True, 'user_id': token_obj.user_id})
        except Token.DoesNotExist:
            return Response({'valid': False}, status=status.HTTP_401_UNAUTHORIZED)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

import requests
import os

from dotenv import load_dotenv
load_dotenv()


class GatewayViewSet(ViewSet):
    permission_classes = [AllowAny]

    @action(methods=['post'], detail=False)
    def authenticate(self, request):
        if request.method == 'POST':
            auth_url = os.environ.get('URL_AUTH')
            response = requests.post(auth_url, data=request.data)
            return Response(response.json(), status=response.status_code)
        return Response({'error' : 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['get'], detail=False)
    def models(self, request):
        if request.method == 'GET':
            crud_url = os.environ.get('URL_CRUD')
            response = requests.get(crud_url)
            return Response(response.json(), status=response.status_code)
        return Response({'error' : 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

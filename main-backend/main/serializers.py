from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import (
    User,
    Cliente,
    Modelo,
    Marca,
    Tipo,
    Reparaciones
)

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

# Base Database serializers
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cliente
        fields = '__all__'

class ModeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'

class ReparacionesSerializer(serializers.ModelSerializer):
    cliente = serializers.CharField(source='cliente.name', read_only=True)
    marca = serializers.CharField(source='marca.name', read_only=True)
    modelo = serializers.CharField(source='modelo.name', read_only=True)
    tipo = serializers.CharField(source='tipo.name', read_only=True)
    confirmation = serializers.CharField(source='confirmation.confirmation', read_only=True)
    
#   Entry Date and Delivery Date, need to finish front to update this (1)
#   entry_date = serializers.SerializerMethodField()
#   delivery_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Reparaciones
        fields = '__all__'
    # (1)    This make the query slower
    # def get_entry_date(self, obj):
    #     return obj.entry_date.strftime('%d/%m/%Y') if obj.entry_date else None

    # def get_delivery_date(self, obj):
    #     return obj.delivery_date.strftime('%d/%m/%Y') if obj.delivery_date else None
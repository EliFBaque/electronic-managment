from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import (
    User,
    Cliente,
    Modelo,
    Marca,
    Tipo,
    Reparaciones,
    Aceptado
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
        model = Cliente
        fields = '__all__'
        
class ClienteAutocompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'name']

class ModeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'

class ModeloAutocompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = ['id', 'name']

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class MarcaAutocompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['id', 'name']

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'
        
class TipoAutocompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = ['id', 'name']

class ReparacionesSerializer(serializers.ModelSerializer):
    # Solo lectura
    cliente = serializers.CharField(source='cliente.name', read_only=True)
    marca = serializers.CharField(source='marca.name', read_only=True)
    modelo = serializers.CharField(source='modelo.name', read_only=True)
    tipo = serializers.CharField(source='tipo.name', read_only=True)
    confirmation = serializers.CharField(source='confirmation.confirmation', read_only=True)

    # Solo escritura (IDs)
    cliente_id = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all(), write_only=True, required=False, allow_null=True)
    marca_id = serializers.PrimaryKeyRelatedField(queryset=Marca.objects.all(), write_only=True, required=False, allow_null=True)
    modelo_id = serializers.PrimaryKeyRelatedField(queryset=Modelo.objects.all(), write_only=True, required=False, allow_null=True)
    tipo_id = serializers.PrimaryKeyRelatedField(queryset=Tipo.objects.all(), write_only=True, required=False, allow_null=True)
    confirmation_id = serializers.PrimaryKeyRelatedField(queryset=Aceptado.objects.all(), write_only=True, required=False, allow_null=True)

    class Meta:
        model = Reparaciones
        fields = [
            'id',
            'entry_date', 'budget_date', 'delivery_date',
            'serial_num', 'failure', 'repair',
            'spare_cost', 'labor_cost', 'pending_payment',
            'cliente', 'cliente_id',
            'marca', 'marca_id',
            'modelo', 'modelo_id',
            'tipo', 'tipo_id',
            'confirmation', 'confirmation_id',
        ]

    def create(self, validated_data):
        cliente = validated_data.pop('cliente_id', None)
        marca = validated_data.pop('marca_id', None)
        modelo = validated_data.pop('modelo_id', None)
        tipo = validated_data.pop('tipo_id', None)
        confirmation = validated_data.pop('confirmation_id', None)

        reparacion = Reparaciones.objects.create(
            **validated_data,
            cliente=cliente,
            marca=marca,
            modelo=modelo,
            tipo=tipo,
            confirmation=confirmation
        )

        return reparacion

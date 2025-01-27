from rest_framework import serializers
from .models import (
    Cliente,
    Modelo,
    Marca,
    Tipo,
    Reparaciones
    )

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
    class Meta:
        model = Reparaciones
        fields = '__all__'
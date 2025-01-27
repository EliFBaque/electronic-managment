# Maybe this function is not used, but i leave it here :D
# class UserSerializer(serializers.ModelSerializer):
#     class Meta(object):
#         model = User 
#         fields = ['id', 'username', 'password', 'email']

from rest_framework import serializers
from django.contrib.auth.models import User

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user
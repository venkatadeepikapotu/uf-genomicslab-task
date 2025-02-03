# accounts/serializers.py
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

# User Registration Serializer
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CustomUser 

class RegisterSerializer(serializers.ModelSerializer):
    confirmEmail = serializers.EmailField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'confirmEmail', 'password', 'first_name', 'last_name', 'affiliation']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken. Please choose another one.")
        return value

    def validate(self, data):
        if data['email'] != data['confirmEmail']:
            raise serializers.ValidationError({"email": "Emails do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirmEmail')  # Remove AFTER validation
        return CustomUser.objects.create_user(**validated_data)




# Login Serializer (for JWT Authentication)
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        return {
            'user': user,
            'token': str(RefreshToken.for_user(user).access_token)
        }

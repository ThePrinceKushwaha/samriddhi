from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from .models import User
from .backends import CustomModelBackend


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)


class RequestPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class EmailVerificationSerializer(serializers.ModelSerializer):
    """
    Serializer for email verification
    """
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ["token"]


class ChangePasswordSerializer(serializers.Serializer):
    """
    The serializer to change password.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, write_only=True)


class UserLogoutSerializer(serializers.ModelSerializer):
    """
    Serializer for user logout
    """
    refresh = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ["refresh"]


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer class to serialize Login fields, and authenticate user
    """
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email_backend = CustomModelBackend()
        user = email_backend.authenticate(request=None, username=attrs["email"], password=attrs["password"])

        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials.")


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer class for user registration fields, register user
    """
    class Meta:
        model = User
        fields = ("name", "email", "username", "role", "mobile_number", "pan_number", "address", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize User model.
    """
    class Meta:
        model = User
        fields = ("name", "email", "username", "role", "mobile_number", "pan_number", "address")

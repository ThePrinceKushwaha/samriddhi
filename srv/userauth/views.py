import jwt
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, GenericAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.urls import reverse
from samridhhi import settings
from .models import User
from .utils import Util
from .permissions import IsVerified
from .validators import handle_password_validation, validate_email_address, handle_user_error
from .serializers import (
    UserSerializer,
    UserLoginSerializer,
    UserRegistrationSerializer,
    ChangePasswordSerializer,
    EmailVerificationSerializer,
    RequestPasswordResetEmailSerializer,
    SetNewPasswordSerializer,
    UserLogoutSerializer
)


class SetNewPasswordAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        payload = request.data.copy()
        new_password = payload.get("password")
        password_error = handle_password_validation(password=new_password)
        if password_error:
            return Response({"detail": password_error}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"detail": "Password reset success"}, status=status.HTTP_200_OK)


class PasswordResetTokenCheckAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token, *args, **kwargs):

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"detail": "Token is not valid, please request a new one"},
                                status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": "Now you can set new password", "uidb64": uidb64, "token": token},
                            status=status.HTTP_400_BAD_REQUEST)

        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return Response({'error': 'Token is not valid, please request a new one'},
                                status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmailAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RequestPasswordResetEmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get("email", '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relative_link = reverse(
                "userauth:password-reset-confirm", kwargs={'uidb64': uidb64, 'token': token})

            abs_url = "http://" + current_site + relative_link
            email_body = "Hello, \n Use link below to reset your password \n" + abs_url
            data = {"email_body": email_body, "to_email": user.email,
                    "email_subject": "Reset your password"}
            Util.send_mail(data)
            return Response(
                {"detail": "We have sent you a link to reset your password"},
                status=status.HTTP_200_OK
            )
        return Response(
            {"detail": "User with given email does not exists."},
            status=status.HTTP_400_BAD_REQUEST
        )


class ChangePasswordAPIView(APIView):
    """
    API endpoint to change password
    """
    permission_classes = (IsAuthenticated, IsVerified)

    def put(self, request, *args, **kwargs):
        user = self.request.user
        payload = request.data.copy()
        new_password = payload.get("new_password")
        password_error = handle_password_validation(password=new_password)
        if password_error:
            return Response({"detail": password_error}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ChangePasswordSerializer(data=payload)
        if serializer.is_valid():
            if not user.check_password(serializer.data.get("old_password")):
                return Response({
                    "detail": "Wrong password."
                }, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            return Response({
                "detail": "Password updated successfully."
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutAPIView(APIView):
    """
    API endpoint to log out the users
    """
    permission_classes = (IsAuthenticated, IsVerified)

    def post(self, request, *args, **kwargs):
        serializer = UserLogoutSerializer(data=request.data)
        if serializer.is_valid():
            refresh_token = serializer.data["refresh"]
            try:
                access_token = request.auth
                print(access_token)
                access_token.payload['logout'] = True
                access_token.set_exp(from_time=timezone.now(), lifetime=timedelta(seconds=10))
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(data={"detail": "Logout successfully.", "access": f"{access_token}"},
                                status=status.HTTP_204_NO_CONTENT)

            except Exception as e:
                print(e)
                return Response(data={"detail": "Invalid Refresh Token."},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response(data=serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):
    """
    API endpoint for User login, only POST method is allowed
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):

        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            if not user.is_verified:
                return Response({"detail": "Please verify your account."}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken.for_user(user)
            data = serializer.data
            data["role"] = user.role
            data["tokens"] = {
                "refresh": str(token),
                "access": str(token.access_token)
            }
            return Response(data, status=status.HTTP_200_OK)
        if "non_field_errors" in dict(serializer.errors):
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailAPIView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        token = request.GET.get("token")
        serializer = EmailVerificationSerializer(data={"token": token})
        if serializer.is_valid():
            try:
                payload = jwt.decode(token, algorithms=["HS256"], key=settings.SECRET_KEY, verify=True)
                user = User.objects.get(id=payload["user_id"])
                if not user.is_verified:
                    user.is_verified = True
                    user.save()
                return Response(
                    {"detail": "Account is successfully activated."},
                    status=status.HTTP_200_OK
                )
            except jwt.ExpiredSignatureError:
                return Response(
                    {"detail": "Activation link is expired."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except jwt.exceptions.DecodeError:
                return Response(
                    {"detail": "Invalid token."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(
            {"detail": "Something went wrong", "serializer": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class UserRegistrationAPIView(APIView):
    """
    API endpoint to register a user
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email_address = request.data.get("email")
        if not validate_email_address(email_address):
            return Response({"detail": "Email is not valid."}, status=status.HTTP_400_BAD_REQUEST)
        password = request.data.get("password")
        password_error = handle_password_validation(password=password)
        if password_error:
            return Response({"detail": password_error}, status=status.HTTP_400_BAD_REQUEST)
        username = request.data.get("username")
        user_error = handle_user_error(email_address, username)
        if user_error:
            return Response({"detail": user_error}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            access_token = RefreshToken.for_user(user).access_token
            data = serializer.data

            # Send access token to user's email
            current_site = get_current_site(request).domain
            relative_link = reverse("userauth:verify-email")

            abs_url = "http://" + current_site + relative_link + "?token=" + str(access_token)
            email_body = "Hello  " + user.username + "\nUse link below to verify your email\n" + abs_url

            payload = {
                "email_body": email_body,
                "email_subject": "Verify your Email",
                "to_email": email_address,
            }
            if not Util.send_mail(data=payload):
                user.delete()
                return Response({"detail": "Unable to send verification email."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({"detail": "Check your email to verify account."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(APIView):
    """
    Get and Update User information
    """
    permission_classes = (IsAuthenticated, IsVerified)

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        print(request.data)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(APIView):
    """
    GET nad UPDATE user profile
    """
    permission_classes = (IsAuthenticated, IsVerified)
    parser_classes = (MultiPartParser, FormParser)

    def get_profile(self):
        user = self.request.user
        return Profile.objects.get(user=user)

    def get(self, request, *args, **kwargs):
        profile = self.get_profile()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        profile = self.get_profile()
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
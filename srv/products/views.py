from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Transaction
from .serializers import TransactionSerializer, ProductSerializer
from .utils import check_and_notify_expiry


class CheckExpiryAPIView(APIView):
    permission_classes = [AllowAny, ]
    def get(self, request, format=None):
        check_and_notify_expiry.delay()
        return Response({"message": "Expiry check initiated"}, status=status.HTTP_200_OK)


class ProductCreateAPIView(APIView):
    # permission_classes = [IsAuthenticated, IsProducer]
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SellingTransactionListAPIView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, user_id, format=None):
        # Retrieve transactions where the user is the seller
        transactions = Transaction.objects.filter(seller=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BuyingTransactionListAPIView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, user_id, format=None):
        # Retrieve transactions where the user is the buyer
        transactions = Transaction.objects.filter(buyer=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TransactionCreateAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, user_id, format=None):
        # Set the current user as the seller
        request.data['seller'] = user_id
        # request.data['seller'] = request.user.id

        # Create a transaction with the provided data
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionListAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, user_id):
        transactions = Transaction.objects.filter(buyer=user_id) | Transaction.objects.filter(seller=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

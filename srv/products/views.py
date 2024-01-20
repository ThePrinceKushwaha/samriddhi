from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Transaction
from .serializers import TransactionSerializer, ProductSerializer
from .utils import check_and_notify_expiry


def expiry_check_view(request):
    check_and_notify_expiry()
    return JsonResponse({"message": "Expiry check process initiated."})


class ProductCreateAPIView(APIView):
    permission_classes = [IsAuthenticated, ]
    # permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SellingTransactionListAPIView(APIView):
    permission_classes = [IsAuthenticated, ]
    # permission_classes = (AllowAny,)

    def get(self, request, format=None):
        user_id = self.request.user.id
        transactions = Transaction.objects.filter(seller=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BuyingTransactionListAPIView(APIView):
    # permission_classes = (AllowAny,)
    permission_classes = [IsAuthenticated, ]

    def get(self, request, format=None):
        user_id = self.request.user.id
        transactions = Transaction.objects.filter(buyer=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TransactionCreateAPIView(APIView):
    # permission_classes = (AllowAny,)
    permission_classes = [IsAuthenticated, ]

    def post(self, request, format=None):
        request.data['seller'] = self.request.user.id

        # Create a transaction with the provided data
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionListAPIView(APIView):
    # permission_classes = (AllowAny,)
    permission_classes = [IsAuthenticated, ]

    def get(self, request, user_id):
        user_id = self.request.user.id
        transactions = Transaction.objects.filter(buyer=user_id) | Transaction.objects.filter(seller=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

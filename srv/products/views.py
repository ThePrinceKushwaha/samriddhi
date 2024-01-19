from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Transaction
from .serializers import TransactionSerializer


class TransactionListAPIView(APIView):
    def get(self, request, user_id):
        transactions = Transaction.objects.filter(buyer=user_id) | Transaction.objects.filter(seller=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


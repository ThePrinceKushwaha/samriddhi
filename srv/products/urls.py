from django.urls import path
from .views import (
    TransactionListAPIView,
    TransactionCreateAPIView,
    SellingTransactionListAPIView,
    BuyingTransactionListAPIView
)


urlpatterns = [
    path('<int:user_id>/', TransactionListAPIView.as_view(), name='transaction-list'),
    path("<int:user_id>/create/", TransactionCreateAPIView.as_view(), name='create-transaction'),
    path("<int:user_id>/selling/", SellingTransactionListAPIView.as_view(), name='selling-transaction'),
    path("<int:user_id>/buying/", BuyingTransactionListAPIView.as_view(), name='buying-transaction'),
]

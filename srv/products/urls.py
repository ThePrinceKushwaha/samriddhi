from django.urls import path
from .views import (
    TransactionListAPIView,
    TransactionCreateAPIView,
    SellingTransactionListAPIView,
    BuyingTransactionListAPIView,
    ProductCreateAPIView,
    expiry_check_view,
)


urlpatterns = [
    path("", TransactionListAPIView.as_view(), name='transaction-list'),
    path("create-transaction/", TransactionCreateAPIView.as_view(), name='create-transaction'),
    path("selling/", SellingTransactionListAPIView.as_view(), name='selling-transaction'),
    path("buying/", BuyingTransactionListAPIView.as_view(), name='buying-transaction'),

    path('create-product/', ProductCreateAPIView.as_view(), name='product-create'),
    path("check-expiry/", expiry_check_view, name='check-expiry')
]

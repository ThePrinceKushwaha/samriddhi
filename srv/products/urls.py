from django.urls import path
from .views import TransactionListAPIView


urlpatterns = [
    path('<int:user_id>/', TransactionListAPIView.as_view(), name='transaction-list'),
]

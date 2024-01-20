from django.urls import path
from .views import product_tree_view, TransactionAnalysisAPIView

urlpatterns = [
    path('product-tree/<uuid:serial_number>/', product_tree_view, name='product_tree'),
    path('analyze_chain/', TransactionAnalysisAPIView.as_view(), name='analyze_chain')
]

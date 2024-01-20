from django.urls import path
from .views import product_tree_view

urlpatterns = [
    path('product-tree/<uuid:serial_number>/', product_tree_view, name='product_tree'),
]

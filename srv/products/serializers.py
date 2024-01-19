from rest_framework import serializers
from .models import Transaction, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['seller'] = instance.seller.name
        representation['buyer'] = instance.buyer.name
        representation['product'] = instance.product.name
        return representation

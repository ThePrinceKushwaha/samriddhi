import os
import uuid
from userauth.models import User
from django.db import models

PRODUCT_IMG = "product_image/default.png"


def upload_to_product_images(instance, filename):
    """
    Upload path for product images
    """
    file_extension = os.path.splitext(filename)[1].lower()
    unique_filename = f"{instance.id}{file_extension}"
    return f"product_image/{unique_filename}"


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    serial_number = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image = models.ImageField(upload_to=upload_to_product_images, default=PRODUCT_IMG, null=True, blank=True)
    expiry_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Products_samriddhi"

    def __str__(self):
        return self.name


class Transaction(models.Model):
    product = models.ForeignKey(Product, related_name="product", on_delete=models.CASCADE)
    seller = models.ForeignKey(User, related_name="seller_transaction", on_delete=models.CASCADE)
    buyer = models.ForeignKey(User, related_name="buyer_transaction", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    transaction_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Transactions_samriddhi"

    def __str__(self):
        return f"{self.product} by {self.seller.name} to {self.buyer.name}"

from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import Product, Transaction


def check_and_notify_expiry():
    today = timezone.now()
    warning_days = 10
    near_expiry_products = Product.objects.filter(
        expiry_date__lte=today + timezone.timedelta(days=warning_days)
    )

    for product in near_expiry_products:
        # Get the email of the most recent buyer of this product
        recipient_email = Transaction.objects.filter(
            product=product).order_by('-transaction_date').values_list('buyer__email', flat=True).first()

        if recipient_email:
            send_mail(
                subject=f'Product Nearing Expiry: {product.name}',
                message=f'The product {product.name} is nearing its expiry date on {product.expiry_date}.',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[recipient_email],
                fail_silently=False,
            )

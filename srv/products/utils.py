from celery import shared_task
from dateutil.utils import today
from django.core.mail import send_mail
from django.utils import timezone
from .models import Product, Transaction
from samridhhi.settings import EMAIL_HOST_USER


@shared_task
def check_and_notify_expiry():
    now = timezone.now()
    warning_days = 7
    near_expiry_products = Product.objects.filter(
        expiry_date__lte=today + timezone.timedelta(days=warning_days), in_stock=True
    )

    for product in near_expiry_products:
        recipient_email = Transaction.objects.filter(
            product=product).order_by('-transaction_date').values_list('buyer__email', flat=True).first()
        send_mail(
            subject=f"Product Near Expiry: {product.name}",
            message=f'The product {product.name} is nearing its expiry date on {product.expiry_date}.',
            from_email=EMAIL_HOST_USER,
            recipient_list=[recipient_email],
            fail_silently=False,
        )

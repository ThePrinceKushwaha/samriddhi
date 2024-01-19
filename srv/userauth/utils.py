from django.core.mail import EmailMessage
from .backends import CustomEmailBackend
from samridhhi.settings import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
from django.core.mail import send_mail


class Util:
    @staticmethod
    def send_mail(data):
        try:
            send_mail(
                subject=data["email_subject"],
                message=data["email_body"],
                from_email=EMAIL_HOST_USER,
                recipient_list=(data["to_email"],),
                fail_silently=False,
            )
            return True
        except Exception as e:
            print("detail", e)
            return False
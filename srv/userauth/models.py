from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import UserManager

DEFAULT_AVATAR = "user_avatars/default.png"


def upload_to_user_avatars(instance, filename):
    """
    Upload path for user Avatar
    """
    return f"user_avatars/{instance.user.role}/{filename}"


class User(AbstractUser):
    email = models.EmailField(verbose_name="Email address", unique=True)
    name = models.CharField(verbose_name="Name", max_length=255)
    ROLE_TYPES = (
        (0, "Producer"),
        (1, "Wholesaler"),
        (2, "Retailer")
    )
    role = models.IntegerField(choices=ROLE_TYPES, default=0)
    pan_number = models.CharField(max_length=10, unique=True)
    mobile_number = models.CharField(max_length=10, unique=True)
    address = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        db_table = "User_samriddhi"

    def __str__(self):
        return self.email

from collections import defaultdict
from django.db.models import Count
from django.shortcuts import render, get_object_or_404
from products.models import Product, Transaction
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from userauth.models import User
from products.models import Transaction


class TransactionAnalysisAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        user_data = self.analyze_transactions()
        self.send_emails(user_data)
        return JsonResponse({"msg": "Transaction analysis complete"})

    def analyze_transactions(self):
        user_data = []
        roles = [0, 1, 2]  # Producer, Wholesaler, Retailer

        for role in roles:
            users = User.objects.filter(role=role)
            for user in users:
                user_info = {
                    "user": user.email,
                    "role": role,
                    "selling_transactions": defaultdict(int),
                    "buying_transactions": defaultdict(int),
                }

                selling_transactions = Transaction.objects.filter(seller=user).values('product__name').annotate(count=Count('product'))
                for transaction in selling_transactions:
                    user_info['selling_transactions'][transaction['product__name']] += transaction['count']

                buying_transactions = Transaction.objects.filter(buyer=user).values('product__name').annotate(count=Count('product'))
                for transaction in buying_transactions:
                    user_info['buying_transactions'][transaction['product__name']] += transaction['count']

                user_data.append(user_info)

        return user_data

    def send_emails(self, user_data):
        print(user_data)
        for data in user_data:
            selling_details = "\n".join([f"{product}: {count}" for product, count in data['selling_transactions'].items()])
            buying_details = "\n".join([f"{product}: {count}" for product, count in data['buying_transactions'].items()])

            subject = "Your Transaction Summary"
            message = (
                f"Dear {data['user']},\n"
                f"Here is your transaction summary:\n"
                "Selling Transactions:\n"
                f"{selling_details}\n"
                "Buying Transactions:\n"
                f"{buying_details}\n"
            )
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [data['user']],
                fail_silently=False,
            )


def build_tree(node):
    tree = {
        'product_name': node.product.name,
        'product_description': node.product.description,
        'product_serial_number': str(node.product.serial_number),
        'product_expiry_date': node.product.expiry_date.strftime('%Y-%m-%d %H:%M:%S'),
        'seller_name': node.seller.name,
        'buyer_name': node.buyer.name,
        'quantity': node.quantity,
        'price': node.price,
        'transaction_date': node.transaction_date.strftime('%Y-%m-%d %H:%M:%S')
    }
    children = node.child_transactions.all()
    if children:
        tree['children'] = [build_tree(child) for child in children]

    return tree


def product_tree_view(request, serial_number):
    product = get_object_or_404(Product, serial_number=serial_number)
    root_transaction = Transaction.objects.filter(product=product).first()
    tree_data = build_tree(root_transaction) if root_transaction else {}
    return JsonResponse(tree_data)

    # return render(request, 'monitoring/product_tree.html', {'tree_data': tree_data})

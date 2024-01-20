from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from products.models import Product, Transaction


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

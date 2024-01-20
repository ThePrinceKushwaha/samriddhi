from django.shortcuts import render
from products.models import Product, Transaction


def product_tree_view(request, serial_number):
    product = Product.objects.get(serial_number=serial_number)
    transactions = Transaction.objects.filter(product=product)

    # Function to build the tree
    def build_tree(transactions):
        tree = {}
        for transaction in transactions:
            if transaction.parent is None:
                tree[transaction] = []
            else:
                tree[transaction.parent].append(transaction)
        return tree

    tree = build_tree(transactions)
    return render(request, 'monitoring/product_tree.html', {'tree': tree})

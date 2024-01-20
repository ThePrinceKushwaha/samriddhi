import json
import random
import uuid
from datetime import datetime, timedelta

# Constants
PRODUCER_COUNT = 20
WHOLESALER_COUNT = 60
RETAILER_COUNT = 100
PRODUCT_COUNT = 200
TRANSACTION_COUNT = 300


def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )


def create_user_0(role_type, count):
    users = []
    for i in range(count):
        user_id = i+1
        user = {
            "model": "userauth.User",
            "pk": user_id,
            "fields": {
                "email": f"user{user_id}@example.com",
                "name": f"User {user_id}",
                "username": f"user{user_id}",
                "role": role_type,
                "pan_number": str(uuid.uuid4())[:10],
                "mobile_number": str(random.randint(1000000000, 9999999999)),
                "address": "Random Address",
                "is_verified": True,
                "password": f"password{user_id}",
                "created_at": str(datetime.now()),
                "updated_at": str(datetime.now())
            }
        }
        users.append(user)
    return users


def create_user_1(role_type, count):
    users = []
    for i in range(count):
        user_id = i+21
        user = {
            "model": "userauth.User",
            "pk": user_id,
            "fields": {
                "email": f"user{user_id}@example.com",
                "name": f"User {user_id}",
                "username": f"user{user_id}",
                "role": role_type,
                "pan_number": str(uuid.uuid4())[:10],
                "mobile_number": str(random.randint(1000000000, 9999999999)),
                "address": "Random Address",
                "is_verified": True,
                "password": f"password{user_id}",
                "created_at": str(datetime.now()),
                "updated_at": str(datetime.now())
            }
        }
        users.append(user)
    return users


def create_user_2(role_type, count):
    users = []
    for i in range(count):
        user_id = i+100
        user = {
            "model": "userauth.User",
            "pk": user_id,
            "fields": {
                "email": f"user{user_id}@example.com",
                "name": f"User {user_id}",
                "username": f"user{user_id}",
                "role": role_type,
                "pan_number": str(uuid.uuid4())[:10],
                "mobile_number": str(random.randint(1000000000, 9999999999)),
                "address": "Random Address",
                "is_verified": True,
                "password": f"password{user_id}",
                "created_at": str(datetime.now()),
                "updated_at": str(datetime.now())
            }
        }
        users.append(user)
    return users


def create_products():
    products = []
    for i in range(PRODUCT_COUNT):
        product_id = i+1
        product = {
            "model": "products.Product",
            "pk": product_id,
            "fields": {
                "name": f"Product {product_id}",
                "description": "Random Description",
                "serial_number": str(uuid.uuid4()),
                "expiry_date": str(random_date(datetime.now(), datetime.now() + timedelta(days=365))),
                "created_at": str(datetime.now()),
                "updated_at": str(datetime.now())
            }
        }
        products.append(product)
    return products


def create_transactions(users, products):
    transactions = []
    for i in range(TRANSACTION_COUNT):
        product = random.choice(products)
        seller = random.choice(users)
        buyer = random.choice(users)
        if seller["pk"] == buyer["pk"]:
            continue
        transaction = {
            "model": "products.Transaction",
            "fields": {
                "product": product["pk"],
                "seller": seller["pk"],
                "buyer": buyer["pk"],
                "quantity": random.randint(1, 100),
                "price": random.randint(100, 10000),
                "transaction_date": str(random_date(datetime.now(), datetime.now() + timedelta(days=30))),
            }
        }
        transactions.append(transaction)
    return transactions


users = create_user_0(0, PRODUCER_COUNT) + create_user_1(1, WHOLESALER_COUNT) + create_user_2(2, RETAILER_COUNT)
products = create_products()
transactions = create_transactions(users, products)

all_data = users + products + transactions

with open('sample_data.json', 'w') as file:
    json.dump(all_data, file, indent=4)

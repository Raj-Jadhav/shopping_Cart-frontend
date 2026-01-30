from django.urls import path
from .views import delete_item, list_cart_items

urlpatterns = [
    path("", list_cart_items, name="cart-list"),
    path("items/<int:id>/", delete_item, name="delete-item"),
]
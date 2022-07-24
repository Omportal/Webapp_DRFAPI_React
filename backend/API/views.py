from django.shortcuts import render
from .models import Items
from .serializers import ItemSerializer
from rest_framework import generics


# Create your views here.

class ItemsList(generics.ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        return Items.objects.all()

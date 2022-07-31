import json
import os

import telebot

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from .models import Items
from .serializers import ItemSerializer
from rest_framework import generics




# Create your views here.
bot = telebot.TeleBot(os.environ.get('BOT_TOKEN'))
class ItemsList(generics.ListAPIView):

    serializer_class = ItemSerializer

    def get_queryset(self):
        return Items.objects.all()

    def post(self, request):
        try:
            data = json.loads(json.dumps(request.POST))
            print(data['data'])
            user_info = json.loads(data["userInfo"])
            print(user_info['user']['id'], type(user_info))
            print(user_info['user']['username'])
            bot.send_message(user_info['user']['id'],data['data'])
        except Exception as e:
            print(e)

        # username = data['userInfo']
        # print(username)
        # print(data)
        return JsonResponse({'data': request.POST}, status=200)

        # if request.method == 'POST':
        #     try:
        #         print(request)
        #         return JsonResponse({'data': request}, status=200)
        #     except Exception as e:
        #         return JsonResponse({'error': f'{e}'}, status=400)

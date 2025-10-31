from django.shortcuts import render

# import the UserSerializer from serializers.py
from .serializers import UserSerializer

# import from rest_framework import viewsets
from rest_framework import generics


# import the User model from django.contrib.auth.models
from django.contrib.auth.models import User



# Create your views here.

class Register_view(generics.CreateAPIView):
    queryset = User.objects.all() # queryset attribute is set to all User objects in the database
    serializer_class = UserSerializer # serializer_class attribute is set to the UserSerializer class
    
    
# create protected veiws saying only the authenticated people will be having the 
# access to this data api end points

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class protected_view(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        response = {
            'status ' : ' request to authenticated user succssfull '
        }
        return Response(response)
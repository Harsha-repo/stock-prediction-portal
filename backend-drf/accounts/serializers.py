from rest_framework import serializers
from django.contrib.auth.models import User
# the user model is used because 

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True , style={'input_type': 'password'}) # password field is write-only for security reasons and won't be included in serialized output
    class Meta:
        model = User
        fields = [ 'username', 'email', 'password']
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
            
        )
        
        
    # user = User.objects.create_user(**validated_data) # create_user method hashes the password and saves the user instance to the database
    #  ** validated data is used to unpack the validated data dictionary and pass its contents as keyword arguments to the create_user method
    
        return user # create method is used to create a new user instance
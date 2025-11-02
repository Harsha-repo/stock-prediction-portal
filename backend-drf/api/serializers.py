from rest_framework import serializers

class StockPredictionSerializer(serializers.Serializer):
    # Define your fields here
    ticker = serializers.CharField(max_length=10)
    

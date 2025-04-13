from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Portfolio, Stock, FinancialAdvice

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
        # Check that the two password entries match
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'symbol', 'name', 'quantity', 'purchase_price', 'purchase_date']

class PortfolioSerializer(serializers.ModelSerializer):
    stocks = StockSerializer(many=True, read_only=True)
    
    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'stocks']

class FinancialAdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialAdvice
        fields = ['id', 'question', 'answer', 'created_at']
        read_only_fields = ['answer']
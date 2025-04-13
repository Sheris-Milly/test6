from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Portfolio, Stock, FinancialAdvice
from .serializers import (
    UserSerializer, UserRegistrationSerializer, PortfolioSerializer,
    StockSerializer, FinancialAdviceSerializer
)
from .agents import get_financial_advice

# Authentication views
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            # Create a token for the user
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response({'message': 'Successfully logged out'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    return Response(UserSerializer(request.user).data)

# Portfolio viewset
class PortfolioViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Stock viewset
class StockViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        portfolio_id = self.kwargs.get('portfolio_pk')
        if portfolio_id:
            return Stock.objects.filter(portfolio_id=portfolio_id, portfolio__user=self.request.user)
        return Stock.objects.filter(portfolio__user=self.request.user)
    
    def perform_create(self, serializer):
        portfolio_id = self.kwargs.get('portfolio_pk')
        portfolio = Portfolio.objects.get(id=portfolio_id, user=self.request.user)
        serializer.save(portfolio=portfolio)

# Financial Advice views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_ai_advice(request):
    question = request.data.get('question')
    if not question:
        return Response({'error': 'Question is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Get context data (could be portfolio data, market data, etc.)
    context = {
        'user': request.user.username,
        # Add more context as needed
    }
    
    # Get advice from our multi-agent system
    advice = get_financial_advice(question, context)
    
    # Save the question and answer
    financial_advice = FinancialAdvice.objects.create(
        user=request.user,
        question=question,
        answer=advice
    )
    
    serializer = FinancialAdviceSerializer(financial_advice)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_advice_history(request):
    advice = FinancialAdvice.objects.filter(user=request.user).order_by('-created_at')
    serializer = FinancialAdviceSerializer(advice, many=True)
    return Response(serializer.data)
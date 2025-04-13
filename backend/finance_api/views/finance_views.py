from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..services.finance_data_service import FinanceDataService
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def company_cash_flow(request):
    """Get company cash flow data from RapidAPI"""
    try:
        symbol = request.GET.get('symbol')
        period = request.GET.get('period', 'QUARTERLY')
        language = request.GET.get('language', 'en')
        
        if not symbol:
            return Response({'error': 'Symbol parameter is required'}, status=400)
        
        data = FinanceDataService.get_company_cash_flow(symbol, period, language)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting company cash flow: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def company_data(request):
    """Get company data from RapidAPI"""
    try:
        symbol = request.GET.get('symbol')
        language = request.GET.get('language', 'en')
        
        if not symbol:
            return Response({'error': 'Symbol parameter is required'}, status=400)
        
        data = FinanceDataService.get_company_data(symbol, language)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting company data: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def stock_price(request):
    """Get stock price data from RapidAPI"""
    try:
        symbol = request.GET.get('symbol')
        language = request.GET.get('language', 'en')
        
        if not symbol:
            return Response({'error': 'Symbol parameter is required'}, status=400)
        
        data = FinanceDataService.get_stock_price(symbol, language)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting stock price: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def market_news(request):
    """Get market news from RapidAPI"""
    try:
        symbols = request.GET.get('symbols')
        language = request.GET.get('language', 'en')
        
        data = FinanceDataService.get_market_news(symbols, language)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting market news: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def stock_quote(request):
    """Get stock quote data from RapidAPI"""
    try:
        symbol = request.GET.get('symbol')
        language = request.GET.get('language', 'en')
        
        if not symbol:
            return Response({'error': 'Symbol parameter is required'}, status=400)
        
        data = FinanceDataService.get_stock_quote(symbol, language)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting stock quote: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def search_symbols(request):
    """Search for financial symbols from RapidAPI"""
    try:
        query = request.GET.get('query')
        language = request.GET.get('language', 'en')
        
        if not query:
            return Response({'error': 'Query parameter is required'}, status=400)
        
        data = FinanceDataService.search_symbols(query, language)
        return Response(data)
    except Exception as e:
        logger.error(f"Error searching symbols: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def market_tickers(request):
    """Get market tickers from Yahoo Finance RapidAPI"""
    try:
        page = request.GET.get('page', '1')
        ticker_type = request.GET.get('type', 'STOCKS')
        
        data = FinanceDataService.get_market_tickers(page, ticker_type)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting market tickers: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def ticker_details(request, ticker):
    """Get ticker details from Yahoo Finance RapidAPI"""
    try:
        data = FinanceDataService.get_ticker_details(ticker)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting ticker details: {e}")
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def ticker_news(request, ticker):
    """Get news for a specific ticker from Yahoo Finance RapidAPI"""
    try:
        news_type = request.GET.get('type', 'ALL')
        
        data = FinanceDataService.get_ticker_news(ticker, news_type)
        return Response(data)
    except Exception as e:
        logger.error(f"Error getting ticker news: {e}")
        return Response({'error': str(e)}, status=500)
from django.urls import path
from .views.finance_views import (
    company_cash_flow,
    company_data,
    stock_price,
    market_news,
    stock_quote,
    search_symbols,
    market_tickers,
    ticker_details,
    ticker_news,
)

urlpatterns = [
    # Finance API endpoints
    path('finance/company-cash-flow/', company_cash_flow, name='company_cash_flow'),
    path('finance/company-data/', company_data, name='company_data'),
    path('finance/stock-price/', stock_price, name='stock_price'),
    path('finance/market-news/', market_news, name='market_news'),
    path('finance/stock-quote/', stock_quote, name='stock_quote'),
    path('finance/search/', search_symbols, name='search_symbols'),
    path('finance/market-tickers/', market_tickers, name='market_tickers'),
    path('finance/ticker-details/<str:ticker>/', ticker_details, name='ticker_details'),
    path('finance/ticker-news/<str:ticker>/', ticker_news, name='ticker_news'),
]
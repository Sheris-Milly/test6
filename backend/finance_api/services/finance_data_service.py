import os
import requests
from typing import Dict, Any, Optional, List, Union

# RapidAPI configuration
RAPIDAPI_KEY = os.environ.get('RAPIDAPI_KEY', '')  # Provide default empty string
RAPIDAPI_HOST_FINANCE = 'real-time-finance-data.p.rapidapi.com'
RAPIDAPI_HOST_YAHOO = 'yahoo-finance15.p.rapidapi.com'

class FinanceDataService:
    """Service to handle all financial data API requests"""
    
    @staticmethod
    def get_headers(host: str) -> Dict[str, str]:
        """Generate headers for RapidAPI requests"""
        return {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': host
        }
    
    @classmethod
    def get_company_cash_flow(cls, symbol: str, period: str = 'QUARTERLY', language: str = 'en') -> Dict[str, Any]:
        """
        Get company cash flow data
        
        Args:
            symbol: Stock symbol (ticker)
            period: QUARTERLY or ANNUAL
            language: Language code
            
        Returns:
            Dict containing company cash flow data
        """
        url = "https://real-time-finance-data.p.rapidapi.com/company-cash-flow"
        
        querystring = {
            "symbol": symbol,
            "period": period,
            "language": language
        }
        
        headers = cls.get_headers(RAPIDAPI_HOST_FINANCE)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
    
    @classmethod
    def get_company_data(cls, symbol: str, language: str = 'en') -> Dict[str, Any]:
        """
        Get company data like profile, description, etc.
        
        Args:
            symbol: Stock symbol (ticker)
            language: Language code
            
        Returns:
            Dict containing company data
        """
        url = "https://real-time-finance-data.p.rapidapi.com/company-data"
        
        querystring = {
            "symbol": symbol,
            "language": language
        }
        
        headers = cls.get_headers(RAPIDAPI_HOST_FINANCE)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
    
    @classmethod
    def get_stock_price(cls, symbol: str, language: str = 'en') -> Dict[str, Any]:
        """
        Get stock price data
        
        Args:
            symbol: Stock symbol (ticker)
            language: Language code
            
        Returns:
            Dict containing stock price data
        """
        url = "https://real-time-finance-data.p.rapidapi.com/stock-price"
        
        querystring = {
            "symbol": symbol,
            "language": language
        }
        
        headers = cls.get_headers(RAPIDAPI_HOST_FINANCE)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
    
    @classmethod
    def get_market_news(cls, symbols: Optional[str] = None, language: str = 'en') -> Dict[str, Any]:
        """
        Get financial market news
        
        Args:
            symbols: Comma-separated stock symbols (optional)
            language: Language code
            
        Returns:
            Dict containing market news
        """
        url = "https://real-time-finance-data.p.rapidapi.com/market-news"
        
        querystring = {"language": language}
        if symbols:
            querystring["symbols"] = symbols
        
        headers = cls.get_headers(RAPIDAPI_HOST_FINANCE)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
    
    @classmethod
    def get_stock_quote(cls, symbol: str, language: str = 'en') -> Dict[str, Any]:
        """
        Get stock quote data (real-time price and market data)
        
        Args:
            symbol: Stock symbol (ticker)
            language: Language code
            
        Returns:
            Dict containing stock quote data
        """
        url = "https://real-time-finance-data.p.rapidapi.com/stock-quote"
        
        querystring = {
            "symbol": symbol,
            "language": language
        }
        
        headers = cls.get_headers(RAPIDAPI_HOST_FINANCE)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
    
    @classmethod
    def search_symbols(cls, query: str, language: str = 'en') -> Dict[str, Any]:
        """
        Search for stocks, ETFs, mutual funds, indices, and cryptocurrencies
        
        Args:
            query: Search query
            language: Language code
            
        Returns:
            Dict containing search results
        """
        url = "https://real-time-finance-data.p.rapidapi.com/search"
        
        querystring = {
            "query": query,
            "language": language
        }
        
        headers = cls.get_headers(RAPIDAPI_HOST_FINANCE)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
    
    @classmethod
    def get_market_tickers(cls, page: str = "1", type: str = "STOCKS") -> Dict[str, Any]:
        """
        Get market tickers
        
        Args:
            page: Page number
            type: Type of tickers (STOCKS, MUTUAL_FUNDS, ETFS, INDICES, FUTURES, OPTIONS)
            
        Returns:
            Dict containing market tickers
        """
        url = "https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers"
        
        querystring = {
            "page": page,
            "type": type
        }
        
        headers = cls.get_headers(RAPIDAPI_HOST_YAHOO)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
    
    @classmethod
    def get_ticker_details(cls, ticker: str) -> Dict[str, Any]:
        """
        Get detailed information for a specific ticker
        
        Args:
            ticker: Stock symbol
            
        Returns:
            Dict containing ticker details
        """
        url = f"https://yahoo-finance15.p.rapidapi.com/api/v2/get-summary/{ticker}"
        
        headers = cls.get_headers(RAPIDAPI_HOST_YAHOO)
        
        response = requests.get(url, headers=headers)
        return response.json()
    
    @classmethod
    def get_ticker_news(cls, ticker: str, type: str = "ALL") -> Dict[str, Any]:
        """
        Get news for a specific ticker
        
        Args:
            ticker: Stock symbol
            type: Type of news (ALL, BLOGS, VIDEOS, etc.)
            
        Returns:
            Dict containing ticker news
        """
        url = "https://yahoo-finance15.p.rapidapi.com/api/v2/markets/news"
        
        querystring = {
            "tickers": ticker,
            "type": type
        }
        
        headers = cls.get_headers(RAPIDAPI_HOST_YAHOO)
        
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
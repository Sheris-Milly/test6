import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from finance_api.services.finance_data_service import FinanceDataService

def test_get_market_tickers():
    """Test getting market tickers"""
    try:
        result = FinanceDataService.get_market_tickers(page="1", type="STOCKS")
        print("Market Tickers Response:")
        if result.get('status') == 'ok':
            print(f"Success! Found {len(result.get('data', {}).get('items', []))} tickers")
        else:
            print(f"Error: {result}")
    except Exception as e:
        print(f"Exception: {e}")

def test_search_symbols():
    """Test searching for symbols"""
    try:
        result = FinanceDataService.search_symbols("AAPL")
        print("\nSymbol Search Response:")
        if result.get('status') == 'success':
            print(f"Success! Found {len(result.get('data', []))} symbols")
        else:
            print(f"Error: {result}")
    except Exception as e:
        print(f"Exception: {e}")

def test_stock_quote():
    """Test getting stock quote"""
    try:
        result = FinanceDataService.get_stock_quote("AAPL")
        print("\nStock Quote Response:")
        if result.get('status') == 'success':
            print(f"Success! Got quote for {result.get('data', {}).get('symbol')}")
        else:
            print(f"Error: {result}")
    except Exception as e:
        print(f"Exception: {e}")

def test_ticker_details():
    """Test getting ticker details"""
    try:
        result = FinanceDataService.get_ticker_details("AAPL")
        print("\nTicker Details Response:")
        if 'data' in result:
            print(f"Success! Got details for {result.get('data', {}).get('symbol')}")
        else:
            print(f"Error: {result}")
    except Exception as e:
        print(f"Exception: {e}")
        
def test_ticker_news():
    """Test getting news for a specific ticker"""
    try:
        result = FinanceDataService.get_ticker_news("AAPL", "ALL")
        print("\nTicker News Response:")
        if 'data' in result:
            num_news = len(result.get('data', {}).get('items', []))
            print(f"Success! Found {num_news} news items for AAPL")
        else:
            print(f"Error: {result}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    # Check if RAPIDAPI_KEY is set
    if not os.environ.get('RAPIDAPI_KEY'):
        print("ERROR: RAPIDAPI_KEY environment variable is not set")
        sys.exit(1)
    
    api_key = os.environ.get('RAPIDAPI_KEY', '')
    masked_key = api_key[:5] + "..." if api_key else ""
    print(f"Using RAPIDAPI_KEY: {masked_key}")
    
    test_get_market_tickers()
    # Uncomment these if you want to test more endpoints
    # test_search_symbols()
    # test_stock_quote()
    # test_ticker_details()
    test_ticker_news()
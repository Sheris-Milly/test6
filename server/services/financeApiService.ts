import axios from 'axios';

// Finance API Service to proxy requests to our Django backend
// which handles the actual RapidAPI calls

// Configure Django API base URL
// This should point to wherever your Django server is running
const DJANGO_API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create a reusable axios instance for Django API requests
const djangoApiClient = axios.create({
  baseURL: DJANGO_API_BASE_URL
});

/**
 * Get company cash flow data
 * @param symbol Stock symbol (ticker) e.g., AAPL, MSFT:NASDAQ
 * @param period QUARTERLY or ANNUAL
 * @param language Language code (default: en)
 */
export async function getCompanyCashFlow(symbol: string, period: 'QUARTERLY' | 'ANNUAL' = 'QUARTERLY', language: string = 'en') {
  try {
    const response = await djangoApiClient.get('/finance/company-cash-flow/', {
      params: { symbol, period, language }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company cash flow:', error);
    throw error;
  }
}

/**
 * Get company data like profile, description, etc.
 * @param symbol Stock symbol (ticker)
 * @param language Language code (default: en)
 */
export async function getCompanyData(symbol: string, language: string = 'en') {
  try {
    const response = await djangoApiClient.get('/finance/company-data/', {
      params: { symbol, language }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw error;
  }
}

/**
 * Get stock price data
 * @param symbol Stock symbol (ticker)
 * @param language Language code (default: en)
 */
export async function getStockPrice(symbol: string, language: string = 'en') {
  try {
    const response = await djangoApiClient.get('/finance/stock-price/', {
      params: { symbol, language }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    throw error;
  }
}

/**
 * Get financial market news related to specific tickers or general market news
 * @param symbols Comma-separated stock symbols (optional)
 * @param language Language code (default: en)
 */
export async function getMarketNews(symbols?: string, language: string = 'en') {
  try {
    const response = await djangoApiClient.get('/finance/market-news/', {
      params: { 
        symbols, 
        language
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market news:', error);
    throw error;
  }
}

/**
 * Get stock quote data (real-time price and market data)
 * @param symbol Stock symbol (ticker)
 * @param language Language code (default: en)
 */
export async function getStockQuote(symbol: string, language: string = 'en') {
  try {
    const response = await djangoApiClient.get('/finance/stock-quote/', {
      params: { symbol, language }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
}

/**
 * Search for stocks, ETFs, mutual funds, indices, and cryptocurrencies
 * @param query Search query
 * @param language Language code (default: en)
 */
export async function searchSymbols(query: string, language: string = 'en') {
  try {
    const response = await djangoApiClient.get('/finance/search/', {
      params: { query, language }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching symbols:', error);
    throw error;
  }
}

/**
 * Get market tickers
 * @param page Page number (default: 1)
 * @param type Type of tickers (STOCKS, MUTUAL_FUNDS, ETFS, INDICES, FUTURES, OPTIONS)
 */
export async function getMarketTickers(page: string = '1', type: string = 'STOCKS') {
  try {
    const response = await djangoApiClient.get('/finance/market-tickers/', {
      params: { page, type }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market tickers:', error);
    throw error;
  }
}

/**
 * Get ticker details
 * @param ticker Stock symbol
 */
export async function getTickerDetails(ticker: string) {
  try {
    const response = await djangoApiClient.get(`/finance/ticker-details/${ticker}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ticker details:', error);
    throw error;
  }
}

/**
 * Get ticker news
 * @param ticker Stock symbol
 * @param type Type of news (ALL, BLOGS, VIDEOS, etc.)
 */
export async function getTickerNews(ticker: string, type: string = 'ALL') {
  try {
    const response = await djangoApiClient.get(`/finance/ticker-news/${ticker}/`, {
      params: { type }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ticker news:', error);
    throw error;
  }
}
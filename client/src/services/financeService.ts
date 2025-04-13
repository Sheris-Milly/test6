import { apiRequest } from '@/lib/queryClient';

/**
 * Get company cash flow data
 * @param symbol Stock symbol (ticker)
 * @param period QUARTERLY or ANNUAL
 * @param language Language code
 */
export async function getCompanyCashFlow(symbol: string, period: 'QUARTERLY' | 'ANNUAL' = 'QUARTERLY', language?: string) {
  const params = new URLSearchParams();
  params.append('symbol', symbol);
  params.append('period', period);
  if (language) params.append('language', language);
  
  const response = await apiRequest('GET', `/api/finance/company-cash-flow?${params.toString()}`);
  return await response.json();
}

/**
 * Get company data like profile, description, etc.
 * @param symbol Stock symbol (ticker)
 * @param language Language code
 */
export async function getCompanyData(symbol: string, language?: string) {
  const params = new URLSearchParams();
  params.append('symbol', symbol);
  if (language) params.append('language', language);
  
  const response = await apiRequest('GET', `/api/finance/company-data?${params.toString()}`);
  return await response.json();
}

/**
 * Get stock price data
 * @param symbol Stock symbol (ticker)
 * @param language Language code
 */
export async function getStockPrice(symbol: string, language?: string) {
  const params = new URLSearchParams();
  params.append('symbol', symbol);
  if (language) params.append('language', language);
  
  const response = await apiRequest('GET', `/api/finance/stock-price?${params.toString()}`);
  return await response.json();
}

/**
 * Get financial market news
 * @param symbols Comma-separated stock symbols (optional)
 * @param language Language code
 */
export async function getMarketNews(symbols?: string, language?: string) {
  const params = new URLSearchParams();
  if (symbols) params.append('symbols', symbols);
  if (language) params.append('language', language);
  
  const response = await apiRequest('GET', `/api/finance/market-news?${params.toString()}`);
  return await response.json();
}

/**
 * Get stock quote data (real-time price and market data)
 * @param symbol Stock symbol (ticker)
 * @param language Language code
 */
export async function getStockQuote(symbol: string, language?: string) {
  const params = new URLSearchParams();
  params.append('symbol', symbol);
  if (language) params.append('language', language);
  
  const response = await apiRequest('GET', `/api/finance/stock-quote?${params.toString()}`);
  return await response.json();
}

/**
 * Search for stocks, ETFs, mutual funds, indices, and cryptocurrencies
 * @param query Search query
 * @param language Language code
 */
export async function searchSymbols(query: string, language?: string) {
  const params = new URLSearchParams();
  params.append('query', query);
  if (language) params.append('language', language);
  
  const response = await apiRequest('GET', `/api/finance/search?${params.toString()}`);
  return await response.json();
}
import { useQuery } from '@tanstack/react-query';
import * as financeService from '@/services/financeService';

/**
 * Hook to fetch company cash flow data
 */
export function useCompanyCashFlow(symbol: string, period: 'QUARTERLY' | 'ANNUAL' = 'QUARTERLY', options = {}) {
  return useQuery({
    queryKey: ['/api/finance/company-cash-flow', symbol, period],
    queryFn: () => financeService.getCompanyCashFlow(symbol, period),
    enabled: !!symbol,
    ...options,
  });
}

/**
 * Hook to fetch company data
 */
export function useCompanyData(symbol: string, options = {}) {
  return useQuery({
    queryKey: ['/api/finance/company-data', symbol],
    queryFn: () => financeService.getCompanyData(symbol),
    enabled: !!symbol,
    ...options,
  });
}

/**
 * Hook to fetch stock price data
 */
export function useStockPrice(symbol: string, options = {}) {
  return useQuery({
    queryKey: ['/api/finance/stock-price', symbol],
    queryFn: () => financeService.getStockPrice(symbol),
    enabled: !!symbol,
    ...options,
  });
}

/**
 * Hook to fetch market news
 */
export function useMarketNews(symbols?: string, options = {}) {
  return useQuery({
    queryKey: ['/api/finance/market-news', symbols],
    queryFn: () => financeService.getMarketNews(symbols),
    ...options,
  });
}

/**
 * Hook to fetch stock quote data
 */
export function useStockQuote(symbol: string, options = {}) {
  return useQuery({
    queryKey: ['/api/finance/stock-quote', symbol],
    queryFn: () => financeService.getStockQuote(symbol),
    enabled: !!symbol,
    ...options,
  });
}

/**
 * Hook to search for financial symbols
 */
export function useSymbolSearch(query: string, options = {}) {
  return useQuery({
    queryKey: ['/api/finance/search', query],
    queryFn: () => financeService.searchSymbols(query),
    enabled: !!query && query.length > 1,
    ...options,
  });
}
import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

import * as financeApi from './services/financeApiService';

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Config route - exposes necessary client configuration
  app.get("/api/config", (req, res) => {
    res.json({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
  });

  // Finance API routes
  app.get("/api/finance/company-cash-flow", async (req, res) => {
    try {
      const { symbol, period, language } = req.query;
      
      if (!symbol) {
        return res.status(400).json({ error: "Symbol parameter is required" });
      }
      
      const data = await financeApi.getCompanyCashFlow(
        symbol as string,
        period as any || "QUARTERLY",
        language as string
      );
      
      res.json(data);
    } catch (error) {
      console.error("Error in company cash flow API:", error);
      res.status(500).json({ error: "Failed to fetch company cash flow data" });
    }
  });

  app.get("/api/finance/company-data", async (req, res) => {
    try {
      const { symbol, language } = req.query;
      
      if (!symbol) {
        return res.status(400).json({ error: "Symbol parameter is required" });
      }
      
      const data = await financeApi.getCompanyData(
        symbol as string,
        language as string
      );
      
      res.json(data);
    } catch (error) {
      console.error("Error in company data API:", error);
      res.status(500).json({ error: "Failed to fetch company data" });
    }
  });

  app.get("/api/finance/stock-price", async (req, res) => {
    try {
      const { symbol, language } = req.query;
      
      if (!symbol) {
        return res.status(400).json({ error: "Symbol parameter is required" });
      }
      
      const data = await financeApi.getStockPrice(
        symbol as string,
        language as string
      );
      
      res.json(data);
    } catch (error) {
      console.error("Error in stock price API:", error);
      res.status(500).json({ error: "Failed to fetch stock price data" });
    }
  });

  app.get("/api/finance/market-news", async (req, res) => {
    try {
      const { symbols, language } = req.query;
      
      const data = await financeApi.getMarketNews(
        symbols as string,
        language as string
      );
      
      res.json(data);
    } catch (error) {
      console.error("Error in market news API:", error);
      res.status(500).json({ error: "Failed to fetch market news" });
    }
  });

  app.get("/api/finance/stock-quote", async (req, res) => {
    try {
      const { symbol, language } = req.query;
      
      if (!symbol) {
        return res.status(400).json({ error: "Symbol parameter is required" });
      }
      
      const data = await financeApi.getStockQuote(
        symbol as string,
        language as string
      );
      
      res.json(data);
    } catch (error) {
      console.error("Error in stock quote API:", error);
      res.status(500).json({ error: "Failed to fetch stock quote data" });
    }
  });

  app.get("/api/finance/search", async (req, res) => {
    try {
      const { query, language } = req.query;
      
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }
      
      const data = await financeApi.searchSymbols(
        query as string,
        language as string
      );
      
      res.json(data);
    } catch (error) {
      console.error("Error in search API:", error);
      res.status(500).json({ error: "Failed to search for symbols" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolios", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const portfolios = await storage.getPortfoliosByUserId(req.user!.id);
      return res.json(portfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      return res.status(500).json({ message: "Error fetching portfolios" });
    }
  });

  app.post("/api/portfolios", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const { name, description } = req.body;
      const portfolio = await storage.createPortfolio({
        name,
        description,
        userId: req.user!.id,
      });
      return res.status(201).json(portfolio);
    } catch (error) {
      console.error("Error creating portfolio:", error);
      return res.status(500).json({ message: "Error creating portfolio" });
    }
  });

  // Stock routes
  app.get("/api/portfolios/:portfolioId/stocks", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const portfolioId = parseInt(req.params.portfolioId);
      const portfolio = await storage.getPortfolio(portfolioId);
      
      if (!portfolio || portfolio.userId !== req.user!.id) {
        return res.status(403).json({ message: "Not authorized to access this portfolio" });
      }
      
      const stocks = await storage.getStocksByPortfolioId(portfolioId);
      return res.json(stocks);
    } catch (error) {
      console.error("Error fetching stocks:", error);
      return res.status(500).json({ message: "Error fetching stocks" });
    }
  });

  app.post("/api/portfolios/:portfolioId/stocks", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const portfolioId = parseInt(req.params.portfolioId);
      const portfolio = await storage.getPortfolio(portfolioId);
      
      if (!portfolio || portfolio.userId !== req.user!.id) {
        return res.status(403).json({ message: "Not authorized to access this portfolio" });
      }
      
      const { symbol, name, quantity, purchasePrice, currentPrice } = req.body;
      const stock = await storage.createStock({
        portfolioId,
        symbol,
        name,
        quantity,
        purchasePrice,
        currentPrice,
      });
      return res.status(201).json(stock);
    } catch (error) {
      console.error("Error creating stock:", error);
      return res.status(500).json({ message: "Error creating stock" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

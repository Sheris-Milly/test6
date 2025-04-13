import { users, portfolios, stocks, type User, type InsertUser, type Portfolio, type InsertPortfolio, type Stock, type InsertStock } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPortfoliosByUserId(userId: number): Promise<Portfolio[]>;
  getPortfolio(id: number): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  
  getStocksByPortfolioId(portfolioId: number): Promise<Stock[]>;
  getStock(id: number): Promise<Stock | undefined>;
  createStock(stock: InsertStock): Promise<Stock>;
  
  sessionStore: any; // Use any type to avoid TypeScript errors
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }
  
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async getPortfoliosByUserId(userId: number): Promise<Portfolio[]> {
    return await db.select().from(portfolios).where(eq(portfolios.userId, userId));
  }
  
  async getPortfolio(id: number): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.id, id));
    return portfolio;
  }
  
  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const [portfolio] = await db
      .insert(portfolios)
      .values(insertPortfolio)
      .returning();
    return portfolio;
  }
  
  async getStocksByPortfolioId(portfolioId: number): Promise<Stock[]> {
    return await db.select().from(stocks).where(eq(stocks.portfolioId, portfolioId));
  }
  
  async getStock(id: number): Promise<Stock | undefined> {
    const [stock] = await db.select().from(stocks).where(eq(stocks.id, id));
    return stock;
  }
  
  async createStock(insertStock: InsertStock): Promise<Stock> {
    const [stock] = await db
      .insert(stocks)
      .values(insertStock)
      .returning();
    return stock;
  }
}

export const storage = new DatabaseStorage();

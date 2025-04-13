import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull().references(() => portfolios.id),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  purchasePrice: integer("purchase_price").notNull(),
  currentPrice: integer("current_price"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertPortfolioSchema = createInsertSchema(portfolios).pick({
  name: true,
  description: true,
  userId: true,
});

export const insertStockSchema = createInsertSchema(stocks).pick({
  portfolioId: true,
  symbol: true,
  name: true,
  quantity: true,
  purchasePrice: true,
  currentPrice: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type InsertStock = z.infer<typeof insertStockSchema>;
export type User = typeof users.$inferSelect;
export type Portfolio = typeof portfolios.$inferSelect;
export type Stock = typeof stocks.$inferSelect;

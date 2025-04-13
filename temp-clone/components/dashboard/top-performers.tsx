"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

interface TopPerformersProps {
  isLoading: boolean
}

export function TopPerformers({ isLoading }: TopPerformersProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  // Sample top performers data (in a real app, this would come from an API)
  const topPerformers = [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.5, change: 3.45 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 410.75, change: 2.87 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 950.25, change: 2.65 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 180.3, change: 2.12 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 175.8, change: 1.95 },
  ]

  return (
    <div className="space-y-3">
      {topPerformers.map((stock, index) => (
        <motion.div
          key={stock.symbol}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
              {stock.symbol.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-xs text-zinc-400">{stock.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{formatCurrency(stock.price)}</div>
            <div className="flex items-center text-xs text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              {formatPercentage(stock.change / 100)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

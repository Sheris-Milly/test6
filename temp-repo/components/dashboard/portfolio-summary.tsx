"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Plus } from "lucide-react"
import { AddStockDialog } from "@/components/portfolio/add-stock-dialog"

interface PortfolioSummaryProps {
  isLoading?: boolean
  showDetails?: boolean
}

// Sample portfolio data - in a real app, this would come from an API or local storage
const samplePortfolio = [
  { name: "AAPL", value: 35, color: "#10b981" },
  { name: "MSFT", value: 25, color: "#3b82f6" },
  { name: "AMZN", value: 20, color: "#f59e0b" },
  { name: "GOOGL", value: 15, color: "#ef4444" },
  { name: "TSLA", value: 5, color: "#8b5cf6" },
]

export function PortfolioSummary({ isLoading = false, showDetails = false }: PortfolioSummaryProps) {
  const [portfolio, setPortfolio] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("portfolio")
    return saved ? JSON.parse(saved) : samplePortfolio
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const totalValue = 125000 // In a real app, calculate this from actual holdings

  const addStock = (stock: { name: string; value: number; color: string }) => {
    const updatedPortfolio = [...portfolio, stock]
    setPortfolio(updatedPortfolio)
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolio}
              cx="50%"
              cy="50%"
              innerRadius={showDetails ? 60 : 40}
              outerRadius={showDetails ? 80 : 60}
              paddingAngle={2}
              dataKey="value"
            >
              {portfolio.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value}%`, "Allocation"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">{formatCurrency(totalValue)}</div>
        <div className="text-green-600">
          <span>+{formatCurrency(3750)}</span>
          <span className="ml-2">({formatPercentage(0.03)})</span>
        </div>
      </div>

      {showDetails && (
        <div className="pt-4">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>

          <AddStockDialog open={dialogOpen} onOpenChange={setDialogOpen} onAddStock={addStock} />
        </div>
      )}
    </div>
  )
}

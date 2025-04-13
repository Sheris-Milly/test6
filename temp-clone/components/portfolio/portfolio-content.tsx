"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PortfolioTable } from "@/components/portfolio/portfolio-table"
import { PortfolioChart } from "@/components/portfolio/portfolio-chart"
import { PortfolioStats } from "@/components/portfolio/portfolio-stats"
import { PortfolioAllocation } from "@/components/portfolio/portfolio-allocation"
import { PortfolioPerformance } from "@/components/portfolio/portfolio-performance"
import { AddStockDialog } from "@/components/portfolio/add-stock-dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

// Sample portfolio data - in a real app, this would come from an API
const sampleStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 10,
    purchasePrice: 150.0,
    currentPrice: 175.5,
    value: 1755.0,
    gain: 255.0,
    gainPercent: 17.0,
    allocation: 35,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 5,
    purchasePrice: 250.0,
    currentPrice: 310.75,
    value: 1553.75,
    gain: 303.75,
    gainPercent: 24.3,
    allocation: 25,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 3,
    purchasePrice: 3100.0,
    currentPrice: 3300.0,
    value: 9900.0,
    gain: 600.0,
    gainPercent: 6.45,
    allocation: 20,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 2,
    purchasePrice: 2700.0,
    currentPrice: 2850.0,
    value: 5700.0,
    gain: 300.0,
    gainPercent: 5.56,
    allocation: 15,
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 4,
    purchasePrice: 700.0,
    currentPrice: 650.0,
    value: 2600.0,
    gain: -200.0,
    gainPercent: -7.14,
    allocation: 5,
  },
]

export function PortfolioContent() {
  const [stocks, setStocks] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("portfolioStocks")
    return saved ? JSON.parse(saved) : sampleStocks
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [showApiErrorDialog, setShowApiErrorDialog] = useState(false)
  const { toast } = useToast()

  // Save stocks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("portfolioStocks", JSON.stringify(stocks))
  }, [stocks])

  // Check if API keys are available
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY || !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setApiError(true)
      setShowApiErrorDialog(true)
    }
  }, [])

  const addStock = (newStock: any) => {
    // Calculate allocation based on value
    const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0) + newStock.value

    // Recalculate allocations for all stocks
    const updatedStocks = stocks.map((stock) => ({
      ...stock,
      allocation: Math.round((stock.value / totalValue) * 100),
    }))

    // Add new stock with calculated allocation
    const stockWithAllocation = {
      ...newStock,
      allocation: Math.round((newStock.value / totalValue) * 100),
    }

    setStocks([...updatedStocks, stockWithAllocation])

    toast({
      title: "Stock added",
      description: `${newStock.name} (${newStock.symbol}) has been added to your portfolio.`,
    })
  }

  const removeStock = (symbol: string) => {
    const updatedStocks = stocks.filter((stock) => stock.symbol !== symbol)

    // Recalculate allocations
    const totalValue = updatedStocks.reduce((sum, stock) => sum + stock.value, 0)
    const stocksWithUpdatedAllocations = updatedStocks.map((stock) => ({
      ...stock,
      allocation: Math.round((stock.value / totalValue) * 100),
    }))

    setStocks(stocksWithUpdatedAllocations)

    toast({
      title: "Stock removed",
      description: `${symbol} has been removed from your portfolio.`,
    })
  }

  const updateAllocation = (symbol: string, allocation: number) => {
    // Update the allocation for the specified stock
    const updatedStocks = stocks.map((stock) => (stock.symbol === symbol ? { ...stock, allocation } : stock))

    setStocks(updatedStocks)

    toast({
      title: "Allocation updated",
      description: `${symbol} allocation has been updated to ${allocation}%.`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Portfolio Analysis</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      {/* API Error Dialog */}
      <Dialog open={showApiErrorDialog} onOpenChange={setShowApiErrorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-yellow-500 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-alert-triangle"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              Simulation Mode Active
            </DialogTitle>
            <DialogDescription>
              Due to API connection issues, you are currently viewing simulated data. The data shown is for
              demonstration purposes only and does not reflect real-time market conditions.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-yellow-500/10 p-4 rounded-md border border-yellow-500/20 text-sm">
            <p className="font-medium text-yellow-500 mb-2">To resolve this issue:</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Ensure you have valid API keys configured in your environment variables</li>
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowApiErrorDialog(false)}>Continue in Simulation Mode</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <PortfolioStats stocks={stocks} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Current distribution of your investments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PortfolioChart stocks={stocks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>Detailed view of your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioTable stocks={stocks} onRemove={removeStock} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <PortfolioAllocation stocks={stocks} onUpdateAllocation={updateAllocation} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PortfolioPerformance stocks={stocks} />
        </TabsContent>
      </Tabs>

      <AddStockDialog open={dialogOpen} onOpenChange={setDialogOpen} onAddStock={addStock} />
    </div>
  )
}

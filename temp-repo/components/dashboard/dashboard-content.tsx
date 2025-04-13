"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { ArrowUpRight, RefreshCw, Download, DollarSign, BarChart3 } from "lucide-react"
import { fetchMarketData } from "@/lib/api/yahoo-finance"
import { fetchStockNews } from "@/lib/api/stock-news"
import { formatCurrency } from "@/lib/utils"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { RecentNews } from "@/components/dashboard/recent-news"
import { FinanceAgent } from "@/components/dashboard/finance-agent"
import { TopPerformers } from "@/components/dashboard/top-performers"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export function DashboardContent() {
  const [marketData, setMarketData] = useState<any>(null)
  const [newsData, setNewsData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [showApiErrorDialog, setShowApiErrorDialog] = useState(false)
  const { toast } = useToast()

  // Sample portfolio data
  const portfolioValue = 124567.89
  const portfolioChange = 2.34
  const lastUpdated = new Date()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      setApiError(false)

      // Check if we have cached market data and if it's still valid
      const cachedMarketData = localStorage.getItem("marketData")
      const cachedMarketTimestamp = localStorage.getItem("marketDataTimestamp")
      const cachedNewsData = localStorage.getItem("newsData")
      const cachedNewsTimestamp = localStorage.getItem("newsDataTimestamp")

      const now = new Date().getTime()
      const marketDataIsValid =
        cachedMarketData && cachedMarketTimestamp && now - Number.parseInt(cachedMarketTimestamp) < 15 * 60 * 1000 // 15 minutes

      const newsDataIsValid =
        cachedNewsData && cachedNewsTimestamp && now - Number.parseInt(cachedNewsTimestamp) < 24 * 60 * 60 * 1000 // 24 hours

      let market
      let news

      if (marketDataIsValid) {
        market = JSON.parse(cachedMarketData)
      } else {
        try {
          market = await fetchMarketData("SPY", "1D")
          localStorage.setItem("marketData", JSON.stringify(market))
          localStorage.setItem("marketDataTimestamp", now.toString())
        } catch (error) {
          console.error("Error fetching market data:", error)
          setApiError(true)
          // Use simulated data as fallback
          market = await fetchMarketData("SPY", "1D")
        }
      }

      if (newsDataIsValid) {
        news = JSON.parse(cachedNewsData)
      } else {
        try {
          news = await fetchStockNews("SPY:NYSE")
          localStorage.setItem("newsData", JSON.stringify(news))
          localStorage.setItem("newsDataTimestamp", now.toString())
        } catch (error) {
          console.error("Error fetching news data:", error)
          setApiError(true)
          // Use simulated data as fallback
          news = await fetchStockNews("SPY:NYSE")
        }
      }

      setMarketData(market)
      setNewsData(news)

      // Check if API keys are missing
      if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY || !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        setApiError(true)
      }

      // Show API error dialog if there's an error
      if (apiError) {
        setShowApiErrorDialog(true)
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      setApiError(true)
      setShowApiErrorDialog(true)
      toast({
        title: "Error loading data",
        description: "Could not fetch the latest market data. Using simulated data instead.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Clear cache to force fresh data
    localStorage.removeItem("marketData")
    localStorage.removeItem("marketDataTimestamp")
    localStorage.removeItem("newsData")
    localStorage.removeItem("newsDataTimestamp")

    loadData()

    toast({
      title: "Refreshing data",
      description: "Fetching the latest market information...",
    })
  }

  const handleExport = () => {
    // Create a data object to export
    const exportData = {
      portfolioValue,
      portfolioChange,
      lastUpdated: new Date().toISOString(),
      marketData: marketData?.data,
    }

    // Convert to JSON and create download link
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `finance-dashboard-${new Date().toISOString().split("T")[0]}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()

    toast({
      title: "Export successful",
      description: "Dashboard data has been exported successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
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
              <li>Try refreshing the data using the refresh button</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowApiErrorDialog(false)}>Continue in Simulation Mode</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 text-white dark:from-zinc-900 dark:to-zinc-950">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-400">Portfolio Value</div>
                <DollarSign className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="mt-3 flex items-baseline">
                <div className="text-3xl font-bold">{formatCurrency(portfolioValue)}</div>
              </div>
              <div className="mt-1 text-xs text-zinc-400">Updated {lastUpdated.toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 text-white dark:from-zinc-900 dark:to-zinc-950">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-400">Daily Change</div>
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="mt-3 flex items-baseline">
                <div className="text-3xl font-bold text-emerald-500">+{portfolioChange}%</div>
              </div>
              <div className="mt-1 text-xs text-zinc-400">Compared to yesterday</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 text-white dark:from-zinc-900 dark:to-zinc-950">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-400">Top Performer</div>
                <BarChart3 className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="mt-3 flex items-baseline">
                <div className="text-3xl font-bold">AAPL</div>
              </div>
              <div className="mt-1 text-xs text-emerald-500">+3.45% today</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="advisor">AI Advisor</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 dark:text-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Portfolio Performance</h3>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                  <div className="h-[300px]">
                    <PortfolioChart isLoading={isLoading} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="h-full dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 dark:text-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Market Overview</h3>
                    <div className="text-xs text-muted-foreground">Major indices and indicators</div>
                  </div>
                  <MarketOverview data={marketData} isLoading={isLoading} />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="h-full dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 dark:text-white">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Recent News</h3>
                  </div>
                  <RecentNews news={newsData} isLoading={isLoading} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="h-full dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 dark:text-white">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Top Performers</h3>
                  </div>
                  <TopPerformers isLoading={isLoading} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6">
            <Card className="h-full dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 dark:text-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Portfolio Growth</h3>
                </div>
                <div className="h-[400px]">
                  <PortfolioChart isLoading={isLoading} showDetails />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advisor" className="space-y-6">
          <Card className="dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950 dark:text-white">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">AI Financial Advisor</h3>
              </div>
              <FinanceAgent marketData={marketData} newsData={newsData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

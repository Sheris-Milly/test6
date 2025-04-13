"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { MarketNews } from "@/components/market/market-news"
import { MarketOverview } from "@/components/market/market-overview"
import { StockDetails } from "@/components/market/stock-details"
import { fetchMarketData } from "@/lib/api/yahoo-finance"
import { fetchStockNews } from "@/lib/api/stock-news"
import { useToast } from "@/components/ui/use-toast"

export function MarketContent() {
  const [symbol, setSymbol] = useState("SPY")
  const [period, setPeriod] = useState("1D")
  const [stockData, setStockData] = useState<any>(null)
  const [newsData, setNewsData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")
  const { toast } = useToast()

  const fetchData = async (sym: string, per: string) => {
    setIsLoading(true)
    try {
      // Check if we have cached data and if it's still valid
      const cacheKey = `marketData_${sym}_${per}`
      const newsCacheKey = `newsData_${sym}`

      const cachedData = localStorage.getItem(cacheKey)
      const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`)
      const cachedNews = localStorage.getItem(newsCacheKey)
      const cachedNewsTimestamp = localStorage.getItem(`${newsCacheKey}_timestamp`)

      const now = new Date().getTime()

      // Different cache durations based on period
      let cacheDuration = 15 * 60 * 1000 // 15 minutes default
      if (per === "1D") cacheDuration = 5 * 60 * 1000 // 5 minutes for 1D
      if (per === "5D") cacheDuration = 30 * 60 * 1000 // 30 minutes for 5D
      if (per === "1M" || per === "3M") cacheDuration = 60 * 60 * 1000 // 1 hour for 1M/3M
      if (per === "6M" || per === "1Y") cacheDuration = 24 * 60 * 60 * 1000 // 24 hours for 6M/1Y

      const newsCacheDuration = 60 * 60 * 1000 // 1 hour for news

      let marketData
      let news

      // Check if cache is valid
      const dataIsValid = cachedData && cachedTimestamp && now - Number.parseInt(cachedTimestamp) < cacheDuration

      const newsIsValid =
        cachedNews && cachedNewsTimestamp && now - Number.parseInt(cachedNewsTimestamp) < newsCacheDuration

      // Fetch or use cached market data
      if (dataIsValid) {
        marketData = JSON.parse(cachedData)
      } else {
        marketData = await fetchMarketData(sym, per)
        localStorage.setItem(cacheKey, JSON.stringify(marketData))
        localStorage.setItem(`${cacheKey}_timestamp`, now.toString())
      }

      // Fetch or use cached news
      if (newsIsValid) {
        news = JSON.parse(cachedNews)
      } else {
        news = await fetchStockNews(`${sym}:NYSE`)
        localStorage.setItem(newsCacheKey, JSON.stringify(news))
        localStorage.setItem(`${newsCacheKey}_timestamp`, now.toString())
      }

      setStockData(marketData)
      setNewsData(news)
    } catch (error) {
      console.error("Error fetching market data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch market data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(symbol, period)
  }, [symbol, period, toast])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSymbol(searchInput.trim().toUpperCase())
      setSearchInput("")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Market Research</h1>
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter stock symbol (e.g. AAPL)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {stockData?.data?.symbol || symbol} - {stockData?.data?.name || "Loading..."}
          </CardTitle>
          <CardDescription>
            {stockData?.data?.exchange ? `${stockData.data.exchange} • ${stockData.data.currency}` : "Market data"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarketOverview data={stockData} isLoading={isLoading} />

          <div className="mt-6">
            <Tabs defaultValue="1D" onValueChange={setPeriod} value={period}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="5D">5D</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="3M">3M</TabsTrigger>
                <TabsTrigger value="6M">6M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
                <TabsTrigger value="MAX">MAX</TabsTrigger>
              </TabsList>
              <TabsContent value={period}>
                <StockDetails symbol={symbol} period={period} data={stockData} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest News</CardTitle>
          <CardDescription>Recent news about {symbol}</CardDescription>
        </CardHeader>
        <CardContent>
          <MarketNews news={newsData} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}

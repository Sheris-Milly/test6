import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import SidebarNavigation from "@/components/dashboard/sidebar-navigation"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  Input
} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { 
  Search, 
  LineChart, 
  BarChart3, 
  Bookmark, 
  Star, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Boxes, 
  DollarSign,
  Calendar,
  AreaChart,
  PercentIcon
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  AreaChart as RechartsAreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  Legend
} from "recharts"

// Sample stock data
const stockData = {
  overview: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.43,
    change: 2.35,
    changePercent: 1.26,
    open: 188.21,
    high: 190.05,
    low: 187.68,
    marketCap: 2970000000000,
    volume: 58432100,
    avgVolume: 53248700,
    pe: 31.22,
    eps: 6.07,
    dividend: 0.96,
    dividendYield: 0.51,
    industry: "Consumer Electronics",
    sector: "Technology",
    beta: 1.25,
    yearHigh: 198.23,
    yearLow: 137.82,
  },
  priceHistory: [
    { date: "2025-01-01", price: 175.50 },
    { date: "2025-01-02", price: 178.72 },
    { date: "2025-01-03", price: 177.15 },
    { date: "2025-01-06", price: 176.89 },
    { date: "2025-01-07", price: 180.40 },
    { date: "2025-01-08", price: 181.45 },
    { date: "2025-01-09", price: 182.20 },
    { date: "2025-01-10", price: 182.88 },
    { date: "2025-01-13", price: 179.64 },
    { date: "2025-01-14", price: 180.10 },
    { date: "2025-01-15", price: 182.75 },
    { date: "2025-01-16", price: 181.98 },
    { date: "2025-01-17", price: 182.30 },
    { date: "2025-01-21", price: 184.82 },
    { date: "2025-01-22", price: 183.94 },
    { date: "2025-01-23", price: 184.75 },
    { date: "2025-01-24", price: 186.12 },
    { date: "2025-01-27", price: 185.85 },
    { date: "2025-01-28", price: 186.79 },
    { date: "2025-01-29", price: 185.65 },
    { date: "2025-01-30", price: 186.94 },
    { date: "2025-01-31", price: 187.08 },
    { date: "2025-02-03", price: 189.75 },
    { date: "2025-02-04", price: 191.28 },
    { date: "2025-02-05", price: 190.86 },
    { date: "2025-02-06", price: 187.24 },
    { date: "2025-02-07", price: 188.68 },
    { date: "2025-02-10", price: 190.32 },
    { date: "2025-02-11", price: 189.58 },
    { date: "2025-02-12", price: 187.43 },
  ],
  volumeData: [
    { date: "2025-01-31", volume: 48523600 },
    { date: "2025-02-03", volume: 55421700 },
    { date: "2025-02-04", volume: 61035800 },
    { date: "2025-02-05", volume: 52452100 },
    { date: "2025-02-06", volume: 57215400 },
    { date: "2025-02-07", volume: 49321600 },
    { date: "2025-02-10", volume: 51325700 },
    { date: "2025-02-11", volume: 54123500 },
    { date: "2025-02-12", volume: 58432100 },
  ],
  news: [
    {
      title: "Apple Earnings Top Expectations as iPhone Sales Rebound in China",
      date: "2h ago",
      source: "Wall Street Journal",
      url: "#",
    },
    {
      title: "Apple's AI Strategy: Balancing Innovation with Privacy Concerns",
      date: "5h ago",
      source: "CNBC",
      url: "#",
    },
    {
      title: "Three New Apple Products Could Launch Next Month, According to Analysts",
      date: "8h ago",
      source: "Bloomberg",
      url: "#",
    },
    {
      title: "Apple Increases Production Orders for Upcoming iPhone Models",
      date: "1d ago",
      source: "Financial Times",
      url: "#",
    },
    {
      title: "Apple's Service Revenue Continues to Grow, Setting New Records",
      date: "1d ago",
      source: "Reuters",
      url: "#",
    },
  ],
};

// Popular stocks
const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.43, change: 2.35, changePercent: 1.26 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.92, change: 4.58, changePercent: 1.22 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 152.19, change: 2.87, changePercent: 1.92 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 153.79, change: 2.43, changePercent: 1.61 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 482.76, change: 11.25, changePercent: 2.39 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 334.92, change: 6.78, changePercent: 2.07 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.48, change: -3.56, changePercent: -1.41 },
  { symbol: "BRK.B", name: "Berkshire Hathaway", price: 395.56, change: 1.23, changePercent: 0.31 },
];

// Time periods for chart
const timePeriods = [
  { label: "1D", value: "1d" },
  { label: "5D", value: "5d" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "MAX", value: "max" },
];

export default function MarketPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStock, setSelectedStock] = useState(stockData)
  const [timePeriod, setTimePeriod] = useState("1m")
  const [isLoading, setIsLoading] = useState(false)
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return
    
    setIsLoading(true)
    // In a real app, we would fetch the stock data from an API
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleStockSelect = (symbol: string) => {
    setIsLoading(true)
    // In a real app, we would fetch the stock data from an API
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const toggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted)
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <SidebarNavigation />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Market Research</h1>
            <p className="text-muted-foreground mt-1">
              Research stocks, track trends, and analyze market data
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Search Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter stock symbol or name..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Popular Stocks</CardTitle>
                    <Tabs defaultValue="gainers" className="w-[260px]">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="gainers">Gainers</TabsTrigger>
                        <TabsTrigger value="losers">Losers</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularStocks.map((stock) => (
                      <button
                        key={stock.symbol}
                        className="w-full flex justify-between items-center py-2 hover:bg-muted/30 rounded-md transition-colors px-2"
                        onClick={() => handleStockSelect(stock.symbol)}
                      >
                        <div className="flex flex-col items-start">
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[150px]">
                            {stock.name}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="font-medium">${stock.price.toFixed(2)}</div>
                          <div
                            className={`text-sm flex items-center ${
                              stock.changePercent >= 0
                                ? "text-emerald-500"
                                : "text-red-500"
                            }`}
                          >
                            {stock.changePercent >= 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            <span>
                              {stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Watchlist</CardTitle>
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Recent
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground text-center py-8">
                    <Star className="h-8 w-8 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="mb-1">No stocks in your watchlist yet</p>
                    <p>Add stocks to track them easily</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{selectedStock.overview.symbol}</CardTitle>
                        <span className="text-muted-foreground">
                          {selectedStock.overview.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleWatchlist}
                          className="h-8 w-8"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              isWatchlisted ? "fill-yellow-400 text-yellow-400" : ""
                            }`}
                          />
                          <span className="sr-only">Add to watchlist</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-2xl font-bold">
                          ${selectedStock.overview.price.toFixed(2)}
                        </span>
                        <span
                          className={`flex items-center ${
                            selectedStock.overview.changePercent >= 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {selectedStock.overview.changePercent >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          <span>
                            {selectedStock.overview.changePercent >= 0 ? "+" : ""}
                            {selectedStock.overview.change.toFixed(2)} (
                            {selectedStock.overview.changePercent.toFixed(2)}%)
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="space-x-1">
                      {timePeriods.map((period) => (
                        <Button
                          key={period.value}
                          variant={timePeriod === period.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTimePeriod(period.value)}
                          className="w-10"
                        >
                          {period.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsAreaChart
                        data={selectedStock.priceHistory}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(date) => {
                            const d = new Date(date)
                            return `${d.getMonth() + 1}/${d.getDate()}`
                          }}
                        />
                        <YAxis
                          domain={['auto', 'auto']}
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          formatter={(value: number) => [
                            `$${value.toFixed(2)}`,
                            "Price",
                          ]}
                          labelFormatter={(label) => {
                            const d = new Date(label)
                            return d.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          }}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </RechartsAreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Stock Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Open</div>
                        <div className="font-medium">${selectedStock.overview.open.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Previous Close</div>
                        <div className="font-medium">
                          ${(selectedStock.overview.price - selectedStock.overview.change).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Day High</div>
                        <div className="font-medium">${selectedStock.overview.high.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Day Low</div>
                        <div className="font-medium">${selectedStock.overview.low.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">52 Week High</div>
                        <div className="font-medium">${selectedStock.overview.yearHigh.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">52 Week Low</div>
                        <div className="font-medium">${selectedStock.overview.yearLow.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Volume</div>
                        <div className="font-medium">{selectedStock.overview.volume.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg. Volume</div>
                        <div className="font-medium">{selectedStock.overview.avgVolume.toLocaleString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Market Cap</div>
                        <div className="font-medium">
                          ${(selectedStock.overview.marketCap / 1000000000).toFixed(2)}B
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">P/E Ratio</div>
                        <div className="font-medium">{selectedStock.overview.pe.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">EPS (TTM)</div>
                        <div className="font-medium">${selectedStock.overview.eps.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Beta</div>
                        <div className="font-medium">{selectedStock.overview.beta.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dividend</div>
                        <div className="font-medium">${selectedStock.overview.dividend.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dividend Yield</div>
                        <div className="font-medium">{selectedStock.overview.dividendYield.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Sector</div>
                        <div className="font-medium">{selectedStock.overview.sector}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Industry</div>
                        <div className="font-medium">{selectedStock.overview.industry}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="news" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="news">News</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="news" className="mt-4 space-y-3">
                  {selectedStock.news.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium mb-1">{item.title}</h3>
                            <div className="text-sm text-muted-foreground">
                              <span>{item.source}</span>
                              <span className="mx-1.5">•</span>
                              <span>{item.date}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              Read
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="financials" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Information</CardTitle>
                      <CardDescription>Revenue, earnings, and other financial metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Revenue Growth (Quarterly)</h3>
                          <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsBarChart
                                data={[
                                  { quarter: "Q1 2024", revenue: 115.15 },
                                  { quarter: "Q2 2024", revenue: 110.43 },
                                  { quarter: "Q3 2024", revenue: 119.58 },
                                  { quarter: "Q4 2024", revenue: 124.32 },
                                  { quarter: "Q1 2025", revenue: 121.93 },
                                ]}
                                margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                                <XAxis dataKey="quarter" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}B`} />
                                <Tooltip
                                  formatter={(value: number) => [`$${value}B`, "Revenue"]}
                                  contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                  }}
                                />
                                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                              </RechartsBarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Income Statement Highlights</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card>
                              <CardContent className="p-4 text-center">
                                <DollarSign className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                <div className="text-sm text-muted-foreground">Revenue (TTM)</div>
                                <div className="font-bold text-xl">$386.59B</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <PercentIcon className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                <div className="text-sm text-muted-foreground">Gross Margin</div>
                                <div className="font-bold text-xl">41.8%</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <LineChart className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                <div className="text-sm text-muted-foreground">Operating Income</div>
                                <div className="font-bold text-xl">$125.87B</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <Boxes className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                                <div className="text-sm text-muted-foreground">Net Income</div>
                                <div className="font-bold text-xl">$95.46B</div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="insights" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stock Insights</CardTitle>
                      <CardDescription>AI-generated analysis and recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Technical Analysis</h3>
                          <p>
                            Apple (AAPL) is currently showing bullish momentum with the stock trading above its 50-day and 200-day moving averages. The RSI is at 62, indicating strong momentum but not yet in overbought territory. Volume patterns show accumulation, suggesting institutional buying. The MACD is positive and trending upward, confirming the bullish signal.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Fundamental Analysis</h3>
                          <p>
                            With a P/E ratio of 31.22, Apple is trading above the industry average of 26.5, reflecting premium valuation. However, the company's strong cash position, consistent revenue growth in services, and potential new product categories justify the premium. The latest quarterly results showed better-than-expected iPhone sales and continued growth in the high-margin services segment.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Analyst Consensus</h3>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                              <div className="flex h-full">
                                <div className="bg-emerald-500 h-full" style={{ width: "65%" }}></div>
                                <div className="bg-yellow-500 h-full" style={{ width: "25%" }}></div>
                                <div className="bg-red-500 h-full" style={{ width: "10%" }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex text-sm justify-between">
                            <div>Buy: 65%</div>
                            <div>Hold: 25%</div>
                            <div>Sell: 10%</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t">
                      <div className="text-sm text-muted-foreground w-full text-center">
                        <Calendar className="h-4 w-4 inline-block mr-1" />
                        Analysis last updated: April 12, 2025
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
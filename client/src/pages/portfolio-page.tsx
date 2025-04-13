import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import SidebarNavigation from "@/components/dashboard/sidebar-navigation"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Legend,
  BarChart,
  Bar
} from "recharts"
import { formatCurrency } from "@/lib/utils"
import { 
  Plus, 
  RefreshCw, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Percent
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Sample portfolio assets data
const portfolioAssets = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", quantity: 25, price: 189.43, costBasis: 175.65, sector: "Technology" },
  { id: 2, symbol: "MSFT", name: "Microsoft Corporation", quantity: 15, price: 378.92, costBasis: 350.12, sector: "Technology" },
  { id: 3, symbol: "GOOGL", name: "Alphabet Inc.", quantity: 10, price: 152.19, costBasis: 140.88, sector: "Technology" },
  { id: 4, symbol: "AMZN", name: "Amazon.com Inc.", quantity: 12, price: 153.79, costBasis: 145.22, sector: "Consumer Cyclical" },
  { id: 5, symbol: "BRK.B", name: "Berkshire Hathaway Inc.", quantity: 20, price: 395.56, costBasis: 380.45, sector: "Financial Services" },
  { id: 6, symbol: "JNJ", name: "Johnson & Johnson", quantity: 18, price: 147.52, costBasis: 155.78, sector: "Healthcare" },
  { id: 7, symbol: "PG", name: "Procter & Gamble Co.", quantity: 22, price: 162.37, costBasis: 155.43, sector: "Consumer Defensive" },
  { id: 8, symbol: "V", name: "Visa Inc.", quantity: 14, price: 275.13, costBasis: 260.56, sector: "Financial Services" },
  { id: 9, symbol: "WMT", name: "Walmart Inc.", quantity: 25, price: 67.15, costBasis: 63.89, sector: "Consumer Defensive" },
  { id: 10, symbol: "UNH", name: "UnitedHealth Group Inc.", quantity: 5, price: 526.76, costBasis: 515.32, sector: "Healthcare" },
];

// Sample allocation data
const allocationData = [
  { name: "Technology", value: 45.8, color: "#2563eb" },
  { name: "Financial Services", value: 18.6, color: "#8b5cf6" },
  { name: "Healthcare", value: 12.7, color: "#06b6d4" },
  { name: "Consumer Defensive", value: 10.4, color: "#10b981" },
  { name: "Consumer Cyclical", value: 9.2, color: "#f59e0b" },
  { name: "Other", value: 3.3, color: "#6b7280" },
];

// Sample performance data
const performanceData = [
  { name: "Jan", portfolio: 8.4, benchmark: 7.2 },
  { name: "Feb", portfolio: 6.2, benchmark: 5.9 },
  { name: "Mar", portfolio: -2.1, benchmark: -3.2 },
  { name: "Apr", portfolio: 4.5, benchmark: 3.8 },
  { name: "May", portfolio: 1.8, benchmark: 2.1 },
  { name: "Jun", portfolio: 3.2, benchmark: 2.8 },
  { name: "Jul", portfolio: 5.6, benchmark: 4.7 },
  { name: "Aug", portfolio: -1.2, benchmark: -1.5 },
  { name: "Sep", portfolio: 2.3, benchmark: 1.8 },
  { name: "Oct", portfolio: 4.1, benchmark: 3.6 },
  { name: "Nov", portfolio: 5.2, benchmark: 4.8 },
  { name: "Dec", portfolio: 3.7, benchmark: 3.2 },
];

export default function PortfolioPage() {
  const { user } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Calculate portfolio statistics
  const totalValue = portfolioAssets.reduce((acc, asset) => acc + asset.price * asset.quantity, 0)
  const totalCost = portfolioAssets.reduce((acc, asset) => acc + asset.costBasis * asset.quantity, 0)
  const totalGain = totalValue - totalCost
  const totalGainPercent = (totalGain / totalCost) * 100
  
  // Calculate for each asset
  const portfolioAssetsWithStats = portfolioAssets.map(asset => {
    const currentValue = asset.price * asset.quantity
    const costValue = asset.costBasis * asset.quantity
    const gain = currentValue - costValue
    const gainPercent = (gain / costValue) * 100
    const allocation = (currentValue / totalValue) * 100
    return {
      ...asset,
      currentValue,
      costValue,
      gain,
      gainPercent,
      allocation
    }
  })

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <SidebarNavigation />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Portfolio</h1>
              <p className="text-muted-foreground mt-1">
                Manage and analyze your investments
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleRefresh} variant="outline">
                {isRefreshing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatCurrency(totalValue)}</div>
                <div className={`flex items-center mt-1 ${totalGain >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {totalGain >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span>{formatCurrency(Math.abs(totalGain))}</span>
                  <span className="mx-1">•</span>
                  <span>{totalGain >= 0 ? "+" : ""}{totalGainPercent.toFixed(2)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="h-[120px] w-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        innerRadius={40}
                        paddingAngle={2}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value.toFixed(1)}%`, "Allocation"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 w-full">
                  {allocationData.slice(0, 4).map((sector) => (
                    <div key={sector.name} className="flex items-center">
                      <div
                        className="h-3 w-3 rounded-full mr-2"
                        style={{ backgroundColor: sector.color }}
                      />
                      <div className="text-xs">{sector.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData.slice(0, 6)}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        formatter={(value: number) => [`${value.toFixed(2)}%`, "Return"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="portfolio"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        stroke="#6b7280"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        strokeDasharray="3 3"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-1.5" />
                    <span>Portfolio</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-500 mr-1.5" />
                    <span>S&P 500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Portfolio Holdings</CardTitle>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Symbol</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Name</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Quantity</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Price</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Value</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Gain/Loss</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Allocation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {portfolioAssetsWithStats.map((asset) => (
                            <tr key={asset.id} className="hover:bg-muted/30 transition-colors">
                              <td className="py-3 px-4 text-left font-medium">{asset.symbol}</td>
                              <td className="py-3 px-4 text-left">{asset.name}</td>
                              <td className="py-3 px-4 text-right">{asset.quantity}</td>
                              <td className="py-3 px-4 text-right">{formatCurrency(asset.price)}</td>
                              <td className="py-3 px-4 text-right font-medium">{formatCurrency(asset.currentValue)}</td>
                              <td className={`py-3 px-4 text-right ${asset.gain >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                <div>{formatCurrency(asset.gain)}</div>
                                <div className="text-xs">
                                  {asset.gainPercent >= 0 ? "+" : ""}{asset.gainPercent.toFixed(2)}%
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">{asset.allocation.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="holdings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Holdings Details</CardTitle>
                  <CardDescription>Detailed breakdown of your investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This tab will contain more detailed information about each of your holdings, including transaction history, dividend information, notes, and more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Analyze your investment performance over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                          formatter={(value: number) => [`${value.toFixed(2)}%`, "Return"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="portfolio"
                          name="Your Portfolio"
                          stroke="#2563eb"
                          strokeWidth={2}
                          dot={true}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="benchmark"
                          name="S&P 500"
                          stroke="#6b7280"
                          strokeWidth={2}
                          dot={true}
                          activeDot={{ r: 6 }}
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Analysis</CardTitle>
                  <CardDescription>Insights and recommendations based on your holdings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Sector Distribution</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={allocationData}
                            margin={{ top: 5, right: 5, left: 30, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                            <Tooltip
                              formatter={(value: number) => [`${value.toFixed(1)}%`, "Allocation"]}
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                              {allocationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-muted-foreground">Total Return</span>
                          <span className={`font-medium ${totalGainPercent >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                            {totalGainPercent >= 0 ? "+" : ""}{totalGainPercent.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-muted-foreground">Annualized Return</span>
                          <span className="font-medium text-emerald-500">+12.68%</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-muted-foreground">Volatility (1Y)</span>
                          <span className="font-medium">14.2%</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-muted-foreground">Sharpe Ratio</span>
                          <span className="font-medium">1.85</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-muted-foreground">Beta</span>
                          <span className="font-medium">0.92</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
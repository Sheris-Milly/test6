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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AreaChart, 
  DollarSign, 
  BarChart4, 
  Download, 
  Calendar, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Search
} from "lucide-react"
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  Scatter,
  ScatterChart,
  ZAxis,
  PieChart,
  Pie
} from "recharts"

// Sample asset performance data
const assetPerformanceData = [
  { 
    symbol: "AAPL", 
    name: "Apple Inc.",
    currentPrice: 189.43,
    shares: 25,
    costBasis: 175.65,
    value: 4735.75,
    dayChange: 2.35,
    dayChangePercent: 1.26,
    totalReturn: 13.78,
    totalReturnPercent: 7.84,
    annualReturn: 12.5,
    volatility: 15.3,
    weight: 8.7
  },
  { 
    symbol: "MSFT", 
    name: "Microsoft Corporation",
    currentPrice: 378.92,
    shares: 15,
    costBasis: 350.12,
    value: 5683.80,
    dayChange: 4.58,
    dayChangePercent: 1.22,
    totalReturn: 28.80,
    totalReturnPercent: 8.23,
    annualReturn: 15.2,
    volatility: 14.1,
    weight: 10.5
  },
  { 
    symbol: "GOOGL", 
    name: "Alphabet Inc.",
    currentPrice: 152.19,
    shares: 30,
    costBasis: 140.88,
    value: 4565.70,
    dayChange: 2.87,
    dayChangePercent: 1.92,
    totalReturn: 11.31,
    totalReturnPercent: 8.03,
    annualReturn: 13.7,
    volatility: 17.2,
    weight: 8.4
  },
  { 
    symbol: "AMZN", 
    name: "Amazon.com Inc.",
    currentPrice: 153.79,
    shares: 25,
    costBasis: 145.22,
    value: 3844.75,
    dayChange: 2.43,
    dayChangePercent: 1.61,
    totalReturn: 8.57,
    totalReturnPercent: 5.90,
    annualReturn: 9.8,
    volatility: 18.6,
    weight: 7.1
  },
  { 
    symbol: "BRK.B", 
    name: "Berkshire Hathaway Inc.",
    currentPrice: 395.56,
    shares: 12,
    costBasis: 380.45,
    value: 4746.72,
    dayChange: 1.23,
    dayChangePercent: 0.31,
    totalReturn: 15.11,
    totalReturnPercent: 3.97,
    annualReturn: 7.2,
    volatility: 10.4,
    weight: 8.7
  },
  { 
    symbol: "JNJ", 
    name: "Johnson & Johnson",
    currentPrice: 147.52,
    shares: 30,
    costBasis: 155.78,
    value: 4425.60,
    dayChange: -0.38,
    dayChangePercent: -0.26,
    totalReturn: -8.26,
    totalReturnPercent: -5.30,
    annualReturn: 5.1,
    volatility: 8.9,
    weight: 8.1
  },
  { 
    symbol: "PG", 
    name: "Procter & Gamble Co.",
    currentPrice: 162.37,
    shares: 22,
    costBasis: 155.43,
    value: 3572.14,
    dayChange: 0.86,
    dayChangePercent: 0.53,
    totalReturn: 6.94,
    totalReturnPercent: 4.47,
    annualReturn: 8.3,
    volatility: 9.2,
    weight: 6.6
  },
  { 
    symbol: "V", 
    name: "Visa Inc.",
    currentPrice: 275.13,
    shares: 18,
    costBasis: 260.56,
    value: 4952.34,
    dayChange: 1.85,
    dayChangePercent: 0.68,
    totalReturn: 14.57,
    totalReturnPercent: 5.59,
    annualReturn: 10.4,
    volatility: 12.8,
    weight: 9.1
  },
];

// Sample historical returns data
const historicalReturnsData = [
  {
    name: "Jan",
    portfolio: 3.2,
    benchmark: 2.8,
  },
  {
    name: "Feb",
    portfolio: 2.5,
    benchmark: 1.9,
  },
  {
    name: "Mar",
    portfolio: -1.8,
    benchmark: -2.3,
  },
  {
    name: "Apr",
    portfolio: 4.1,
    benchmark: 3.5,
  },
  {
    name: "May",
    portfolio: 1.2,
    benchmark: 0.9,
  },
  {
    name: "Jun",
    portfolio: 2.8,
    benchmark: 2.5,
  },
  {
    name: "Jul",
    portfolio: 3.5,
    benchmark: 3.2,
  },
  {
    name: "Aug",
    portfolio: -0.8,
    benchmark: -1.2,
  },
  {
    name: "Sep",
    portfolio: 1.5,
    benchmark: 1.1,
  },
  {
    name: "Oct",
    portfolio: 2.9,
    benchmark: 2.7,
  },
  {
    name: "Nov",
    portfolio: 3.8,
    benchmark: 3.4,
  },
  {
    name: "Dec",
    portfolio: 2.6,
    benchmark: 2.2,
  },
];

// Risk-return scatter data
const riskReturnData = [
  { name: "AAPL", risk: 15.3, return: 12.5, size: 8.7 },
  { name: "MSFT", risk: 14.1, return: 15.2, size: 10.5 },
  { name: "GOOGL", risk: 17.2, return: 13.7, size: 8.4 },
  { name: "AMZN", risk: 18.6, return: 9.8, size: 7.1 },
  { name: "BRK.B", risk: 10.4, return: 7.2, size: 8.7 },
  { name: "JNJ", risk: 8.9, return: 5.1, size: 8.1 },
  { name: "PG", risk: 9.2, return: 8.3, size: 6.6 },
  { name: "V", risk: 12.8, return: 10.4, size: 9.1 },
  { name: "Portfolio", risk: 12.5, return: 11.8, size: 100 },
  { name: "S&P 500", risk: 13.8, return: 10.2, size: 100 },
];

// Asset allocation data
const allocationData = [
  { name: "Technology", value: 35.8, color: "#2563eb" },
  { name: "Financial Services", value: 21.6, color: "#8b5cf6" },
  { name: "Healthcare", value: 15.2, color: "#06b6d4" },
  { name: "Consumer Defensive", value: 12.4, color: "#10b981" },
  { name: "Consumer Cyclical", value: 8.2, color: "#f59e0b" },
  { name: "Other", value: 6.8, color: "#6b7280" },
];

// Performance metrics
const performanceMetrics = [
  { name: "Sharpe Ratio", value: 1.82, change: 0.12, changePercent: 7.06, benchmark: 1.65 },
  { name: "Sortino Ratio", value: 2.35, change: 0.21, changePercent: 9.81, benchmark: 2.10 },
  { name: "Alpha", value: 2.46, change: 0.18, changePercent: 7.89, benchmark: 0 },
  { name: "Beta", value: 0.92, change: -0.03, changePercent: -3.15, benchmark: 1 },
  { name: "Information Ratio", value: 0.76, change: 0.05, changePercent: 7.04, benchmark: 0 },
  { name: "Max Drawdown", value: -12.5, change: 1.5, changePercent: 10.71, benchmark: -15.8 },
];

export default function AnalysisPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("performance")
  const [timeframe, setTimeframe] = useState("1Y")
  const [sortColumn, setSortColumn] = useState("totalReturnPercent")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  
  // Timeframe options
  const timeframes = [
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
    { label: "3Y", value: "3Y" },
    { label: "5Y", value: "5Y" },
  ];
  
  // Sort data
  const sortData = (data: any[], column: string, direction: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[column] - b[column];
      } else {
        return b[column] - a[column];
      }
    });
  };
  
  // Sorted asset data
  const sortedAssetData = sortData(assetPerformanceData, sortColumn, sortDirection);
  
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <SidebarNavigation />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Portfolio Analysis</h1>
              <p className="text-muted-foreground mt-1">
                Advanced insights and analytics for your investments
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </header>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>
                    Compare your portfolio performance against benchmarks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={historicalReturnsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(value) => `${value}%`}
                        />
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
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="benchmark"
                          name="S&P 500"
                          stroke="#6b7280"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Asset Performance</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search assets..." className="pl-9 h-9" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Asset</th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Price</th>
                            <th 
                              className="py-3 px-4 text-right text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                              onClick={() => {
                                if (sortColumn === "dayChangePercent") {
                                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                } else {
                                  setSortColumn("dayChangePercent");
                                  setSortDirection("desc");
                                }
                              }}
                            >
                              Day Change
                              {sortColumn === "dayChangePercent" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </th>
                            <th 
                              className="py-3 px-4 text-right text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                              onClick={() => {
                                if (sortColumn === "totalReturnPercent") {
                                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                } else {
                                  setSortColumn("totalReturnPercent");
                                  setSortDirection("desc");
                                }
                              }}
                            >
                              Total Return
                              {sortColumn === "totalReturnPercent" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </th>
                            <th 
                              className="py-3 px-4 text-right text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                              onClick={() => {
                                if (sortColumn === "annualReturn") {
                                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                } else {
                                  setSortColumn("annualReturn");
                                  setSortDirection("desc");
                                }
                              }}
                            >
                              Annual Return
                              {sortColumn === "annualReturn" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Weight</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {sortedAssetData.map((asset) => (
                            <tr key={asset.symbol} className="hover:bg-muted/30 transition-colors">
                              <td className="py-3 px-4 text-left">
                                <div className="font-medium">{asset.symbol}</div>
                                <div className="text-xs text-muted-foreground">{asset.name}</div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="font-medium">${asset.currentPrice.toFixed(2)}</div>
                                <div className="text-xs text-muted-foreground">{asset.shares} shares</div>
                              </td>
                              <td className={`py-3 px-4 text-right ${
                                asset.dayChangePercent >= 0 ? "text-emerald-500" : "text-red-500"
                              }`}>
                                <div className="flex items-center justify-end">
                                  {asset.dayChangePercent >= 0 ? (
                                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                                  ) : (
                                    <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                                  )}
                                  <span>{asset.dayChangePercent >= 0 ? "+" : ""}{asset.dayChangePercent.toFixed(2)}%</span>
                                </div>
                                <div className="text-xs">
                                  ${asset.dayChange.toFixed(2)}
                                </div>
                              </td>
                              <td className={`py-3 px-4 text-right ${
                                asset.totalReturnPercent >= 0 ? "text-emerald-500" : "text-red-500"
                              }`}>
                                <div>{asset.totalReturnPercent >= 0 ? "+" : ""}{asset.totalReturnPercent.toFixed(2)}%</div>
                                <div className="text-xs">
                                  ${asset.totalReturn.toFixed(2)}
                                </div>
                              </td>
                              <td className={`py-3 px-4 text-right ${
                                asset.annualReturn >= 0 ? "text-emerald-500" : "text-red-500"
                              }`}>
                                <div>{asset.annualReturn >= 0 ? "+" : ""}{asset.annualReturn.toFixed(2)}%</div>
                              </td>
                              <td className="py-3 px-4 text-right">{asset.weight.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="allocation" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                    <CardDescription>
                      Current distribution of your portfolio by sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[300px] flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            innerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                            label={({
                              cx,
                              cy,
                              midAngle,
                              innerRadius,
                              outerRadius,
                              percent,
                              name,
                            }) => {
                              const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
                              const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                              const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="#888"
                                  textAnchor={x > cx ? "start" : "end"}
                                  dominantBaseline="central"
                                  fontSize={12}
                                >
                                  {name} ({(percent * 100).toFixed(1)}%)
                                </text>
                              );
                            }}
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
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Allocation Analysis</CardTitle>
                    <CardDescription>
                      Insights and recommendations for your asset allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Sector Analysis</h3>
                      <div className="space-y-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Technology</span>
                            <span className="font-medium text-amber-500">Overweight</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: "35.8%" }}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">35.8%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Target: 25-30%. Consider reducing exposure.</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Healthcare</span>
                            <span className="font-medium text-emerald-500">On target</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                              <div className="bg-cyan-500 h-full rounded-full" style={{ width: "15.2%" }}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">15.2%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Target: 13-17%. Within optimal range.</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Energy</span>
                            <span className="font-medium text-red-500">Underweight</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                              <div className="bg-gray-500 h-full rounded-full" style={{ width: "2.3%" }}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">2.3%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Target: 5-8%. Consider increasing exposure.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <TrendingDown className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Reduce technology exposure</h4>
                            <p className="text-xs text-muted-foreground">
                              Your technology allocation is 5.8% above the recommended range, creating concentration risk.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Increase energy sector</h4>
                            <p className="text-xs text-muted-foreground">
                              Your energy allocation is 2.7% below the minimum recommended range for diversification.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <BarChart3 className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Add international exposure</h4>
                            <p className="text-xs text-muted-foreground">
                              Your portfolio is heavily US-focused. Consider adding 10-15% international stocks for geographical diversification.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="risk" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk vs. Return Analysis</CardTitle>
                  <CardDescription>
                    Analyzing the risk-return profile of your investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                        <XAxis 
                          type="number" 
                          dataKey="risk" 
                          name="Volatility" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false} 
                          axisLine={false}
                          domain={[0, 'dataMax + 2']}
                          label={{ 
                            value: 'Risk (Volatility %)', 
                            position: 'bottom', 
                            offset: 0, 
                            fontSize: 12,
                            fill: "#888"
                          }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="return" 
                          name="Return" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false} 
                          axisLine={false}
                          domain={[0, 'dataMax + 2']}
                          label={{ 
                            value: 'Annual Return (%)', 
                            angle: -90, 
                            position: 'left', 
                            offset: 0,
                            fontSize: 12,
                            fill: "#888"
                          }}
                        />
                        <ZAxis 
                          type="number" 
                          dataKey="size" 
                          range={[50, 200]} 
                          scale="sqrt"
                        />
                        <Tooltip
                          formatter={(value: number, name: string) => [
                            name === "Risk" ? `${value.toFixed(1)}%` : `${value.toFixed(1)}%`,
                            name
                          ]}
                          labelFormatter={(name) => name}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Legend />
                        <Scatter 
                          name="Stocks" 
                          data={riskReturnData.filter(item => !["Portfolio", "S&P 500"].includes(item.name))} 
                          fill="#2563eb"
                        />
                        <Scatter 
                          name="Portfolio" 
                          data={riskReturnData.filter(item => item.name === "Portfolio")} 
                          fill="#10b981"
                          shape={(props: any) => {
                            const { cx, cy } = props;
                            return (
                              <circle 
                                cx={cx} 
                                cy={cy} 
                                r={8} 
                                fill="#10b981" 
                                strokeWidth={2}
                                stroke="#fff"
                              />
                            );
                          }}
                        />
                        <Scatter 
                          name="S&P 500" 
                          data={riskReturnData.filter(item => item.name === "S&P 500")} 
                          fill="#f59e0b"
                          shape={(props: any) => {
                            const { cx, cy } = props;
                            return (
                              <circle 
                                cx={cx} 
                                cy={cy} 
                                r={8} 
                                fill="#f59e0b" 
                                strokeWidth={2}
                                stroke="#fff"
                              />
                            );
                          }}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Volatility Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted-foreground">Portfolio Volatility</span>
                      <span className="text-2xl font-bold">12.5%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted-foreground">Benchmark Volatility</span>
                      <span className="text-lg">13.8%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted-foreground">Relative Volatility</span>
                      <span className="text-lg text-emerald-500">-9.4%</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Your portfolio shows lower volatility than the benchmark, indicating better downside protection.
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Risk Contribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>AMZN</span>
                          <span>24.3%</span>
                        </div>
                        <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: "24.3%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>GOOGL</span>
                          <span>18.7%</span>
                        </div>
                        <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: "18.7%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>AAPL</span>
                          <span>15.2%</span>
                        </div>
                        <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: "15.2%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>MSFT</span>
                          <span>12.8%</span>
                        </div>
                        <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: "12.8%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Others</span>
                          <span>29.0%</span>
                        </div>
                        <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: "29.0%" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 text-xs text-muted-foreground">
                      The top 4 holdings contribute 71% of your portfolio's risk.
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Diversification Score</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-end gap-4">
                      <div className="text-4xl font-bold">78</div>
                      <div className="flex items-center text-sm text-emerald-500">
                        <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                        <span>+5 pts</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Needs Attention</span>
                      <span>Moderate</span>
                      <span>Well Diversified</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Your portfolio shows good diversification across sectors, but could improve geographic diversification.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{metric.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold">{metric.value.toFixed(2)}</div>
                        <div 
                          className={`flex items-center text-sm ${
                            (metric.name === "Max Drawdown" ? -1 : 1) * metric.changePercent >= 0 
                              ? "text-emerald-500" 
                              : "text-red-500"
                          }`}
                        >
                          {(metric.name === "Max Drawdown" ? -1 : 1) * metric.changePercent >= 0 ? (
                            <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                          )}
                          <span>
                            {(metric.name === "Max Drawdown" ? -1 : 1) * metric.changePercent >= 0 ? "+" : ""}
                            {metric.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-sm text-muted-foreground">Benchmark</span>
                        <span className="font-medium">{metric.benchmark.toFixed(2)}</span>
                      </div>
                      <div className="pt-2 text-sm text-muted-foreground">
                        {metric.name === "Sharpe Ratio" && "Measures risk-adjusted return. Higher is better."}
                        {metric.name === "Sortino Ratio" && "Measures return for downside risk. Higher is better."}
                        {metric.name === "Alpha" && "Excess return over benchmark. Positive is better."}
                        {metric.name === "Beta" && "Portfolio volatility vs. market. Lower means less volatile."}
                        {metric.name === "Information Ratio" && "Active return per unit of active risk. Higher is better."}
                        {metric.name === "Max Drawdown" && "Largest peak-to-trough decline. Smaller is better."}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Statistical analysis of your portfolio performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Performance Distribution</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { range: "-10% or less", count: 2, fill: "#ef4444" },
                              { range: "-10% to -5%", count: 5, fill: "#f97316" },
                              { range: "-5% to 0%", count: 12, fill: "#eab308" },
                              { range: "0% to 5%", count: 23, fill: "#22c55e" },
                              { range: "5% to 10%", count: 17, fill: "#10b981" },
                              { range: "10% or more", count: 9, fill: "#14b8a6" },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                            <XAxis 
                              dataKey="range" 
                              tick={{ fontSize: 12 }} 
                              tickLine={false} 
                              axisLine={false}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis 
                              tick={{ fontSize: 12 }} 
                              tickLine={false} 
                              axisLine={false}
                              label={{ 
                                value: 'Number of Months', 
                                angle: -90, 
                                position: 'left', 
                                offset: 0,
                                fontSize: 12,
                                fill: "#888"
                              }}
                            />
                            <Tooltip
                              formatter={(value: number) => [value, "Months"]}
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                              {[0, 1, 2, 3, 4, 5].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`var(--chart-${index})`} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Key Statistics</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Annualized Return</span>
                            <span className="font-medium">11.8%</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Annualized Volatility</span>
                            <span className="font-medium">12.5%</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">R-Squared</span>
                            <span className="font-medium">0.82</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Tracking Error</span>
                            <span className="font-medium">3.2%</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Up Capture Ratio</span>
                            <span className="font-medium">105%</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Down Capture Ratio</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Skewness</span>
                            <span className="font-medium">0.32</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Kurtosis</span>
                            <span className="font-medium">2.87</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Analysis Summary</h3>
                        <p className="text-sm text-muted-foreground">
                          Your portfolio has shown better risk-adjusted returns than the benchmark, with a Sharpe ratio of 1.82 vs 1.65 for the S&P 500. The positive alpha of 2.46% indicates your portfolio has outperformed on a risk-adjusted basis.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          With a beta of 0.92, your portfolio is slightly less volatile than the market, capturing 105% of upside moves but only 85% of downside moves, which is an excellent characteristic.
                        </p>
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
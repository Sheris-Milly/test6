import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, LineChart, BarChart3, Wallet, RefreshCw } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { RecentNews } from "@/components/dashboard/recent-news"
import { FinanceAgent } from "@/components/dashboard/finance-agent"
import { TopPerformers } from "@/components/dashboard/top-performers"

export function DashboardContent() {
  const { user } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <>
      <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.firstName || user?.username}</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your financial portfolio
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="w-full sm:w-auto">
          {isRefreshing ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh Data
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <PortfolioChart isLoading={isRefreshing} />
        </div>

        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div className="text-sm font-medium">Total Value</div>
                <div className="font-medium">{formatCurrency(162456.78)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Day Change</div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{formatCurrency(1254.32)} (+0.78%)</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Month Change</div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{formatCurrency(3456.89)} (+2.17%)</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-medium">Year Change</div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{formatCurrency(38999.91)} (+31.60%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Links</CardTitle>
              <CardDescription>Common actions and resources</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" size="sm">
                <Wallet className="h-5 w-5" />
                <span className="text-xs">Add Funds</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" size="sm">
                <LineChart className="h-5 w-5" />
                <span className="text-xs">View Portfolio</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" size="sm">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">Analysis</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" size="sm">
                <ArrowUpRight className="h-5 w-5" />
                <span className="text-xs">Invest</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        <div className="md:col-span-4">
          <Tabs defaultValue="market">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="market" className="flex-1">Market</TabsTrigger>
              <TabsTrigger value="top-performers" className="flex-1">Top Performers</TabsTrigger>
            </TabsList>
            <TabsContent value="market">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Market Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <MarketOverview isLoading={isRefreshing} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="top-performers">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Today's Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <TopPerformers isLoading={isRefreshing} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Financial News</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentNews isLoading={isRefreshing} />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">AI Financial Advisor</CardTitle>
            </CardHeader>
            <CardContent>
              <FinanceAgent
                marketData={{}}
                newsData={{}}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
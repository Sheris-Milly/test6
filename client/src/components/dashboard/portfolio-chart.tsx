import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Sample portfolio data with more realistic values
const portfolioDataSample = [
  {
    name: "Jan",
    value: 123456.78,
  },
  {
    name: "Feb",
    value: 127890.45,
  },
  {
    name: "Mar",
    value: 131234.56,
  },
  {
    name: "Apr",
    value: 134567.89,
  },
  {
    name: "May",
    value: 138901.23,
  },
  {
    name: "Jun",
    value: 142345.67,
  },
  {
    name: "Jul",
    value: 145678.90,
  },
  {
    name: "Aug",
    value: 149012.34,
  },
  {
    name: "Sep",
    value: 152345.67,
  },
  {
    name: "Oct",
    value: 155789.01,
  },
  {
    name: "Nov",
    value: 159123.45,
  },
  {
    name: "Dec",
    value: 162456.78,
  },
]

type PortfolioChartProps = {
  className?: string
  isLoading?: boolean
  data?: any
}

export function PortfolioChart({ className, isLoading = false, data }: PortfolioChartProps) {
  // Use sample data unless real data is provided
  const chartData = data?.portfolioHistory || portfolioDataSample
  const currentValue = chartData[chartData.length - 1]?.value || 0
  const previousValue = chartData[chartData.length - 2]?.value || 0
  const percentChange = ((currentValue - previousValue) / previousValue) * 100

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-baseline space-x-2.5">
          <span>{formatCurrency(currentValue)}</span>
          <span
            className={`text-base font-normal ${
              percentChange >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {percentChange >= 0 ? "+" : ""}
            {percentChange.toFixed(2)}%
          </span>
        </CardTitle>
        <CardDescription>Your portfolio value (12 month history)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
              <XAxis
                dataKey="name"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Value"]}
                labelFormatter={(label) => `${label}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, style: { fill: "hsl(var(--primary))" } }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
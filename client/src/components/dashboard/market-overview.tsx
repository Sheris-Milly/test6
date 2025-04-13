import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

type MarketData = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

// Sample market data with more realistic values
const marketDataSample: MarketData[] = [
  {
    symbol: "^GSPC",
    name: "S&P 500",
    price: 4783.83,
    change: 43.35,
    changePercent: 0.91,
  },
  {
    symbol: "^DJI",
    name: "Dow Jones",
    price: 37305.16,
    change: 56.81,
    changePercent: 0.15,
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ",
    price: 14963.87,
    change: 78.81,
    changePercent: 0.53,
  },
  {
    symbol: "^RUT",
    name: "Russell 2000",
    price: 1957.74,
    change: -8.35,
    changePercent: -0.43,
  },
  {
    symbol: "GC=F",
    name: "Gold",
    price: 2029.20,
    change: 12.80,
    changePercent: 0.63,
  },
  {
    symbol: "CL=F",
    name: "Crude Oil",
    price: 71.43,
    change: -0.83,
    changePercent: -1.16,
  },
  {
    symbol: "^TNX",
    name: "10-Yr Bond",
    price: 4.01,
    change: 0.00,
    changePercent: 0.00,
  },
  {
    symbol: "^VIX",
    name: "VIX",
    price: 12.92,
    change: -0.63,
    changePercent: -4.65,
  },
]

export function MarketOverview({
  data,
  isLoading = false,
}: {
  data?: any
  isLoading?: boolean
}) {
  // Use sample data as fallback
  const marketData = data?.markets || marketDataSample

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-5 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {marketData.map((item: MarketData) => (
        <div key={item.symbol} className="flex justify-between items-center py-1">
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-muted-foreground">{item.symbol}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right font-medium">${item.price.toLocaleString()}</div>
            <div
              className={`flex items-center ${
                item.changePercent > 0
                  ? "text-emerald-500"
                  : item.changePercent < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              {item.changePercent > 0 ? (
                <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              ) : item.changePercent < 0 ? (
                <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
              ) : (
                <Minus className="h-3.5 w-3.5 mr-1" />
              )}
              <span>
                {item.changePercent > 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
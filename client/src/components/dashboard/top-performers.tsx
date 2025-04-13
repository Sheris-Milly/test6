import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpRight } from "lucide-react"

type PerformerData = {
  symbol: string
  name: string
  price: number
  change: number
}

// Sample top performers with better formatting
const topPerformersSample: PerformerData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.43,
    change: 4.32,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.92,
    change: 3.98,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 482.76,
    change: 3.67,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 153.79,
    change: 3.45,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.48,
    change: 3.21,
  },
]

export function TopPerformers({
  isLoading = false,
}: {
  isLoading?: boolean
}) {
  // This would normally come from an API
  const performers = topPerformersSample

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-5 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {performers.map((stock) => (
        <div key={stock.symbol} className="flex justify-between items-center py-1">
          <div>
            <div className="font-semibold">{stock.symbol}</div>
            <div className="text-sm text-muted-foreground">{stock.name}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right font-medium">
              ${stock.price.toFixed(2)}
            </div>
            <div className="flex items-center text-emerald-500">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              <span>+{stock.change.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
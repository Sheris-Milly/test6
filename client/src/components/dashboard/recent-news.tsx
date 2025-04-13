import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"

type NewsItem = {
  title: string
  date: string
  source: string
  url: string
}

// Sample news data
const newsSample: NewsItem[] = [
  {
    title: "Federal Reserve signals potential rate cuts for coming year",
    date: "1h ago",
    source: "Financial Times",
    url: "#",
  },
  {
    title: "Tech sector leads market rally as AI investments surge",
    date: "3h ago",
    source: "Wall Street Journal",
    url: "#",
  },
  {
    title: "Inflation rate declines for third consecutive month",
    date: "5h ago",
    source: "CNBC",
    url: "#",
  },
  {
    title: "Oil prices stabilize following OPEC+ production decision",
    date: "7h ago",
    source: "Reuters",
    url: "#",
  },
  {
    title: "Major bank exceeds earnings expectations, shares up 3%",
    date: "9h ago",
    source: "Bloomberg",
    url: "#",
  },
]

export function RecentNews({
  news,
  isLoading = false,
}: {
  news?: any
  isLoading?: boolean
}) {
  // Use sample news as fallback
  const newsItems = news?.articles || newsSample

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {newsItems.slice(0, 5).map((item: NewsItem, i: number) => (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          key={i}
          className="block group"
        >
          <div className="flex flex-col gap-1">
            <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
              {item.title}
            </h4>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{item.source}</span>
              <span className="mx-1.5">•</span>
              <span>{item.date}</span>
              <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
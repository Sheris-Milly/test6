"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface MarketNewsProps {
  news: any
  isLoading: boolean
}

export function MarketNews({ news, isLoading }: MarketNewsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-24 w-24 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!news || !news.data || !news.data.news || news.data.news.length === 0) {
    return <div className="text-center py-4">No news available</div>
  }

  return (
    <div className="space-y-6">
      {news.data.news.map((item: any, index: number) => (
        <a
          key={index}
          href={item.article_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 hover:bg-muted p-4 rounded-md transition-colors"
        >
          <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={item.article_photo_url || "/placeholder.svg?height=96&width=96"}
              alt={item.article_title}
              className="h-full w-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=96&width=96"
              }}
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">{item.article_title}</h3>
            <p className="text-sm text-muted-foreground">
              {item.source} • {formatNewsDate(item.post_time_utc)}
            </p>
          </div>
        </a>
      ))}
    </div>
  )
}

function formatNewsDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    return date.toLocaleDateString()
  }
}

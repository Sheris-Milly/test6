// This file handles the stock news API integration

/**
 * Fetches news for a specific stock
 * @param symbol Stock symbol (e.g., AAPL:NASDAQ)
 * @returns Promise with the news data
 */
export async function fetchStockNews(symbol: string) {
  try {
    // This would be the actual API call:
    const url = `https://real-time-finance-data.p.rapidapi.com/stock-news?symbol=${symbol}&language=en`
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
      },
    }

    // Check if we're missing API key
    if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY) {
      console.log("Using simulated news data - API key missing")
      return simulateNewsData(symbol)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching stock news:", error)
    // Return simulated data as fallback
    return simulateNewsData(symbol)
  }
}

// Helper function to simulate news data
function simulateNewsData(symbol: string) {
  const stockSymbol = symbol.split(":")[0]
  const stockName = getStockName(stockSymbol)

  // Generate news based on the stock
  const news = []
  const now = new Date()

  // Common news sources
  const sources = [
    "Bloomberg",
    "CNBC",
    "Reuters",
    "Wall Street Journal",
    "Financial Times",
    "MarketWatch",
    "Barron's",
    "Investor's Business Daily",
  ]

  // Generate news headlines based on the stock
  const headlines = [
    {
      title: `${stockName} Reports Strong Quarterly Earnings, Beats Expectations`,
      photo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: `Analysts Raise Price Target for ${stockName} Following Product Launch`,
      photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: `${stockName} Announces New Strategic Partnership to Expand Market Reach`,
      photo: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: `${stockName} CEO Discusses Future Growth Strategies in Exclusive Interview`,
      photo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: `${stockName} Faces Regulatory Scrutiny Over Recent Business Practices`,
      photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: `Investors React to ${stockName}'s Latest Product Announcement`,
      photo: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: `${stockName} Stock Surges Following Positive Industry Trends`,
      photo: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: `Market Analysis: Is ${stockName} Overvalued in Current Market Conditions?`,
      photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop",
    },
  ]

  // Generate 8 news items
  for (let i = 0; i < headlines.length; i++) {
    const randomTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in the last week
    const randomSource = sources[Math.floor(Math.random() * sources.length)]

    news.push({
      article_title: headlines[i].title,
      article_url: `https://example.com/news/${stockSymbol.toLowerCase()}-${i}`,
      article_photo_url: headlines[i].photo,
      source: randomSource,
      post_time_utc: randomTime.toISOString(),
    })
  }

  return {
    status: "success",
    request_id: "demo-request",
    data: {
      symbol: stockSymbol,
      type: "stock",
      news: news,
    },
  }
}

// Helper function to get a stock name for a symbol
function getStockName(symbol: string): string {
  const names: { [key: string]: string } = {
    AAPL: "Apple",
    MSFT: "Microsoft",
    AMZN: "Amazon",
    GOOGL: "Google",
    TSLA: "Tesla",
    META: "Meta",
    NFLX: "Netflix",
    NVDA: "NVIDIA",
    SPY: "S&P 500",
    QQQ: "Nasdaq",
    DIA: "Dow Jones",
  }

  return names[symbol] || symbol
}

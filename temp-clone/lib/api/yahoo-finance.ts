// This file handles the Yahoo Finance API integration

/**
 * Fetches market data for a specific stock and period
 * @param symbol Stock symbol (e.g., AAPL, MSFT)
 * @param period Time period (1D, 5D, 1M, 3M, 6M, 1Y, MAX)
 * @returns Promise with the market data
 */
export async function fetchMarketData(symbol: string, period: string) {
  try {
    // This would be the actual API call:
    const url = `https://real-time-finance-data.p.rapidapi.com/stock-time-series-yahoo-finance?symbol=${symbol}&period=${period}`
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
      },
    }

    // Check if we're missing API key
    if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY) {
      console.log("Using simulated market data - API key missing")
      return simulateMarketData(symbol, period)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching market data:", error)
    // Return simulated data as fallback
    return simulateMarketData(symbol, period)
  }
}

/**
 * Fetches stock data for a specific symbol
 * @param symbol Stock symbol (e.g., AAPL, MSFT)
 * @returns Promise with the stock data
 */
export async function fetchStockData(symbol: string) {
  try {
    // This would be the actual API call:
    const url = `https://real-time-finance-data.p.rapidapi.com/stock-quote-yahoo-finance?symbol=${symbol}`
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
      },
    }

    // Check if we're missing API key
    if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY) {
      console.log("Using simulated stock data - API key missing")
      return simulateStockData(symbol)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching stock data:", error)
    // Return simulated data as fallback
    return simulateStockData(symbol)
  }
}

// Helper function to simulate market data
function simulateMarketData(symbol: string, period: string) {
  const now = new Date()
  const timeSeries = []

  // Generate time series data based on period
  const startDate = new Date()
  let dataPoints = 0
  let interval = 0

  switch (period) {
    case "1D":
      startDate.setHours(9, 30, 0, 0) // Market open at 9:30 AM
      dataPoints = 78 // 6.5 hours * 12 (5-minute intervals)
      interval = 5 * 60 * 1000 // 5 minutes in milliseconds
      break
    case "5D":
      startDate.setDate(startDate.getDate() - 5)
      dataPoints = 5 * 7 // 5 days * 7 data points per day
      interval = (24 * 60 * 60 * 1000) / 7 // Spread throughout the day
      break
    case "1M":
      startDate.setMonth(startDate.getMonth() - 1)
      dataPoints = 30
      interval = 24 * 60 * 60 * 1000 // 1 day in milliseconds
      break
    case "3M":
      startDate.setMonth(startDate.getMonth() - 3)
      dataPoints = 90
      interval = 24 * 60 * 60 * 1000 // 1 day in milliseconds
      break
    case "6M":
      startDate.setMonth(startDate.getMonth() - 6)
      dataPoints = 180
      interval = 24 * 60 * 60 * 1000 // 1 day in milliseconds
      break
    case "1Y":
      startDate.setFullYear(startDate.getFullYear() - 1)
      dataPoints = 365
      interval = 24 * 60 * 60 * 1000 // 1 day in milliseconds
      break
    case "MAX":
      startDate.setFullYear(startDate.getFullYear() - 5)
      dataPoints = 60 // 5 years * 12 months
      interval = 30 * 24 * 60 * 60 * 1000 // 1 month in milliseconds
      break
    default:
      startDate.setDate(startDate.getDate() - 1)
      dataPoints = 24
      interval = 60 * 60 * 1000 // 1 hour in milliseconds
  }

  // Generate base price based on symbol
  const basePrice = getBasePrice(symbol)
  let currentPrice = basePrice

  // Generate time series data
  for (let i = 0; i < dataPoints; i++) {
    const pointDate = new Date(startDate.getTime() + i * interval)

    // Skip weekends for periods longer than 1D
    if (period !== "1D" && (pointDate.getDay() === 0 || pointDate.getDay() === 6)) {
      continue
    }

    // Generate random price movement
    const change = (Math.random() - 0.5) * 0.02 * basePrice
    currentPrice += change

    // Ensure price doesn't go below 0
    if (currentPrice < 0) currentPrice = basePrice * 0.8

    timeSeries.push({
      datetime: pointDate.toISOString(),
      open: currentPrice - Math.random() * 0.01 * basePrice,
      close: currentPrice,
      high: currentPrice + Math.random() * 0.01 * basePrice,
      low: currentPrice - Math.random() * 0.01 * basePrice,
      volume: Math.floor(Math.random() * 1000000) + 500000,
      change: change,
      change_percent: (change / (currentPrice - change)) * 100,
    })
  }

  // Calculate day high, day low, and previous close
  const dayHigh = Math.max(...timeSeries.map((point) => point.high))
  const dayLow = Math.min(...timeSeries.map((point) => point.low))
  const previousClose = timeSeries[0].open

  // Calculate change and change percent
  const change = currentPrice - previousClose
  const changePercent = (change / previousClose) * 100

  return {
    status: "success",
    request_id: "demo-request",
    data: {
      symbol: symbol,
      name: getStockName(symbol),
      exchange: "NASDAQ",
      type: "stock",
      price: currentPrice,
      day_low: dayLow,
      day_high: dayHigh,
      currency: "USD",
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      previous_close: previousClose,
      change: change,
      change_percent: changePercent,
      exchange_timezone: "America/New_York",
      exchange_timezone_short: "EDT",
      exchange_timezone_utc_offset_sec: -14400,
      full_exchange_name: "NASDAQ Stock Exchange",
      time_series: timeSeries,
      period: period,
      interval: "1d",
    },
  }
}

// Helper function to simulate stock data
function simulateStockData(symbol: string) {
  const basePrice = getBasePrice(symbol)

  return {
    status: "success",
    request_id: "demo-request",
    data: {
      symbol: symbol,
      name: getStockName(symbol),
      exchange: "NASDAQ",
      type: "stock",
      price: basePrice,
      day_low: basePrice * 0.98,
      day_high: basePrice * 1.02,
      currency: "USD",
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      previous_close: basePrice * 0.995,
      change: basePrice * 0.005,
      change_percent: 0.5,
      exchange_timezone: "America/New_York",
      exchange_timezone_short: "EDT",
      exchange_timezone_utc_offset_sec: -14400,
      full_exchange_name: "NASDAQ Stock Exchange",
    },
  }
}

// Helper function to get a base price for a symbol
function getBasePrice(symbol: string): number {
  const prices: { [key: string]: number } = {
    AAPL: 175.5,
    MSFT: 410.75,
    AMZN: 180.3,
    GOOGL: 175.8,
    TSLA: 175.25,
    META: 485.0,
    NFLX: 625.0,
    NVDA: 950.25,
    SPY: 520.0,
    QQQ: 440.0,
    DIA: 390.0,
  }

  return prices[symbol] || 100.0 + (symbol.charCodeAt(0) % 10) * 50
}

// Helper function to get a stock name for a symbol
function getStockName(symbol: string): string {
  const names: { [key: string]: string } = {
    AAPL: "Apple Inc.",
    MSFT: "Microsoft Corporation",
    AMZN: "Amazon.com Inc.",
    GOOGL: "Alphabet Inc.",
    TSLA: "Tesla, Inc.",
    META: "Meta Platforms, Inc.",
    NFLX: "Netflix, Inc.",
    NVDA: "NVIDIA Corporation",
    SPY: "SPDR S&P 500 ETF Trust",
    QQQ: "Invesco QQQ Trust",
    DIA: "SPDR Dow Jones Industrial Average ETF",
  }

  return names[symbol] || `${symbol} Stock`
}

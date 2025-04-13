"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchStockData } from "@/lib/api/yahoo-finance"
import { Loader2 } from "lucide-react"

interface AddStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddStock: (stock: any) => void
}

export function AddStockDialog({ open, onOpenChange, onAddStock }: AddStockDialogProps) {
  const [symbol, setSymbol] = useState("")
  const [shares, setShares] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!symbol || !shares || !purchasePrice) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Fetch current stock data
      const stockData = await fetchStockData(symbol)

      if (!stockData || !stockData.data) {
        throw new Error("Could not fetch stock data")
      }

      const sharesNum = Number.parseFloat(shares)
      const purchasePriceNum = Number.parseFloat(purchasePrice)
      const currentPrice = stockData.data.price
      const value = currentPrice * sharesNum
      const gain = value - purchasePriceNum * sharesNum
      const gainPercent = (gain / (purchasePriceNum * sharesNum)) * 100

      // Create new stock object
      const newStock = {
        symbol: symbol.toUpperCase(),
        name: stockData.data.name || `${symbol.toUpperCase()} Stock`,
        shares: sharesNum,
        purchasePrice: purchasePriceNum,
        currentPrice,
        value,
        gain,
        gainPercent,
        allocation: 5, // Default allocation, would be calculated based on portfolio
      }

      onAddStock(newStock)
      onOpenChange(false)

      // Reset form
      setSymbol("")
      setShares("")
      setPurchasePrice("")
    } catch (error) {
      console.error("Error adding stock:", error)
      setError("Could not add stock. Please check the symbol and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Stock to Portfolio</DialogTitle>
          <DialogDescription>Enter the details of the stock you want to add to your portfolio.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="symbol">Stock Symbol</Label>
              <Input id="symbol" placeholder="AAPL" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="shares">Number of Shares</Label>
              <Input
                id="shares"
                type="number"
                placeholder="10"
                min="0.01"
                step="0.01"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="purchasePrice">Purchase Price per Share</Label>
              <Input
                id="purchasePrice"
                type="number"
                placeholder="150.00"
                min="0.01"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Stock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

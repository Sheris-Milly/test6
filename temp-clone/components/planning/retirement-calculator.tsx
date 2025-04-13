"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils"

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [annualContribution, setAnnualContribution] = useState(6000)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const [inflationRate, setInflationRate] = useState(2.5)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    calculateRetirement()
  }, [currentAge, retirementAge, currentSavings, annualContribution, expectedReturn, inflationRate])

  const calculateRetirement = () => {
    const years = retirementAge - currentAge
    const data = []

    let balance = currentSavings
    const realReturn = (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1

    for (let i = 0; i <= years; i++) {
      data.push({
        age: currentAge + i,
        balance: Math.round(balance),
      })

      balance = balance * (1 + realReturn) + annualContribution
    }

    setChartData(data)
  }

  const finalBalance = chartData.length > 0 ? chartData[chartData.length - 1].balance : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="current-age">Current Age: {currentAge}</Label>
            </div>
            <Slider
              id="current-age"
              min={18}
              max={80}
              step={1}
              value={[currentAge]}
              onValueChange={(value) => setCurrentAge(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="retirement-age">Retirement Age: {retirementAge}</Label>
            </div>
            <Slider
              id="retirement-age"
              min={Math.max(currentAge + 1, 50)}
              max={90}
              step={1}
              value={[retirementAge]}
              onValueChange={(value) => setRetirementAge(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-savings">Current Savings</Label>
            <Input
              id="current-savings"
              type="number"
              min={0}
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="annual-contribution">Annual Contribution</Label>
            <Input
              id="annual-contribution"
              type="number"
              min={0}
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="expected-return">Expected Return: {expectedReturn}%</Label>
            </div>
            <Slider
              id="expected-return"
              min={1}
              max={12}
              step={0.1}
              value={[expectedReturn]}
              onValueChange={(value) => setExpectedReturn(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="inflation-rate">Inflation Rate: {inflationRate}%</Label>
            </div>
            <Slider
              id="inflation-rate"
              min={0}
              max={8}
              step={0.1}
              value={[inflationRate]}
              onValueChange={(value) => setInflationRate(value[0])}
            />
          </div>

          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-medium">Projected Retirement Savings</h3>
                <p className="text-3xl font-bold mt-2">{formatCurrency(finalBalance)}</p>
                <p className="text-sm text-muted-foreground mt-1">in today's dollars at age {retirementAge}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="h-[300px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" label={{ value: "Age", position: "insideBottom", offset: -5 }} />
            <YAxis
              tickFormatter={(value) => `$${value / 1000}k`}
              label={{ value: "Balance", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "Balance"]}
              labelFormatter={(label) => `Age: ${label}`}
            />
            <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

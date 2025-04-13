"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
}

export function GoalTracker() {
  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("financialGoals")
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            name: "Emergency Fund",
            targetAmount: 10000,
            currentAmount: 5000,
            targetDate: "2023-12-31",
          },
          {
            id: "2",
            name: "Down Payment",
            targetAmount: 50000,
            currentAmount: 15000,
            targetDate: "2025-06-30",
          },
          {
            id: "3",
            name: "Vacation",
            targetAmount: 3000,
            currentAmount: 1200,
            targetDate: "2023-08-15",
          },
        ]
  })

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
  })

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("financialGoals", JSON.stringify(goals))
  }, [goals])

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate) return

    const goal: FinancialGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: Number.parseFloat(newGoal.targetAmount),
      currentAmount: Number.parseFloat(newGoal.currentAmount || "0"),
      targetDate: newGoal.targetDate,
    }

    setGoals([...goals, goal])
    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
    })
  }

  const handleRemoveGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const handleUpdateProgress = (id: string, amount: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, currentAmount: amount } : goal)))
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const calculateTimeRemaining = (targetDate: string) => {
    const target = new Date(targetDate)
    const now = new Date()

    // If the target date is in the past
    if (target < now) {
      return "Overdue"
    }

    const diffTime = Math.abs(target.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) {
      return `${diffDays} days left`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} month${months > 1 ? "s" : ""} left`
    } else {
      const years = Math.floor(diffDays / 365)
      const remainingMonths = Math.floor((diffDays % 365) / 30)
      return `${years} year${years > 1 ? "s" : ""}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}` : ""} left`
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Add New Goal</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input
                id="goal-name"
                placeholder="e.g., Emergency Fund, Down Payment"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="target-amount">Target Amount</Label>
                <Input
                  id="target-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="current-amount">Current Amount</Label>
                <Input
                  id="current-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="target-date">Target Date</Label>
              <Input
                id="target-date"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              />
            </div>

            <Button onClick={handleAddGoal} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount)

          return (
            <Card key={goal.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{goal.name}</h3>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveGoal(goal.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove {goal.name}</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>
                      {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                    </span>
                    <span>{progress}%</span>
                  </div>

                  <Progress value={progress} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                    <span className="text-muted-foreground">{calculateTimeRemaining(goal.targetDate)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`update-${goal.id}`} className="sr-only">
                      Update progress
                    </Label>
                    <Input
                      id={`update-${goal.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Update amount"
                      value={goal.currentAmount}
                      onChange={(e) => handleUpdateProgress(goal.id, Number.parseFloat(e.target.value))}
                    />
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

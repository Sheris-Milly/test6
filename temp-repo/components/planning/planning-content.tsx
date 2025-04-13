"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RetirementCalculator } from "@/components/planning/retirement-calculator"
import { BudgetPlanner } from "@/components/planning/budget-planner"
import { GoalTracker } from "@/components/planning/goal-tracker"

export function PlanningContent() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Financial Planning</h1>

      <Tabs defaultValue="retirement" className="w-full">
        <TabsList>
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="retirement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Calculator</CardTitle>
              <CardDescription>Plan for your retirement with our calculator</CardDescription>
            </CardHeader>
            <CardContent>
              <RetirementCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Planner</CardTitle>
              <CardDescription>Track your income and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetPlanner />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Set and track your financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalTracker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

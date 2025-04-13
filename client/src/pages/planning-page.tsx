import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import SidebarNavigation from "@/components/dashboard/sidebar-navigation"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Slider
} from "@/components/ui/slider"
import { formatCurrency } from "@/lib/utils"
import { 
  LineChart as LineChartIcon, 
  Save, 
  PlusCircle, 
  Minus, 
  Plus, 
  ArrowRight, 
  Download,
  Coins,
  Home,
  GraduationCap,
  Car
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts"

// Goal types
const goalTypes = [
  { id: "retirement", name: "Retirement", icon: Coins, color: "#2563eb" },
  { id: "house", name: "Buy a House", icon: Home, color: "#8b5cf6" },
  { id: "education", name: "Education", icon: GraduationCap, color: "#10b981" },
  { id: "car", name: "Buy a Car", icon: Car, color: "#f59e0b" },
];

// Sample financial goals
const financialGoals = [
  { 
    id: 1, 
    name: "Retirement", 
    type: "retirement",
    targetAmount: 1500000, 
    currentAmount: 325000, 
    monthlyContribution: 1500,
    targetDate: new Date("2045-06-30"), 
    annualReturn: 7
  },
  { 
    id: 2, 
    name: "Down Payment", 
    type: "house",
    targetAmount: 100000, 
    currentAmount: 42000, 
    monthlyContribution: 1000,
    targetDate: new Date("2027-03-15"), 
    annualReturn: 4
  },
  { 
    id: 3, 
    name: "Emergency Fund", 
    type: "emergency",
    targetAmount: 30000, 
    currentAmount: 18500, 
    monthlyContribution: 500,
    targetDate: new Date("2025-12-31"), 
    annualReturn: 2
  },
];

// Sample retirement projection data
const generateRetirementProjection = (
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number
) => {
  const data = [];
  let savings = currentSavings;
  const monthlyReturn = annualReturn / 100 / 12;

  for (let age = currentAge; age <= retirementAge; age++) {
    // Simple compound interest calculation
    for (let month = 0; month < 12; month++) {
      savings = savings * (1 + monthlyReturn) + monthlyContribution;
    }
    
    data.push({
      age,
      savings: Math.round(savings),
    });
  }

  return data;
};

// Budget categories
const budgetCategories = [
  { name: "Housing", planned: 2000, actual: 1950, color: "#2563eb" },
  { name: "Transportation", planned: 500, actual: 520, color: "#8b5cf6" },
  { name: "Food", planned: 800, actual: 920, color: "#10b981" },
  { name: "Utilities", planned: 350, actual: 340, color: "#f59e0b" },
  { name: "Entertainment", planned: 400, actual: 480, color: "#06b6d4" },
  { name: "Healthcare", planned: 300, actual: 250, color: "#ec4899" },
  { name: "Savings", planned: 1000, actual: 1000, color: "#a855f7" },
  { name: "Debt Payment", planned: 500, actual: 500, color: "#6b7280" },
  { name: "Other", planned: 200, actual: 280, color: "#14b8a6" },
];

// Generate sample retirement projection
const retirementProjection = generateRetirementProjection(35, 67, 325000, 1500, 7);

export default function PlanningPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("retirement")
  const [currentAge, setCurrentAge] = useState(35)
  const [retirementAge, setRetirementAge] = useState(67)
  const [currentSavings, setCurrentSavings] = useState(325000)
  const [monthlyContribution, setMonthlyContribution] = useState(1500)
  const [annualReturn, setAnnualReturn] = useState(7)
  
  // Calculate total income and expenses
  const totalPlannedExpenses = budgetCategories.reduce((sum, category) => sum + category.planned, 0);
  const totalActualExpenses = budgetCategories.reduce((sum, category) => sum + category.actual, 0);
  const monthlyIncome = 6000;
  const remainingBudget = monthlyIncome - totalActualExpenses;

  // Calculate retirement information
  const projectionData = generateRetirementProjection(
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualReturn
  );
  const finalAmount = projectionData[projectionData.length - 1].savings;
  
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <SidebarNavigation />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Financial Planning</h1>
            <p className="text-muted-foreground mt-1">
              Plan your financial future and track your goals
            </p>
          </header>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="retirement">Retirement</TabsTrigger>
              <TabsTrigger value="goals">Financial Goals</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>
            
            <TabsContent value="retirement" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Retirement Calculator</CardTitle>
                  <CardDescription>
                    Estimate your retirement savings based on your current plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Current Age: {currentAge}</label>
                        <Slider
                          value={[currentAge]}
                          min={18}
                          max={70}
                          step={1}
                          onValueChange={(value) => setCurrentAge(value[0])}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Retirement Age: {retirementAge}</label>
                        <Slider
                          value={[retirementAge]}
                          min={Math.max(currentAge + 1, 50)}
                          max={80}
                          step={1}
                          onValueChange={(value) => setRetirementAge(value[0])}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Current Retirement Savings</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            className="pl-7"
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(Number(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Monthly Contribution</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            className="pl-7"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                          />
                          <div className="absolute right-0 top-0 flex">
                            <Button 
                              variant="ghost" 
                              className="h-10 rounded-l-none"
                              onClick={() => setMonthlyContribution(Math.max(0, monthlyContribution - 100))}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="h-10 rounded-l-none"
                              onClick={() => setMonthlyContribution(monthlyContribution + 100)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Expected Annual Return: {annualReturn}%</label>
                        <Slider
                          value={[annualReturn]}
                          min={1}
                          max={12}
                          step={0.5}
                          onValueChange={(value) => setAnnualReturn(value[0])}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">Retirement Projection</h3>
                        <p className="text-sm text-muted-foreground">
                          Estimated savings at retirement age ({retirementAge}):
                          <span className="text-foreground font-bold block text-2xl mt-1">
                            {formatCurrency(finalAmount)}
                          </span>
                        </p>
                      </div>
                      
                      <div className="flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={projectionData}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                            <XAxis 
                              dataKey="age" 
                              tick={{ fontSize: 12 }} 
                              tickLine={false} 
                              axisLine={false}
                              tickFormatter={(age) => `${age}`}
                            />
                            <YAxis 
                              tick={{ fontSize: 12 }} 
                              tickLine={false} 
                              axisLine={false} 
                              tickFormatter={(value) => `$${Math.round(value/1000)}k`}
                            />
                            <Tooltip
                              formatter={(value: number) => [formatCurrency(value), "Savings"]}
                              labelFormatter={(age) => `Age: ${age}`}
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="savings"
                              stroke="hsl(var(--primary))"
                              strokeWidth={2}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <Button className="ml-auto" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Projections
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Retirement Planning Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Max out tax-advantaged accounts first</h3>
                      <p className="text-sm text-muted-foreground">
                        Contribute to 401(k)s, IRAs, and HSAs before taxable accounts to maximize tax benefits.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Consider a more conservative asset allocation as you age</h3>
                      <p className="text-sm text-muted-foreground">
                        As you approach retirement, gradually shift from growth-focused investments to more conservative ones.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Plan for healthcare costs</h3>
                      <p className="text-sm text-muted-foreground">
                        Healthcare can be a significant expense in retirement. Consider long-term care insurance and HSA contributions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="goals" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Financial Goals</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financialGoals.map((goal) => {
                  const Icon = goalTypes.find(type => type.id === goal.type)?.icon || Coins;
                  const color = goalTypes.find(type => type.id === goal.type)?.color || "#2563eb";
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  const targetYear = goal.targetDate.getFullYear();
                  const currentYear = new Date().getFullYear();
                  const yearsLeft = targetYear - currentYear;
                  
                  return (
                    <Card key={goal.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center" 
                              style={{ backgroundColor: `${color}20` }}
                            >
                              <Icon className="h-4 w-4" style={{ color }} />
                            </div>
                            <CardTitle className="text-base">{goal.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4 space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{formatCurrency(goal.currentAmount)}</span>
                            <span>{formatCurrency(goal.targetAmount)}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${progress}%`, backgroundColor: color }}
                            ></div>
                          </div>
                          <div className="text-xs text-muted-foreground text-right mt-1">
                            {progress.toFixed(0)}% completed
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Target Date</div>
                            <div className="font-medium">
                              {goal.targetDate.toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric'
                              })}
                              {yearsLeft > 0 && <span className="text-xs text-muted-foreground ml-1">({yearsLeft} years)</span>}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Monthly Savings</div>
                            <div className="font-medium">{formatCurrency(goal.monthlyContribution)}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Goal Details
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="budget" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Budget</CardTitle>
                      <CardDescription>
                        Track your spending against your planned budget
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted/50">
                                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Category</th>
                                <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Planned</th>
                                <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Actual</th>
                                <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Difference</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {budgetCategories.map((category, index) => {
                                const difference = category.planned - category.actual;
                                return (
                                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-3 px-4 text-left font-medium">{category.name}</td>
                                    <td className="py-3 px-4 text-right">{formatCurrency(category.planned)}</td>
                                    <td className="py-3 px-4 text-right">{formatCurrency(category.actual)}</td>
                                    <td className={`py-3 px-4 text-right ${difference >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                      {difference >= 0 ? '+' : ''}{formatCurrency(difference)}
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex items-center">
                                        <div
                                          className={`h-2 rounded-full flex-1 ${
                                            difference >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'
                                          }`}
                                        >
                                          <div
                                            className={`h-full rounded-full ${
                                              difference >= 0 ? 'bg-emerald-500' : 'bg-red-500'
                                            }`}
                                            style={{
                                              width: `${Math.min(100, Math.abs((category.actual / category.planned) * 100))}%`,
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr className="bg-muted/20 font-semibold">
                                <td className="py-3 px-4 text-left">Total</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(totalPlannedExpenses)}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(totalActualExpenses)}</td>
                                <td className={`py-3 px-4 text-right ${totalPlannedExpenses - totalActualExpenses >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                  {totalPlannedExpenses - totalActualExpenses >= 0 ? '+' : ''}
                                  {formatCurrency(totalPlannedExpenses - totalActualExpenses)}
                                </td>
                                <td className="py-3 px-4"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t justify-between">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm">
                        <LineChartIcon className="h-4 w-4 mr-2" />
                        View Full Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-4 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Budget Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm text-muted-foreground">Monthly Income</div>
                          <div className="font-medium">{formatCurrency(monthlyIncome)}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm text-muted-foreground">Total Expenses</div>
                          <div className="font-medium">{formatCurrency(totalActualExpenses)}</div>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <div className="text-sm font-medium">Remaining Budget</div>
                          <div className={`font-semibold ${remainingBudget >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {formatCurrency(remainingBudget)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="text-sm font-medium mb-3">Spending by Category</div>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={budgetCategories}
                                dataKey="actual"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                innerRadius={40}
                                paddingAngle={2}
                              >
                                {budgetCategories.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value: number) => [formatCurrency(value), "Spending"]}
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  borderColor: "hsl(var(--border))",
                                  borderRadius: "var(--radius)",
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-1 mt-2">
                          {budgetCategories.slice(0, 6).map((category, index) => (
                            <div key={index} className="flex items-center text-xs">
                              <div
                                className="h-2 w-2 rounded-full mr-1"
                                style={{ backgroundColor: category.color }}
                              ></div>
                              <span className="truncate">{category.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Saving Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                          <LineChartIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Entertainment is over budget</h3>
                          <p className="text-xs text-muted-foreground">
                            You've spent 20% more than planned. Consider reducing dining out.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <LineChartIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Healthcare is under budget</h3>
                          <p className="text-xs text-muted-foreground">
                            Consider transferring the savings to your emergency fund.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                          <LineChartIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Food expenses trending up</h3>
                          <p className="text-xs text-muted-foreground">
                            Your food expenses have increased by 15% compared to last month.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
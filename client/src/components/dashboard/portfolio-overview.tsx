import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioOverviewProps {
  className?: string;
}

export default function PortfolioOverview({ className }: PortfolioOverviewProps) {
  // Sample data - this would come from the API in a real application
  const portfolioData = [
    { date: 'Jan', value: 4000 },
    { date: 'Feb', value: 3200 },
    { date: 'Mar', value: 3800 },
    { date: 'Apr', value: 4200 },
    { date: 'May', value: 5000 },
    { date: 'Jun', value: 4800 },
    { date: 'Jul', value: 5500 },
    { date: 'Aug', value: 7000 },
    { date: 'Sep', value: 6800 },
    { date: 'Oct', value: 7200 },
    { date: 'Nov', value: 7800 },
    { date: 'Dec', value: 8400 },
  ];

  const calculateChange = () => {
    const lastValue = portfolioData[portfolioData.length - 1].value;
    const previousValue = portfolioData[portfolioData.length - 2].value;
    const change = ((lastValue - previousValue) / previousValue) * 100;

    return {
      percent: change.toFixed(2),
      value: (lastValue - previousValue).toFixed(2),
      isPositive: change >= 0
    };
  };

  const change = calculateChange();

  return (
    <Card className={cn("shadow-md h-[400px]", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Portfolio Value</CardTitle>
            <CardDescription>12-month performance history</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${portfolioData[portfolioData.length - 1].value.toLocaleString()}</div>
            <div className={cn(
              "flex items-center text-sm",
              change.isPositive ? "text-primary" : "text-destructive"
            )}>
              {change.isPositive ? (
                <ArrowUpRight className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4" />
              )}
              {change.isPositive ? "+" : ""}{change.percent}% (${change.value})
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-0 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={portfolioData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))" 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} 
              formatter={(value) => [`$${value}`, 'Value']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

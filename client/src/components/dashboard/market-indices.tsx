import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketIndices() {
  // Sample data - this would come from the API in a real application
  const indices = [
    {
      name: "S&P 500",
      value: "4,682.24",
      change: "+1.21%",
      isPositive: true
    },
    {
      name: "NASDAQ",
      value: "15,982.36",
      change: "+0.78%",
      isPositive: true
    },
    {
      name: "DOW JONES",
      value: "36,142.22",
      change: "-0.32%",
      isPositive: false
    },
    {
      name: "RUSSELL 2000",
      value: "2,234.45",
      change: "+1.02%",
      isPositive: true
    },
    {
      name: "VIX",
      value: "16.28",
      change: "-3.15%",
      isPositive: false
    }
  ];

  return (
    <Card className="shadow-md h-[400px]">
      <CardHeader>
        <CardTitle>Market Indices</CardTitle>
        <CardDescription>Current market performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {indices.map((index) => (
          <div key={index.name} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
            <div>
              <h3 className="font-medium">{index.name}</h3>
              <p className="text-muted-foreground text-sm">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <div className="font-bold">{index.value}</div>
              <div className={cn(
                "flex items-center justify-end text-sm",
                index.isPositive ? "text-primary" : "text-destructive"
              )}>
                {index.isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                {index.change}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

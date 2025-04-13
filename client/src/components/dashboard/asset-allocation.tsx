import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AssetAllocation() {
  // Sample data - this would come from the API in a real application
  const assetData = [
    { name: 'Stocks', value: 65 },
    { name: 'Bonds', value: 15 },
    { name: 'Cash', value: 10 },
    { name: 'Real Estate', value: 5 },
    { name: 'Crypto', value: 5 },
  ];

  // Sample data for sector allocation
  const sectorData = [
    { name: 'Technology', value: 30 },
    { name: 'Healthcare', value: 20 },
    { name: 'Financial', value: 15 },
    { name: 'Consumer Cyclical', value: 12 },
    { name: 'Industrials', value: 10 },
    { name: 'Other', value: 13 },
  ];

  // Chart colors
  const COLORS = [
    'hsl(var(--chart-1))', 
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-3))', 
    'hsl(var(--chart-4))', 
    'hsl(var(--chart-5))'
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    // Only show label for larger segments (>5%)
    if (percent < 0.05) return null;
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="hsl(var(--card-foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="shadow-md h-[500px]">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>Distribution of your investments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="asset" className="w-full h-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="asset">Asset Class</TabsTrigger>
            <TabsTrigger value="sector">Sector</TabsTrigger>
          </TabsList>
          <TabsContent value="asset" className="h-full mt-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Allocation']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="sector" className="h-full mt-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Allocation']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

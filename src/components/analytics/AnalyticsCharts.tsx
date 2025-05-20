
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface AnalyticsChartsProps {
  chartType: "line" | "area";
}

export function AnalyticsCharts({ chartType }: AnalyticsChartsProps) {
  const [activeMetric, setActiveMetric] = useState("views");
  
  // Sample data for the charts
  const viewsData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const watchTimeData = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 },
    { name: 'May', value: 4800 },
    { name: 'Jun', value: 3800 },
    { name: 'Jul', value: 4300 },
  ];

  const ctrData = [
    { name: 'Jan', value: 4.2 },
    { name: 'Feb', value: 3.8 },
    { name: 'Mar', value: 4.9 },
    { name: 'Apr', value: 3.5 },
    { name: 'May', value: 4.1 },
    { name: 'Jun', value: 4.5 },
    { name: 'Jul', value: 5.2 },
  ];

  const revenueData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 950 },
    { name: 'Mar', value: 1700 },
    { name: 'Apr', value: 1300 },
    { name: 'May', value: 1100 },
    { name: 'Jun', value: 1600 },
    { name: 'Jul', value: 2100 },
  ];

  const metrics = [
    { id: "views", name: "Views", data: viewsData, color: "#4C7FFF", formatter: (value: number) => `${(value/1000).toFixed(1)}K` },
    { id: "watchTime", name: "Watch Time", data: watchTimeData, color: "#10B981", formatter: (value: number) => `${(value/1000).toFixed(1)}K hrs` },
    { id: "ctr", name: "CTR", data: ctrData, color: "#F59E0B", formatter: (value: number) => `${value.toFixed(1)}%` },
    { id: "revenue", name: "Revenue", data: revenueData, color: "#EC4899", formatter: (value: number) => `$${value}` },
  ];
  
  const currentMetric = metrics.find(m => m.id === activeMetric) || metrics[0];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="views" onValueChange={setActiveMetric}>
        <TabsList>
          {metrics.map((metric) => (
            <TabsTrigger key={metric.id} value={metric.id}>{metric.name}</TabsTrigger>
          ))}
        </TabsList>
        
        {metrics.map((metric) => (
          <TabsContent key={metric.id} value={metric.id} className="pt-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart data={metric.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={metric.formatter}
                  />
                  <Tooltip 
                    formatter={(value: number) => [metric.formatter(value), metric.name]} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={metric.color} 
                    activeDot={{ r: 8 }}
                    name={metric.name}
                  />
                </LineChart>
              ) : (
                <AreaChart data={metric.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id={`color-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metric.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={metric.color} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={metric.formatter}
                  />
                  <Tooltip 
                    formatter={(value: number) => [metric.formatter(value), metric.name]} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={metric.color} 
                    fillOpacity={1} 
                    fill={`url(#color-${metric.id})`} 
                    name={metric.name}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

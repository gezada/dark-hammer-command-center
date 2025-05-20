
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, TooltipProps } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type Metric = {
  name: string;
  data: {
    name: string;
    value: number;
  }[];
  color: string;
};

export function DashboardPerformanceChart() {
  // Sample data for the sparkline charts
  const metrics: Metric[] = [
    {
      name: "Views",
      data: [
        { name: "Mon", value: 4000 },
        { name: "Tue", value: 3000 },
        { name: "Wed", value: 5000 },
        { name: "Thu", value: 3500 },
        { name: "Fri", value: 4500 },
        { name: "Sat", value: 6000 },
        { name: "Sun", value: 7000 }
      ],
      color: "#4C7FFF"
    },
    {
      name: "Watch Time",
      data: [
        { name: "Mon", value: 1200 },
        { name: "Tue", value: 1100 },
        { name: "Wed", value: 1300 },
        { name: "Thu", value: 1000 },
        { name: "Fri", value: 1400 },
        { name: "Sat", value: 1800 },
        { name: "Sun", value: 2000 }
      ],
      color: "#10B981"
    },
    {
      name: "CTR",
      data: [
        { name: "Mon", value: 4.2 },
        { name: "Tue", value: 3.8 },
        { name: "Wed", value: 4.5 },
        { name: "Thu", value: 4.1 },
        { name: "Fri", value: 4.7 },
        { name: "Sat", value: 5.0 },
        { name: "Sun", value: 5.2 }
      ],
      color: "#F59E0B"
    },
    {
      name: "Revenue",
      data: [
        { name: "Mon", value: 120 },
        { name: "Tue", value: 100 },
        { name: "Wed", value: 140 },
        { name: "Thu", value: 110 },
        { name: "Fri", value: 130 },
        { name: "Sat", value: 160 },
        { name: "Sun", value: 190 }
      ],
      color: "#EC4899"
    }
  ];

  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <Card key={metric.name} className="p-3 hover:bg-accent/5 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">{metric.name}</span>
            <span className="text-xs font-medium text-green-500">
              +{Math.floor(Math.random() * 10)}%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={metric.data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${metric.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metric.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={metric.color} 
                strokeWidth={2}
                fill={`url(#gradient-${metric.name})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      ))}
    </div>
  );
}

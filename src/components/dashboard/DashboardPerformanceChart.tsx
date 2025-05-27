
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Metric = {
  name: string;
  data: {
    name: string;
    value: number;
  }[];
  color: string;
  change: string;
  description: string;
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
      color: "#3B82F6",
      change: "+12%",
      description: "Increase in video views compared to last period"
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
      color: "#10B981",
      change: "+8%",
      description: "Increase in total watch time hours"
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
      color: "#F59E0B",
      change: "+5%",
      description: "Improvement in click-through rate"
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
      color: "#EC4899",
      change: "+15%",
      description: "Increase in estimated revenue"
    }
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <Card 
          key={metric.name} 
          className="glass-card hover:bg-accent/50 transition-all duration-200 ease-out w-[200px]"
        >
          <CardContent className="p-4 relative">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-sm text-foreground">{metric.name}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute top-2 right-2 z-10">
                      <Badge 
                        className={`text-xs transition-all duration-200 ease-out ${
                          metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}
                        style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          backdropFilter: 'blur(4px)',
                          border: 'none'
                        }}
                      >
                        {metric.change}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[200px]">{metric.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metric.data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${metric.name}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metric.color} stopOpacity={0.4} />
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Eye, Clock, Users, DollarSign, TrendingUp } from "lucide-react";

interface PerformanceOverviewProps {
  timeRange: string;
}

export function PerformanceOverview({ timeRange }: PerformanceOverviewProps) {
  const metrics = [
    {
      id: "views",
      title: "Visualizações",
      value: "458.2K",
      change: "+5.7%",
      icon: Eye,
      color: "#3B82F6",
      data: [
        { name: "D1", value: 4000 },
        { name: "D2", value: 3000 },
        { name: "D3", value: 5000 },
        { name: "D4", value: 3500 },
        { name: "D5", value: 4500 },
        { name: "D6", value: 6000 },
        { name: "D7", value: 7000 }
      ]
    },
    {
      id: "watchtime",
      title: "Tempo Assistido",
      value: "32.8K hrs",
      change: "+2.1%",
      icon: Clock,
      color: "#10B981",
      data: [
        { name: "D1", value: 1200 },
        { name: "D2", value: 1100 },
        { name: "D3", value: 1300 },
        { name: "D4", value: 1000 },
        { name: "D5", value: 1400 },
        { name: "D6", value: 1800 },
        { name: "D7", value: 2000 }
      ]
    },
    {
      id: "subscribers",
      title: "Inscritos",
      value: "12.4K",
      change: "+342",
      icon: Users,
      color: "#F59E0B",
      data: [
        { name: "D1", value: 12000 },
        { name: "D2", value: 12050 },
        { name: "D3", value: 12100 },
        { name: "D4", value: 12200 },
        { name: "D5", value: 12300 },
        { name: "D6", value: 12350 },
        { name: "D7", value: 12400 }
      ]
    },
    {
      id: "revenue",
      title: "Receita Est.",
      value: "$5,280",
      change: "+$412",
      icon: DollarSign,
      color: "#EC4899",
      data: [
        { name: "D1", value: 4800 },
        { name: "D2", value: 4900 },
        { name: "D3", value: 5100 },
        { name: "D4", value: 5000 },
        { name: "D5", value: 5200 },
        { name: "D6", value: 5150 },
        { name: "D7", value: 5280 }
      ]
    },
    {
      id: "ctr",
      title: "CTR Médio",
      value: "4.8%",
      change: "+0.3%",
      icon: TrendingUp,
      color: "#8B5CF6",
      data: [
        { name: "D1", value: 4.2 },
        { name: "D2", value: 4.5 },
        { name: "D3", value: 4.3 },
        { name: "D4", value: 4.6 },
        { name: "D5", value: 4.7 },
        { name: "D6", value: 4.9 },
        { name: "D7", value: 4.8 }
      ]
    }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Visão Geral de Performance</h2>
        <Badge variant="outline" className="bg-card/50 backdrop-blur-sm border-border/50">
          {timeRange === "7d" ? "7 dias" : timeRange === "28d" ? "28 dias" : timeRange === "90d" ? "90 dias" : timeRange === "365d" ? "1 ano" : "Todo período"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <Card 
            key={metric.id} 
            className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-red-600/10 rounded-lg">
                  <metric.icon className="h-4 w-4 text-red-500" />
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    metric.change.startsWith('+') 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}
                >
                  {metric.change}
                </Badge>
              </div>

              <div className="mb-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">{metric.title}</p>
                <h3 className="text-xl font-bold">{metric.value}</h3>
              </div>

              <div className="h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metric.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metric.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={metric.color} 
                      strokeWidth={2}
                      fill={`url(#gradient-${metric.id})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

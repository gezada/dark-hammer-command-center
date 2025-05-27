
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Clock, DollarSign, Eye, Info } from "lucide-react";

type KPI = {
  id: string;
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
};

export function DashboardKPICards() {
  const kpis: KPI[] = [
    { 
      id: "views",
      title: "Views", 
      value: "458.2K", 
      change: "+5.7%",
      icon: Eye,
      tooltip: "Total video views across all channels"
    },
    { 
      id: "ctr",
      title: "Avg. CTR", 
      value: "4.8%", 
      change: "+0.3%",
      icon: TrendingUp,
      tooltip: "Average click-through rate - percentage of impressions that turned into views"
    },
    { 
      id: "subscribers",
      title: "Subscribers", 
      value: "12.4K", 
      change: "+342",
      icon: Users,
      tooltip: "Total subscribers across all channels"
    },
    { 
      id: "watchtime",
      title: "Watch Time", 
      value: "32.8K hrs", 
      change: "+2.1%",
      icon: Clock,
      tooltip: "Total time viewers spent watching your content"
    },
    { 
      id: "revenue",
      title: "Revenue Est.", 
      value: "$5,280", 
      change: "+$412",
      icon: DollarSign,
      tooltip: "Estimated revenue from all monetization sources"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {kpis.map((kpi) => (
        <Card 
          key={kpi.id} 
          className="glass-card hover-lift hover:shadow-lg min-w-[220px] transition-all duration-200"
          style={{ 
            boxShadow: 'hover: 0 10px 25px rgba(255, 59, 71, 0.1)'
          }}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div 
                className="p-3 rounded-full transition-all duration-200"
                style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}
              >
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-6 w-6 p-0 hover:bg-transparent"
                      aria-label={`Information about ${kpi.title}`}
                    >
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[200px]">{kpi.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">{kpi.title}</p>
              <h3 
                className="text-2xl font-semibold mb-2" 
                aria-label={`${kpi.value} ${kpi.title.toLowerCase()}`}
              >
                {kpi.value}
              </h3>
              <p className={`text-sm font-medium ${
                kpi.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {kpi.change} vs last period
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

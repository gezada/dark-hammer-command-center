
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { AnalyticsSkeleton } from "@/components/skeleton/AnalyticsSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, TrendingUp, Clock, DollarSign, Eye, Info } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { ChannelSelector } from "@/components/ChannelSelector";

export default function AnalyticsPage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState<"line" | "area">("line");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <AnalyticsSkeleton />
        </main>
      </div>
    );
  }

  // Sample data for the KPIs
  const kpis = [
    { 
      title: "Views", 
      value: "458.2K", 
      change: "+5.7%",
      icon: Eye,
      tooltip: "Total video views across all channels"
    },
    { 
      title: "Avg. CTR", 
      value: "4.8%", 
      change: "+0.3%",
      icon: TrendingUp,
      tooltip: "Click-through rate: percentage of impressions that led to views"
    },
    { 
      title: "Subscribers", 
      value: "12.4K", 
      change: "+342",
      icon: Users,
      tooltip: "Total subscribers across all channels"
    },
    { 
      title: "Watch Time", 
      value: "32.8K hrs", 
      change: "+2.1%",
      icon: Clock,
      tooltip: "Total hours viewers spent watching your content"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <DateRangeFilter />
            <ChannelSelector 
              selectedChannelId={selectedChannel} 
              onChannelChange={setSelectedChannel} 
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-130px)] pr-4 custom-scrollbar">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpis.map((kpi, index) => (
              <Card key={index} className="bg-card hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="mt-1">
                      <kpi.icon className="h-5 w-5 text-primary" />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="h-6 w-6 p-0 hover:bg-transparent">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{kpi.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                    <p className={`text-xs mt-1 ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {kpi.change} vs. last period
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <Card className="shadow-sm mb-6">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle>Performance Analytics</CardTitle>
                <ToggleGroup type="single" value={chartType} onValueChange={(value) => value && setChartType(value as "line" | "area")}>
                  <ToggleGroupItem value="line">Line</ToggleGroupItem>
                  <ToggleGroupItem value="area">Area</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <AnalyticsCharts chartType={chartType} />
            </CardContent>
          </Card>
        </ScrollArea>
      </main>
    </div>
  );
}

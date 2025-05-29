
import { AppHeader } from "@/components/AppHeader";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, TrendingUp, Clock, DollarSign, Eye, Calendar, MessageSquare, Upload, ChevronDown, Filter, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RecommendedSummary } from "@/components/dashboard/RecommendedSummary";
import { PerformanceOverview } from "@/components/dashboard/PerformanceOverview";
import { ChannelCarousel } from "@/components/dashboard/ChannelCarousel";
import { RecentComments } from "@/components/dashboard/RecentComments";
import { ContentCalendarSummary } from "@/components/dashboard/ContentCalendarSummary";

export default function DashboardPage() {
  const { sidebarCollapsed, channels, selectedChannelId, setSelectedChannelId } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("28d");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'}`}>
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  const timeRanges = [
    { value: "7d", label: "7 dias" },
    { value: "28d", label: "28 dias" },
    { value: "90d", label: "90 dias" },
    { value: "365d", label: "1 ano" },
    { value: "all", label: "Todo período" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className={`flex-1 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Central de Controle Universal</h1>
              <p className="text-muted-foreground">Gerencie todos os seus canais em um só lugar</p>
            </div>
            
            {/* Global Filters - Grouped and styled */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-[120px] border-0 bg-transparent h-auto p-0 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedChannelId || "all"} onValueChange={(value) => setSelectedChannelId(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[160px] border-0 bg-transparent h-auto p-0 focus:ring-0">
                    <SelectValue placeholder="Todos os Canais" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    <SelectItem value="all">Todos os Canais</SelectItem>
                    {channels?.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        {channel.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Recommended Summary */}
          <RecommendedSummary />

          {/* Performance Overview */}
          <PerformanceOverview timeRange={selectedTimeRange} />

          {/* Main Content Grid with improved spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Channel Overview */}
            <div className="lg:col-span-2 space-y-8">
              <ChannelCarousel />
              <ContentCalendarSummary />
            </div>

            {/* Right Column - Recent Comments */}
            <div>
              <RecentComments />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

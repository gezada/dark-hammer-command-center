
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/AppHeader";
import { useStore } from "@/lib/store";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardPerformanceChart } from "@/components/dashboard/DashboardPerformanceChart";
import { DashboardContentCalendar } from "@/components/dashboard/DashboardContentCalendar";
import { ChannelFilter } from "@/components/ChannelFilter";

import { 
  BarChart2, 
  ClockIcon, 
  TrendingUp, 
  Users, 
  Video, 
  ChevronUp,
  ChevronDown 
} from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  description: string;
};

export default function DashboardPage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [statCards, setStatCards] = useState<StatCard[]>([]);

  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setStatCards([
        {
          title: "Total Views",
          value: "1.2M",
          change: 12.5,
          icon: <BarChart2 className="h-5 w-5 text-indigo-500" />,
          description: "Last 28 days"
        },
        {
          title: "Watch Time",
          value: "87.4K hrs",
          change: 8.2,
          icon: <ClockIcon className="h-5 w-5 text-green-600" />,
          description: "Last 28 days"
        },
        {
          title: "Subscribers",
          value: "24.3K",
          change: -2.4,
          icon: <Users className="h-5 w-5 text-blue-600" />,
          description: "Last 28 days"
        },
        {
          title: "Latest Video",
          value: "12.7K",
          change: 18.6,
          icon: <Video className="h-5 w-5 text-red-500" />,
          description: "Views in 48 hours"
        },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <ChannelFilter />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {card.change > 0 ? (
                    <ChevronUp className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <ChevronDown className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span className={card.change > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(card.change)}%
                  </span>
                  <span className="ml-1">{card.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>View your channel's performance metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardPerformanceChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>Your upcoming video schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardContentCalendar />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Videos</CardTitle>
              <CardDescription>Your best videos in the last 28 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-12 w-20 bg-muted rounded-sm flex items-center justify-center text-xs text-muted-foreground">
                    Thumbnail
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      Video Title {i + 1} - This is a longer title to demonstrate truncation
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{(50 - i * 5)}K views</span>
                      <span className="flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                        {(20 - i * 2)}% CTR
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

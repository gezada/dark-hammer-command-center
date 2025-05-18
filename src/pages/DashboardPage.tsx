
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "@/lib/api";
import { useStore } from "@/lib/store";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { InfoIcon } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function DashboardPage() {
  const { selectedChannelId, dateRange } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch analytics data
  const { data: analytics } = useQuery({
    queryKey: ['analytics', selectedChannelId, dateRange],
    queryFn: () => fetchAnalytics(selectedChannelId, dateRange),
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6 overflow-auto">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            <TooltipProvider>
              {/* Views Today */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      VIEWS TODAY
                    </CardTitle>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                  </div>
                  <TooltipContent>
                    <p>Total number of views in the last 24 hours</p>
                  </TooltipContent>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.viewsToday.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% from yesterday
                  </p>
                </CardContent>
              </Card>

              {/* Subscribers */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      SUBSCRIBERS
                    </CardTitle>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                  </div>
                  <TooltipContent>
                    <p>Total subscribers across selected channels</p>
                  </TooltipContent>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.subscribers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +152 this week
                  </p>
                </CardContent>
              </Card>

              {/* Watch Time */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      WATCH TIME (HRS)
                    </CardTitle>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                  </div>
                  <TooltipContent>
                    <p>Total hours watched in the selected period</p>
                  </TooltipContent>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.watchTimeHours.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +4.2% from last period
                  </p>
                </CardContent>
              </Card>

              {/* Revenue Estimate */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      REVENUE ESTIMATE
                    </CardTitle>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                  </div>
                  <TooltipContent>
                    <p>Estimated revenue based on views and CPM</p>
                  </TooltipContent>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${analytics?.revenueEstimate.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +$123.45 from last period
                  </p>
                </CardContent>
              </Card>

              {/* Avg. CTR */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      AVG. CTR
                    </CardTitle>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                  </div>
                  <TooltipContent>
                    <p>Average Click-Through Rate for impressions</p>
                  </TooltipContent>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.avgCTR}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +0.2% from last period
                  </p>
                </CardContent>
              </Card>
            </TooltipProvider>
          </div>

          {/* Charts */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            {/* Views Chart */}
            <Card className="col-span-1 lg:col-span-2 xl:col-span-2">
              <CardHeader>
                <CardTitle>Views</CardTitle>
                <CardDescription>
                  Daily view count for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={analytics?.charts.views}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="#8B5CF680" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Watch Time Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Watch Time</CardTitle>
                <CardDescription>
                  Hours watched per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics?.charts.watchTime}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CTR Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Click-Through Rate</CardTitle>
                <CardDescription>
                  Daily average CTR %
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={analytics?.charts.ctr}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8B5CF6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

interface LineChartProps {
  data: any[];
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const LineChart = ({ data, margin }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="#8B5CF620" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

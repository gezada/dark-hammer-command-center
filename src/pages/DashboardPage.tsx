
import { AppHeader } from "@/components/AppHeader";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, TrendingUp, Clock, DollarSign, Eye, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DashboardContentCalendar } from "@/components/dashboard/DashboardContentCalendar";
import { DashboardPerformanceChart } from "@/components/dashboard/DashboardPerformanceChart";

export default function DashboardPage() {
  const { sidebarCollapsed, dateRange } = useStore();
  const [isLoading, setIsLoading] = useState(true);

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
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  // Sample data for the dashboard
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
      tooltip: "Total time viewers spent watching your content"
    },
    { 
      title: "Revenue Est.", 
      value: "$5,280", 
      change: "+$412",
      icon: DollarSign,
      tooltip: "Estimated revenue from all monetization sources"
    }
  ];

  const recentUploads = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=100&fit=crop",
      title: "How to Build a Full-Stack React Application in 2024",
      channel: "Dev Channel",
      views: "23.4K",
      status: "Published"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=100&fit=crop",
      title: "10 JavaScript Tips You Need to Know",
      channel: "Code Masters",
      views: "18.7K",
      status: "Published"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=100&fit=crop",
      title: "Mastering TypeScript - Advanced Patterns",
      channel: "Dev Channel",
      views: "12.9K",
      status: "Published"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=100&fit=crop",
      title: "Docker for Beginners: Complete Guide",
      channel: "Code Masters",
      views: "9.2K",
      status: "Processing"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <DateRangeFilter />
        </div>

        <ScrollArea className="h-[calc(100vh-130px)] pr-4 custom-scrollbar">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
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
                          <Button variant="ghost" className="h-6 w-6 p-0 hover:bg-transparent">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Uploads Table */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Thumbnail</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Channel</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUploads.map((video) => (
                        <TableRow key={video.id} className="cursor-pointer hover:bg-accent/50">
                          <TableCell>
                            <div className="h-14 w-24 rounded overflow-hidden">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{video.title}</TableCell>
                          <TableCell>{video.channel}</TableCell>
                          <TableCell>{video.views}</TableCell>
                          <TableCell>
                            <Badge variant={video.status === "Published" ? "default" : "outline"}>
                              {video.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <div className="flex flex-col gap-1 items-center">
                                    <div className="h-1 w-1 rounded-full bg-foreground"></div>
                                    <div className="h-1 w-1 rounded-full bg-foreground"></div>
                                    <div className="h-1 w-1 rounded-full bg-foreground"></div>
                                  </div>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                <DropdownMenuItem>Edit Metadata</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Content Calendar */}
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle>Content Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardContentCalendar />
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <div>
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardPerformanceChart />
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

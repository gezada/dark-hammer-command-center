
import { AppHeader } from "@/components/AppHeader";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, TrendingUp, Clock, DollarSign, Eye, Info, MoreHorizontal, Edit, Trash, Play } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DashboardContentCalendar } from "@/components/dashboard/DashboardContentCalendar";
import { DashboardPerformanceChart } from "@/components/dashboard/DashboardPerformanceChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  // Updated KPI data with better values
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
      tooltip: "Avg. CTR – percentage of impressions that turned into views"
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

  const timeRanges = [
    { value: "7d", label: "7 days" },
    { value: "28d", label: "28 days" },
    { value: "90d", label: "90 days" },
    { value: "365d", label: "365 days" },
    { value: "may2025", label: "May 2025" },
    { value: "all", label: "All time" }
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
      status: "Scheduled"
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Published": return "default";
      case "Scheduled": return "secondary";
      case "Processing": return "outline";
      case "Error": return "destructive";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-red-600 text-white";
      case "Scheduled": return "bg-yellow-600 text-white";
      case "Processing": return "bg-gray-600 text-white";
      case "Error": return "bg-purple-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        </div>

        <ScrollArea className="h-[calc(100vh-130px)] pr-4 custom-scrollbar">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            {kpis.map((kpi, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#2A2A2A] hover:shadow-lg hover:shadow-red-500/10 transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-red-600/10 rounded-lg">
                      <kpi.icon className="h-4 w-4 text-red-500" />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="h-6 w-6 p-0 hover:bg-transparent">
                            <Info className="h-3 w-3 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{kpi.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 mb-1">{kpi.title}</p>
                    <h3 className="text-xl font-bold text-white mb-1">{kpi.value}</h3>
                    <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {kpi.change} vs last period
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={selectedTimeRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={selectedTimeRange === range.value ? 
                    "bg-red-600 hover:bg-red-700 text-white" : 
                    "border-[#2A2A2A] text-gray-300 hover:bg-[#2A2A2A]"
                  }
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <Select value={selectedChannelId || "all"} onValueChange={(value) => setSelectedChannelId(value === "all" ? null : value)}>
              <SelectTrigger className="w-[200px] border-[#2A2A2A] bg-[#1A1A1A] text-white">
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                <SelectItem value="all" className="text-white hover:bg-[#2A2A2A]">All Channels</SelectItem>
                {channels?.map((channel) => (
                  <SelectItem key={channel.id} value={channel.id} className="text-white hover:bg-[#2A2A2A]">
                    {channel.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Uploads Table - 66% width */}
            <div className="lg:col-span-2">
              <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white">Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2A2A2A]">
                        <TableHead className="w-[100px] text-gray-400">Thumbnail</TableHead>
                        <TableHead className="text-gray-400">Title</TableHead>
                        <TableHead className="text-gray-400">Channel</TableHead>
                        <TableHead className="text-gray-400">Views</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="w-[50px] text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUploads.map((video) => (
                        <TableRow key={video.id} className="border-[#2A2A2A] hover:bg-[#2A2A2A]/50 transition-colors group">
                          <TableCell>
                            <div className="h-14 w-24 rounded overflow-hidden">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-white max-w-[300px]">
                            <div className="truncate">{video.title}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-[#2A2A2A] text-gray-300">
                              {video.channel}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{video.views}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(video.status)}>
                              {video.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[#2A2A2A]">
                                  <DropdownMenuItem className="text-white hover:bg-[#2A2A2A]">
                                    <Play className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-white hover:bg-[#2A2A2A]">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-400 hover:bg-[#2A2A2A]">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Content Calendar */}
              <Card className="mt-6 bg-[#1A1A1A] border-[#2A2A2A]">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Content Calendar</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" disabled className="border-[#2A2A2A] text-gray-500">
                            Optimize Time
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">AI optimization coming in v2</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  <DashboardContentCalendar />
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview - 34% width */}
            <div>
              <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white">Performance Overview</CardTitle>
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


import { AppHeader } from "@/components/AppHeader";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Edit, Trash, Play } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DashboardContentCalendar } from "@/components/dashboard/DashboardContentCalendar";
import { DashboardPerformanceChart } from "@/components/dashboard/DashboardPerformanceChart";
import { DashboardKPICards } from "@/components/dashboard/DashboardKPICards";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";

export default function DashboardPage() {
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
        <main className="flex-1 p-6 overflow-auto mt-16">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  const recentUploads = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=68&fit=crop",
      title: "How to Build a Full-Stack React Application in 2024",
      channel: "Dev Channel",
      views: "23.4K",
      status: "Published"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&h=68&fit=crop",
      title: "10 JavaScript Tips You Need to Know",
      channel: "Code Masters",
      views: "18.7K",
      status: "Published"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=120&h=68&fit=crop",
      title: "Mastering TypeScript - Advanced Patterns",
      channel: "Dev Channel",
      views: "12.9K",
      status: "Scheduled"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=68&fit=crop",
      title: "Docker for Beginners: Complete Guide",
      channel: "Code Masters",
      views: "9.2K",
      status: "Processing"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": 
        return { bg: "#16a34a20", text: "#16a34a" };
      case "Scheduled": 
        return { bg: "#facc1520", text: "#facc15" };
      case "Processing": 
        return { bg: "#64748b20", text: "#64748b" };
      default: 
        return { bg: "#64748b20", text: "#64748b" };
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main 
        className="flex-1 mt-16 transition-all duration-300"
        style={{ paddingLeft: 'max(0px, var(--sidebar-width))' }}
      >
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">Central de Controle Universal</h1>
          </div>

          {/* KPI Cards Grid */}
          <DashboardKPICards />

          {/* Filters Row */}
          <DashboardFilters 
            selectedTimeRange={selectedTimeRange}
            onTimeRangeChange={setSelectedTimeRange}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Recent Uploads & Calendar */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Recent Uploads Table */}
              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold">Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div 
                    className="custom-scrollbar overflow-y-auto"
                    style={{ maxHeight: 'clamp(280px, 46vh, 460px)' }}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead className="w-[120px] text-muted-foreground pl-6">Thumbnail</TableHead>
                          <TableHead className="text-muted-foreground">Title</TableHead>
                          <TableHead className="text-muted-foreground">Channel</TableHead>
                          <TableHead className="text-muted-foreground">Views</TableHead>
                          <TableHead className="text-muted-foreground">Status</TableHead>
                          <TableHead className="w-[60px] text-muted-foreground pr-6">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentUploads.map((video) => {
                          const statusColors = getStatusColor(video.status);
                          return (
                            <TableRow 
                              key={video.id} 
                              className="border-border group h-[56px] transition-all duration-200 ease-out"
                              style={{ backgroundColor: 'transparent' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#1a1b22';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <TableCell className="py-2 pl-6">
                                <div className="h-[34px] w-[60px] rounded overflow-hidden flex items-center justify-center">
                                  <img 
                                    src={video.thumbnail} 
                                    alt={video.title} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium max-w-[300px] py-2">
                                <div className="truncate">{video.title}</div>
                              </TableCell>
                              <TableCell className="py-2">
                                <Badge 
                                  variant="outline" 
                                  style={{ backgroundColor: "#1c1d24", color: "#d1d5db", border: "1px solid #262732" }}
                                >
                                  {video.channel}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-2">{video.views}</TableCell>
                              <TableCell className="py-2">
                                <Badge 
                                  className="transition-all duration-200 ease-out"
                                  style={{ backgroundColor: statusColors.bg, color: statusColors.text, border: "none" }}
                                >
                                  {video.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-2 pr-6">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="glass-card">
                                      <DropdownMenuItem className="hover:bg-accent">
                                        <Play className="mr-2 h-4 w-4" />
                                        View
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="hover:bg-accent">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-400 hover:bg-accent">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Content Calendar */}
              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold">Content Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardContentCalendar />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Performance Overview */}
            <div className="lg:flex lg:flex-col lg:w-[340px] lg:sticky lg:top-[96px]">
              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardPerformanceChart />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

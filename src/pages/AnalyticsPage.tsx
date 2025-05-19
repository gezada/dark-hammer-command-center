
import { PageLayout } from "@/components/PageLayout";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { AnalyticsSkeleton } from "@/components/skeleton/AnalyticsSkeleton";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

export default function AnalyticsPage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [viewType, setViewType] = useState("views");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const viewsData = Array.from({ length: 30 }, (_, i) => ({
    date: `Jun ${i + 1}`,
    views: Math.floor(Math.random() * 8000) + 20000,
  }));

  const subscribersData = Array.from({ length: 30 }, (_, i) => ({
    date: `Jun ${i + 1}`,
    subscribers: Math.floor(Math.random() * 1000) + 180000,
  }));

  const videoPerformanceData = [
    { name: "Latest Tech Review", views: 45000 },
    { name: "Gaming Livestream", views: 52000 },
    { name: "Tutorial Series", views: 63000 },
    { name: "Product Unboxing", views: 72000 },
    { name: "Reaction Video", views: 96000 },
    { name: "Special Event", views: 112000 },
  ];

  const COLORS = ['#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A'];

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

  return (
    <PageLayout title="Analytics">
      <div className="mb-6 flex items-center justify-between">
        <DateRangeFilter />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6">
            <h3 className="text-muted-foreground text-sm font-medium">Total Views</h3>
            <p className="text-3xl font-bold mt-2">2.7M</p>
            <p className="text-sm text-green-500 mt-1">+12.5% prev. period</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6">
            <h3 className="text-muted-foreground text-sm font-medium">Watch Time</h3>
            <p className="text-3xl font-bold mt-2">156K hrs</p>
            <p className="text-sm text-green-500 mt-1">+8.3% prev. period</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6">
            <h3 className="text-muted-foreground text-sm font-medium">Avg. CTR</h3>
            <p className="text-3xl font-bold mt-2">4.7%</p>
            <p className="text-sm text-red-500 mt-1">-0.8% prev. period</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6">
            <h3 className="text-muted-foreground text-sm font-medium">Revenue</h3>
            <p className="text-3xl font-bold mt-2">$38.2K</p>
            <p className="text-sm text-green-500 mt-1">+15.2% prev. period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Views</h3>
              <Select value="all" defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="channel1">Channel 1</SelectItem>
                  <SelectItem value="channel2">Channel 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={viewsData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#FF4A4A" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Subscribers</h3>
              <Select value="all" defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="channel1">Channel 1</SelectItem>
                  <SelectItem value="channel2">Channel 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={subscribersData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="subscribers" stroke="#6E59A5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Performance */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Performance by Video</h3>
            <div className="flex gap-2">
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="watchTime">Watch Time</SelectItem>
                  <SelectItem value="ctr">CTR</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={videoPerformanceData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} angle={-45} textAnchor="end" height={70} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="views" fill="#FF4A4A" radius={[4, 4, 0, 0]}>
                  {videoPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

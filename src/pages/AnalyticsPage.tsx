
import { useState, useEffect } from 'react';
import { AppHeader } from "@/components/AppHeader";
import { useStore } from "@/lib/store";
import { AnalyticsSkeleton } from "@/components/skeleton/AnalyticsSkeleton";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { 
  ArrowUpRight, 
  Clock, 
  ThumbsUp, 
  Users, 
  Video, 
  ChevronUp,
  ChevronDown,
  Activity,
  BarChart4,
  Globe,
  Map,
  BarChart2,
} from 'lucide-react';
import { ChannelFilter } from "@/components/ChannelFilter";

export default function AnalyticsPage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <ChannelFilter />
          </div>
        </div>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
              <TabsTrigger value="overview" className="gap-2">
                <Activity className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="reach" className="gap-2">
                <Globe className="h-4 w-4" />
                <span>Reach</span>
              </TabsTrigger>
              <TabsTrigger value="engagement" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Engagement</span>
              </TabsTrigger>
              <TabsTrigger value="audience" className="gap-2">
                <Users className="h-4 w-4" />
                <span>Audience</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  {
                    title: "Views",
                    value: "2.4M",
                    change: 7.2,
                    icon: <Video className="h-5 w-5 text-blue-500" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Watch Time",
                    value: "126K hours",
                    change: 12.5,
                    icon: <Clock className="h-5 w-5 text-indigo-500" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Subscribers",
                    value: "+4,732",
                    change: -2.4,
                    icon: <Users className="h-5 w-5 text-green-600" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Engagement",
                    value: "18.7%",
                    change: 3.6,
                    icon: <ThumbsUp className="h-5 w-5 text-red-500" />,
                    description: "vs. previous 28 days"
                  }
                ].map((card, index) => (
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

              <AnalyticsCharts chartType="overview" />
            </TabsContent>

            <TabsContent value="reach" className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  {
                    title: "Impressions",
                    value: "14.2M",
                    change: 5.2,
                    icon: <BarChart4 className="h-5 w-5 text-purple-500" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "CTR",
                    value: "5.2%",
                    change: -0.8,
                    icon: <ArrowUpRight className="h-5 w-5 text-blue-500" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Unique Viewers",
                    value: "782K",
                    change: 11.3,
                    icon: <Users className="h-5 w-5 text-green-600" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Traffic Sources",
                    value: "5 sources",
                    change: 0,
                    icon: <Globe className="h-5 w-5 text-amber-500" />,
                    description: "Top: YouTube search"
                  }
                ].map((card, index) => (
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
                        ) : card.change < 0 ? (
                          <ChevronDown className="mr-1 h-4 w-4 text-red-500" />
                        ) : null}
                        {card.change !== 0 && (
                          <span className={card.change > 0 ? "text-green-500" : "text-red-500"}>
                            {Math.abs(card.change)}%
                          </span>
                        )}
                        <span className="ml-1">{card.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <AnalyticsCharts chartType="reach" />
            </TabsContent>

            <TabsContent value="engagement" className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  {
                    title: "Likes",
                    value: "327K",
                    change: 9.3,
                    icon: <ThumbsUp className="h-5 w-5 text-blue-500" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Comments",
                    value: "42.6K",
                    change: 18.2,
                    icon: <Activity className="h-5 w-5 text-indigo-500" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Shares",
                    value: "95.3K",
                    change: 7.4,
                    icon: <ArrowUpRight className="h-5 w-5 text-green-600" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Avg Watch Time",
                    value: "4:36",
                    change: -1.8,
                    icon: <Clock className="h-5 w-5 text-red-500" />,
                    description: "vs. previous 28 days"
                  }
                ].map((card, index) => (
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

              <AnalyticsCharts chartType="engagement" />
            </TabsContent>

            <TabsContent value="audience" className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  {
                    title: "Subscriber Change",
                    value: "+4,732",
                    change: 2.7,
                    icon: <Users className="h-5 w-5 text-blue-500" />,
                    description: "vs. previous 28 days"
                  },
                  {
                    title: "Age Group",
                    value: "18-24",
                    change: 0,
                    icon: <BarChart4 className="h-5 w-5 text-indigo-500" />,
                    description: "Most common age group"
                  },
                  {
                    title: "Top Geography",
                    value: "United States",
                    change: 0,
                    icon: <Map className="h-5 w-5 text-green-600" />,
                    description: "28% of viewers"
                  },
                  {
                    title: "Returning Viewers",
                    value: "43.2%",
                    change: 5.6,
                    icon: <Activity className="h-5 w-5 text-amber-500" />,
                    description: "vs. previous 28 days"
                  }
                ].map((card, index) => (
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
                        ) : card.change < 0 ? (
                          <ChevronDown className="mr-1 h-4 w-4 text-red-500" />
                        ) : null}
                        {card.change !== 0 && (
                          <span className={card.change > 0 ? "text-green-500" : "text-red-500"}>
                            {Math.abs(card.change)}%
                          </span>
                        )}
                        <span className="ml-1">{card.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <AnalyticsCharts chartType="audience" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}


import { PageLayout } from "@/components/PageLayout";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";

export default function SchedulePage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week");

  // Sample scheduled videos
  const scheduledVideos = [
    { 
      id: "1", 
      title: "Product Launch", 
      thumbnail: "", 
      scheduled: new Date(2025, 4, 20, 10, 0), 
      channel: "Tech Insights",
      status: "scheduled"
    },
    { 
      id: "2", 
      title: "Review Meeting", 
      thumbnail: "", 
      scheduled: new Date(2025, 4, 22, 14, 0), 
      channel: "Tech Insights",
      status: "scheduled"
    },
    { 
      id: "3", 
      title: "Gaming Stream", 
      thumbnail: "", 
      scheduled: new Date(2025, 4, 24, 18, 0), 
      channel: "Game Reviews",
      status: "processing"
    },
    { 
      id: "4", 
      title: "Market Analysis", 
      thumbnail: "", 
      scheduled: new Date(2025, 4, 26, 12, 0), 
      channel: "Financial Freedom",
      status: "scheduled"
    }
  ];

  // Calculate the start and end of the current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  
  // Generate array of days for the current week
  const days = eachDayOfInterval({
    start: weekStart,
    end: weekEnd
  });

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

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
          <div className="h-[500px] flex items-center justify-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-64 bg-muted rounded"></div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className="h-20 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <PageLayout title="Schedule">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <DateRangeFilter />
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10" onClick={handleToday}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Today
          </Button>
          <div className="flex">
            <Button variant="outline" size="icon" className="rounded-r-none h-10 w-10" onClick={handlePreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-l-none h-10 w-10" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[130px] h-10">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button className="ml-2 h-10">
            <Plus className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{format(weekStart, "MMMM yyyy")}</CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="tech">Tech Insights</SelectItem>
                <SelectItem value="game">Game Reviews</SelectItem>
                <SelectItem value="finance">Financial Freedom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {/* Day headers */}
            {days.map((day, index) => (
              <div key={`header-${index}`} className="text-center p-2">
                <div className="font-medium">{format(day, "EEE")}</div>
                <div className={`text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto mt-1 ${
                  isSameDay(day, new Date()) 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground"
                }`}>
                  {format(day, "d")}
                </div>
              </div>
            ))}

            {/* Calendar cells */}
            {days.map((day, dayIndex) => (
              <div 
                key={`cell-${dayIndex}`} 
                className="border rounded-md h-[200px] overflow-y-auto p-2 bg-muted/10"
              >
                {scheduledVideos
                  .filter(video => isSameDay(video.scheduled, day))
                  .map(video => (
                    <div 
                      key={video.id} 
                      className="mb-2 p-2 bg-card rounded-md border border-border cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <div className="text-sm font-medium truncate">{video.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-muted-foreground">{format(video.scheduled, "h:mm a")}</div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            video.status === "scheduled" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {video.status === "scheduled" ? "Scheduled" : "Processing"}
                        </Badge>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

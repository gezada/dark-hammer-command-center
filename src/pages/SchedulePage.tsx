import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChannelSelector } from "@/components/ChannelSelector";
import { format, addHours } from "date-fns";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type ScheduledVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishDate: Date;
  channel: string;
};

export default function SchedulePage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [scheduledVideos, setScheduledVideos] = useState<ScheduledVideo[]>([]);

  // Initialize sample scheduled videos
  useEffect(() => {
    const now = new Date();
    
    const sampleVideos: ScheduledVideo[] = [
      {
        id: "1",
        title: "React Performance Optimization Techniques",
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=100&fit=crop",
        publishDate: addHours(now, 2),
        channel: "Dev Channel"
      },
      {
        id: "2",
        title: "Building REST APIs with Node.js",
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=100&fit=crop",
        publishDate: addHours(now, 5),
        channel: "Code Masters"
      },
      {
        id: "3",
        title: "Python Data Structures Explained",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=100&fit=crop",
        publishDate: addHours(now, 24),
        channel: "Code Masters"
      },
      {
        id: "4",
        title: "TypeScript for Beginners - Full Course",
        thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=100&fit=crop",
        publishDate: addHours(now, 48),
        channel: "Dev Channel"
      },
      {
        id: "5",
        title: "MongoDB Schema Design Best Practices",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=100&fit=crop",
        publishDate: addHours(now, 72),
        channel: "Code Masters"
      }
    ];

    const timer = setTimeout(() => {
      setScheduledVideos(sampleVideos);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter videos by selected channel
  const filteredVideos = selectedChannel 
    ? scheduledVideos.filter(video => video.channel === selectedChannel) 
    : scheduledVideos;

  // Sort videos by publish date
  const sortedVideos = [...filteredVideos].sort((a, b) => 
    a.publishDate.getTime() - b.publishDate.getTime()
  );

  // Simulate optimizing publish time
  const handleOptimizeTime = (videoId: string) => {
    // Update the publish date to a "better" time
    setScheduledVideos(scheduledVideos.map(video => 
      video.id === videoId 
        ? {...video, publishDate: addHours(video.publishDate, 3)} 
        : video
    ));
    toast.success("Publish time optimized for better audience reach");
  };

  // Simulate drag and drop to reschedule
  const handleReschedule = (videoId: string, newDate: Date) => {
    setScheduledVideos(scheduledVideos.map(video => 
      video.id === videoId 
        ? {...video, publishDate: newDate} 
        : video
    ));
    toast.success("Video rescheduled successfully");
  };

  // Function to format dates
  const formatPublishDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${format(date, "h:mm a")}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${format(date, "h:mm a")}`;
    } else {
      return format(date, "MMM d, yyyy 'at' h:mm a");
    }
  };

  // Get dates that have scheduled videos for the calendar
  const scheduledDates = scheduledVideos.map(video => {
    const date = new Date(video.publishDate);
    return date.toISOString().split('T')[0];
  });

  // Instead of renderDay, use modifiers for highlighting dates with scheduled videos
  const isDayWithVideo = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return scheduledDates.includes(dateString);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[350px] w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array(4).fill(null).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-16 w-28 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-8 w-28" />
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

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <DateRangeFilter />
            <ChannelSelector 
              selectedChannelId={selectedChannel}
              onChannelChange={setSelectedChannel}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar View */}
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px]">
                <div className="px-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border pointer-events-auto"
                    modifiers={{ hasVideo: isDayWithVideo }}
                    modifiersClassNames={{
                      hasVideo: "font-bold relative before:absolute before:bottom-1 before:left-1/2 before:transform before:-translate-x-1/2 before:h-1 before:w-1 before:bg-primary before:rounded-full"
                    }}
                  />
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Drag and drop videos to reschedule publishing. Click on dates to view scheduled content.</p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Upcoming/Scheduled List */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Scheduled Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px]">
                <div className="space-y-4">
                  {sortedVideos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No videos scheduled {selectedChannel ? "for this channel" : ""}
                    </div>
                  ) : (
                    sortedVideos.map((video) => (
                      <div 
                        key={video.id} 
                        className="flex gap-3 p-3 border rounded-lg hover:bg-accent/10 transition-colors cursor-grab"
                        draggable={true}
                        onDragEnd={() => {
                          if (selectedDate) {
                            handleReschedule(video.id, selectedDate);
                          }
                        }}
                      >
                        <div className="h-16 w-28 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium line-clamp-2 text-sm">{video.title}</h4>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{formatPublishDate(video.publishDate)}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">{video.channel}</Badge>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs h-8"
                              onClick={() => handleOptimizeTime(video.id)}
                            >
                              Optimize Time
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

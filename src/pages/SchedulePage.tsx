
import { AppHeader } from "@/components/AppHeader";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComboboxDemo } from "@/components/ChannelSelector";

export default function SchedulePage() {
  const { sidebarCollapsed, channels = [] } = useStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [scheduledVideos, setScheduledVideos] = useState<any[]>([]);

  // Simulate scheduled videos
  useEffect(() => {
    // Make sure to handle the case where channels might be undefined
    const safeChannels = Array.isArray(channels) ? channels : [];
    
    // Only proceed if we have at least one channel
    if (safeChannels.length > 0) {
      const dummyScheduled = [
        {
          id: '1',
          title: 'The Ultimate Gaming Guide',
          date: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
          channelId: safeChannels[0]?.id || '',
          thumbnail: 'https://placehold.co/100x56?text=Video+1'
        },
        {
          id: '2',
          title: 'Top 10 Gaming Moments',
          date: new Date(Date.now() + 48 * 60 * 60 * 1000), // day after tomorrow
          channelId: safeChannels[0]?.id || '',
          thumbnail: 'https://placehold.co/100x56?text=Video+2'
        }
      ];
      
      // Only add the third video if we have at least 2 channels
      if (safeChannels.length > 1) {
        dummyScheduled.push({
          id: '3',
          title: 'How to Improve Your Gaming Skills',
          date: new Date(Date.now() + 72 * 60 * 60 * 1000), // 3 days from now
          channelId: safeChannels[1]?.id || '',
          thumbnail: 'https://placehold.co/100x56?text=Video+3'
        });
      }
      
      setScheduledVideos(dummyScheduled);
    } else {
      // If no channels are available, set empty scheduled videos
      setScheduledVideos([]);
    }
  }, [channels]);

  // Get scheduled videos for the selected date
  const getVideosForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    return scheduledVideos.filter(video => {
      const videoDate = new Date(video.date);
      return videoDate.toDateString() === selectedDate.toDateString();
    });
  };

  const selectedDateVideos = getVideosForDate(date);

  // Get the corresponding channel for a video
  const getChannelForVideo = (channelId: string) => {
    const safeChannels = Array.isArray(channels) ? channels : [];
    return safeChannels.find(channel => channel && channel.id === channelId) || null;
  };

  // Function to format date and time
  const formatDateTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader showFilters={false} />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header and filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">Schedule</h1>
              <p className="text-muted-foreground">
                Manage your scheduled video uploads
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <ComboboxDemo />
            </div>
          </div>
          
          {/* Calendar and scheduled videos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view scheduled videos</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            {/* Scheduled videos for selected date */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Scheduled Videos</CardTitle>
                <CardDescription>
                  {date ? `Videos scheduled for ${date.toLocaleDateString()}` : 'Select a date to see scheduled videos'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateVideos.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateVideos.map((video) => {
                      const channel = getChannelForVideo(video.channelId);
                      
                      return (
                        <div key={video.id} className="flex items-center p-3 border rounded-md hover:bg-accent cursor-pointer transition-colors">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-[100px] h-[56px] rounded object-cover mr-4"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{video.title}</h4>
                            <div className="flex items-center mt-1">
                              {channel && (
                                <div className="flex items-center text-xs text-muted-foreground mr-3">
                                  <Avatar className="h-4 w-4 mr-1">
                                    <AvatarImage src={channel.thumbnail} alt={channel.title} />
                                    <AvatarFallback>{channel.title[0]}</AvatarFallback>
                                  </Avatar>
                                  <span>{channel.title}</span>
                                </div>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {formatDateTime(new Date(video.date))}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No videos scheduled for this date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

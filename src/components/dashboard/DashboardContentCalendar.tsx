
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CalendarEvent = {
  id: number;
  title: string;
  date: Date;
  channel: string;
};

export function DashboardContentCalendar() {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  // Sample calendar events
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Node.js Backend Tutorial",
      date: new Date(2024, 3, 15, 14, 30),
      channel: "Dev Channel"
    },
    {
      id: 2,
      title: "React Component Patterns",
      date: new Date(2024, 3, 18, 10, 0),
      channel: "Code Masters"
    },
    {
      id: 3,
      title: "TypeScript Best Practices",
      date: new Date(2024, 3, 22, 16, 0),
      channel: "Dev Channel"
    }
  ];

  // Get dates that have events
  const eventDates = events.map(event => {
    const date = new Date(event.date);
    return date.toISOString().split('T')[0];
  });

  // Custom day renderer for the calendar
  const renderDay = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    const hasEvent = eventDates.includes(dateString);
    
    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {hasEvent && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="h-1 w-1 bg-primary rounded-full"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar" onValueChange={(value) => setView(value as "calendar" | "list")}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="calendar" className="p-0">
          <Card className="border-none shadow-none">
            <CardContent className="p-0 pt-4">
              <Calendar 
                mode="single"
                className="rounded-md border"
                renderDay={renderDay}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="p-0">
          <Card className="border-none shadow-none">
            <CardContent className="p-0 pt-4 space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString()} · {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                      <Badge variant="outline" className="text-xs">{event.channel}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

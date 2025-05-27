
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
  status: "Published" | "Scheduled" | "Processing";
};

export function DashboardContentCalendar() {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  // Sample calendar events
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Node.js Backend Tutorial",
      date: new Date(2024, 3, 15, 14, 30),
      channel: "Dev Channel",
      status: "Scheduled"
    },
    {
      id: 2,
      title: "React Component Patterns",
      date: new Date(2024, 3, 18, 10, 0),
      channel: "Code Masters",
      status: "Scheduled"
    },
    {
      id: 3,
      title: "TypeScript Best Practices",
      date: new Date(2024, 3, 22, 16, 0),
      channel: "Dev Channel",
      status: "Processing"
    }
  ];

  // Get dates that have events
  const eventDates = events.map(event => {
    const date = new Date(event.date);
    return date.toISOString().split('T')[0];
  });

  const isDayWithEvent = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return eventDates.includes(dateString);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-red-600 text-white";
      case "Scheduled": return "bg-yellow-600 text-white";
      case "Processing": return "bg-gray-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar" onValueChange={(value) => setView(value as "calendar" | "list")}>
        <div className="flex justify-between items-center">
          <TabsList className="bg-[#2A2A2A] border-[#2A2A2A]">
            <TabsTrigger value="calendar" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300">
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300">
              List View
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="calendar" className="p-0">
          <Card className="border-[#2A2A2A] bg-[#2A2A2A]/20">
            <CardContent className="p-4">
              <Calendar 
                mode="single"
                className="rounded-md border-[#2A2A2A] text-white [&_.rdp-day]:text-white [&_.rdp-head_cell]:text-gray-400"
                modifiers={{ hasEvent: isDayWithEvent }}
                modifiersClassNames={{
                  hasEvent: "relative before:absolute before:bottom-1 before:left-1/2 before:transform before:-translate-x-1/2 before:h-1 before:w-1 before:bg-red-500 before:rounded-full"
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="p-0">
          <Card className="border-[#2A2A2A] bg-[#2A2A2A]/20">
            <CardContent className="p-4 space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-[#2A2A2A] rounded-md hover:bg-[#2A2A2A]/50 cursor-pointer transition-colors group">
                  <div className="space-y-1 flex-1">
                    <h4 className="font-medium text-sm text-white group-hover:text-red-400 transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-400">
                        {event.date.toLocaleDateString()} · {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                      <Badge variant="outline" className="text-xs border-[#2A2A2A] text-gray-300">
                        {event.channel}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
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


import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="calendar" onValueChange={(value) => setView(value as "calendar" | "list")}>
          <TabsList className="glass-card">
            <TabsTrigger 
              value="calendar" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground transition-all duration-200 ease-out"
            >
              Calendar View
            </TabsTrigger>
            <TabsTrigger 
              value="list" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground transition-all duration-200 ease-out"
            >
              List View
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 ease-out rounded-2xl"
                disabled
              >
                Optimize Time
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">AI optimization coming in v2</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Tabs defaultValue="calendar" value={view}>
        <TabsContent value="calendar" className="p-0">
          <Card className="glass-card">
            <CardContent className="p-4">
              <Calendar 
                mode="single"
                className="rounded-2xl [&_.rdp-day]:text-foreground [&_.rdp-head_cell]:text-muted-foreground [&_.rdp-day_selected]:bg-primary [&_.rdp-day_selected]:text-primary-foreground [&_.rdp-day_selected]:rounded-md"
                modifiers={{ hasEvent: isDayWithEvent }}
                modifiersClassNames={{
                  hasEvent: "relative before:absolute before:bottom-1 before:left-1/2 before:transform before:-translate-x-1/2 before:h-1 before:w-1 before:bg-primary before:rounded-full"
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="p-0">
          <Card className="glass-card">
            <CardContent className="p-4 space-y-3">
              {events.map((event) => {
                const statusColors = getStatusColor(event.status);
                return (
                  <div 
                    key={event.id} 
                    className="flex items-center justify-between p-3 glass-card hover:bg-accent/50 cursor-pointer transition-all duration-200 ease-out group rounded-2xl"
                  >
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                        {event.title}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString()} · {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ backgroundColor: "#1c1d24", color: "#d1d5db", border: "1px solid #262732" }}
                        >
                          {event.channel}
                        </Badge>
                        <Badge 
                          className="text-xs transition-all duration-200 ease-out"
                          style={{ backgroundColor: statusColors.bg, color: statusColors.text, border: "none" }}
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

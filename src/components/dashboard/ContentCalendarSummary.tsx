
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Play } from "lucide-react";

export function ContentCalendarSummary() {
  const scheduledContent = [
    {
      id: 1,
      title: "React Hooks - useEffect Explained",
      channel: "Dev Channel",
      status: "scheduled",
      date: "Amanhã 14:00",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=68&fit=crop"
    },
    {
      id: 2,
      title: "10 JavaScript Tips for Beginners",
      channel: "Code Masters",
      status: "published",
      date: "Hoje 09:00",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&h=68&fit=crop"
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      channel: "AI Insights",
      status: "draft",
      date: "23 Jan 16:30",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=68&fit=crop"
    },
    {
      id: 4,
      title: "Docker Complete Guide",
      channel: "Tech Tutorials",
      status: "scheduled",
      date: "25 Jan 11:00",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=120&h=68&fit=crop"
    },
    {
      id: 5,
      title: "Advanced TypeScript Patterns",
      channel: "Dev Channel",
      status: "draft",
      date: "27 Jan 15:00",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=68&fit=crop"
    },
    {
      id: 6,
      title: "CSS Grid vs Flexbox",
      channel: "Code Masters",
      status: "scheduled",
      date: "30 Jan 10:00",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=68&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "scheduled":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "draft":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Publicado";
      case "scheduled":
        return "Agendado";
      case "draft":
        return "Rascunho";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <Play className="h-3 w-3" />;
      case "scheduled":
        return <Clock className="h-3 w-3" />;
      case "draft":
        return <Calendar className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Calendário de Conteúdo</CardTitle>
          <Button variant="outline" size="sm" className="bg-card/50 backdrop-blur-sm border-border/50">
            Ver Calendário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduledContent.map((content) => (
            <div 
              key={content.id} 
              className="group p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-card/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative mb-3">
                <img 
                  src={content.thumbnail} 
                  alt={content.title} 
                  className="w-full h-20 object-cover rounded-md"
                />
                <Badge 
                  variant="outline" 
                  className={`absolute top-2 right-2 text-xs backdrop-blur-sm ${getStatusColor(content.status)}`}
                >
                  {getStatusIcon(content.status)}
                  <span className="ml-1">{getStatusLabel(content.status)}</span>
                </Badge>
              </div>
              
              <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                {content.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{content.channel}</span>
                <span>{content.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

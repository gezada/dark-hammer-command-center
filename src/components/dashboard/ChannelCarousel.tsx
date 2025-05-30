
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus, RefreshCw, Flame, MessageSquare, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ChannelCarousel() {
  const channels = [
    {
      id: 1,
      name: "Dev Channel",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=60&h=60&fit=crop&crop=center",
      subscribers: "15.2K",
      videos: 42,
      status: "growing",
      growth: "+5.2%",
      lastSync: "3h",
      intelligentBadge: {
        type: "viral",
        label: "Viral Spike",
        description: "'React Hooks Tutorial' alcançou 4x mais visualizações",
        icon: Flame,
        color: "bg-orange-500/10 text-orange-400 border-orange-500/20"
      },
      data: [
        { value: 14000 },
        { value: 14200 },
        { value: 14500 },
        { value: 14800 },
        { value: 15000 },
        { value: 15200 }
      ]
    },
    {
      id: 2,
      name: "Code Masters",
      avatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=60&h=60&fit=crop&crop=center",
      subscribers: "8.7K",
      videos: 28,
      status: "stable",
      growth: "+0.1%",
      lastSync: "5h",
      intelligentBadge: {
        type: "engagement",
        label: "Engagement ↑",
        description: "Comentários aumentaram 25% esta semana",
        icon: MessageSquare,
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
      },
      data: [
        { value: 8600 },
        { value: 8650 },
        { value: 8620 },
        { value: 8680 },
        { value: 8690 },
        { value: 8700 }
      ]
    },
    {
      id: 3,
      name: "Tech Tutorials",
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=60&h=60&fit=crop&crop=center",
      subscribers: "23.1K",
      videos: 67,
      status: "growing",
      growth: "+8.3%",
      lastSync: "2h",
      intelligentBadge: {
        type: "stable",
        label: "Estável",
        description: "Performance consistente nos últimos 30 dias",
        icon: TrendingUp,
        color: "bg-green-500/10 text-green-400 border-green-500/20"
      },
      data: [
        { value: 21000 },
        { value: 21500 },
        { value: 22000 },
        { value: 22500 },
        { value: 22800 },
        { value: 23100 }
      ]
    },
    {
      id: 4,
      name: "AI Insights",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=60&h=60&fit=crop&crop=center",
      subscribers: "5.4K",
      videos: 19,
      status: "declining",
      growth: "-2.1%",
      lastSync: "8h",
      intelligentBadge: {
        type: "warning",
        label: "Atenção",
        description: "Tempo de visualização caiu 12% no último mês",
        icon: AlertTriangle,
        color: "bg-red-500/10 text-red-400 border-red-500/20"
      },
      data: [
        { value: 5800 },
        { value: 5700 },
        { value: 5600 },
        { value: 5500 },
        { value: 5450 },
        { value: 5400 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "growing":
        return <TrendingUp className="h-3 w-3" />;
      case "declining":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "growing":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "declining":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  const getButtonStyle = (status: string) => {
    switch (status) {
      case "growing":
        return "bg-green-700 hover:bg-green-800 text-white border-0";
      case "declining":
        return "bg-red-700 hover:bg-red-800 text-white border-0";
      default:
        return "bg-yellow-700 hover:bg-yellow-800 text-white border-0";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "growing":
        return "Crescendo";
      case "declining":
        return "Diminuindo";
      default:
        return "Estável";
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Visão Geral dos Canais</h2>
        <Button variant="outline" size="sm" className="bg-card/50 backdrop-blur-sm border-border/50">
          Ver Todos
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {channels.map((channel) => (
          <Card 
            key={channel.id} 
            className="group relative bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-6">
              {/* Intelligent Badge */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className={`absolute top-4 right-4 text-xs ${channel.intelligentBadge.color} hover:scale-105 transition-transform cursor-help`}
                  >
                    <channel.intelligentBadge.icon className="h-3 w-3 mr-1" />
                    {channel.intelligentBadge.label}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{channel.intelligentBadge.description}</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={channel.avatar} alt={channel.name} />
                    <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{channel.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{channel.videos} vídeos</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" />
                        <span>{channel.lastSync} atrás</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={`text-xs ${getStatusColor(channel.status)}`}>
                  {getStatusIcon(channel.status)}
                  <span className="ml-1">{getStatusText(channel.status)}</span>
                </Badge>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold">{channel.subscribers}</p>
                  <p className="text-xs text-muted-foreground">inscritos</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    channel.growth.startsWith('+') ? 'text-green-400' : 
                    channel.growth.startsWith('-') ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {channel.growth}
                  </p>
                  <p className="text-xs text-muted-foreground">este mês</p>
                </div>
              </div>

              {/* Mini Sparkline */}
              <div className="h-12 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={channel.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`gradient-${channel.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6b7280" 
                      strokeWidth={1.5}
                      fill={`url(#gradient-${channel.id})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <Button variant="outline" className={`w-full ${getButtonStyle(channel.status)}`}>
                Abrir Canal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

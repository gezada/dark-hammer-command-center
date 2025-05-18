import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "@/lib/api";
import { useStore } from "@/lib/store";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUp, ArrowDown, Upload as UploadIcon, Calendar, ExternalLink, InfoIcon, BadgePlus } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { selectedChannelId, dateRange, customDateRange } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch analytics data
  const { data: analytics } = useQuery({
    queryKey: ['analytics', selectedChannelId, dateRange, customDateRange],
    queryFn: () => fetchAnalytics(selectedChannelId, dateRange),
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });

  // Simulate loading state
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
        <main className="flex-1 p-6 overflow-auto">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 overflow-auto ml-[60px] md:ml-[240px] transition-all duration-300">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral dos seus canais e vídeos.</p>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/upload">
                <UploadIcon className="mr-2 h-4 w-4" />
                Fazer Upload
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/channels">
                <BadgePlus className="mr-2 h-4 w-4" />
                Adicionar Canal
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/upload?calendar=true">
                <Calendar className="mr-2 h-4 w-4" />
                Ver Agenda
              </Link>
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            <TooltipProvider>
              {/* Views Today */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      VISUALIZAÇÕES HOJE
                    </CardTitle>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total de visualizações nas últimas 24 horas</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.viewsToday.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    +2.5% em relação a ontem
                  </p>
                </CardContent>
              </Card>

              {/* Subscribers */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      INSCRITOS
                    </CardTitle>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total de inscritos em todos os canais selecionados</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {getSubscriberData(analytics)?.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    +152 esta semana
                  </p>
                </CardContent>
              </Card>

              {/* Watch Time */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      TEMPO DE VISUALIZAÇÃO (H)
                    </CardTitle>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total de horas assistidas no período selecionado</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.watchTimeHours.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    +4.2% em relação ao período anterior
                  </p>
                </CardContent>
              </Card>

              {/* Revenue Estimate */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      RECEITA ESTIMADA
                    </CardTitle>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Receita estimada com base nas visualizações e CPM</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${analytics?.revenueEstimate.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    +$123.45 em relação ao período anterior
                  </p>
                </CardContent>
              </Card>

              {/* Avg. CTR */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">
                      TAXA DE CLIQUES
                    </CardTitle>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Taxa média de cliques nas impressões</p>
                      </TooltipContent>
                    </UITooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.avgCTR}%
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    +0.2% em relação ao período anterior
                  </p>
                </CardContent>
              </Card>
            </TooltipProvider>
          </div>

          {/* Next Scheduled Videos */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Próximos Vídeos Agendados</CardTitle>
                  <CardDescription>Vídeos que serão publicados em breve</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/upload?calendar=true">
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver Todos
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Scheduled Video 1 */}
                <div className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-48 aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?q=80&w=320&auto=format"
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <Badge variant="default">AGENDADO</Badge>
                          <h4 className="font-semibold text-lg mt-2">10 Recursos Ocultos no VS Code que Você Precisa Conhecer</h4>
                          <p className="text-muted-foreground text-sm">Agendado para 12 de junho de 2025 às 9:00</p>
                        </div>
                        <div className="flex gap-2 sm:flex-col items-start">
                          <Button variant="outline" size="sm" className="h-8">
                            <Calendar className="h-4 w-4 mr-2" />
                            Reagendar
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span>Canal de Tecnologia</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scheduled Video 2 */}
                <div className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-48 aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=320&auto=format"
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <Badge variant="secondary">UPLOAD EM PROGRESSO</Badge>
                          <h4 className="font-semibold text-lg mt-2">Construindo um Aplicativo Full-Stack com React e Node.js</h4>
                          <div className="mt-2">
                            <Progress value={68} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">68% - 2 minutos restantes</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span>Canal de Programação</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/upload">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Fazer Upload de Um Novo Vídeo
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {/* Views Chart */}
            <Card className="col-span-1 lg:col-span-2 xl:col-span-3">
              <CardHeader>
                <CardTitle>Visualizações</CardTitle>
                <CardDescription>
                  Contagem diária de visualizações para o período selecionado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={analytics?.charts.views}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#c51e1e" fill="#c51e1e80" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Watch Time Chart */}
            <Card className="col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Tempo de Visualização</CardTitle>
                <CardDescription>
                  Horas assistidas por dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics?.charts.watchTime}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#c51e1e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CTR Chart */}
            <Card className="col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Taxa de Cliques</CardTitle>
                <CardDescription>
                  Taxa média diária de cliques (%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <CustomLineChart 
                    data={analytics?.charts.ctr}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 0,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Subscribers Chart */}
            <Card className="col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Inscritos</CardTitle>
                <CardDescription>
                  Novos inscritos por dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={getSubscriberData(analytics) || []}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#c51e1e" fill="#c51e1e80" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

interface LineChartProps {
  data: any[];
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const CustomLineChart = ({ data, margin }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#c51e1e" fill="#c51e1e20" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const getSubscriberData = (data: any) => {
  // If subscribers exists, use it, otherwise return an empty array
  return data && data.subscribers ? data.subscribers : [];
}

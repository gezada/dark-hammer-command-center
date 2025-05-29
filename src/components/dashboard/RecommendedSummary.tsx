
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Lightbulb, Calendar, Award, ChevronLeft, ChevronRight, Brain, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function RecommendedSummary() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll every 5 seconds on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % recommendations.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const recommendations = [
    {
      id: 1,
      title: "Canal Mais Visualizado",
      subtitle: "Dev Channel",
      value: "23.4K visualizações",
      change: "+12%",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=80&h=80&fit=crop&crop=center",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      id: 2,
      title: "Última Otimização",
      subtitle: "IA de Thumbnails",
      value: "3.2h economizadas",
      change: "Hoje",
      icon: Lightbulb,
      image: null,
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      id: 3,
      title: "Sugestão Inteligente",
      subtitle: "Melhor horário para postar",
      value: "18:30 - 19:00",
      change: "Hoje",
      icon: Award,
      image: null,
      gradient: "from-yellow-500/20 to-yellow-600/20"
    },
    {
      id: 4,
      title: "Próximo Upload",
      subtitle: "JavaScript Tips",
      value: "Amanhã 14:00",
      change: "Agendado",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=80&h=80&fit=crop&crop=center",
      gradient: "from-red-500/20 to-red-600/20"
    },
    {
      id: 5,
      title: "Trending Topic",
      subtitle: "IA e YouTube",
      value: "+34% crescimento",
      change: "Esta semana",
      icon: Brain,
      image: null,
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      id: 6,
      title: "Melhor Horário",
      subtitle: "Tech Tutorials",
      value: "20h - 21h",
      change: "Pico de audiência",
      icon: Clock,
      image: null,
      gradient: "from-orange-500/20 to-orange-600/20"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold">Resumo Recomendado</h2>
        <Badge variant="outline" className="bg-red-600/10 text-red-400 border-red-600/20">
          Atualizado agora
        </Badge>
      </div>
      
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {recommendations.map((item) => (
          <Card 
            key={item.id} 
            className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/10"
          >
            <CardContent className="p-4">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  {item.image ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.subtitle} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs bg-black/20 backdrop-blur-sm border-white/20 text-white">
                    {item.change}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{item.title}</p>
                  <h3 className="font-semibold mb-1 text-sm">{item.subtitle}</h3>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile: Carousel layout */}
      <div className="md:hidden relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {recommendations.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 px-2">
                <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        {item.image ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.subtitle} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs bg-black/20 backdrop-blur-sm border-white/20 text-white">
                          {item.change}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground font-medium mb-1">{item.title}</p>
                        <h3 className="font-semibold mb-1 text-sm">{item.subtitle}</h3>
                        <p className="text-lg font-bold">{item.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/20 backdrop-blur-sm border-white/20 hover:bg-black/40"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/20 backdrop-blur-sm border-white/20 hover:bg-black/40"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {recommendations.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-red-500' : 'bg-white/30'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

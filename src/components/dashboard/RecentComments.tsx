
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, MessageSquare, Eye, Flag } from "lucide-react";

export function RecentComments() {
  const comments = [
    {
      id: 1,
      channel: "Dev Channel",
      commenter: "João Silva",
      commenterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=center",
      time: "há 2h",
      text: "Excelente tutorial! Consegui implementar tudo perfeitamente. Muito obrigado pelo conteúdo de qualidade!",
      status: "pending"
    },
    {
      id: 2,
      channel: "Code Masters",
      commenter: "Ana Santos",
      commenterAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b134?w=40&h=40&fit=crop&crop=center",
      time: "há 4h",
      text: "Poderia fazer um vídeo sobre TypeScript? Estou com algumas dúvidas sobre interfaces.",
      status: "responded"
    },
    {
      id: 3,
      channel: "Tech Tutorials",
      commenter: "Carlos Lima",
      commenterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=center",
      time: "há 6h",
      text: "Não funciona! Seguindo exatamente os passos do vídeo mas dá erro. Que decepção...",
      status: "pending"
    },
    {
      id: 4,
      channel: "AI Insights",
      commenter: "Maria Costa",
      commenterAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=center",
      time: "há 8h",
      text: "Fantástico! Finalmente entendi como funciona machine learning. Obrigada!",
      status: "responded"
    },
    {
      id: 5,
      channel: "Dev Channel",
      commenter: "Pedro Oliveira",
      commenterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=center",
      time: "há 12h",
      text: "Primeira vez aqui no canal, já me inscrevi! Conteúdo incrível.",
      status: "pending"
    }
  ];

  const getFilteredComments = (filter: string) => {
    switch (filter) {
      case "pending":
        return comments.filter(c => c.status === "pending");
      case "responded":
        return comments.filter(c => c.status === "responded");
      default:
        return comments;
    }
  };

  const CommentsList = ({ filter }: { filter: string }) => {
    const filteredComments = getFilteredComments(filter);
    
    return (
      <div className="space-y-4">
        {filteredComments.slice(0, 5).map((comment) => (
          <div 
            key={comment.id} 
            className="p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-card/50 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.commenterAvatar} alt={comment.commenter} />
                <AvatarFallback>{comment.commenter.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.commenter}</span>
                  <Badge variant="outline" className="text-xs bg-red-600/10 text-red-400 border-red-600/20">
                    {comment.channel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                </div>
                
                <p className="text-sm text-foreground/90 mb-3 line-clamp-2">
                  {comment.text}
                </p>
                
                {/* Action buttons - always visible */}
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 text-green-400 hover:bg-green-400/10 hover:text-green-300"
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Curtir
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Responder
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 text-gray-400 hover:bg-gray-400/10 hover:text-gray-300"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Ocultar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 text-red-400 hover:bg-red-400/10 hover:text-red-300"
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    Denunciar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Comentários Recentes</CardTitle>
          <Button variant="outline" size="sm" className="bg-card/50 backdrop-blur-sm border-border/50">
            Ver Todos
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="all" className="text-xs">
              Todos ({comments.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">
              Pendentes ({comments.filter(c => c.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="responded" className="text-xs">
              Respondidos ({comments.filter(c => c.status === "responded").length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <CommentsList filter="all" />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            <CommentsList filter="pending" />
          </TabsContent>
          
          <TabsContent value="responded" className="mt-4">
            <CommentsList filter="responded" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

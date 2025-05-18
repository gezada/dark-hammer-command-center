
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadSkeleton } from "@/components/skeleton/UploadSkeleton";
import { UploadCloud, Calendar, Clock, Tag, Image as ImageIcon, Tag as TagIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "react-router-dom";

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [searchParams] = useSearchParams();
  const showCalendar = searchParams.get('calendar') === 'true';
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
    simulateUpload();
    // Prevent default behavior (Prevent file from being opened)
    e.stopPropagation();
  };
  
  const handleFileSelect = () => {
    simulateUpload();
  };
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6 overflow-auto">
          <UploadSkeleton />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 overflow-auto ml-[60px] md:ml-[240px] transition-all duration-300">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Upload & Agendamento</h1>
              <p className="text-muted-foreground">Faça upload de vídeos e agende-os para publicação.</p>
            </div>
            <div>
              <Button
                variant={showCalendar ? "default" : "outline"}
                className="w-full sm:w-auto"
                onClick={() => {}}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Visualizar Calendário
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue={showCalendar ? "calendar" : "upload"}>
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload de Vídeo</TabsTrigger>
              <TabsTrigger value="calendar">Calendário de Publicação</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              {/* Upload Area */}
              {!isUploading && (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center ${
                    isDragging ? "border-primary bg-primary/10" : "border-border"
                  } transition-all duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <UploadCloud className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Arraste e Solte Arquivos de Vídeo</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Faça upload de arquivos MP4, MOV ou AVI de até 12GB. Seus vídeos serão armazenados com segurança
                      e prontos para publicação.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button onClick={handleFileSelect}>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Selecionar Arquivos
                      </Button>
                      <Button variant="outline">
                        Importar do Google Drive
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Upload Progress */}
              {isUploading && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upload em Progresso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mr-4">
                        <UploadCloud className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-medium">meu-video.mp4</p>
                          <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {uploadProgress < 100 ? "Carregando..." : "Processando vídeo..."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Video Details Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes do Vídeo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                    {/* Left Column - Video Details */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          placeholder="Digite um título atraente para o seu vídeo"
                          defaultValue="Construindo um Aplicativo Full-Stack com React e Node.js"
                        />
                        <p className="text-xs text-muted-foreground">0/100 caracteres</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          placeholder="Digite uma descrição detalhada do seu vídeo"
                          rows={5}
                          defaultValue="Neste tutorial abrangente, vamos construir um aplicativo full-stack completo usando React para o frontend e Node.js para o backend. Abordaremos autenticação, integração com banco de dados e implementação."
                        />
                        <p className="text-xs text-muted-foreground">0/5000 caracteres</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Miniatura</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="border-2 border-dashed border-primary rounded-md p-4 aspect-video flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                            <ImageIcon className="h-8 w-8 mb-2 text-primary" />
                            <p>Clique para fazer upload</p>
                          </div>
                          <div className="border-2 border-dashed rounded-md p-4 aspect-video flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                            <ImageIcon className="h-8 w-8 mb-2" />
                            <p>Miniatura 2</p>
                          </div>
                          <div className="border-2 border-dashed rounded-md p-4 aspect-video flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                            <ImageIcon className="h-8 w-8 mb-2" />
                            <p>Miniatura 3</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Faça upload de até 3 miniaturas diferentes para teste A/B. O YouTube otimizará automaticamente a melhor miniatura.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                        <div className="flex">
                          <Input
                            id="tags"
                            placeholder="programação, webdev, coding"
                            defaultValue="programação, webdev, coding"
                          />
                          <Button variant="outline" type="button" className="ml-2">
                            <TagIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column - Publishing Settings */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="channel">Canal</Label>
                        <Select defaultValue="channel1">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o canal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="channel1">Canal de Tecnologia</SelectItem>
                            <SelectItem value="channel2">Canal Secundário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select defaultValue="tech">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Ciência e Tecnologia</SelectItem>
                            <SelectItem value="education">Educação</SelectItem>
                            <SelectItem value="entertainment">Entretenimento</SelectItem>
                            <SelectItem value="gaming">Jogos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Privacidade</h3>
                        <RadioGroup defaultValue="unlisted">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" />
                            <Label htmlFor="public" className="cursor-pointer">Público</Label>
                            <span className="text-xs text-muted-foreground ml-auto">Todos podem assistir</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="unlisted" id="unlisted" />
                            <Label htmlFor="unlisted" className="cursor-pointer">Não listado</Label>
                            <span className="text-xs text-muted-foreground ml-auto">Apenas quem tiver o link</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="private" />
                            <Label htmlFor="private" className="cursor-pointer">Privado</Label>
                            <span className="text-xs text-muted-foreground ml-auto">Apenas você</span>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Agendamento</h3>
                          <Switch defaultChecked id="schedule" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="publish-date">Data de publicação</Label>
                          <Input type="date" id="publish-date" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="publish-time">Horário de publicação</Label>
                          <Input type="time" id="publish-time" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Fuso horário</Label>
                          <Select defaultValue="gmt">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o fuso horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gmt">GMT (Horário de Greenwich)</SelectItem>
                              <SelectItem value="brt">BRT (Horário de Brasília)</SelectItem>
                              <SelectItem value="est">EST (Horário Padrão do Leste)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Opções avançadas</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="comments" className="cursor-pointer">Permitir comentários</Label>
                          <Switch defaultChecked id="comments" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="likes" className="cursor-pointer">Mostrar curtidas e visualizações</Label>
                          <Switch defaultChecked id="likes" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="recommendations" className="cursor-pointer">Mostrar nas recomendações</Label>
                          <Switch defaultChecked id="recommendations" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Salvar como Rascunho</Button>
                    <Button>
                      {uploadProgress === 100 ? "Agendar Publicação" : "Fazer Upload"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendário de Publicações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Calendar would go here */}
                    <div className="h-[500px] border rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Visualização de calendário será implementada aqui</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Vídeos Agendados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Scheduled Video List */}
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="default">12 JUN 2025 - 09:00</Badge>
                            <Badge variant="outline">Canal de Tecnologia</Badge>
                          </div>
                          <h4 className="font-semibold text-lg mt-2">10 Recursos Ocultos no VS Code que Você Precisa Conhecer</h4>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Reagendar
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="default">15 JUN 2025 - 14:30</Badge>
                            <Badge variant="outline">Canal Secundário</Badge>
                          </div>
                          <h4 className="font-semibold text-lg mt-2">Como Criar um Site Responsivo com Tailwind CSS</h4>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Reagendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

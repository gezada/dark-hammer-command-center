import { AppHeader } from "@/components/AppHeader";
import { useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Globe, 
  Lock, 
  EyeOff,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function UploadPage() {
  const { 
    sidebarCollapsed, 
    channels = [], 
    uploadTemplates,
    addTemplate, 
    updateTemplate,
    removeTemplate,
  } = useStore();
  
  // Template form
  const [templateName, setTemplateName] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Upload form
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const [uploadVisibility, setUploadVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [uploadScheduledDate, setUploadScheduledDate] = useState<Date | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  // Safe access to channels
  const safeChannels = Array.isArray(channels) ? channels : [];
  const connectedChannels = safeChannels.filter(c => c && c.isConnected);
  
  const handleSaveTemplate = () => {
    const template = {
      id: uuidv4(),
      channelId: selectedChannelId,
      name: templateName,
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      visibility,
      scheduledDate,
    };
    
    addTemplate(template);
    toast.success("Template salvo com sucesso!");
    setIsDialogOpen(false);
    resetTemplateForm();
  };
  
  const resetTemplateForm = () => {
    setTemplateName("");
    setSelectedChannelId(null);
    setTitle("");
    setDescription("");
    setTags("");
    setVisibility("public");
    setScheduledDate(null);
  };
  
  const handleApplyTemplate = (templateId: string) => {
    const template = uploadTemplates.find(t => t.id === templateId);
    if (template) {
      setUploadTitle(template.title);
      setUploadDescription(template.description);
      setUploadTags(template.tags.join(', '));
      setUploadVisibility(template.visibility);
      setUploadScheduledDate(template.scheduledDate);
      toast.success("Template aplicado com sucesso!");
    }
  };
  
  const handleDeleteTemplate = (templateId: string) => {
    removeTemplate(templateId);
    toast.success("Template removido com sucesso!");
  };
  
  const handleUpload = () => {
    // This would connect to YouTube API in the real implementation
    toast.success("Vídeo enviado com sucesso!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-6">Upload & Schedule</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Upload form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload de Vídeo</CardTitle>
                  <CardDescription>Envie seu vídeo para o YouTube</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="video-file">Arquivo do Vídeo</Label>
                    <div className="mt-2 flex items-center justify-center w-full">
                      <label 
                        htmlFor="video-file" 
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 text-gray-500 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Clique para carregar</span> ou arraste e solte
                          </p>
                          <p className="text-xs text-gray-500">MP4, MOV ou WEBM (MAX. 10GB)</p>
                        </div>
                        <input 
                          id="video-file" 
                          type="file" 
                          className="hidden" 
                          accept="video/mp4,video/webm,video/mov"
                          onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                        />
                      </label>
                    </div>
                    {uploadFile && (
                      <p className="mt-2 text-sm text-gray-500">{uploadFile.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input 
                      id="title" 
                      placeholder="Digite o título do vídeo" 
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Digite a descrição do vídeo" 
                      rows={5}
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <Input 
                      id="tags" 
                      placeholder="game, tutorial, gameplay" 
                      value={uploadTags}
                      onChange={(e) => setUploadTags(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Visibilidade</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button 
                        type="button" 
                        variant={uploadVisibility === "public" ? "default" : "outline"}
                        onClick={() => setUploadVisibility("public")}
                        className="flex items-center"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Público
                      </Button>
                      <Button 
                        type="button" 
                        variant={uploadVisibility === "unlisted" ? "default" : "outline"}
                        onClick={() => setUploadVisibility("unlisted")}
                        className="flex items-center"
                      >
                        <EyeOff className="h-4 w-4 mr-2" />
                        Não listado
                      </Button>
                      <Button 
                        type="button" 
                        variant={uploadVisibility === "private" ? "default" : "outline"}
                        onClick={() => setUploadVisibility("private")}
                        className="flex items-center"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Privado
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Programação</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={uploadScheduledDate ? "default" : "outline"}
                            className="flex items-center justify-start"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            {uploadScheduledDate 
                              ? format(uploadScheduledDate, "dd/MM/yyyy HH:mm")
                              : "Selecionar data e hora"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={uploadScheduledDate || undefined}
                            onSelect={setUploadScheduledDate}
                            initialFocus
                          />
                          <div className="p-3 border-t">
                            <Label htmlFor="time">Hora</Label>
                            <Input 
                              id="time" 
                              type="time" 
                              className="mt-1"
                              onChange={(e) => {
                                if (uploadScheduledDate) {
                                  const [hours, minutes] = e.target.value.split(':');
                                  const newDate = new Date(uploadScheduledDate);
                                  newDate.setHours(parseInt(hours), parseInt(minutes));
                                  setUploadScheduledDate(newDate);
                                } else {
                                  const today = new Date();
                                  const [hours, minutes] = e.target.value.split(':');
                                  today.setHours(parseInt(hours), parseInt(minutes));
                                  setUploadScheduledDate(today);
                                }
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      {uploadScheduledDate && (
                        <Button
                          variant="outline"
                          onClick={() => setUploadScheduledDate(null)}
                        >
                          Limpar data
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="channel">Canal</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um canal" />
                      </SelectTrigger>
                      <SelectContent>
                        {connectedChannels.map(channel => (
                          <SelectItem key={channel.id} value={channel.id}>
                            {channel.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between flex-wrap gap-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar como Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Salvar Template</DialogTitle>
                        <DialogDescription>
                          Salve estas configurações como um template para uso futuro.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="template-name">Nome do Template</Label>
                          <Input 
                            id="template-name" 
                            placeholder="Ex: Gameplay padrão" 
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="template-channel">Canal (opcional)</Label>
                          <Select value={selectedChannelId || "global"} onValueChange={setSelectedChannelId}>
                            <SelectTrigger>
                              <SelectValue placeholder="Template global (todos os canais)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="global">Template global (todos os canais)</SelectItem>
                              {connectedChannels.map(channel => (
                                <SelectItem key={channel.id} value={channel.id}>
                                  {channel.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="default"
                          onClick={handleSaveTemplate}
                          disabled={!templateName}
                        >
                          Salvar Template
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="default"
                    onClick={handleUpload}
                    disabled={!uploadFile || !uploadTitle}
                  >
                    Fazer Upload
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Right column - Templates */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Templates de Upload</CardTitle>
                  <CardDescription>Templates salvos para reutilização</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {uploadTemplates.length === 0 ? (
                      <div className="text-center p-4">
                        <p className="text-muted-foreground mb-2">Nenhum template salvo</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsDialogOpen(true)}
                          className="flex items-center mx-auto"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Criar Template
                        </Button>
                      </div>
                    ) : (
                      uploadTemplates.map((template) => {
                        const channelInfo = template.channelId 
                          ? safeChannels.find(c => c.id === template.channelId) 
                          : null;
                          
                        return (
                          <Card key={template.id} className="overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteTemplate(template.id)}
                                  className="h-6 w-6"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              {channelInfo && (
                                <CardDescription className="flex items-center mt-1">
                                  <Avatar className="h-4 w-4 mr-1">
                                    <AvatarImage src={channelInfo.thumbnail} />
                                    <AvatarFallback>{channelInfo.title[0]}</AvatarFallback>
                                  </Avatar>
                                  {channelInfo.title}
                                </CardDescription>
                              )}
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-sm truncate">{template.title}</p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                              <Button
                                variant="default"
                                size="sm"
                                className="w-full"
                                onClick={() => handleApplyTemplate(template.id)}
                              >
                                Aplicar Template
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

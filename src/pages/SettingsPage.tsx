
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";

export default function SettingsPage() {
  const { youtubeApiKey, setYoutubeApiKey, userName, setUserName, sidebarCollapsed } = useStore();
  const [apiKey, setApiKey] = useState(youtubeApiKey || "");
  const [name, setName] = useState(userName || "");
  
  const handleSaveApiKey = () => {
    setYoutubeApiKey(apiKey);
    toast.success("Chave de API do YouTube salva com sucesso!");
  };
  
  const handleUpdateProfile = () => {
    setUserName(name);
    toast.success("Perfil atualizado com sucesso!");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações da sua aplicação Dark Hammer.</p>
          </div>
          
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="api">Integração de API</TabsTrigger>
              <TabsTrigger value="account">Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API do YouTube</CardTitle>
                  <CardDescription>
                    Configure sua chave de API do YouTube para gerenciar seus canais. 
                    <a 
                      href="https://console.developers.google.com/apis/credentials" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary ml-1 hover:underline"
                    >
                      Obtenha uma chave aqui.
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">Chave de API do YouTube</Label>
                      <Input
                        id="api-key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Insira sua chave de API do YouTube"
                        type="password"
                      />
                      <p className="text-sm text-muted-foreground">
                        Sua chave de API é armazenada localmente no seu navegador.
                      </p>
                    </div>
                    <Button onClick={handleSaveApiKey}>Salvar Chave de API</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil da Conta</CardTitle>
                  <CardDescription>
                    Gerencie as informações do seu perfil.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                      />
                    </div>
                    <Button onClick={handleUpdateProfile}>Atualizar Perfil</Button>
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


import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchUserChannels } from "@/lib/api";
import { useStore, Channel } from "@/lib/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Link, Plus, Youtube, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from 'uuid';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ChannelsPage() {
  const { channels, addChannel, removeChannel, toggleChannelConnection, sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [addChannelDialogOpen, setAddChannelDialogOpen] = useState(false);
  const [channelUrl, setChannelUrl] = useState("");
  const [channelToRemove, setChannelToRemove] = useState<string | null>(null);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  // Fetch channels data
  const { data } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchUserChannels,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  useEffect(() => {
    if (data && channels.length === 0) {
      data.forEach(channel => addChannel(channel));
    }
  }, [data, addChannel, channels.length]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleChannel = (channelId: string) => {
    toggleChannelConnection(channelId);
    toast.success("Canal atualizado com sucesso");
  };

  const handleAddNewChannel = () => {
    setAddChannelDialogOpen(true);
  };
  
  const handleChannelUrlSubmit = () => {
    if (!channelUrl.trim()) {
      toast.error("Por favor, insira uma URL válida do canal");
      return;
    }
    
    // Extract channel ID from URL (this is a simplified version)
    let channelId = "";
    try {
      const url = new URL(channelUrl);
      const pathParts = url.pathname.split('/');
      channelId = pathParts[pathParts.length - 1] || uuidv4().substring(0, 8);
    } catch {
      channelId = uuidv4().substring(0, 8);
    }
    
    // Create a new channel with dummy data
    const newChannel: Channel = {
      id: channelId,
      title: `Canal ${channels.length + 1}`,
      thumbnail: `https://placehold.co/80?text=${channelId[0]}`,
      isConnected: true
    };
    
    addChannel(newChannel);
    setChannelUrl("");
    setAddChannelDialogOpen(false);
    toast.success("Canal adicionado com sucesso");
  };
  
  const openRemoveDialog = (channelId: string) => {
    setChannelToRemove(channelId);
    setRemoveDialogOpen(true);
  };
  
  const confirmRemoveChannel = () => {
    if (channelToRemove) {
      removeChannel(channelToRemove);
      toast.success("Canal removido com sucesso");
    }
    setRemoveDialogOpen(false);
    setChannelToRemove(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-10 w-48" />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {Array(4).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-[180px] w-full" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Manage YouTube Channels</h1>
            <p className="text-muted-foreground">
              Connect and manage your YouTube channels through Dark Hammer
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {channels.map((channel) => (
              <Card key={channel.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={channel.thumbnail} alt={channel.title} />
                        <AvatarFallback>{channel.title[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{channel.title}</CardTitle>
                        <CardDescription>ID: {channel.id}</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openRemoveDialog(channel.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Youtube className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-muted-foreground">youtube.com/channel/{channel.id}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://youtube.com/channel/${channel.id}`, '_blank')}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Visit Channel
                      </Button>
                      <Button
                        variant={channel.isConnected ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleChannel(channel.id)}
                      >
                        {channel.isConnected ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Connected
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Channel Card */}
            <Card className="flex flex-col items-center justify-center p-8 border-dashed hover:bg-accent/50 cursor-pointer transition-colors" onClick={handleAddNewChannel}>
              <div className="rounded-full bg-muted p-3 mb-3">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-1">Add New Channel</h3>
              <p className="text-sm text-muted-foreground text-center">
                Connect another YouTube channel to Dark Hammer
              </p>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Add Channel Dialog */}
      <Dialog open={addChannelDialogOpen} onOpenChange={setAddChannelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add YouTube Channel</DialogTitle>
            <DialogDescription>
              Enter the URL of the YouTube channel you want to connect
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="channel-url">Channel URL</Label>
            <Input
              id="channel-url"
              placeholder="https://www.youtube.com/channel/..."
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddChannelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChannelUrlSubmit}>Add Channel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Remove Channel Alert Dialog */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Channel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this channel? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveChannel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

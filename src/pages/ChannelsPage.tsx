import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { useStore, Channel } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Globe, Trash2, CheckCircle2, ArrowRight, ChevronRight, Youtube, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchUserChannels } from "@/lib/api";
import { v4 as uuidv4 } from 'uuid';
import confetti from 'canvas-confetti';

export default function ChannelsPage() {
  const { sidebarCollapsed, channels, addChannel, removeChannel } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [addChannelOpen, setAddChannelOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["manage-videos", "read-analytics"]);
  
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleAddChannel = () => {
    setAddChannelOpen(true);
    setWizardStep(1);
  };

  const handleWizardNext = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1);
      // When reaching the success step, trigger confetti
      if (wizardStep === 2) {
        setTimeout(() => {
          triggerConfetti();
        }, 300);
      }
    } else {
      // Add a new mock channel
      const newChannel: Channel = {
        id: uuidv4().substring(0, 8),
        title: `New YouTube Channel`,
        thumbnail: `https://i.pravatar.cc/150?u=${Date.now()}`,
        isConnected: true
      };
      
      addChannel(newChannel);
      setAddChannelOpen(false);
      setWizardStep(1);
      toast.success("Channel added successfully!");
    }
  };

  const handleRemoveChannel = (channelId: string) => {
    removeChannel(channelId);
    toast.success("Channel removed successfully");
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter(s => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <div className="mb-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-64 mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">My Channels</h1>
          <p className="text-muted-foreground mt-1">
            Manage your YouTube channels and their integrations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Channel Cards */}
          {channels.map((channel) => (
            <Card key={channel.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={channel.thumbnail} alt={channel.title} />
                      <AvatarFallback>{channel.title[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{channel.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">ID: {channel.id}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Youtube className="h-4 w-4 text-red-500 mr-2" />
                    <span className="truncate">youtube.com/c/{channel.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs flex-1"
                      onClick={() => window.open(`https://youtube.com/channel/${channel.id}`, '_blank')}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Visit Channel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleRemoveChannel(channel.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Channel Card */}
          <Card className="flex flex-col items-center justify-center p-6 border-dashed cursor-pointer hover:bg-accent/10 transition-colors h-[200px]" onClick={handleAddChannel}>
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">Add New Channel</h3>
            <p className="text-sm text-muted-foreground text-center">
              Connect a YouTube channel to Dark Hammer
            </p>
          </Card>
        </div>
      </main>

      {/* Add Channel Wizard */}
      <Dialog open={addChannelOpen} onOpenChange={setAddChannelOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect YouTube Channel</DialogTitle>
            <DialogDescription>
              {wizardStep === 1 && "Authorize Dark Hammer to access your YouTube channel"}
              {wizardStep === 2 && "Choose the permissions you want to grant"}
              {wizardStep === 3 && "Connection successful!"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {/* Step 1: OAuth */}
            {wizardStep === 1 && (
              <div className="space-y-6">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Youtube className="h-6 w-6 text-red-500" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    To connect your YouTube channel, you'll need to authorize Dark Hammer to access your YouTube account.
                  </p>
                  <p className="text-sm">
                    This will allow Dark Hammer to manage your videos, view analytics, and respond to comments on your behalf.
                  </p>
                </div>
                <Button className="w-full" onClick={handleWizardNext}>
                  Authenticate with YouTube
                </Button>
              </div>
            )}
            
            {/* Step 2: Choose Permissions */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:bg-accent/10 cursor-pointer" onClick={() => toggleScope("manage-videos")}>
                    <div>
                      <h4 className="font-medium text-sm">Manage Videos</h4>
                      <p className="text-xs text-muted-foreground">Upload, edit, delete videos</p>
                    </div>
                    <CheckCircle2 className={`h-5 w-5 ${selectedScopes.includes("manage-videos") ? "text-primary" : "text-muted-foreground/30"}`} />
                  </div>
                  
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:bg-accent/10 cursor-pointer" onClick={() => toggleScope("read-analytics")}>
                    <div>
                      <h4 className="font-medium text-sm">View Analytics</h4>
                      <p className="text-xs text-muted-foreground">Access view counts, watch time, etc.</p>
                    </div>
                    <CheckCircle2 className={`h-5 w-5 ${selectedScopes.includes("read-analytics") ? "text-primary" : "text-muted-foreground/30"}`} />
                  </div>
                  
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:bg-accent/10 cursor-pointer" onClick={() => toggleScope("manage-comments")}>
                    <div>
                      <h4 className="font-medium text-sm">Manage Comments</h4>
                      <p className="text-xs text-muted-foreground">Read and respond to comments</p>
                    </div>
                    <CheckCircle2 className={`h-5 w-5 ${selectedScopes.includes("manage-comments") ? "text-primary" : "text-muted-foreground/30"}`} />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleWizardNext}
                  disabled={selectedScopes.length === 0}
                >
                  Continue
                </Button>
              </div>
            )}
            
            {/* Step 3: Success */}
            {wizardStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3 mb-4">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Connection Successful!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Your YouTube channel has been successfully connected to Dark Hammer.
                  </p>
                </div>
                <Button className="w-full" onClick={handleWizardNext}>
                  Finish Setup
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

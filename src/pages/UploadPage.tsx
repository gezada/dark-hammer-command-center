
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchUploads, VideoUpload } from "@/lib/api";
import { useStore } from "@/lib/store";
import { UploadSkeleton } from "@/components/skeleton/UploadSkeleton";
import { Calendar, Clock, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function UploadPage() {
  const { selectedChannelId } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [uploadsState, setUploadsState] = useState<VideoUpload[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Fetch uploads data
  const { data: uploads } = useQuery({
    queryKey: ['uploads', selectedChannelId],
    queryFn: () => fetchUploads(selectedChannelId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    if (uploads) {
      setUploadsState(uploads);
    }
  }, [uploads]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: FileList) => {
    // Mock file upload
    const file = files[0];
    
    // Create new upload object
    const newUpload: VideoUpload = {
      id: `vid${Math.floor(Math.random() * 1000)}`,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      channelId: selectedChannelId || 'UC123456789',
      channelTitle: 'Tech With Dark Hammer',
      thumbnail: 'https://via.placeholder.com/120x68',
      status: 'uploading',
      progress: 0,
      publishAt: null,
      privacy: 'unlisted'
    };
    
    // Add to state
    setUploadsState(prev => [newUpload, ...prev]);
    
    // Show toast
    toast.success(`Upload started: ${file.name}`);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Update state when complete
        setUploadsState(prev => 
          prev.map(u => 
            u.id === newUpload.id 
              ? { ...u, status: 'scheduled', progress: 100, publishAt: new Date().toISOString() }
              : u
          )
        );
        
        toast.success(`Upload complete: ${file.name}`);
      } else {
        // Update progress
        setUploadsState(prev => 
          prev.map(u => 
            u.id === newUpload.id 
              ? { ...u, progress }
              : u
          )
        );
      }
    }, 500);
  };

  const handleUpdateMetadata = (id: string, field: string, value: string) => {
    setUploadsState(prev => 
      prev.map(u => 
        u.id === id 
          ? { ...u, [field]: value }
          : u
      )
    );
    toast.success("Metadata updated successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'queued':
        return <Badge variant="outline">Queued</Badge>;
      case 'uploading':
        return <Badge variant="secondary">Uploading</Badge>;
      case 'scheduled':
        return <Badge variant="primary">Scheduled</Badge>;
      case 'published':
        return <Badge variant="default">Published</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-8">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Upload & Schedule</CardTitle>
              <CardDescription>
                Drag and drop your video files to upload them to YouTube
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center ${
                  dragOver ? 'border-primary bg-primary/5' : 'border-border'
                } transition-colors`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="rounded-full p-3 bg-primary/10">
                    <UploadCloud className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Drag videos here</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Support for MP4, MOV, AVI up to 128GB
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">OR</span>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Browse Files
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>

              {/* Recent Uploads */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Recent Uploads</h3>
                <div className="space-y-4">
                  {uploadsState.map((upload) => (
                    <div key={upload.id} className="border border-border rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <img 
                            src={upload.thumbnail} 
                            alt={upload.title}
                            className="w-[120px] h-[68px] object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">{upload.title}</h4>
                              {getStatusBadge(upload.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {upload.channelTitle}
                            </p>
                            {upload.status === 'uploading' && (
                              <div className="mt-2">
                                <Progress value={upload.progress} className="h-2" />
                                <span className="text-xs text-muted-foreground mt-1">
                                  {upload.progress}% complete
                                </span>
                              </div>
                            )}
                            {upload.status === 'scheduled' && (
                              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>
                                  {upload.publishAt ? 
                                    new Date(upload.publishAt).toLocaleString() : 
                                    'Not scheduled'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Metadata Tabs */}
                      {upload.status !== 'published' && (
                        <div className="border-t border-border">
                          <Tabs defaultValue="basic">
                            <div className="px-4 pt-2">
                              <TabsList className="w-full justify-start">
                                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                              </TabsList>
                            </div>
                            
                            <TabsContent value="basic" className="p-4 pt-2 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor={`title-${upload.id}`}>Title</Label>
                                <Input 
                                  id={`title-${upload.id}`} 
                                  value={upload.title}
                                  onChange={(e) => handleUpdateMetadata(upload.id, 'title', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`description-${upload.id}`}>Description</Label>
                                <Textarea 
                                  id={`description-${upload.id}`} 
                                  placeholder="Add a description..."
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="flex flex-wrap gap-4">
                                <div className="space-y-2 min-w-[200px]">
                                  <Label htmlFor={`privacy-${upload.id}`}>Privacy</Label>
                                  <Select 
                                    defaultValue={upload.privacy}
                                    onValueChange={(value) => handleUpdateMetadata(upload.id, 'privacy', value)}
                                  >
                                    <SelectTrigger id={`privacy-${upload.id}`} className="w-full">
                                      <SelectValue placeholder="Select privacy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="public">Public</SelectItem>
                                      <SelectItem value="unlisted">Unlisted</SelectItem>
                                      <SelectItem value="private">Private</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="schedule" className="p-4 pt-2">
                              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <div>
                                  <Label className="block mb-2">Publish Date</Label>
                                  <div className="border border-border rounded-md p-3">
                                    <CalendarComponent
                                      mode="single"
                                      selected={date}
                                      onSelect={setDate}
                                      className="pointer-events-auto rounded-md"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`time-${upload.id}`}>Publish Time</Label>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                      <Input 
                                        id={`time-${upload.id}`}
                                        type="time"
                                        defaultValue="12:00"
                                      />
                                    </div>
                                  </div>
                                  <Button 
                                    className="w-full mt-4"
                                    onClick={() => {
                                      if (date) {
                                        const newDate = new Date(date);
                                        handleUpdateMetadata(upload.id, 'publishAt', newDate.toISOString());
                                        handleUpdateMetadata(upload.id, 'status', 'scheduled');
                                        toast.success("Video scheduled successfully");
                                      }
                                    }}
                                  >
                                    Schedule Video
                                  </Button>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {uploadsState.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No uploads yet. Drag and drop videos to get started.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar View */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Calendar</CardTitle>
              <CardDescription>
                View and manage all scheduled uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-border rounded-lg p-4">
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-10 w-10 mx-auto mb-2 opacity-60" />
                  <h3 className="text-lg font-medium">Calendar View</h3>
                  <p className="max-w-md">
                    Drag and drop scheduled videos to change their publish dates. 
                    Connect channels to see your upload schedule.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

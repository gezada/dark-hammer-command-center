
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { useStore } from "@/lib/store";
import { UploadSkeleton } from "@/components/skeleton/UploadSkeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Calendar as CalendarIcon, 
  Globe, 
  Lock, 
  EyeOff,
  Plus,
  UploadCloud,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { UploadTemplateCard } from "@/components/upload/UploadTemplateCard";
import { UploadTemplateForm } from "@/components/upload/UploadTemplateForm";

type UploadStatus = "idle" | "uploading" | "processing" | "complete" | "error";

export default function UploadPage() {
  const { sidebarCollapsed, channels = [], uploadTemplates } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [createTemplateOpen, setCreateTemplateOpen] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined);
  const [publishTime, setPublishTime] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Connected channels for selection
  const connectedChannels = channels.filter(c => c && c.isConnected);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      handleFilesSelected(newFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      handleFilesSelected(newFiles);
    }
  };

  const handleFilesSelected = (files: File[]) => {
    if (uploadStatus === "uploading" || uploadStatus === "processing") {
      toast.error("Please wait until the current upload is complete");
      return;
    }

    // Filter for video files
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    if (videoFiles.length === 0) {
      toast.error("Please select valid video files");
      return;
    }

    setUploadedFiles([...uploadedFiles, ...videoFiles]);
    
    // Simulate upload process for the first file
    if (videoFiles.length > 0 && uploadStatus === "idle") {
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadStatus("uploading");
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("processing");
          setTimeout(() => {
            setUploadStatus("complete");
            toast.success("Upload complete! Your video is now processing.");
          }, 1500);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const handleUpload = () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please select a video to upload");
      return;
    }

    if (!title) {
      toast.error("Please enter a video title");
      return;
    }

    toast.success("Your video details have been saved");
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    
    if (newFiles.length === 0) {
      setUploadStatus("idle");
      setUploadProgress(0);
    }
  };

  const applyTemplate = (template: any) => {
    setTitle(template.title);
    setDescription(template.description);
    setTags(template.tags.join(', '));
    setVisibility(template.visibility);
    if (template.scheduledDate) {
      setPublishDate(new Date(template.scheduledDate));
      setPublishTime(format(new Date(template.scheduledDate), "HH:mm"));
    }
    if (template.channelId) {
      setSelectedChannelId(template.channelId);
    }
    toast.success("Template applied");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <UploadSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <h1 className="text-2xl font-bold tracking-tight mb-6">Upload & Schedule</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Drop Area */}
            {uploadStatus === "idle" && (
              <Card>
                <CardContent className="p-6">
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-accent/10 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden" 
                      accept="video/*" 
                      multiple
                      onChange={handleFileInputChange} 
                    />
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Drag and drop your videos here</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                      Support for MP4, MOV, AVI, and WebM formats. Maximum file size 10GB.
                    </p>
                    <Button>Select Files</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upload Progress */}
            {(uploadStatus === "uploading" || uploadStatus === "processing" || uploadStatus === "complete") && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant={uploadStatus === "complete" ? "default" : "outline"}>
                            {uploadStatus === "uploading" ? "Uploading" : 
                             uploadStatus === "processing" ? "Processing" : "Complete"}
                          </Badge>
                          <span className="font-medium text-sm truncate max-w-[250px]">{file.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground h-8 px-2"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={uploadProgress} className="flex-1" />
                        <span className="text-xs text-muted-foreground w-10">{uploadProgress}%</span>
                      </div>
                      {uploadStatus === "processing" && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1 animate-pulse" />
                          Processing video, please wait...
                        </div>
                      )}
                      {uploadStatus === "complete" && (
                        <div className="flex items-center text-xs text-green-500">
                          <Clock className="h-3 w-3 mr-1" />
                          Video processed successfully
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Video Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Video Details</CardTitle>
                <CardDescription>Fill out the information for your video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="multiple" defaultValue={["details"]}>
                  <AccordionItem value="details">
                    <AccordionTrigger>Basic Details</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                        <Input
                          id="title"
                          placeholder="Enter your video title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter your video description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          placeholder="tutorial, programming, technology"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="visibility">
                    <AccordionTrigger>Visibility</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="flex flex-wrap gap-3">
                        <Button
                          type="button"
                          variant={visibility === "public" ? "default" : "outline"}
                          onClick={() => setVisibility("public")}
                          className="flex items-center"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Public
                        </Button>
                        <Button
                          type="button"
                          variant={visibility === "unlisted" ? "default" : "outline"}
                          onClick={() => setVisibility("unlisted")}
                          className="flex items-center"
                        >
                          <EyeOff className="h-4 w-4 mr-2" />
                          Unlisted
                        </Button>
                        <Button
                          type="button"
                          variant={visibility === "private" ? "default" : "outline"}
                          onClick={() => setVisibility("private")}
                          className="flex items-center"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Private
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="scheduling">
                    <AccordionTrigger>Scheduling</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="publishDate">Publish Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {publishDate ? format(publishDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={publishDate}
                                onSelect={setPublishDate}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="publishTime">Publish Time</Label>
                          <Input
                            id="publishTime"
                            type="time"
                            value={publishTime}
                            onChange={(e) => setPublishTime(e.target.value)}
                          />
                        </div>
                      </div>
                      {publishDate && publishTime && (
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          Your video will be published on {format(publishDate, "PPPP")} at {publishTime}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="channel">
                    <AccordionTrigger>Channel</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="channel">Select Channel</Label>
                        <Select value={selectedChannelId || ""} onValueChange={setSelectedChannelId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a channel" />
                          </SelectTrigger>
                          <SelectContent>
                            {connectedChannels.length === 0 ? (
                              <SelectItem value="no-channels" disabled>
                                No connected channels
                              </SelectItem>
                            ) : (
                              connectedChannels.map(channel => (
                                <SelectItem key={channel.id} value={channel.id}>
                                  {channel.title}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {connectedChannels.length === 0 && (
                          <div className="flex items-center text-sm text-amber-500 mt-2">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            No channels connected. Please add a channel first.
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="pt-4">
                  <Button onClick={handleUpload} disabled={!title} className="w-full">
                    Save & Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Templates Panel */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upload Templates</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCreateTemplateOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Create
                  </Button>
                </div>
                <CardDescription>Save and reuse upload settings</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {uploadTemplates.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No templates saved yet</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setCreateTemplateOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Create Template
                        </Button>
                      </div>
                    ) : (
                      uploadTemplates.map((template) => (
                        <UploadTemplateCard 
                          key={template.id}
                          template={template} 
                          channels={channels}
                          onApply={() => applyTemplate(template)} 
                        />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        <UploadTemplateForm 
          isOpen={createTemplateOpen} 
          onClose={() => setCreateTemplateOpen(false)}
          channels={connectedChannels}
          initialValues={{
            title,
            description,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            visibility,
            scheduledDate: publishDate,
          }}
        />
      </main>
    </div>
  );
}

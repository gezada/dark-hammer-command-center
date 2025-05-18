
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadSkeleton } from "@/components/skeleton/UploadSkeleton";
import { UploadCloud, Calendar, Trash2, Clock, Tag, Check, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  
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
    console.log("File(s) dropped");
    
    // Prevent default behavior (Prevent file from being opened)
    e.stopPropagation();
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
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Upload & Schedule</h1>
              <p className="text-muted-foreground">Upload videos and schedule them for publishing.</p>
            </div>
            <div>
              <Button
                className="w-full sm:w-auto"
                onClick={() => {}}
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </div>
          </div>
          
          {/* Upload Area */}
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
              <h3 className="text-xl font-medium">Drag & Drop Video Files</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Upload MP4, MOV, or AVI files up to 12GB. Your videos will be securely
                stored and ready for publishing.
              </p>
              <div className="flex gap-4">
                <Button>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Select Files
                </Button>
                <Button variant="outline">
                  Import from Google Drive
                </Button>
              </div>
            </div>
          </div>
          
          {/* Recent Uploads */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Manage your recent video uploads and their publishing status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Item 1 */}
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
                          <Badge variant="default">SCHEDULED</Badge>
                          <h4 className="font-semibold text-lg mt-2">10 Hidden Features in VS Code You Need to Know</h4>
                          <p className="text-muted-foreground text-sm">Scheduled for June 12, 2025 at 9:00 AM</p>
                        </div>
                        <div className="flex gap-2 sm:flex-col items-start">
                          <Button variant="outline" size="sm" className="h-8">
                            <Calendar className="h-4 w-4 mr-2" />
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span>Test Channel</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>12:42</span>
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            <span>coding, tutorial, tech</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Upload Item 2 */}
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
                          <Badge variant="secondary">UPLOADING</Badge>
                          <h4 className="font-semibold text-lg mt-2">Building a Full-Stack App with React and Node.js</h4>
                          <div className="mt-2">
                            <Progress value={68} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">68% - 2 minutes remaining</p>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:flex-col items-start">
                          <Button variant="default" size="sm" className="h-8">
                            <Check className="h-4 w-4 mr-2" />
                            Complete
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span>Test Channel</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>42:18</span>
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            <span>programming, webdev, coding</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video Metadata Form */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Video Details</CardTitle>
                    <CardDescription>Edit the metadata for your video before publishing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter a catchy title for your video"
                            defaultValue="Building a Full-Stack App with React and Node.js"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter a detailed description of your video"
                            rows={5}
                            defaultValue="In this comprehensive tutorial, we'll build a complete full-stack application using React for the frontend and Node.js for the backend. We'll cover authentication, database integration, and deployment."
                          />
                        </div>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                              id="tags"
                              placeholder="programming, webdev, coding"
                              defaultValue="programming, webdev, coding"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="privacy">Privacy Setting</Label>
                            <Select defaultValue="public">
                              <SelectTrigger>
                                <SelectValue placeholder="Select privacy setting" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="unlisted">Unlisted</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select defaultValue="tech">
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tech">Science & Technology</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="gaming">Gaming</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="channel">Channel</Label>
                            <Select defaultValue="channel1">
                              <SelectTrigger>
                                <SelectValue placeholder="Select channel" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="channel1">Test Channel</SelectItem>
                                <SelectItem value="channel2">Secondary Channel</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline">Save as Draft</Button>
                          <Button>Schedule Publication</Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

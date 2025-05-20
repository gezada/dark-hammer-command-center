
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { useStore } from "@/lib/store";
import { CommentsSkeleton } from "@/components/skeleton/CommentsSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Heart, MessageCircle, ThumbsUp, UserCheck } from "lucide-react";
import { ChannelFilter } from "@/components/ChannelFilter";
import { toast } from "sonner";

// Comment type definition
type Comment = {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  video: string;
  channel: string;
  timestamp: string;
  likes: number;
  isHighlighted: boolean;
  isPinned: boolean;
  status: 'pending' | 'approved' | 'hidden';
  response?: string;
};

// Generate random comments
const generateComments = (count: number): Comment[] => {
  const channels = ["Dev Channel", "Code Masters", "Tech Tutorials"];
  const statuses: ('pending' | 'approved' | 'hidden')[] = ['pending', 'approved', 'hidden'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `comment-${i + 1}`,
    author: `User ${i + 1}`,
    authorAvatar: `https://i.pravatar.cc/150?u=${i + 1}`,
    content: `This is comment number ${i + 1}. It's great content! Keep it up.`,
    video: `Video Title ${Math.floor(Math.random() * 10) + 1}`,
    channel: channels[Math.floor(Math.random() * channels.length)],
    timestamp: `${Math.floor(Math.random() * 24)}h ago`,
    likes: Math.floor(Math.random() * 100),
    isHighlighted: Math.random() > 0.8,
    isPinned: Math.random() > 0.9,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    response: Math.random() > 0.7 ? `Thanks for your comment! We appreciate your feedback.` : undefined
  }));
};

export default function CommentsPage() {
  const { sidebarCollapsed, selectedChannelId } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComments, setSelectedComments] = useState<string[]>([]);

  // Load comments
  useEffect(() => {
    const timer = setTimeout(() => {
      setComments(generateComments(20));
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter comments
  const filteredComments = comments.filter(comment => {
    // Filter by status
    if (activeTab !== 'all' && comment.status !== activeTab) return false;
    
    // Filter by channel if selected
    if (selectedChannelId && comment.channel !== 
        comments.find(c => c.channel === comment.channel)?.channel) return false;
    
    // Filter by search query
    if (searchQuery && 
        !comment.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !comment.author.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !comment.video.toLowerCase().includes(searchQuery.toLowerCase())
       ) return false;
       
    return true;
  });

  const toggleCommentSelection = (commentId: string) => {
    setSelectedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleBulkAction = (action: 'approve' | 'hide' | 'delete') => {
    if (selectedComments.length === 0) {
      toast.error("No comments selected");
      return;
    }
    
    setComments(prevComments => 
      prevComments.map(comment => {
        if (selectedComments.includes(comment.id)) {
          switch (action) {
            case 'approve':
              return { ...comment, status: 'approved' };
            case 'hide':
              return { ...comment, status: 'hidden' };
            default:
              return comment;
          }
        }
        return comment;
      })
    );
    
    if (action === 'delete') {
      setComments(prevComments => 
        prevComments.filter(comment => !selectedComments.includes(comment.id))
      );
    }
    
    toast.success(`${selectedComments.length} comments ${action === 'approve' ? 'approved' : action === 'hide' ? 'hidden' : 'deleted'}`);
    setSelectedComments([]);
  };

  if (isLoading) {
    return <CommentsSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Comments</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <ChannelFilter />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Input 
                placeholder="Search comments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>
          
          {selectedComments.length > 0 && (
            <div className="bg-accent/20 p-3 rounded-md flex items-center justify-between mb-4">
              <span className="text-sm">{selectedComments.length} comments selected</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('approve')}>
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('hide')}>
                  Hide
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {filteredComments.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No comments found</p>
              </CardContent>
            </Card>
          ) : (
            filteredComments.map((comment, index) => (
              <Card key={comment.id} className={comment.isHighlighted ? "border-primary/30" : ""}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex items-start">
                      <input 
                        type="checkbox" 
                        checked={selectedComments.includes(comment.id)}
                        onChange={() => toggleCommentSelection(comment.id)}
                        className="mt-1.5 h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.authorAvatar} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{comment.author}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <span>on {comment.video}</span>
                              <span className="text-muted-foreground">•</span>
                              <span>{comment.timestamp}</span>
                            </div>
                            <div className="text-xs text-[#ea384c] mt-0.5">
                              {comment.channel}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {comment.isPinned && (
                            <Badge variant="outline" className="h-6 text-xs gap-1">
                              <UserCheck className="h-3 w-3" /> Pinned
                            </Badge>
                          )}
                          <Badge 
                            variant={
                              comment.status === 'approved' ? "default" : 
                              comment.status === 'hidden' ? "secondary" : 
                              "outline"
                            }
                            className="h-6 text-xs"
                          >
                            {comment.status === 'approved' ? "Approved" : 
                             comment.status === 'hidden' ? "Hidden" : 
                             "Pending"}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm">{comment.content}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-muted-foreground text-xs">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>{comment.likes}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs gap-1 px-2 py-1"
                          >
                            <Heart className="h-3.5 w-3.5" />
                            Like
                          </Button>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7 gap-1"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Reply
                        </Button>
                      </div>
                      
                      {comment.response && (
                        <div className="bg-accent/10 p-3 rounded-md mt-2 relative">
                          <div className="absolute h-2 w-2 bg-accent/10 transform rotate-45 -top-1 left-4"></div>
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>YC</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-xs">Your Channel</div>
                          </div>
                          <p className="text-xs">{comment.response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

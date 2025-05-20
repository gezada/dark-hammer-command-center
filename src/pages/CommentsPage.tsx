
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { CommentsSkeleton } from "@/components/skeleton/CommentsSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MessageSquare, ThumbsUp, Eye, Trash2, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type Comment = {
  id: string;
  videoTitle: string;
  videoThumbnail: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  replied: boolean;
  hidden: boolean;
  hasQuestion: boolean;
};

export default function CommentsPage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Initialize sample comments data
  useEffect(() => {
    const sampleComments: Comment[] = [
      {
        id: "1",
        videoTitle: "Advanced React Patterns",
        videoThumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=100&fit=crop",
        content: "This tutorial was exactly what I needed! Thanks for the detailed explanations.",
        author: {
          name: "John Smith",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        date: "2 hours ago",
        replied: false,
        hidden: false,
        hasQuestion: false
      },
      {
        id: "2",
        videoTitle: "JavaScript Promise Tutorial",
        videoThumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=100&fit=crop",
        content: "I'm confused about the async/await section. Can you explain that part again?",
        author: {
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        date: "5 hours ago",
        replied: false,
        hidden: false,
        hasQuestion: true
      },
      {
        id: "3",
        videoTitle: "Docker for Beginners",
        videoThumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=100&fit=crop",
        content: "Great tutorial! I have a question though. What's the difference between bind mounts and volumes?",
        author: {
          name: "Michael Brown",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        date: "1 day ago",
        replied: true,
        hidden: false,
        hasQuestion: true
      },
      {
        id: "4",
        videoTitle: "TypeScript Advanced Types",
        videoThumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=100&fit=crop",
        content: "Thanks for the explanation on mapped types!",
        author: {
          name: "Emily Wilson",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
        date: "2 days ago",
        replied: true,
        hidden: false,
        hasQuestion: false
      },
      {
        id: "5",
        videoTitle: "NodeJS Authentication",
        videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=100&fit=crop",
        content: "I'm trying to implement this but getting errors with JWT verification. Any suggestions?",
        author: {
          name: "David Lee",
          avatar: "https://i.pravatar.cc/150?img=5",
        },
        date: "3 days ago",
        replied: false,
        hidden: true,
        hasQuestion: true
      }
    ];

    const timer = setTimeout(() => {
      setComments(sampleComments);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Toggle comment selection
  const toggleCommentSelection = (commentId: string) => {
    if (selectedComments.includes(commentId)) {
      setSelectedComments(selectedComments.filter(id => id !== commentId));
    } else {
      setSelectedComments([...selectedComments, commentId]);
    }
  };

  // Toggle all comment selection
  const toggleAllSelection = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map(comment => comment.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: 'reply' | 'like' | 'hide' | 'delete') => {
    if (selectedComments.length === 0) {
      toast.error("No comments selected");
      return;
    }

    switch (action) {
      case 'reply':
        toast.success(`Replying to ${selectedComments.length} comments`);
        break;
      case 'like':
        toast.success(`Liked ${selectedComments.length} comments`);
        break;
      case 'hide':
        toast.success(`Hidden ${selectedComments.length} comments`);
        // Update comment state to reflect hiding
        setComments(comments.map(comment => 
          selectedComments.includes(comment.id) ? {...comment, hidden: true} : comment
        ));
        setSelectedComments([]);
        break;
      case 'delete':
        toast.success(`Deleted ${selectedComments.length} comments`);
        // Remove deleted comments from state
        setComments(comments.filter(comment => !selectedComments.includes(comment.id)));
        setSelectedComments([]);
        break;
    }
  };

  // Handle comment actions
  const handleCommentAction = (action: 'reply' | 'like' | 'hide' | 'delete', commentId: string) => {
    switch (action) {
      case 'reply':
        if (replyingTo === commentId) {
          setReplyingTo(null);
        } else {
          setReplyingTo(commentId);
          setReplyContent("");
        }
        break;
      case 'like':
        toast.success("Comment liked");
        break;
      case 'hide':
        // Update comment state to reflect hiding
        setComments(comments.map(comment => 
          comment.id === commentId ? {...comment, hidden: !comment.hidden} : comment
        ));
        toast.success(comments.find(c => c.id === commentId)?.hidden ? "Comment unhidden" : "Comment hidden");
        break;
      case 'delete':
        // Remove deleted comment from state
        setComments(comments.filter(comment => comment.id !== commentId));
        toast.success("Comment deleted");
        break;
    }
  };

  // Handle submitting a reply
  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    // Update the comment to mark as replied
    setComments(comments.map(comment => 
      comment.id === commentId ? {...comment, replied: true} : comment
    ));

    toast.success("Reply submitted");
    setReplyingTo(null);
    setReplyContent("");
  };

  // Filter comments based on active tab
  const [activeTab, setActiveTab] = useState("all");
  const filteredComments = comments.filter(comment => {
    switch (activeTab) {
      case 'unreplied':
        return !comment.replied;
      case 'replied':
        return comment.replied;
      case 'questions':
        return comment.hasQuestion;
      case 'recent':
        // Simulate last 24 hours check
        return comment.date.includes('hours');
      case 'hidden':
        return comment.hidden;
      default:
        return true; // "all" tab
    }
  });

  // Count comments for each category
  const counts = {
    all: comments.length,
    unreplied: comments.filter(c => !c.replied).length,
    replied: comments.filter(c => c.replied).length,
    questions: comments.filter(c => c.hasQuestion).length,
    recent: comments.filter(c => c.date.includes('hours')).length,
    hidden: comments.filter(c => c.hidden).length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <CommentsSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Comments</h1>
          <DateRangeFilter />
        </div>

        <Card className="border shadow-sm">
          <ScrollArea className="h-[calc(100vh-180px)]">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <div className="flex overflow-x-auto p-1 border-b">
                <TabsList>
                  <TabsTrigger value="all">
                    All <Badge className="ml-2" variant="outline">{counts.all}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="unreplied">
                    Unreplied <Badge className="ml-2" variant="outline">{counts.unreplied}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="replied">
                    Replied <Badge className="ml-2" variant="outline">{counts.replied}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="questions">
                    Contains "?" <Badge className="ml-2" variant="outline">{counts.questions}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="recent">
                    Last 24h <Badge className="ml-2" variant="outline">{counts.recent}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="hidden">
                    Hidden <Badge className="ml-2" variant="outline">{counts.hidden}</Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={filteredComments.length > 0 && selectedComments.length === filteredComments.length}
                          onCheckedChange={toggleAllSelection}
                          aria-label="Select all comments"
                        />
                      </TableHead>
                      <TableHead className="w-[150px]">Video</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead className="w-[150px]">Author</TableHead>
                      <TableHead className="w-[100px]">Date</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No comments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredComments.map((comment) => (
                        <>
                          <TableRow key={comment.id} className={comment.hidden ? "bg-muted/30" : ""}>
                            <TableCell>
                              <Checkbox 
                                checked={selectedComments.includes(comment.id)} 
                                onCheckedChange={() => toggleCommentSelection(comment.id)}
                                aria-label={`Select comment from ${comment.author.name}`}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="h-12 w-20 rounded overflow-hidden bg-muted">
                                  <img 
                                    src={comment.videoThumbnail} 
                                    alt={comment.videoTitle}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="text-xs font-medium line-clamp-2">{comment.videoTitle}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {comment.content}
                                {comment.replied && (
                                  <Badge variant="outline" className="ml-2 text-xs">Replied</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{comment.author.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">{comment.date}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleCommentAction('reply', comment.id)}
                                  aria-label="Reply to comment"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleCommentAction('like', comment.id)}
                                  aria-label="Like comment"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant={comment.hidden ? "default" : "ghost"} 
                                  size="sm" 
                                  onClick={() => handleCommentAction('hide', comment.id)}
                                  aria-label={comment.hidden ? "Unhide comment" : "Hide comment"}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleCommentAction('delete', comment.id)}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                          {replyingTo === comment.id && (
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell colSpan={5} className="p-2">
                                <div className="space-y-2 ml-4 border-l-2 pl-4 border-primary/20">
                                  <Textarea 
                                    value={replyContent} 
                                    onChange={(e) => setReplyContent(e.target.value)} 
                                    placeholder="Write your reply..." 
                                    className="min-h-[100px]"
                                  />
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                      Cancel
                                    </Button>
                                    <Button size="sm" onClick={() => handleReplySubmit(comment.id)}>
                                      Submit Reply
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </ScrollArea>

          {/* Bulk Actions */}
          {selectedComments.length > 0 && (
            <div className="p-4 border-t flex items-center justify-between bg-background sticky bottom-0 shadow-sm">
              <div className="text-sm font-medium">
                {selectedComments.length} {selectedComments.length === 1 ? 'comment' : 'comments'} selected
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('reply')}>
                  <MessageSquare className="h-4 w-4 mr-2" /> Reply
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('like')}>
                  <ThumbsUp className="h-4 w-4 mr-2" /> Like
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('hide')}>
                  <Eye className="h-4 w-4 mr-2" /> Hide
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

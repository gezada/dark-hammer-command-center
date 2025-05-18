
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchComments, Comment } from "@/lib/api";
import { useStore } from "@/lib/store";
import { CommentsSkeleton } from "@/components/skeleton/CommentsSkeleton";
import { 
  Check, 
  Heart, 
  EyeOff, 
  Trash2, 
  Clock, 
  MessageSquare, 
  HelpCircle, 
  Filter, 
  MoreVertical,
  ThumbsUp
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type FilterType = 'all' | 'unreplied' | 'questions' | 'recent';

export default function CommentsPage() {
  const { selectedChannelId } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [commentState, setCommentState] = useState<Comment[]>([]);
  
  // Fetch comments data
  const { data: comments } = useQuery({
    queryKey: ['comments', selectedChannelId, filterType],
    queryFn: () => fetchComments({ channelId: selectedChannelId, filterType }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (comments) {
      setCommentState(comments);
    }
  }, [comments]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectComment = (commentId: string) => {
    setSelectedComments(prev => {
      if (prev.includes(commentId)) {
        return prev.filter(id => id !== commentId);
      } else {
        return [...prev, commentId];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedComments.length === commentState.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(commentState.map(c => c.id));
    }
  };

  const handleToggleLike = (commentId: string) => {
    setCommentState(prev => 
      prev.map(c => 
        c.id === commentId ? { ...c, liked: !c.liked } : c
      )
    );
    toast.success("Comment like status updated");
  };

  const handleHideComment = (commentId: string) => {
    // In a real app, we would call an API
    toast.success("Comment hidden successfully");
  };

  const handleDeleteComment = (commentId: string) => {
    setCommentState(prev => prev.filter(c => c.id !== commentId));
    toast.success("Comment deleted successfully");
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyText.trim() === '') return;
    
    // Update comment in state to show it has a reply
    setCommentState(prev => 
      prev.map(c => 
        c.id === commentId ? { ...c, hasReply: true } : c
      )
    );
    
    toast.success("Reply sent successfully");
    setReplyingTo(null);
    setReplyText('');
  };

  const handleBulkAction = (action: 'like' | 'hide' | 'delete') => {
    if (selectedComments.length === 0) return;
    
    if (action === 'like') {
      setCommentState(prev => 
        prev.map(c => 
          selectedComments.includes(c.id) ? { ...c, liked: true } : c
        )
      );
      toast.success(`${selectedComments.length} comments liked`);
    } else if (action === 'hide') {
      toast.success(`${selectedComments.length} comments hidden`);
    } else if (action === 'delete') {
      setCommentState(prev => prev.filter(c => !selectedComments.includes(c.id)));
      toast.success(`${selectedComments.length} comments deleted`);
    }
    
    setSelectedComments([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6 overflow-auto">
          <CommentsSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {/* Filter Controls */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
                className="flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                All
              </Button>
              <Button
                variant={filterType === 'unreplied' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('unreplied')}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Unreplied
              </Button>
              <Button
                variant={filterType === 'questions' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('questions')}
                className="flex items-center"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Contains "?"
              </Button>
              <Button
                variant={filterType === 'recent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('recent')}
                className="flex items-center"
              >
                <Clock className="h-4 w-4 mr-2" />
                Last 24h
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Has Likes</DropdownMenuItem>
                <DropdownMenuItem>Has Replies</DropdownMenuItem>
                <DropdownMenuItem>Potentially Inappropriate</DropdownMenuItem>
                <DropdownMenuItem>From Subscribers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Comments Table */}
          <Card>
            {/* Table Header */}
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Checkbox 
                    id="select-all" 
                    checked={selectedComments.length > 0 && selectedComments.length === commentState.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label 
                    htmlFor="select-all" 
                    className="text-sm font-medium cursor-pointer select-none"
                  >
                    {selectedComments.length > 0 ? 
                      `${selectedComments.length} selected` : 
                      'Select All'}
                  </label>
                </div>
                
                {selectedComments.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleBulkAction('like')}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleBulkAction('hide')}
                    >
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleBulkAction('delete')}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Comments List */}
            <div className="divide-y divide-border">
              {commentState.length > 0 ? commentState.map((comment) => (
                <div key={comment.id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <Checkbox 
                      id={`select-${comment.id}`} 
                      checked={selectedComments.includes(comment.id)}
                      onCheckedChange={() => handleSelectComment(comment.id)}
                      className="mt-2"
                    />
                    
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.author.profileUrl} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{comment.author.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {comment.videoTitle}
                        </span>
                      </div>
                      
                      <p>{comment.text}</p>
                      
                      {/* Reply Form */}
                      {replyingTo === comment.id ? (
                        <div className="mt-2 space-y-2">
                          <Textarea
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleSubmitReply(comment.id)}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 mt-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setReplyingTo(comment.id)}
                            className="h-8 px-2 text-xs"
                          >
                            Reply
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className={`h-8 px-2 text-xs ${comment.liked ? 'text-primary' : ''}`}
                            onClick={() => handleToggleLike(comment.id)}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${comment.liked ? 'fill-primary' : ''}`} />
                            {comment.liked ? 'Liked' : 'Like'}
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleHideComment(comment.id)}
                            className="h-8 px-2 text-xs"
                          >
                            <EyeOff className="h-4 w-4 mr-1" />
                            Hide
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                      
                      {comment.hasReply && (
                        <div className="flex items-center mt-1">
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-xs text-muted-foreground">Replied</span>
                        </div>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => window.open(`https://youtube.com/watch?v=${comment.videoId}`, '_blank')}>
                          View on YouTube
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => window.open(`https://youtube.com/watch?v=${comment.videoId}`, '_blank')}>
                          View Channel
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onSelect={() => handleDeleteComment(comment.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-1">No comments found</h3>
                  <p>Try changing your filter settings or connect more channels</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}


import { PageLayout } from "@/components/PageLayout";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { CommentsSkeleton } from "@/components/skeleton/CommentsSkeleton";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  MessageCircle, 
  MoreHorizontal,
  MessageSquare, 
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export default function CommentsPage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  
  const comments = [
    {
      id: "1",
      user: { name: "TechEnthusiast", avatar: "" },
      content: "Great video! I've been waiting for a good explanation of these new features. Could you do a follow-up on battery technology?",
      videoTitle: "Latest Tech Review 2023",
      likes: 24,
      replies: 3,
      time: "2h ago",
      status: "pending"
    },
    {
      id: "2",
      user: { name: "GadgetGuru", avatar: "" },
      content: "I disagree with your take on foldable phones. They're definitely the future and many manufacturers are investing heavily in this technology.",
      videoTitle: "Foldable Phone Review",
      likes: 8,
      replies: 12,
      time: "5h ago",
      status: "replied"
    },
    {
      id: "3",
      user: { name: "GameMaster", avatar: "" },
      content: "This game deserves a 9/10 at least! The graphics and storyline are amazing.",
      videoTitle: "Gaming Review 2023",
      likes: 42,
      replies: 5,
      time: "1d ago",
      status: "pending"
    },
    {
      id: "4",
      user: { name: "MarketingPro", avatar: "" },
      content: "The branding in this video is on point. Who designed the graphics?",
      videoTitle: "Marketing Strategy Series",
      likes: 15,
      replies: 2,
      time: "1d ago",
      status: "pending"
    },
    {
      id: "5",
      user: { name: "CuriousUser", avatar: "" },
      content: "Is this compatible with the previous version?",
      videoTitle: "Product Demo 2023",
      likes: 6,
      replies: 1,
      time: "2d ago",
      status: "replied"
    }
  ];

  const filteredComments = filter === "all" 
    ? comments 
    : comments.filter(comment => comment.status === filter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
    <PageLayout title="Comments">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <DateRangeFilter />
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-10 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filter Comments</h4>
                <div className="pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all" checked={filter === "all"} onCheckedChange={() => setFilter("all")} />
                      <label htmlFor="all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        All Comments
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pending" checked={filter === "pending"} onCheckedChange={() => setFilter("pending")} />
                      <label htmlFor="pending" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Pending
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="replied" checked={filter === "replied"} onCheckedChange={() => setFilter("replied")} />
                      <label htmlFor="replied" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Replied
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select defaultValue="recent">
            <SelectTrigger className="w-[140px] h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="likes">Most Likes</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <Card key={comment.id} className="p-4 bg-card relative overflow-hidden">
            {comment.status === "pending" && (
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            )}
            {comment.status === "replied" && (
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            )}
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium">{comment.user.name}</div>
                    <div className="text-xs text-muted-foreground">{comment.time}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.status === "pending" ? (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        Replied
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-1 line-clamp-2 text-sm">{comment.content}</div>
                <div className="text-xs text-muted-foreground mt-1">On video: {comment.videoTitle}</div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                    <span>{comment.likes}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MessageCircle className="h-3.5 w-3.5 mr-1" />
                    <span>{comment.replies} replies</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Reply</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <div className="flex justify-center my-6">
          <Button variant="outline">Load More Comments</Button>
        </div>
      </div>
    </PageLayout>
  );
}

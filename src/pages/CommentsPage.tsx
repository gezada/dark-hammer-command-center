
import { AppHeader } from "@/components/AppHeader";
import { ChannelFilter } from "@/components/ChannelFilter";
import { CommentsSkeleton } from "@/components/skeleton/CommentsSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

export default function CommentsPage() {
  const { sidebarCollapsed } = useStore();
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Comments</h1>
          <ChannelFilter />
        </div>

        <ScrollArea className="h-[calc(100vh-130px)] custom-scrollbar pr-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              {/* Comments list */}
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted/50">
                  <h2 className="text-lg font-semibold">Recent Comments</h2>
                </div>
                <div className="divide-y">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0"></div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">User {i + 1}</span>
                            <span className="text-xs text-muted-foreground">3 days ago</span>
                          </div>
                          <p className="mt-1 text-sm">This is a great video! I really enjoyed watching it and learned a lot.</p>
                          <div className="mt-2.5 flex items-center gap-4 text-xs text-muted-foreground">
                            <button className="hover:text-foreground transition-colors py-1">Reply</button>
                            <button className="hover:text-foreground transition-colors py-1">Like</button>
                            <button className="hover:text-foreground transition-colors py-1">Hide</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Stats */}
              <div className="border rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Comment Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Comments</span>
                    <span className="font-medium">583</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Unread</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Replied</span>
                    <span className="font-medium">248</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Hidden</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </div>

              {/* Filter */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Filter Comments</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm mt-1.5">
                      <option value="all">All Comments</option>
                      <option value="unread">Unread</option>
                      <option value="replied">Replied</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sort By</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm mt-1.5">
                      <option value="recent">Most Recent</option>
                      <option value="oldest">Oldest First</option>
                      <option value="likes">Most Likes</option>
                      <option value="replies">Most Replies</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Video</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm mt-1.5">
                      <option value="all">All Videos</option>
                      <option value="recent">Recent Videos</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

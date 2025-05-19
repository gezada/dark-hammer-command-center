
import { AppHeader } from "@/components/AppHeader";
import { DashboardSkeleton } from "@/components/skeleton/DashboardSkeleton";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

export default function DashboardPage() {
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
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <h1 className="text-2xl font-bold tracking-tight mb-6">Dashboard</h1>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {/* Recent uploads */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4 items-center p-2 hover:bg-muted rounded-md transition-colors cursor-pointer">
                    <div className="w-24 h-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                      Thumbnail {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Example Video Title {i + 1}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <span>Channel {i + 1}</span>
                        <span className="mx-2">•</span>
                        <span>{1250 * (i + 1)} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Performance overview */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Views', 'Watch Time', 'Subscribers', 'Revenue'].map((metric, i) => (
                  <div key={i} className="p-3 border rounded-md">
                    <div className="text-sm text-muted-foreground">{metric}</div>
                    <div className="text-lg font-bold mt-1">
                      {metric === 'Revenue' ? '$' : ''}{(i + 1) * 1250}
                      {metric === 'Watch Time' ? 'h' : ''}
                    </div>
                    <div className="text-xs text-green-500 mt-1">+{(i + 1) * 5}% vs last period</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-4">
            {/* Channel selection */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Your Channels</h2>
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      C{i + 1}
                    </div>
                    <div>
                      <div className="font-medium">Channel {i + 1}</div>
                      <div className="text-xs text-muted-foreground">{(i + 1) * 10}K subscribers</div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center p-2 mt-2 border border-dashed rounded-md hover:bg-accent/50 cursor-pointer">
                  <div className="text-sm text-muted-foreground">+ Add Channel</div>
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="text-sm p-2 border-b last:border-0">
                    <div className="font-medium">New comment on your video</div>
                    <div className="text-muted-foreground mt-1 text-xs">
                      {Math.floor(Math.random() * 60)} minutes ago
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

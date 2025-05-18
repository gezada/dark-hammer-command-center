
import { useStore } from "@/lib/store";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Command, Bell, User } from "lucide-react";
import { fetchAnalytics } from "@/lib/api";
import { ComboboxDemo } from "./ChannelSelector";
import { useQuery } from "@tanstack/react-query";

export function AppHeader() {
  const { selectedChannelId, dateRange, setDateRange } = useStore();
  
  // Use React Query to safely fetch analytics data
  const { data: analytics } = useQuery({
    queryKey: ['headerAnalytics', selectedChannelId, dateRange],
    queryFn: () => fetchAnalytics(selectedChannelId, dateRange),
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });

  const handleOpenCommandPalette = (e: React.MouseEvent) => {
    e.preventDefault();
    // Simulate pressing Cmd+K/Ctrl+K
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleOpenCommandPalette}>
          <Command className="h-4 w-4" />
        </Button>
        <div className="max-w-[240px]">
          <ComboboxDemo />
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant={dateRange === '12h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('12h')}
            className="h-8"
          >
            12h
          </Button>
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('7d')}
            className="h-8"
          >
            7d
          </Button>
          <Button
            variant={dateRange === '28d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('28d')}
            className="h-8"
          >
            28d
          </Button>
          <Button
            variant={dateRange === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('custom')}
            className="h-8"
          >
            Custom
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">YouTube API:</span>
          <div className="w-32 h-2 bg-muted rounded-full">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${analytics?.quota?.used ?? 0}%` }}
            />
          </div>
          <span className="ml-2">{100 - (analytics?.quota?.used ?? 0)}% left</span>
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

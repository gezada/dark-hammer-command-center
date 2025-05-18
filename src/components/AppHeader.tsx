
import { useStore } from "@/lib/store";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Command, Calendar as CalendarIcon } from "lucide-react";
import { fetchAnalytics } from "@/lib/api";
import { ComboboxDemo } from "./ChannelSelector";
import { useQuery } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

export function AppHeader() {
  const { selectedChannelId, dateRange, setDateRange, customDateRange, setCustomDateRange } = useStore();
  const [calendarOpen, setCalendarOpen] = useState(false);
  
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
  
  const formatDateRange = () => {
    if (dateRange !== 'custom' || !customDateRange.startDate || !customDateRange.endDate) {
      return "";
    }
    
    const start = format(customDateRange.startDate, "dd/MM/yyyy", { locale: ptBR });
    const end = format(customDateRange.endDate, "dd/MM/yyyy", { locale: ptBR });
    return `${start} - ${end}`;
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 h-16 px-4 sm:px-6 flex items-center justify-between ml-[60px] md:ml-[240px] transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto hide-scrollbar">
        <Button variant="outline" size="icon" onClick={handleOpenCommandPalette} className="shrink-0">
          <Command className="h-4 w-4" />
        </Button>
        <div className="max-w-[240px] shrink-0">
          <ComboboxDemo />
        </div>
        <div className="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
          <Button
            variant={dateRange === '12h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('12h')}
            className="h-8 whitespace-nowrap"
          >
            12h
          </Button>
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('7d')}
            className="h-8 whitespace-nowrap"
          >
            7d
          </Button>
          <Button
            variant={dateRange === '28d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange('28d')}
            className="h-8 whitespace-nowrap"
          >
            28d
          </Button>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={dateRange === 'custom' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('custom')}
                className="h-8 whitespace-nowrap"
              >
                {dateRange === 'custom' && customDateRange.startDate && customDateRange.endDate 
                  ? formatDateRange()
                  : "Personalizado"}
                <CalendarIcon className="h-4 w-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: customDateRange.startDate || undefined,
                  to: customDateRange.endDate || undefined
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setCustomDateRange({
                      startDate: range.from,
                      endDate: range.to
                    });
                    setDateRange('custom');
                    setCalendarOpen(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center text-sm text-muted-foreground">
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
      </div>
    </header>
  );
}

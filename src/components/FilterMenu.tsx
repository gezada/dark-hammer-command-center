
import * as React from "react";
import { Check, Filter } from "lucide-react";
import { useStore, Channel } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export function FilterMenu() {
  const { 
    channels = [], 
    selectedChannelId, 
    setSelectedChannelId, 
    dateRange, 
    setDateRange, 
    customDateRange, 
    setCustomDateRange 
  } = useStore();

  // For multi-selection of channels
  const [selectedChannels, setSelectedChannels] = React.useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [dateSelectionStage, setDateSelectionStage] = React.useState<'start' | 'end'>('start');
  
  // Safe channels array
  const safeChannels = Array.isArray(channels) ? channels : [];
  
  // Handle channel selection
  const handleChannelSelect = (channelId: string) => {
    setSelectedChannels((prev) => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };
  
  // Calculate date range difference
  const daysDifference = React.useMemo(() => {
    if (customDateRange.startDate && customDateRange.endDate) {
      return differenceInDays(customDateRange.endDate, customDateRange.startDate) + 1;
    }
    return 0;
  }, [customDateRange]);

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (dateSelectionStage === 'start') {
      setCustomDateRange({
        startDate: date,
        endDate: null
      });
      setDateSelectionStage('end');
    } else {
      // If end date is before start date, swap them
      if (customDateRange.startDate && date < customDateRange.startDate) {
        setCustomDateRange({
          startDate: date,
          endDate: customDateRange.startDate
        });
      } else {
        setCustomDateRange({
          ...customDateRange,
          endDate: date
        });
      }
      setDateSelectionStage('start'); // Reset for next selection
    }
  };

  // Reset date selection
  const resetDateSelection = () => {
    setCustomDateRange({
      startDate: null,
      endDate: null
    });
    setDateSelectionStage('start');
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Channel filter with checkboxes */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 px-3 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Channels</span>
            {selectedChannels.length > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 rounded-sm">
                {selectedChannels.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No channels found</CommandEmpty>
              <CommandGroup heading="Channels">
                <ScrollArea className="h-[200px]">
                  {safeChannels.map((channel) => (
                    <CommandItem
                      key={channel.id}
                      onSelect={() => handleChannelSelect(channel.id)}
                      className="flex items-center gap-2 py-2.5"
                    >
                      <Checkbox 
                        checked={selectedChannels.includes(channel.id)}
                        onCheckedChange={() => handleChannelSelect(channel.id)}
                        className="mr-1"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-muted">
                          {channel.thumbnail && (
                            <img 
                              src={channel.thumbnail} 
                              alt={channel.title} 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <span className="truncate">{channel.title}</span>
                      </div>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Date range filter with calendar */}
      <div className="flex gap-2">
        <Select
          value={dateRange}
          onValueChange={(value) => {
            setDateRange(value as any);
            if (value === 'custom') {
              setIsCalendarOpen(true);
            }
          }}
        >
          <SelectTrigger className="w-[130px] h-9">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="12h">Last 12 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="28d">Last 28 days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {dateRange === 'custom' && (
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                {customDateRange.startDate && customDateRange.endDate ? (
                  <span className="text-xs whitespace-nowrap">
                    {format(customDateRange.startDate, 'MMM d')} - {format(customDateRange.endDate, 'MMM d')}
                  </span>
                ) : customDateRange.startDate ? (
                  <span className="text-xs whitespace-nowrap">
                    {format(customDateRange.startDate, 'MMM d')} - Select end
                  </span>
                ) : (
                  <span className="text-xs">Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 space-y-3">
                <div className="text-sm font-medium">
                  {dateSelectionStage === 'start' ? 'Select start date' : 'Select end date'}
                </div>
                {customDateRange.startDate && customDateRange.endDate && (
                  <div className="bg-muted p-2 rounded-md text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>From: {format(customDateRange.startDate, 'PPP')}</span>
                      <span>To: {format(customDateRange.endDate, 'PPP')}</span>
                    </div>
                    <div className="font-semibold">
                      {daysDifference} day{daysDifference !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
                <Calendar
                  mode="single"
                  selected={dateSelectionStage === 'start' ? customDateRange.startDate || undefined : customDateRange.endDate || undefined}
                  onSelect={handleDateSelect}
                  className="rounded-md border pointer-events-auto"
                />
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={resetDateSelection}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setIsCalendarOpen(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

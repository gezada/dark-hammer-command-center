
import React, { useState, useEffect } from 'react';
import { Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { differenceInDays, format } from 'date-fns';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const ChannelFilter = () => {
  const { 
    channels, 
    dateRange, 
    setDateRange, 
    customDateRange, 
    setCustomDateRange,
    selectedChannelId,
    setSelectedChannelId
  } = useStore();
  
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateSelectionStep, setDateSelectionStep] = useState<'start' | 'end'>('start');
  
  // Initialize selected channels when selectedChannelId changes
  useEffect(() => {
    if (selectedChannelId) {
      setSelectedChannels([selectedChannelId]);
    } else {
      setSelectedChannels([]);
    }
  }, [selectedChannelId]);
  
  // Update store when selected channels change
  useEffect(() => {
    // If multiple channels selected, set selectedChannelId to null
    // Otherwise set to the single selected channel
    if (selectedChannels.length === 1) {
      setSelectedChannelId(selectedChannels[0]);
    } else {
      setSelectedChannelId(null);
    }
  }, [selectedChannels, setSelectedChannelId]);
  
  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };
  
  const handleAllChannelsClick = () => {
    setSelectedChannels([]);
    setSelectedChannelId(null);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (dateSelectionStep === 'start') {
      setCustomDateRange({ startDate: date, endDate: null });
      setDateSelectionStep('end');
    } else {
      // If end date is before start date, swap them
      if (customDateRange.startDate && date < customDateRange.startDate) {
        setCustomDateRange({ startDate: date, endDate: customDateRange.startDate });
      } else {
        setCustomDateRange({ ...customDateRange, endDate: date });
      }
      setDateSelectionStep('start');
    }
  };
  
  const formatDateRange = () => {
    if (!customDateRange.startDate) return "Select dates";
    
    if (!customDateRange.endDate) {
      return `From ${format(customDateRange.startDate, 'dd MMM yyyy')}...`;
    }
    
    const days = differenceInDays(customDateRange.endDate, customDateRange.startDate) + 1;
    return `${format(customDateRange.startDate, 'dd MMM')} - ${format(customDateRange.endDate, 'dd MMM yyyy')} (${days} days)`;
  };
  
  // Only include connected channels
  const connectedChannels = channels?.filter(c => c.isConnected) || [];
  
  return (
    <div className="flex items-center gap-4">
      <Button 
        variant={selectedChannels.length === 0 ? "default" : "outline"} 
        size="sm" 
        className="gap-1.5"
        onClick={handleAllChannelsClick}
      >
        All Channels
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Channels
            {selectedChannels.length > 0 && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-[10px] text-primary-foreground">
                {selectedChannels.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <div className="p-2 border-b">
            <h4 className="font-medium text-sm">Select Channels</h4>
          </div>
          <ScrollArea className="h-56 custom-scrollbar">
            <div className="p-2">
              {connectedChannels && connectedChannels.length > 0 ? (
                connectedChannels.map((channel) => (
                  <div key={channel.id} className="flex items-center space-x-2 py-2">
                    <Checkbox 
                      id={`channel-${channel.id}`} 
                      checked={selectedChannels.includes(channel.id)}
                      onCheckedChange={() => handleChannelToggle(channel.id)}
                    />
                    <label 
                      htmlFor={`channel-${channel.id}`}
                      className="text-sm flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={channel.thumbnail} alt={channel.title} />
                        <AvatarFallback>{channel.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {channel.title}
                    </label>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-sm p-2">No channels found</div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="12h">Last 12 Hours</SelectItem>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="28d">Last 28 Days</SelectItem>
          <SelectItem value="custom" onClick={() => setCalendarOpen(true)}>Custom Range</SelectItem>
        </SelectContent>
      </Select>
      
      {dateRange === 'custom' && (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="w-[200px] justify-start text-left font-normal">
              {formatDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <div className="mb-2 pb-2 border-b">
              <div className="text-sm font-medium">
                {dateSelectionStep === 'start' ? 'Select start date' : 'Select end date'}
              </div>
              {customDateRange.startDate && !customDateRange.endDate && (
                <div className="text-xs text-muted-foreground mt-1">
                  Start: {format(customDateRange.startDate, 'dd MMM yyyy')}
                </div>
              )}
              {customDateRange.startDate && customDateRange.endDate && (
                <div className="text-xs mt-1">
                  <span className="text-muted-foreground">Period: </span>
                  <span>{format(customDateRange.startDate, 'dd MMM')} - {format(customDateRange.endDate, 'dd MMM')}</span>
                  <span className="text-muted-foreground ml-1">
                    ({differenceInDays(customDateRange.endDate, customDateRange.startDate) + 1} days)
                  </span>
                </div>
              )}
            </div>
            <Calendar
              mode="single"
              selected={dateSelectionStep === 'start' ? customDateRange.startDate || undefined : customDateRange.endDate || undefined}
              onSelect={handleDateSelect}
              initialFocus
              className="pointer-events-auto border rounded-md p-3"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

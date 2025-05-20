
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, differenceInDays, startOfMonth, startOfYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useStore } from "@/lib/store";

type DateRange = 'all' | '7d' | '28d' | '90d' | '365d' | 'month' | 'year' | 'custom';

export function DateRangeFilter() {
  const { dateRange, setDateRange, customDateRange, setCustomDateRange } = useStore();
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');

  // Set default to 'all' if not already set
  useEffect(() => {
    if (!dateRange) {
      setDateRange('all');
    }
  }, [dateRange, setDateRange]);

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (selecting === 'start') {
      setCustomDateRange({
        startDate: date,
        endDate: null
      });
      setSelecting('end');
    } else {
      // If the selected date is before start date, swap them
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
      setSelecting('start');
      setDateRange('custom');
      setOpen(false);
    }
  };

  // Reset selection when popover is closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        if (!customDateRange.endDate) {
          setSelecting('start');
        }
      }, 300);
    }
  }, [open, customDateRange]);

  // Calculate days between selected dates
  const daysBetween = customDateRange.startDate && customDateRange.endDate
    ? differenceInDays(customDateRange.endDate, customDateRange.startDate) + 1
    : 0;

  // Format for month filter label
  const currentMonthLabel = () => {
    const now = new Date();
    return format(now, 'MMM').toLowerCase() + '.';
  };

  // Format for year filter label
  const currentYearLabel = () => {
    return new Date().getFullYear().toString();
  };

  // Define filter options
  const filterOptions: {label: string, value: DateRange}[] = [
    { label: 'All', value: 'all' },
    { label: '7D', value: '7d' },
    { label: '28D', value: '28d' },
    { label: '90D', value: '90d' },
    { label: '365D', value: '365d' },
    { label: currentMonthLabel(), value: 'month' },
    { label: currentYearLabel(), value: 'year' },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant={dateRange === option.value ? 'default' : 'outline'}
          className="h-9"
          onClick={() => setDateRange(option.value)}
        >
          {option.label}
        </Button>
      ))}
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant={dateRange === 'custom' ? 'default' : 'outline'}
            className="h-9"
          >
            Custom
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="space-y-2 p-2">
            <div className="flex justify-between px-3 pt-2 text-sm font-medium">
              <div className="flex flex-col">
                <span>Select {selecting === 'start' ? 'start' : 'end'} date</span>
                {customDateRange.startDate && !customDateRange.endDate && (
                  <span className="text-xs text-muted-foreground">
                    Start: {format(customDateRange.startDate, 'MMM dd, yyyy')}
                  </span>
                )}
                {customDateRange.startDate && customDateRange.endDate && (
                  <div className="text-xs text-muted-foreground">
                    <div>Start: {format(customDateRange.startDate, 'MMM dd, yyyy')}</div>
                    <div>End: {format(customDateRange.endDate, 'MMM dd, yyyy')}</div>
                    <div className="text-primary font-medium">{daysBetween} day{daysBetween !== 1 ? 's' : ''}</div>
                  </div>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => {
                  setCustomDateRange({ startDate: null, endDate: null });
                  setSelecting('start');
                }}
              >
                Reset
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={selecting === 'start' ? customDateRange.startDate || undefined : customDateRange.endDate || undefined}
              onSelect={handleSelect}
              initialFocus
              className={cn("p-3 pointer-events-auto border-t")}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

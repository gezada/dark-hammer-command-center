
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useStore } from "@/lib/store";

export function DateRangeFilter() {
  const { dateRange, setDateRange } = useStore();

  // Set default to 'all' if not already set
  useEffect(() => {
    if (!dateRange) {
      setDateRange('all');
    }
  }, [dateRange, setDateRange]);

  // Format for month filter label
  const currentMonthLabel = () => {
    const now = new Date();
    return format(now, 'MMM').toLowerCase() + '.';
  };

  // Format for year filter label
  const currentYearLabel = () => {
    return new Date().getFullYear().toString();
  };

  // Define filter options with "All" last as requested
  const filterOptions = [
    { label: '7D', value: '7d' },
    { label: '28D', value: '28d' },
    { label: '90D', value: '90d' },
    { label: '365D', value: '365d' },
    { label: currentMonthLabel(), value: 'month' },
    { label: currentYearLabel(), value: 'year' },
    { label: 'All', value: 'all' },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant={dateRange === option.value ? 'default' : 'outline'}
          className="h-9 min-w-[50px]" // Fixed minimum width for consistent spacing
          onClick={() => setDateRange(option.value as typeof dateRange)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

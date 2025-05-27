
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/lib/store";

interface DashboardFiltersProps {
  selectedTimeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export function DashboardFilters({ selectedTimeRange, onTimeRangeChange }: DashboardFiltersProps) {
  const { channels, selectedChannelId, setSelectedChannelId } = useStore();

  const timeRanges = [
    { value: "7d", label: "7d" },
    { value: "28d", label: "28d" },
    { value: "90d", label: "90d" },
    { value: "365d", label: "365d" },
    { value: "may2025", label: "May 2025" },
    { value: "all", label: "All time" }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
      <div className="flex flex-wrap gap-3">
        {timeRanges.map((range) => (
          <Button
            key={range.value}
            variant={selectedTimeRange === range.value ? "default" : "ghost"}
            size="sm"
            onClick={() => onTimeRangeChange(range.value)}
            className={`transition-all duration-200 ease-out rounded-full px-4 ${
              selectedTimeRange === range.value ? 
              "bg-primary hover:bg-primary/90 text-primary-foreground" : 
              "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
            aria-pressed={selectedTimeRange === range.value}
          >
            {range.label}
          </Button>
        ))}
      </div>
      <Select 
        value={selectedChannelId || "all"} 
        onValueChange={(value) => setSelectedChannelId(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-[200px] glass-card">
          <SelectValue placeholder="All Channels" />
        </SelectTrigger>
        <SelectContent className="glass-card">
          <SelectItem value="all">All Channels</SelectItem>
          {channels?.map((channel) => (
            <SelectItem key={channel.id} value={channel.id}>
              {channel.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

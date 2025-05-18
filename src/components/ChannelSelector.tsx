
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const { channels, selectedChannelId, setSelectedChannelId } = useStore();
  const [value, setValue] = useState(selectedChannelId || "");
  
  // Update local state when global state changes
  useEffect(() => {
    setValue(selectedChannelId || "");
  }, [selectedChannelId]);
  
  // If no connected channels, show "all channels"
  const connectedChannels = channels.filter(c => c.isConnected);
  const hasConnectedChannels = connectedChannels.length > 0;
  
  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setSelectedChannelId(currentValue === value ? null : currentValue);
    setOpen(false);
  };
  
  const selectedChannel = channels.find(c => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between text-left"
        >
          {selectedChannel ? (
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={selectedChannel.thumbnail} alt={selectedChannel.title} />
                <AvatarFallback>{selectedChannel.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="truncate">{selectedChannel.title}</span>
            </div>
          ) : (
            "All Channels"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search channel..." />
          <CommandEmpty>No channel found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              key="all-channels"
              value="all-channels"
              onSelect={() => handleSelect("")}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  !value ? "opacity-100" : "opacity-0"
                )}
              />
              All Channels
            </CommandItem>
            {connectedChannels.map((channel) => (
              <CommandItem
                key={channel.id}
                value={channel.id}
                onSelect={() => handleSelect(channel.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === channel.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={channel.thumbnail} alt={channel.title} />
                  <AvatarFallback>{channel.title.charAt(0)}</AvatarFallback>
                </Avatar>
                {channel.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

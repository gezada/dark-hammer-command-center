
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
import { useNavigate } from "react-router-dom";

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const { channels = [], selectedChannelId, setSelectedChannelId } = useStore();
  const [value, setValue] = useState(selectedChannelId || "");
  const navigate = useNavigate();
  
  // Update local state when global state changes
  useEffect(() => {
    setValue(selectedChannelId || "");
  }, [selectedChannelId]);
  
  // Ensure channels is always an array, even if undefined
  const safeChannels = Array.isArray(channels) ? channels : [];
  
  // Filter connected channels with null check
  const connectedChannels = safeChannels.filter(c => c && c.isConnected) || [];
  const hasConnectedChannels = connectedChannels.length > 0;
  
  const handleSelect = (currentValue: string) => {
    if (currentValue === value) {
      setValue("");
      setSelectedChannelId(null);
    } else {
      setValue(currentValue);
      setSelectedChannelId(currentValue);
    }
    setOpen(false);
    
    // If no channels are connected, redirect to the channels page
    if (!hasConnectedChannels && currentValue === "add-channel") {
      navigate("/channels");
    }
  };
  
  // Make sure we safely find the channel
  const selectedChannel = safeChannels.find(c => c && c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left"
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
            "Todos os Canais"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Buscar canal..." />
          <CommandEmpty>
            {hasConnectedChannels ? "Nenhum canal encontrado." : (
              <div className="py-2 text-center">
                <p>Nenhum canal conectado</p>
                <Button 
                  variant="link" 
                  className="mt-1 text-primary" 
                  onClick={() => handleSelect("add-channel")}
                >
                  Adicionar Canal
                </Button>
              </div>
            )}
          </CommandEmpty>
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
              Todos os Canais
            </CommandItem>
            {/* Safe rendering of connected channels with null checks */}
            {connectedChannels.map((channel) => channel && (
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

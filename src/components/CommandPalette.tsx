import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  BarChart2,
  MessageSquare,
  Settings,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

// Define interfaces for our command types
interface CommandItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

interface NavigationCommand extends CommandItem {
  shortcut?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  // We need to keep track of whether the component is mounted in a browser environment
  const [isMounted, setIsMounted] = useState(false);

  // Define navigation commands within the component to ensure they're available
  const navigationCommands: NavigationCommand[] = [
    {
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      label: "Go to Dashboard",
      shortcut: "G D",
      action: () => navigate("/dashboard")
    },
    {
      icon: <Upload className="mr-2 h-4 w-4" />,
      label: "Go to Upload & Schedule",
      shortcut: "G U",
      action: () => navigate("/upload")
    },
    {
      icon: <BarChart2 className="mr-2 h-4 w-4" />,
      label: "Go to Analytics",
      shortcut: "G A",
      action: () => navigate("/analytics")
    },
    {
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
      label: "Go to Comments",
      shortcut: "G C",
      action: () => navigate("/comments")
    }
  ];

  // Define account commands
  const accountCommands: CommandItem[] = [
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: "Settings",
      action: () => navigate("/settings")
    }
  ];

  // Use a callback for running commands to ensure consistency
  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  // Set mounted state after component is mounted
  useEffect(() => {
    // Delay setting the mounted state to ensure the DOM is fully ready
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  // Set up keyboard shortcut listener only after component is mounted
  useEffect(() => {
    if (!isMounted) return;
    
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isMounted]);

  // Only render when component is fully mounted
  if (!isMounted) {
    return null;
  }

  // To ensure cmdk always has defined values to work with
  const safeNavigationCommands = navigationCommands || [];
  const safeAccountCommands = accountCommands || [];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Only render navigation commands if they exist */}
        {safeNavigationCommands.length > 0 && (
          <CommandGroup heading="Navigation">
            {safeNavigationCommands.map((command, index) => (
              <CommandItem
                key={`nav-${index}`}
                onSelect={() => runCommand(command.action)}
              >
                {command.icon}
                <span>{command.label}</span>
                {command.shortcut && <CommandShortcut>{command.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandSeparator />
        
        {/* Only render account commands if they exist */}
        {safeAccountCommands.length > 0 && (
          <CommandGroup heading="Account">
            {safeAccountCommands.map((command, index) => (
              <CommandItem
                key={`account-${index}`}
                onSelect={() => runCommand(command.action)}
              >
                {command.icon}
                <span>{command.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}

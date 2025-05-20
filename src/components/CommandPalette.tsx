
import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  // Ensure the component is fully mounted before rendering any cmdk elements
  useEffect(() => {
    // This ensures we're in a browser environment and DOM is ready
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100); // Small delay to ensure everything is fully ready
    
    return () => clearTimeout(timer);
  }, []);

  // Set up keyboard shortcut listener
  useEffect(() => {
    // Only add event listener if component is mounted
    if (!mounted) return;
    
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [mounted]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  // Define navigation commands
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

  // Only render when mounted and with proper checks
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Only render when mounted is true */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Make sure navigationCommands exists before mapping */}
          {navigationCommands && navigationCommands.length > 0 && (
            <CommandGroup heading="Navigation">
              {navigationCommands.map((command, index) => (
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
          
          {/* Make sure accountCommands exists before mapping */}
          {accountCommands && accountCommands.length > 0 && (
            <CommandGroup heading="Account">
              {accountCommands.map((command, index) => (
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
    </>
  );
}

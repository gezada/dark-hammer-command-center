
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  LayoutDashboard,
  Upload,
  BarChart2,
  MessageSquare,
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
interface NavigationCommand {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  action: () => void;
}

interface AccountCommand {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  // Create navigation commands ahead of time to avoid undefined
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

  const accountCommands: AccountCommand[] = [
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: "Settings",
      action: () => navigate("/settings")
    }
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

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

        <CommandSeparator />

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
      </CommandList>
    </CommandDialog>
  );
}

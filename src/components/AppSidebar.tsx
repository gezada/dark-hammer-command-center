
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { 
  BarChart2, 
  ChevronLeft, 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Upload,
  Globe,
  Calendar,
  Menu
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sidebar navigation item type
type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
  count?: number;
};

export const AppSidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, userName } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Define navigation items
  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
    },
    {
      label: 'Upload',
      icon: <Upload size={20} />,
      path: '/upload',
    },
    {
      label: 'Schedule',
      icon: <Calendar size={20} />,
      path: '/schedule',
    },
    {
      label: 'Analytics',
      icon: <BarChart2 size={20} />,
      path: '/analytics',
    },
    {
      label: 'Comments',
      icon: <MessageSquare size={20} />,
      path: '/comments',
      count: 5,
    },
    {
      label: 'Channels',
      icon: <Globe size={20} />,
      path: '/channels',
    },
  ];
  
  // Define bottom navigation items (settings, etc.)
  const bottomNavItems: NavItem[] = [
    {
      label: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
    },
  ];
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const userInitials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Tooltip key={item.path} delayDuration={300}>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center w-full rounded-md px-2 py-2 text-sm font-medium transition-colors relative",
              isActive
                ? "bg-accent text-accent-foreground"
                : hoveredItem === item.path
                ? "bg-accent/50 text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
              sidebarCollapsed ? "justify-center" : "justify-start"
            )}
            onClick={() => handleNavigation(item.path)}
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center">
              {item.icon}
              {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
            </div>
            
            {!sidebarCollapsed && item.count && (
              <span className="ml-auto bg-primary text-primary-foreground text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                {item.count}
              </span>
            )}
            
            {sidebarCollapsed && item.count && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center translate-x-1/3 -translate-y-1/3">
                {item.count}
              </span>
            )}
          </div>
        </TooltipTrigger>
        {sidebarCollapsed && (
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    );
  };
  
  return (
    <div
      className={cn(
        "fixed inset-y-0 z-50 flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="border-b px-2 py-2 h-14 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="text-xl font-bold pl-1">Dark Hammer</div>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn("rounded-md", sidebarCollapsed && "mx-auto w-full")}
            >
              {sidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{sidebarCollapsed ? "Expand" : "Collapse"} sidebar</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="flex-1 overflow-auto px-3 py-4">
        <div className="space-y-1">
          {navItems.map(renderNavItem)}
        </div>
      </div>
      
      <div className="mt-auto mb-4 px-3 space-y-1">
        {bottomNavItems.map(renderNavItem)}
      </div>
      
      <div className="px-3 pb-4">
        <div className={cn(
          "flex items-center bg-accent/50 rounded-md py-2 cursor-pointer",
          sidebarCollapsed ? "justify-center px-2" : "justify-start px-4 gap-2"
        )}>
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          {!sidebarCollapsed && (
            <div className="truncate">
              <div className="font-medium text-sm truncate">{userName}</div>
              <div className="text-xs text-muted-foreground">Free Plan</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

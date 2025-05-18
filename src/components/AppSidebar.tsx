
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "./ui/button";

export function AppSidebar() {
  const { sidebarCollapsed, toggleSidebar } = useStore();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      title: 'Upload & Schedule',
      icon: Upload,
      path: '/upload',
    },
    {
      title: 'Analytics',
      icon: BarChart2,
      path: '/analytics',
    },
    {
      title: 'Comments',
      icon: MessageSquare,
      path: '/comments',
    },
  ];

  return (
    <TooltipProvider>
      <div className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        sidebarCollapsed ? "w-[60px]" : "w-[240px]"
      )}>
        <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
          {!sidebarCollapsed && (
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Dark Hammer</h1>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">DH</span>
            </Link>
          )}
        </div>
        
        <nav className="flex-1 space-y-1 px-2 py-4">
          {menuItems.map((item) => (
            <div key={item.path}>
              {sidebarCollapsed ? (
                <Tooltip key={item.path} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 mx-auto" />
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        
        <div className="p-2 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="w-full flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      <div 
        className={cn(
          "transition-all duration-300", 
          sidebarCollapsed ? "ml-[60px]" : "ml-[240px]"
        )}
      />
    </TooltipProvider>
  );
}

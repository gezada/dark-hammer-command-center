
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  BarChart2, 
  MessageSquare, 
  Settings,
  LogIn,
  X,
  PlusCircle,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useEffect } from "react";

export function AppSidebar() {
  const { sidebarCollapsed, toggleSidebar, setIsAuthenticated, channels = [], userName } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Update CSS variable for sidebar width
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      sidebarCollapsed ? '0px' : '240px'
    );
  }, [sidebarCollapsed]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/dashboard");
    toast.success("Logout realizado com sucesso");
  };

  // Count unread comments as a simple example
  const unreadComments = 5;

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      order: 1,
    },
    {
      title: 'Analytics',
      icon: BarChart2,
      path: '/analytics',
      order: 2,
    },
    {
      title: 'Comments',
      icon: MessageSquare,
      path: '/comments',
      badge: unreadComments,
      order: 3,
    },
    {
      title: 'Schedule',
      icon: Calendar,
      path: '/schedule',
      order: 4,
    },
  ];

  const bottomMenuItems = [
    {
      title: 'Upload',
      icon: Upload,
      path: '/upload',
      outlined: true,
      order: 5,
    },
    {
      title: 'My Channels',
      icon: PlusCircle,
      path: '/channels',
      accentColor: true,
      order: 6,
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/settings',
      order: 7,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[240px] flex flex-col glass-card sidebar-drawer",
          !sidebarCollapsed && "open"
        )}
      >
        <div className="flex items-center justify-between h-16 border-b border-sidebar-border px-4">
          <Link to="/dashboard" className="flex items-center">
            <h1 className="text-xl font-semibold text-primary truncate">Dark Hammer</h1>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-10 h-10 flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto custom-scrollbar">
          <TooltipProvider>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors relative",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <item.icon className="h-5 w-5 mr-2" />
                <span>{item.title}</span>
                {item.badge && (
                  <Badge className="ml-auto bg-primary text-white">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </TooltipProvider>
        </nav>
        
        {/* Bottom menu items */}
        <div className="p-2 space-y-2 mb-2 mt-auto">
          <TooltipProvider>
            {bottomMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : item.accentColor 
                      ? "text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  item.outlined && !isActive(item.path) && "border border-primary"
                )}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <item.icon className={cn(
                  "h-5 w-5 mr-2",
                  item.accentColor && !isActive(item.path) && "text-primary",
                  isActive(item.path) && item.accentColor && "text-primary-foreground"
                )} />
                <span>{item.title}</span>
              </Link>
            ))}
          </TooltipProvider>
        </div>
        
        <div className="p-2 border-t border-sidebar-border">
          <div className="flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center flex-1">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{userName?.[0] || "JD"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">{userName || "John Doe"}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-2 h-10 w-10"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

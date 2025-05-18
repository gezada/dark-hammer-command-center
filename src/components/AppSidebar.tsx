
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
  Menu,
  PlusCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function AppSidebar() {
  const { sidebarCollapsed, toggleSidebar, setIsAuthenticated, channels = [], userName } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

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
      badge: unreadComments,
    },
  ];

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      sidebarCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border px-4">
        {!sidebarCollapsed ? (
          <Link to="/dashboard" className="flex items-center">
            <h1 className="text-xl font-bold text-primary truncate">Dark Hammer</h1>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            sidebarCollapsed && "mx-auto"
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        <TooltipProvider>
          {menuItems.map((item) => (
            <div key={item.path}>
              {sidebarCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 mx-auto" />
                      {item.badge && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                          {item.badge}
                        </Badge>
                      )}
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
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-primary text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )}
            </div>
          ))}
        </TooltipProvider>
      </nav>
      
      {/* Moved Settings and Add Channel to bottom */}
      <div className="p-2 space-y-2 mb-2">
        <TooltipProvider>
          {/* Add Channel button with red styling */}
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/channels"
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                    isActive("/channels") && "bg-primary text-primary-foreground"
                  )}
                >
                  <PlusCircle className="h-5 w-5 mx-auto text-primary" />
                  <span className="sr-only">Adicionar Canal</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Adicionar Canal
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              to="/channels"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                isActive("/channels") && "bg-primary text-primary-foreground"
              )}
            >
              <PlusCircle className="h-5 w-5 mr-2 text-primary" />
              <span>Adicionar Canal</span>
            </Link>
          )}
          
          {/* Settings button */}
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/settings"
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                    isActive("/settings") && "bg-primary text-primary-foreground"
                  )}
                >
                  <Settings className="h-5 w-5 mx-auto" />
                  <span className="sr-only">Configurações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Configurações
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              to="/settings"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                isActive("/settings") && "bg-primary text-primary-foreground"
              )}
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Configurações</span>
            </Link>
          )}
        </TooltipProvider>
      </div>
      
      <div className="p-2 border-t border-sidebar-border">
        <div className="flex items-center justify-between p-2 rounded-md">
          {!sidebarCollapsed && (
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
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-2"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="flex items-center justify-between w-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{userName?.[0] || "JD"}</AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

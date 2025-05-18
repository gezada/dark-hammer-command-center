
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
  User,
  PlusCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppSidebar() {
  const { sidebarCollapsed, toggleSidebar, setIsAuthenticated } = useStore();
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
    <div className={cn(
      "fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      sidebarCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between h-16 border-b border-sidebar-border px-4">
        {!sidebarCollapsed && (
          <Link to="/dashboard" className="flex items-center">
            <h1 className="text-xl font-bold text-primary truncate">Dark Hammer</h1>
          </Link>
        )}
        {sidebarCollapsed && (
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-primary">DH</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
        </TooltipProvider>
        
        {/* Add Channel button */}
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
            {!sidebarCollapsed ? "Canais" : ""}
          </p>
          <TooltipProvider>
            {sidebarCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/channels"
                    className="flex items-center px-3 py-2 mt-1 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  >
                    <PlusCircle className="h-5 w-5 mx-auto" />
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
                className="flex items-center px-3 py-2 mt-1 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                <span>Adicionar Canal</span>
              </Link>
            )}
          </TooltipProvider>
        </div>
        
        {/* Settings button */}
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
            {!sidebarCollapsed ? "Configurações" : ""}
          </p>
          <TooltipProvider>
            {sidebarCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 mt-1 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
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
                className="flex items-center px-3 py-2 mt-1 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Settings className="h-5 w-5 mr-2" />
                <span>Configurações</span>
              </Link>
            )}
          </TooltipProvider>
        </div>
      </nav>
      
      <div className="p-2 border-t border-sidebar-border">
        <div className="flex items-center p-2 rounded-md">
          {!sidebarCollapsed && (
            <div className="flex items-center flex-1">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                <p className="text-xs text-sidebar-foreground/60">john@example.com</p>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <Avatar className="h-8 w-8 mx-auto">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          )}
        </div>
        <TooltipProvider>
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-2"
                >
                  <LogIn className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Logout
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="w-full flex items-center justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-2"
            >
              <span>Logout</span>
              <LogIn className="h-5 w-5" />
            </Button>
          )}
        </TooltipProvider>
      </div>
    </div>
  );
}

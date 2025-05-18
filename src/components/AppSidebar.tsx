
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
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";

export function AppSidebar() {
  const { sidebarCollapsed, toggleSidebar, setIsAuthenticated } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
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
      "fixed inset-y-0 left-0 z-20 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      sidebarCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between h-16 border-b border-sidebar-border px-4">
        {!sidebarCollapsed && (
          <Link to="/dashboard" className="flex items-center">
            <h1 className="text-xl font-bold text-primary">Dark Hammer</h1>
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
      
      <nav className="flex-1 space-y-1 px-2 py-4">
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
      </nav>
      
      <div className="p-2 border-t border-sidebar-border">
        <TooltipProvider>
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
              className="w-full flex items-center justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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

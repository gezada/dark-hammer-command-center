
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { Upload, Menu } from "lucide-react";
import { useStore } from "@/lib/store";

interface AppHeaderProps {
  showFilters?: boolean;
}

export function AppHeader({ showFilters = true }: AppHeaderProps) {
  const location = useLocation();
  const path = location.pathname;
  const isUploadActive = path === "/upload";
  const { toggleSidebar } = useStore();
  
  return (
    <header 
      className="fixed top-0 w-full z-40 h-16 backdrop-blur-sm border-b border-border/40"
      style={{ 
        background: 'linear-gradient(180deg, #09090d 0%, #0d0d12 30%, #0e0e15 100%)',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.25)'
      }}
    >
      <div 
        className="flex h-16 items-center px-4 gap-4 justify-between transition-all duration-300"
        style={{ paddingLeft: 'max(1rem, calc(1rem + var(--sidebar-width)))' }}
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="text-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/upload">
            <Button 
              size="sm" 
              className={cn(
                "gap-1 bg-primary hover:bg-primary/90 text-primary-foreground border-0",
                isUploadActive && "bg-primary/80"
              )}
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

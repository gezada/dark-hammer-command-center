
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { Upload } from "lucide-react";

interface AppHeaderProps {
  showFilters?: boolean;
}

export function AppHeader({ showFilters = true }: AppHeaderProps) {
  const location = useLocation();
  const path = location.pathname;
  const isUploadActive = path === "/upload";
  
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-16 items-center px-4 gap-4 justify-between">
        {/* Empty left side since logo is now in sidebar */}
        <div></div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full">Live Beta</span>
          <ThemeToggle />
          <Link to="/upload">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "gap-1 border-primary py-3",
                isUploadActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-transparent hover:bg-primary hover:text-primary-foreground"
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

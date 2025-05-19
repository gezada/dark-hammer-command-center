
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
  
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-16 items-center px-4 gap-4 justify-end">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/upload">
            <Button variant="outline" size="sm" className="gap-1">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

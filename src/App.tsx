
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { CommandPalette } from "@/components/CommandPalette";
import { AppSidebar } from "@/components/AppSidebar";

// Pages
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CommentsPage from "./pages/CommentsPage";
import ChannelsPage from "./pages/ChannelsPage";
import SettingsPage from "./pages/SettingsPage";
import SchedulePage from "./pages/SchedulePage";
import NotFound from "./pages/NotFound";

// Create QueryClient outside the component
const queryClient = new QueryClient();

const App = () => {
  // Move the useStore hook inside the component body
  const { theme } = useStore();
  
  // Apply theme on initial load
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex w-full overflow-hidden min-h-screen">
            <CommandPalette />
            <AppSidebar />
            <div className="flex flex-col flex-grow">
              <Routes>
                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Main routes */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/comments" element={<CommentsPage />} />
                <Route path="/channels" element={<ChannelsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                
                {/* 404 page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

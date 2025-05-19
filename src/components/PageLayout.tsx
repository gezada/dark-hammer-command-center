
import { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store";
import { ChannelFilter } from "@/components/ChannelFilter";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  showDateFilter?: boolean;
  showChannelFilter?: boolean;
  showTabs?: boolean;
}

export function PageLayout({ 
  title, 
  children, 
  showDateFilter = true,
  showChannelFilter = true,
  showTabs = false
}: PageLayoutProps) {
  const { sidebarCollapsed } = useStore();

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            {showChannelFilter && <ChannelFilter />}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-130px)] custom-scrollbar pr-4">
          {children}
        </ScrollArea>
      </main>
    </div>
  );
}

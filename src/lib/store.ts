
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Channel = {
  id: string;
  title: string;
  thumbnail: string;
  isConnected: boolean;
};

export type ThemeMode = 'dark' | 'light';

type DateRange = '12h' | '7d' | '28d' | 'custom';

interface DarkHammerState {
  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  
  // User & Auth
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  
  // Channels
  channels: Channel[];
  addChannel: (channel: Channel) => void;
  removeChannel: (channelId: string) => void;
  toggleChannelConnection: (channelId: string) => void;
  
  // Filters
  selectedChannelId: string | null;
  setSelectedChannelId: (id: string | null) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  
  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<DarkHammerState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      // User & Auth
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      
      // Channels
      channels: [],
      addChannel: (channel) => 
        set((state) => ({ 
          channels: [...state.channels, channel] 
        })),
      removeChannel: (channelId) => 
        set((state) => ({ 
          channels: state.channels.filter(c => c.id !== channelId) 
        })),
      toggleChannelConnection: (channelId) => 
        set((state) => ({ 
          channels: state.channels.map(c => 
            c.id === channelId ? { ...c, isConnected: !c.isConnected } : c
          ) 
        })),
      
      // Filters
      selectedChannelId: null,
      setSelectedChannelId: (id) => set({ selectedChannelId: id }),
      dateRange: '7d',
      setDateRange: (range) => set({ dateRange: range }),
      
      // UI State
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: 'dark-hammer-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        selectedChannelId: state.selectedChannelId,
        dateRange: state.dateRange
      }),
    }
  )
);

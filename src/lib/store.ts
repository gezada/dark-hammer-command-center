
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

type DateRangeCustom = {
  startDate: Date | null;
  endDate: Date | null;
};

interface DarkHammerState {
  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  
  // User & Auth
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  
  // API Configuration
  youtubeApiKey: string | null;
  setYoutubeApiKey: (key: string) => void;
  
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
  customDateRange: DateRangeCustom;
  setCustomDateRange: (range: DateRangeCustom) => void;
  
  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  calendarOpen: boolean;
  setCalendarOpen: (isOpen: boolean) => void;
}

export const useStore = create<DarkHammerState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      // User & Auth
      isAuthenticated: true, // Setting default to true to skip auth
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      
      // API Configuration
      youtubeApiKey: null,
      setYoutubeApiKey: (key) => set({ youtubeApiKey: key }),
      
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
      customDateRange: {
        startDate: null,
        endDate: null
      },
      setCustomDateRange: (range) => set({ customDateRange: range }),
      
      // UI State
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      calendarOpen: false,
      setCalendarOpen: (isOpen) => set({ calendarOpen: isOpen }),
    }),
    {
      name: 'dark-hammer-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        selectedChannelId: state.selectedChannelId,
        dateRange: state.dateRange,
        youtubeApiKey: state.youtubeApiKey,
        customDateRange: state.customDateRange,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

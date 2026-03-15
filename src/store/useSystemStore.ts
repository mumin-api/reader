import { create } from 'zustand';
import { hadithApi } from '../lib/api/client';

interface SystemStatus {
  search: boolean;
  ai: boolean;
  maintenance: boolean;
}

interface SystemStore {
  status: SystemStatus;
  isLoading: boolean;
  lastUpdated: number;
  fetchStatus: () => Promise<void>;
}

export const useSystemStore = create<SystemStore>((set, get) => ({
  status: {
    search: true,
    ai: true,
    maintenance: false,
  },
  isLoading: false,
  lastUpdated: 0,
  fetchStatus: async () => {
    // Only fetch if last updated more than 1 minute ago
    if (Date.now() - get().lastUpdated < 60000) return;

    set({ isLoading: true });
    try {
      const status = await hadithApi.getSystemStatus();
      set({ status, lastUpdated: Date.now() });
    } catch (error) {
      console.error('Failed to fetch system status:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

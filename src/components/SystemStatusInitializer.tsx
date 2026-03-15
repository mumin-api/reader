'use client';

import { useEffect } from 'react';
import { useSystemStore } from '../store/useSystemStore';

export const SystemStatusInitializer = () => {
  const fetchStatus = useSystemStore((state) => state.fetchStatus);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return null;
};

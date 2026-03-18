'use client';

import React from 'react';
import { useReadingSettings } from '@/store/useReadingSettings';
import { useSystemStore } from '@/store/useSystemStore';
import { MaintenanceBanner } from './MaintenanceBanner';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface LayoutWrapperProps {
  children: React.ReactNode;
  cinematicNavbar: React.ReactNode;
  classicNavbar: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ 
  children, 
  cinematicNavbar, 
  classicNavbar
}) => {
  const { uiVariant } = useReadingSettings();
  const { status: systemStatus } = useSystemStore();
  const t = useTranslations('Errors');
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // For SSR or Mobile, always show classic layout to ensure content is visible and fits the screen
  if (!mounted || isMobile || uiVariant === 'classic') {
    return (
      <>
        {classicNavbar}
        <main className={cn(isMobile ? "pb-24 pt-16" : "pt-20")}>
          {systemStatus.maintenance && (
            <div className="max-w-7xl mx-auto px-4 mb-6">
              <MaintenanceBanner 
                isVisible={true}
                featureName={t('server')}
                type="error"
                message={t('maintenanceDescription')}
              />
            </div>
          )}
          {children}
        </main>
      </>
    );
  }

  if (uiVariant === 'cinematic') {
    return (
      <div className="flex min-h-screen">
        {cinematicNavbar}
        <main className="flex-1 lg:pl-24 transition-all duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      {classicNavbar}
      <main className="pt-20">
        {children}
      </main>
    </>
  );
};

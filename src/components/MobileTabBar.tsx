'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/lib/navigation';
import { Home, BookOpen, Shuffle, Bookmark, Settings, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { SearchBar } from './SearchBar';
import { useReadingSettings } from '@/store/useReadingSettings';
import { useSystemStore } from '@/store/useSystemStore';

export const MobileTabBar: React.FC = () => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const { toggleSettings } = useUIStore();
  const { uiVariant } = useReadingSettings();
  const { status: systemStatus } = useSystemStore();
  
  // Scroll direction state tracking
  const [isVisible, setIsVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('collections'), href: '/collections', icon: BookOpen },
    { name: t('random'), href: '/random', icon: Shuffle },
    { name: t('bookmarks'), href: '/bookmarks', icon: Bookmark },
  ];

  if (pathname.includes('/not-available')) {
    return null;
  }

  return (
    <>
      {/* Full Screen Mobile Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={cn(
               "fixed inset-0 z-[100] md:hidden pt-20 px-4",
               uiVariant === 'cinematic' && "glass-cinematic"
            )}
            style={{ backgroundColor: uiVariant === 'cinematic' ? 'transparent' : 'var(--page-bg)' }}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-display font-bold" style={{ color: 'var(--page-text)' }}>
                {t('search_title') || 'Search Library'}
              </span>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className={cn(
                   "text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full cursor-pointer transition-all",
                   uiVariant === 'cinematic'
                    ? "text-white/80 bg-white/10 hover:bg-white/20"
                    : "text-[var(--page-text)] opacity-60 hover:opacity-100 bg-emerald-500/10"
                )}
              >
                {t('close') || 'Close'}
              </button>
            </div>
            <SearchBar 
              autoFocus={true} 
              onClose={() => setIsSearchOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible && !isSearchOpen ? 0 : 200 }}
        transition={{ duration: 0.3, ease: 'circOut' }}
        className="fixed bottom-0 left-0 right-0 z-[90] md:hidden pointer-events-none pb-6"
      >
        <div className="px-4 pointer-events-auto w-full relative">
          
          {/* Floating Search Pill */}
          <div className="absolute left-4 right-4 -top-14 flex justify-center">
             <button
                onClick={() => systemStatus.search && setIsSearchOpen(true)}
                disabled={!systemStatus.search}
                className={cn(
                   "flex items-center gap-3 w-full max-w-sm h-12 px-4 rounded-full shadow-lg border backdrop-blur-xl transition-all active:scale-95",
                   uiVariant === 'cinematic'
                       ? "glass-cinematic border-white/10 text-white/80"
                       : "bg-white/90 dark:bg-[#0a1a16]/90 border-emerald-900/10 dark:border-emerald-500/20 text-[var(--page-text)] opacity-80"
                )}
             >
                <Search className={cn("w-5 h-5", systemStatus.search ? (uiVariant === 'cinematic' ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400") : "text-gray-400")} />
                <span className="text-sm font-medium">
                    {systemStatus.search ? (t('search_placeholder') || 'Search...') : (t('maintenance') || 'Maintenance')}
                </span>
             </button>
          </div>

          {/* Bottom Tab Bar Container */}
          <div className={cn(
            "flex items-center justify-between w-full h-16 px-2 backdrop-blur-2xl border rounded-3xl transition-all shadow-xl",
            uiVariant === 'cinematic'
                ? "glass-cinematic border-white/10"
                : "bg-white/95 dark:bg-[#0a1a16]/95 border-emerald-900/10 dark:border-emerald-500/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
          )}>
            
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  onClick={() => setIsSearchOpen(false)}
                  href={link.href}
                  className="relative flex items-center justify-center flex-1 h-full active:scale-95 transition-transform"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-tab-indicator"
                      className={cn(
                        "absolute inset-x-2 inset-y-1 rounded-2xl pointer-events-none",
                        uiVariant === 'cinematic' ? "bg-amber-500/10" : "bg-emerald-600/10 dark:bg-emerald-500/20"
                      )}
                    />
                  )}
                  <Icon 
                    className={cn(
                      "w-6 h-6 z-10 transition-all", 
                      isActive 
                        ? (uiVariant === 'cinematic' ? "text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "text-emerald-700 dark:text-emerald-400") 
                        : (uiVariant === 'cinematic' ? "text-white/30" : "text-emerald-900/40 dark:text-white/40")
                    )} 
                  />
                </Link>
              );
            })}

            {/* Settings Button */}
            <button
              onClick={() => {
                setIsSearchOpen(false);
                toggleSettings();
              }}
              className="relative flex items-center justify-center flex-1 h-full active:scale-95 transition-transform"
            >
              <Settings className={cn(
                "w-6 h-6 z-10",
                uiVariant === 'cinematic' ? "text-white/30" : "text-emerald-900/40 dark:text-white/40"
              )} />
            </button>
            
          </div>
        </div>
      </motion.div>
    </>
  );
};

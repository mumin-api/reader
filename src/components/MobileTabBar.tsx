'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/lib/navigation';
import { Home, BookOpen, Shuffle, Bookmark, Settings, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { SearchBar } from './SearchBar';

export const MobileTabBar: React.FC = () => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const { toggleSettings } = useUIStore();
  
  // Scroll direction state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we scroll down more than 50px, hide the bar.
      // If we scroll up, show the bar.
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('collections'), href: '/collections', icon: BookOpen },
    { name: t('random'), href: '/random', icon: Shuffle },
    { name: t('bookmarks'), href: '/bookmarks', icon: Bookmark },
  ];

  return (
    <>
      {/* Mobile Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-[90px] z-50 p-4 md:hidden"
          >
            <div className="bg-white/90 dark:bg-emerald-950/90 backdrop-blur-2xl p-4 rounded-3xl shadow-2xl border border-emerald-900/10 dark:border-emerald-500/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold opacity-70">Search Library</span>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full"
                >
                  Close
                </button>
              </div>
              <SearchBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 120 }}
        transition={{ duration: 0.3, ease: 'circOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden pointer-events-none pb-6"
      >
        <div className="px-4 pointer-events-auto w-full relative">
          
          {/* Floating Search Pill */}
          <div className="absolute left-4 right-4 -top-14 flex justify-center">
             <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-3 w-full max-w-sm h-12 px-4 rounded-full shadow-lg border backdrop-blur-xl transition-all active:scale-95 bg-white/90 dark:bg-emerald-950/90 border-emerald-900/10 dark:border-emerald-500/20 text-emerald-900/60 dark:text-emerald-50/60"
             >
                <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium">{t('search_placeholder') || 'Search...'}</span>
             </button>
          </div>

          {/* Bottom Tab Bar Container */}
          <div className="flex items-center justify-between w-full h-16 px-2 bg-white/95 dark:bg-[#0a1a16]/95 backdrop-blur-2xl border border-emerald-900/10 dark:border-emerald-500/10 rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
            
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  onClick={() => setIsSearchOpen(false)}
                  href={link.href}
                  className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 active:scale-95 transition-transform"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-tab-indicator"
                      className="absolute inset-x-2 inset-y-1 bg-emerald-600/10 dark:bg-emerald-500/20 rounded-2xl pointer-events-none"
                    />
                  )}
                  <Icon 
                    className={cn(
                      "w-6 h-6 z-10 transition-colors", 
                      isActive ? "text-emerald-700 dark:text-emerald-400" : "text-emerald-900/40 dark:text-white/40"
                    )} 
                  />
                  <span 
                    className={cn(
                      "text-[10px] uppercase font-bold tracking-widest z-10 transition-colors",
                      isActive ? "text-emerald-700 dark:text-emerald-400" : "text-emerald-900/40 dark:text-white/40"
                    )}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}

            {/* Settings Button */}
            <button
              onClick={() => {
                setIsSearchOpen(false);
                toggleSettings();
              }}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 active:scale-95 transition-transform"
            >
              <Settings className="w-6 h-6 z-10 text-emerald-900/40 dark:text-white/40" />
              <span className="text-[10px] uppercase font-bold tracking-widest z-10 text-emerald-900/40 dark:text-white/40">
                {t('settings')}
              </span>
            </button>
            
          </div>
        </div>
      </motion.div>
    </>
  );
};

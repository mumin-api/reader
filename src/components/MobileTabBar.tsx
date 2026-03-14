'use client';

import React, { useState, useEffect, useRef } from 'react';
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
            className="fixed inset-0 z-[100] md:hidden pt-20 px-4"
            style={{ backgroundColor: 'var(--page-bg)' }}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-display font-bold" style={{ color: 'var(--page-text)' }}>Search Library</span>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-bold uppercase tracking-widest text-[var(--page-text)] opacity-60 hover:opacity-100 bg-emerald-500/10 px-4 py-2 rounded-full cursor-pointer"
              >
                Close
              </button>
            </div>
            <SearchBar 
              autoFocus={true} 
              onClose={() => setIsSearchOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ensure we hide the whole wrapper when search is open so pill disappears */}
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
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-3 w-full max-w-sm h-12 px-4 rounded-full shadow-lg border backdrop-blur-xl transition-all active:scale-95 bg-white/90 dark:bg-[#0a1a16]/90 border-emerald-900/10 dark:border-emerald-500/20 text-[var(--page-text)] opacity-80"
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
                  className="relative flex items-center justify-center flex-1 h-full active:scale-95 transition-transform"
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
              <Settings className="w-6 h-6 z-10 text-emerald-900/40 dark:text-white/40" />
            </button>
            
          </div>
        </div>
      </motion.div>
    </>
  );
};

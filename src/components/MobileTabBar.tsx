'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/lib/navigation';
import { Home, BookOpen, Shuffle, Bookmark, Settings, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { SearchBar } from './SearchBar';
import { useReadingSettings } from '@/store/useReadingSettings';

export const MobileTabBar: React.FC = () => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const { toggleSettings } = useUIStore();
  const { uiVariant } = useReadingSettings();
  
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Immersive Background Backdrop */}
            <div 
              className={cn(
                "absolute inset-0 transition-colors duration-700",
                uiVariant === 'cinematic' 
                  ? "bg-black/90 backdrop-blur-3xl" 
                  : "bg-white dark:bg-[#0a1a16] backdrop-blur-xl"
              )}
            />

            {/* Pattern Overlay for Cinematic Feel */}
            {uiVariant === 'cinematic' && (
               <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/patterns/geometric-dark.svg')] bg-repeat bg-[size:400px]" />
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative h-full flex flex-col pt-6 px-4"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold leading-tight" style={{ color: 'var(--page-text)' }}>
                    {t('search_title') || 'Search Library'}
                  </span>
                  <div className="h-1 w-12 bg-emerald-600 rounded-full mt-1" />
                </div>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className={cn(
                    "p-2 rounded-full transition-all active:scale-90",
                    uiVariant === 'cinematic'
                      ? "text-white/60 bg-white/5 hover:bg-white/10"
                      : "text-[var(--page-text)] bg-black/5 dark:bg-white/5"
                  )}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SearchBar 
                  autoFocus={true} 
                  onClose={() => setIsSearchOpen(false)} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ensure we hide the whole wrapper when search is open so pill disappears */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible && !isSearchOpen ? 0 : 200 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[90] md:hidden pointer-events-none pb-8"
      >
        <div className="px-6 pointer-events-auto w-full relative">
          
          {/* Floating Search Pill */}
          <div className="absolute left-6 right-6 -top-16 flex justify-center">
             <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                   "flex items-center gap-3 w-full h-14 px-5 rounded-3xl shadow-2xl border transition-all active:scale-[0.97] group",
                   uiVariant === 'cinematic'
                       ? "glass-cinematic border-white/10 text-white/90"
                       : "bg-white/90 dark:bg-[#0a1a16]/90 border-emerald-900/10 dark:border-emerald-500/20 text-[var(--page-text)]"
                )}
             >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  uiVariant === 'cinematic' ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                )}>
                  <Search className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40 leading-none mb-1">
                    {t('search_label') || 'Discover'}
                  </span>
                  <span className="text-sm font-medium">{t('search_placeholder') || 'Search the Sunnah...'}</span>
                </div>
             </button>
          </div>

          {/* Bottom Tab Bar Container */}
          <div className={cn(
            "flex items-center justify-around w-full h-20 px-4 border rounded-[2.5rem] transition-all shadow-2xl overflow-hidden",
            uiVariant === 'cinematic'
                ? "glass-cinematic border-white/10 shadow-amber-900/10"
                : "bg-white/95 dark:bg-[#0a1a16]/95 border-emerald-900/10 dark:border-emerald-500/10"
          )}>
            
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              return (
                <Link
                  key={link.href}
                  onClick={() => setIsSearchOpen(false)}
                  href={link.href}
                  className="relative flex flex-col items-center justify-center flex-1 h-full active:scale-90 transition-transform"
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId="mobile-tab-indicator"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={cn(
                          "absolute inset-x-2 inset-y-2 rounded-[1.5rem] pointer-events-none",
                          uiVariant === 'cinematic' 
                            ? "bg-amber-500/10 border border-amber-500/20" 
                            : "bg-emerald-600/10 dark:bg-emerald-500/20"
                        )}
                      />
                    )}
                  </AnimatePresence>
                  
                  <Icon 
                    className={cn(
                      "w-6 h-6 z-10 transition-all duration-300", 
                      isActive 
                        ? (uiVariant === 'cinematic' ? "text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" : "text-emerald-700 dark:text-emerald-400") 
                        : (uiVariant === 'cinematic' ? "text-white/20" : "text-emerald-900/30 dark:text-white/30")
                    )} 
                  />
                  
                  {isActive && (
                    <motion.span 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-tighter mt-1 z-10",
                        uiVariant === 'cinematic' ? "text-amber-500/80" : "text-emerald-700 dark:text-emerald-400"
                      )}
                    >
                      {link.name}
                    </motion.span>
                  )}
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
                uiVariant === 'cinematic' ? "text-white/20" : "text-emerald-900/30 dark:text-white/30"
              )} />
            </button>
            
          </div>
        </div>
      </motion.div>
    </>
  );
};

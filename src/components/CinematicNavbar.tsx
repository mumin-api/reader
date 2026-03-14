'use client';

import React from 'react';
import { Link, usePathname } from '@/lib/navigation';
import Image from 'next/image';
import {
    Home,
    BookOpen,
    Shuffle,
    Bookmark,
    Settings,
    Globe,
    Code,
    Layout,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';

export const CinematicNavbar: React.FC = () => {
    const t = useTranslations('Navbar');
    const pathname = usePathname();
    const { toggleSettings, toggleLanguage } = useUIStore();

    const navLinks = [
        { name: t('home'), href: '/', icon: Home },
        { name: t('collections'), href: '/collections', icon: BookOpen },
        { name: t('random'), href: '/random', icon: Shuffle },
        { name: t('bookmarks'), href: '/bookmarks', icon: Bookmark },
        { name: t('developers'), href: '/developers', icon: Code },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-24 z-50 hidden lg:flex flex-col items-center py-8 glass-cinematic border-r border-white/5">
            {/* Top Fixed Area (Absolute from body perspective, but relative to this fixed aside?) 
                Wait, the search bar should be in a top-right header, not necessarily in the sidebar. 
            */}
            
            {/* Sidebar Logo */}
            <Link href="/" className="mb-12 group transition-transform hover:scale-110">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image
                        src="/icons/logo.svg"
                        alt="Mumin Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    />
                </div>
            </Link>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-6">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative p-4 rounded-2xl transition-all group",
                                isActive 
                                    ? "text-amber-500" 
                                    : "text-white/40 hover:text-white/80"
                            )}
                            title={link.name}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Icon className={cn(
                                "w-6 h-6 relative z-10 transition-transform group-hover:scale-110",
                                isActive && "drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                            )} />
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-6 mt-auto">
                <button
                    onClick={toggleLanguage}
                    className="p-4 rounded-2xl text-white/40 hover:text-white/80 transition-all hover:bg-white/5"
                    title={t('language')}
                >
                    <Globe className="w-6 h-6" />
                </button>
                <button
                    onClick={toggleSettings}
                    className="p-4 rounded-2xl text-white/40 hover:text-white/80 transition-all hover:bg-white/5"
                    title={t('settings')}
                >
                    <Settings className="w-6 h-6" />
                </button>
            </div>

            {/* Top Right Header (Rendered within this fixed context or sibling) */}
            <div className="fixed top-0 left-24 right-0 h-20 px-8 flex items-center justify-end gap-6 z-40 hidden lg:flex pointer-events-none">
                <div className="flex-1 max-w-md pointer-events-auto">
                    <SearchBar />
                </div>
                
                {/* User/Locale Placeholder to match reference */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/5 pointer-events-auto">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                        MU
                    </div>
                    <span className="text-sm font-medium text-white/80 uppercase">AR / RU</span>
                </div>
            </div>
        </aside>
    );
};

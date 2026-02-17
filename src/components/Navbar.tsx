'use client';

import React, { useState, useEffect } from 'react';
import { Link, useRouter, usePathname } from '@/lib/navigation';
import Image from 'next/image';
import {
    Home,
    BookOpen,
    Shuffle,
    Bookmark,
    Settings,
    Globe,
    Menu,
    X,
    Code
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { cn } from '@/lib/utils';
import { useReadingSettings } from '@/store/useReadingSettings';
import { useTranslations } from 'next-intl';
import { useUIStore } from '@/store/useUIStore';

// navLinks are moved inside the component to use translations

export const Navbar: React.FC = () => {
    const t = useTranslations('Navbar');
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const resetSettings = useReadingSettings((state) => state.resetSettings);
    const { toggleSettings, toggleLanguage } = useUIStore();

    const navLinks = [
        { name: t('home'), href: '/', icon: Home },
        { name: t('collections'), href: '/collections', icon: BookOpen },
        { name: t('random'), href: '/random', icon: Shuffle },
        { name: t('developers'), href: '/developers', icon: Code },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            style={{
                backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
                borderColor: 'var(--border-color)',
                color: 'var(--page-text)'
            }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
                isScrolled ? "backdrop-blur-lg border-b shadow-sm" : ""
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 group shrink-0"
                >
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <Image
                            src="/icons/logo.svg"
                            alt="Mumin Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div
                    style={{ backgroundColor: 'var(--input-bg)' }}
                    className="hidden lg:flex items-center gap-1 p-1 rounded-full"
                >
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border border-transparent",
                                    isActive
                                        ? "bg-emerald-600 text-white shadow-md scale-105"
                                        : "opacity-60 hover:opacity-100 hover:bg-emerald-600/5"
                                )}
                                style={!isActive ? { color: 'var(--page-text)' } : {}}
                            >
                                <Icon className="w-4 h-4" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Search Bar - Center on Desktop */}
                <div className="flex-1 max-w-md hidden md:block">
                    <SearchBar />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/bookmarks"
                        className="p-2 opacity-60 hover:opacity-100 hover:bg-emerald-600/5 rounded-full transition-colors relative"
                        style={{ color: 'var(--page-text)' }}
                        title={t('bookmarks')}
                    >
                        <Bookmark className="w-5 h-5" />
                    </Link>

                    <button
                        onClick={toggleLanguage}
                        className="p-2 opacity-60 hover:opacity-100 hover:bg-emerald-900/5 rounded-full transition-colors"
                        style={{ color: 'var(--page-text)' }}
                        title={t('language')}
                    >
                        <Globe className="w-5 h-5" />
                    </button>

                    <button
                        onClick={toggleSettings}
                        className="p-2 opacity-60 hover:opacity-100 hover:bg-emerald-600/5 rounded-full transition-colors"
                        style={{ color: 'var(--page-text)' }}
                        title={t('settings')}
                    >
                        <Settings className="w-5 h-5" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 lg:hidden rounded-full transition-colors"
                        style={{ color: 'var(--page-text)' }}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}
                    className="fixed inset-0 top-[65px] z-40 lg:hidden animate-fade-in p-4"
                >
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="md:hidden mb-6">
                            <SearchBar />
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all",
                                    pathname === link.href
                                        ? "bg-emerald-600 text-white"
                                        : "opacity-60 hover:opacity-100 hover:bg-emerald-600/5"
                                )}
                            >
                                <link.icon className="w-6 h-6" />
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/bookmarks"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all",
                                pathname === '/bookmarks'
                                    ? "bg-emerald-600 text-white"
                                    : "opacity-60 hover:opacity-100 hover:bg-emerald-600/5"
                            )}
                        >
                            <Bookmark className="w-6 h-6" />
                            {t('bookmarks')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, History, Sparkles, Loader2, BookOpen, ArrowUpRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { hadithApi } from '@/lib/api/client';
import { useReadingSettings } from '@/store/useReadingSettings';
import { useSystemStore } from '@/store/useSystemStore';

export interface SearchBarProps {
    className?: string;
    autoFocus?: boolean;
    onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className, autoFocus, onClose }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([]);
    const [spellSuggestions, setSpellSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const { uiVariant } = useReadingSettings();
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const { status: systemStatus } = useSystemStore();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch history from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('mumin_search_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory).slice(0, 5));
        }
        
        // Auto focus if requested (for mobile modal)
        if (autoFocus && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [autoFocus]);

    // Debounced suggestion fetching (topics + spell correction)
    useEffect(() => {
        if (!query.trim() || query.length < 2) {
            setSuggestions([]);
            setSpellSuggestions([]);
            return;
        }

        const handler = setTimeout(async () => {
            setIsLoading(true);
            try {
                const [topicData, spellData] = await Promise.allSettled([
                    hadithApi.getSuggestions({ q: query, language: locale }),
                    hadithApi.getSpell({ q: query, language: locale }),
                ]);
                setSuggestions(topicData.status === 'fulfilled' ? topicData.value || [] : []);
                setSpellSuggestions(
                    spellData.status === 'fulfilled' && Array.isArray(spellData.value)
                        ? spellData.value.map((s: any) => s.word).filter((w: string) => w.toLowerCase() !== query.toLowerCase())
                        : []
                );
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Suggestions error:', error);
                }
            } finally {
                setIsLoading(false);
            }
        }, 400); // 400ms debounce

        return () => clearTimeout(handler);
    }, [query, locale]);

    const handleSearch = (searchQuery: string, isSemantic: boolean = false) => {
        const q = searchQuery.trim();
        if (!q) return;

        // Save to history
        const newHistory = [q, ...history.filter((h) => h !== q)].slice(0, 10);
        setHistory(newHistory.slice(0, 5));
        localStorage.setItem('mumin_search_history', JSON.stringify(newHistory));

        setIsFocused(false);
        setSuggestions([]);
        if (onClose) onClose();
        router.push(`/search?q=${encodeURIComponent(q)}${isSemantic ? '&semantic=true' : ''}`);
    };

    const handleTopicSelect = (slug: string) => {
        setIsFocused(false);
        setSuggestions([]);
        if (onClose) onClose();
        router.push(`/topics/${slug}`);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        const items = [...(suggestions.length > 0 ? suggestions : history)];
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            if (selectedIndex > -1) {
                e.preventDefault();
                const selected = items[selectedIndex];
                if (typeof selected === 'string') {
                    handleSearch(selected);
                } else {
                    handleTopicSelect(selected.slug);
                }
            } else {
                handleSearch(query);
            }
        } else if (e.key === 'Escape') {
            setIsFocused(false);
        }
    };

    const removeFromHistory = (itemToRemove: string) => {
        const newHistory = history.filter(h => h !== itemToRemove);
        setHistory(newHistory);
        
        // Update persistent storage
        const savedHistory = localStorage.getItem('mumin_search_history');
        if (savedHistory) {
            const fullHistory: string[] = JSON.parse(savedHistory);
            const updatedHistory = fullHistory.filter(h => h !== itemToRemove);
            localStorage.setItem('mumin_search_history', JSON.stringify(updatedHistory));
        }
        setItemToDelete(null);
    };

    const clearHistory = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHistory([]);
        localStorage.removeItem('mumin_search_history');
    };

    // Long press logic
    const handleLongPressStart = (item: string) => {
        longPressTimer.current = setTimeout(() => {
            setItemToDelete(item);
        }, 600); // 600ms for long press
    };

    const handleLongPressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    const handleInsertQuery = (e: React.MouseEvent, item: string) => {
        e.stopPropagation();
        setQuery(item);
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <div className={cn('relative w-full max-w-xl', className)} onKeyDown={onKeyDown}>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="relative z-20">
                <div className="relative group">
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
                        onFocus={() => setIsFocused(true)}
                        placeholder={t('search_placeholder')}
                        autoComplete="off"
                        style={{
                            backgroundColor: uiVariant === 'cinematic' 
                                ? (isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)')
                                : (isFocused ? 'var(--input-focus-bg)' : 'var(--input-bg)'),
                            color: 'var(--page-text)',
                            borderColor: uiVariant === 'cinematic' 
                                ? (isFocused ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.05)')
                                : 'var(--border-color)',
                            transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)'
                        }}
                        className={cn(
                            "w-full h-11 pl-11 pr-11 backdrop-blur-xl rounded-full border shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-600/10",
                            isFocused && "shadow-2xl border-emerald-500/40"
                        )}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                        ) : (
                            <Search
                                className={cn("w-4 h-4 transition-colors", isFocused ? (uiVariant === 'cinematic' ? "text-amber-500" : "text-emerald-500") : "text-gray-400")}
                                style={{ color: !isFocused ? (uiVariant === 'cinematic' ? "rgba(255,255,255,0.4)" : 'var(--muted-text)') : undefined }}
                            />
                        )}
                    </div>
                    {query && (
                        <button
                            type="button"
                            onClick={() => { setQuery(''); setSuggestions([]); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-emerald-500/10 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                        </button>
                    )}
                </div>
            </form>

            {/* Dropdown Suggestions/History */}
            {isFocused && (
                <>
                    <div
                        className="fixed inset-0 z-10 bg-black/5 backdrop-blur-[2px]"
                        onClick={() => setIsFocused(false)}
                    />
                    <div
                        ref={dropdownRef}
                        style={{
                            backgroundColor: uiVariant === 'cinematic' ? 'transparent' : 'var(--dropdown-bg)',
                            borderColor: uiVariant === 'cinematic' ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-color)',
                            color: 'var(--page-text)'
                        }}
                        className={cn(
                            "absolute top-full left-0 right-0 mt-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-3xl",
                            uiVariant === 'cinematic' && "glass-cinematic"
                        )}
                    >
                        {/* Spell Correction Layer — "Did you mean: пророк?" */}
                        {spellSuggestions.length > 0 && query.trim().length > 0 && (
                            <div className="p-2 border-b border-emerald-500/10">
                                <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-500/80">
                                    <Sparkles className="w-3 h-3" />
                                    <span>{t('did_you_mean') || 'Did you mean?'}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 px-3 pb-2">
                                    {spellSuggestions.map((word) => (
                                        <button
                                            key={word}
                                            onClick={() => {
                                                handleSearch(word);
                                            }}
                                            className="px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm hover:bg-amber-500/20 transition-all"
                                        >
                                            {word}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggestions Layer — Topics */}
                        {suggestions.length > 0 && (
                            <div className="p-2 border-b border-emerald-500/10">
                                <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-500/80">
                                    <Sparkles className="w-3 h-3" />
                                    <span>{t('suggestions') || 'Suggestions'}</span>
                                </div>
                                {suggestions.map((item, idx) => (
                                    <button
                                        key={item.slug}
                                        onClick={() => handleTopicSelect(item.slug)}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-left group",
                                            selectedIndex === idx ? "bg-emerald-500/15" : "hover:bg-emerald-500/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                                <BookOpen className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </div>
                                        <div className="text-[10px] text-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Topic
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}


                        {/* Recent History Layer */}
                        {history.length > 0 && !query && (
                            <div className="p-2">
                                <div className="flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500/80">
                                    <div className="flex items-center gap-2">
                                        <History className="w-3 h-3" />
                                        <span>{t('recent_searches')}</span>
                                    </div>
                                    <button 
                                        onClick={clearHistory}
                                        className="text-[9px] hover:text-red-500 transition-colors cursor-pointer"
                                    >
                                        {t('clear')}
                                    </button>
                                </div>
                                {history.map((item, idx) => (
                                    <div
                                        key={item}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            setItemToDelete(item);
                                        }}
                                        onTouchStart={() => handleLongPressStart(item)}
                                        onTouchEnd={handleLongPressEnd}
                                        onMouseDown={() => handleLongPressStart(item)}
                                        onMouseUp={handleLongPressEnd}
                                        onMouseLeave={handleLongPressEnd}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-left group relative",
                                            selectedIndex === idx ? "bg-emerald-600/15" : "hover:bg-emerald-600/5"
                                        )}
                                    >
                                        <button
                                            onClick={() => handleSearch(item)}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className="flex items-center gap-3 flex-1 text-left"
                                        >
                                            <Search className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                                            <span className="text-sm opacity-90 truncate">{item}</span>
                                        </button>
                                        
                                        <button
                                            onClick={(e) => handleInsertQuery(e, item)}
                                            className="p-2 opacity-0 group-hover:opacity-100 hover:bg-emerald-500/10 rounded-lg transition-all"
                                            title="Insert into search"
                                        >
                                            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Semantic Search Toggle */}
                        {query && (
                            <div className="p-2 border-b border-emerald-500/10">
                                <button
                                    onClick={() => systemStatus.search && handleSearch(query, true)}
                                    disabled={!systemStatus.search}
                                    className={cn(
                                        "flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200 text-left group border border-dashed",
                                        systemStatus.search 
                                            ? "hover:bg-emerald-500/10 border-emerald-500/20" 
                                            : "opacity-40 cursor-not-allowed border-gray-500/20"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                        systemStatus.search ? "bg-emerald-500/10 group-hover:bg-emerald-500/20" : "bg-gray-500/10"
                                    )}>
                                        <Sparkles className={cn("w-4 h-4", systemStatus.search ? "text-emerald-500 animate-pulse" : "text-gray-400")} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={cn("text-sm font-bold", systemStatus.search ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400")}>
                                            {t('semantic_search') || 'Semantic Search'}
                                            {!systemStatus.search && ` ${t('MuminAI.maintenance_title')}`}
                                        </span>
                                        <span className="text-[10px] opacity-50 leading-tight">
                                            {systemStatus.search 
                                                ? (t('semantic_search_desc') || 'Search by meaning using AI')
                                                : t('MuminAI.maintenance_desc')}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* Default Search Action */}
                        {query && suggestions.length === 0 && !isLoading && (
                            <div className="p-2">
                                <button
                                    onClick={() => handleSearch(query)}
                                    className="flex items-center gap-3 w-full px-3 py-3 hover:bg-emerald-500/10 rounded-xl transition-all duration-200 text-left group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
                                        <Search className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{t('search_for')}</span>
                                        <span className="text-xs text-emerald-500/70 truncate max-w-[200px]">"{query}"</span>
                                    </div>
                                </button>
                            </div>
                        )}
                        
                        {/* Footer / Hint */}
                        <div className="px-5 py-2 text-[9px] text-gray-500/50 border-t border-gray-500/5 bg-gray-500/[0.02] flex justify-between items-center">
                            <span>Press Enter to search hadiths</span>
                            <div className="flex gap-1">
                                <kbd className="px-1.5 py-0.5 rounded border border-gray-500/20 bg-gray-500/5">↑↓</kbd>
                                <kbd className="px-1.5 py-0.5 rounded border border-gray-500/20 bg-gray-500/5">↵</kbd>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {itemToDelete && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setItemToDelete(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={cn(
                                "relative w-full max-w-sm p-6 rounded-[2rem] shadow-2xl border overflow-hidden",
                                uiVariant === 'cinematic'
                                    ? "glass-cinematic border-white/10"
                                    : "bg-white dark:bg-emerald-950 border-emerald-900/10 dark:border-emerald-500/20"
                            )}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Trash2 className="w-24 h-24 text-emerald-600" />
                            </div>
                            
                            <h3 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--page-text)' }}>
                                {t('delete_history_title') || 'Remove from history?'}
                            </h3>
                            <p className="text-sm mb-6 opacity-60" style={{ color: 'var(--page-text)' }}>
                                "{itemToDelete}"
                            </p>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setItemToDelete(null)}
                                    className="flex-1 py-3 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 font-bold text-sm transition-colors hover:bg-gray-200 dark:hover:bg-white/10"
                                    style={{ color: 'var(--page-text)' }}
                                >
                                    {t('cancel') || 'Cancel'}
                                </button>
                                <button
                                    onClick={() => removeFromHistory(itemToDelete)}
                                    className="flex-1 py-3 px-4 rounded-2xl bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors"
                                >
                                    {t('delete') || 'Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

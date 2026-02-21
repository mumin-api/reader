'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, History, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { useRouter } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { hadithApi } from '@/lib/api/client';

export const SearchBar: React.FC<{ className?: string }> = ({ className }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([]);
    const [spellSuggestions, setSpellSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch history from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('mumin_search_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory).slice(0, 5));
        }
    }, []);

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
                console.error('Suggestions error:', error);
            } finally {
                setIsLoading(false);
            }
        }, 400); // 400ms debounce

        return () => clearTimeout(handler);
    }, [query, locale]);

    const handleSearch = (searchQuery: string) => {
        const q = searchQuery.trim();
        if (!q) return;

        // Save to history
        const newHistory = [q, ...history.filter((h) => h !== q)].slice(0, 10);
        setHistory(newHistory.slice(0, 5));
        localStorage.setItem('mumin_search_history', JSON.stringify(newHistory));

        router.push(`/search?q=${encodeURIComponent(q)}`);
        setIsFocused(false);
        setSuggestions([]);
    };

    const handleTopicSelect = (slug: string) => {
        router.push(`/topics/${slug}`);
        setIsFocused(false);
        setSuggestions([]);
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

    const clearHistory = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHistory([]);
        localStorage.removeItem('mumin_search_history');
    };

    return (
        <div className={cn('relative w-full max-w-xl', className)} onKeyDown={onKeyDown}>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="relative z-20">
                <div className="relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
                        onFocus={() => setIsFocused(true)}
                        placeholder={t('search_placeholder')}
                        autoComplete="off"
                        style={{
                            backgroundColor: isFocused ? 'var(--input-focus-bg)' : 'var(--input-bg)',
                            color: 'var(--page-text)',
                            borderColor: 'var(--border-color)',
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
                                className={cn("w-4 h-4 transition-colors", isFocused ? "text-emerald-500" : "text-gray-400")}
                                style={{ color: !isFocused ? 'var(--muted-text)' : undefined }}
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
                            backgroundColor: 'var(--dropdown-bg)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--page-text)'
                        }}
                        className="absolute top-full left-0 right-0 mt-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-3xl"
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
                                    <button
                                        key={item}
                                        onClick={() => handleSearch(item)}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={cn(
                                            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-left group",
                                            selectedIndex === idx ? "bg-emerald-600/15" : "hover:bg-emerald-600/5"
                                        )}
                                    >
                                        <Search className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                                        <span className="text-sm opacity-90">{item}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Default Search Action */}
                        {query && suggestions.length === 0 && !isLoading && (
                            <div className="p-2">
                                <button
                                    onClick={() => handleSearch(query)}
                                    className="flex items-center gap-3 w-full px-3 py-4 hover:bg-emerald-500/10 rounded-xl transition-all duration-200 text-left group"
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
        </div>
    );
};

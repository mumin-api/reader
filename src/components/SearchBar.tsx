'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, History } from 'lucide-react';
import { useRouter } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export const SearchBar: React.FC<{ className?: string }> = ({ className }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const router = useRouter();
    const t = useTranslations('Navbar');

    useEffect(() => {
        const savedHistory = localStorage.getItem('mumin_search_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory).slice(0, 5));
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Save to history
        const newHistory = [query, ...history.filter((h) => h !== query)].slice(0, 10);
        setHistory(newHistory.slice(0, 5));
        localStorage.setItem('mumin_search_history', JSON.stringify(newHistory));

        router.push(`/search?q=${encodeURIComponent(query)}`);
        setIsFocused(false);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('mumin_search_history');
    };

    return (
        <div className={cn('relative w-full max-w-xl', className)}>
            <form onSubmit={handleSearch} className="relative z-10">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder={t('search_placeholder')}
                    style={{
                        backgroundColor: isFocused ? 'var(--input-focus-bg)' : 'var(--input-bg)',
                        color: 'var(--page-text)',
                        borderColor: 'var(--border-color)',
                        transition: 'all 0.3s ease'
                    }}
                    className={cn(
                        "w-full h-10 pl-10 pr-10 backdrop-blur-md rounded-full border focus:outline-none focus:ring-2 focus:ring-emerald-600/20",
                        isFocused && "shadow-lg border-emerald-600/30"
                    )}
                />
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: 'var(--muted-text)' }}
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-emerald-950/5 rounded-full"
                    >
                        <X
                            className="w-3 h-3"
                            style={{ color: 'var(--muted-text)' }}
                        />
                    </button>
                )}
            </form>

            {/* Dropdown Suggestions/History */}
            {isFocused && (
                <>
                    <div
                        className="fixed inset-0 z-0 bg-transparent"
                        onClick={() => setIsFocused(false)}
                    />
                    <div
                        style={{
                            backgroundColor: 'var(--dropdown-bg)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--page-text)'
                        }}
                        className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl border overflow-hidden z-10 animate-slide-up"
                    >
                        {history.length > 0 && !query && (
                            <div className="p-2">
                                <div
                                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--muted-text)' }}
                                >
                                    <span>{t('recent_searches')}</span>
                                    <button onClick={clearHistory} className="hover:text-emerald-600">{t('clear')}</button>
                                </div>
                                {history.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setQuery(item);
                                            router.push(`/search?q=${encodeURIComponent(item)}`);
                                            setIsFocused(false);
                                        }}
                                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-emerald-600/10 rounded-lg transition-colors text-left"
                                    >
                                        <History
                                            className="w-4 h-4"
                                            style={{ color: 'var(--muted-text)' }}
                                        />
                                        <span className="text-sm opacity-80">{item}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {query && (
                            <div className="p-2">
                                <button
                                    onClick={handleSearch}
                                    className="flex items-center gap-3 w-full px-3 py-3 hover:bg-emerald-600/10 rounded-lg transition-colors text-left group"
                                >
                                    <Search className="w-4 h-4 text-emerald-600" />
                                    <span className="text-sm">{t('search_for')} <span className="font-semibold">"{query}"</span></span>
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

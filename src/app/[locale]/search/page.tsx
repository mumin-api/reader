'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { hadithApi, Hadith, PaginatedResponse } from '@/lib/api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search as SearchIcon, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StructuredData, generateBreadcrumbSchema } from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';

// This is a client-side only component. The server-side metadata and page structure 
// are handled in a separate server component file if needed.
// However, in Next.js 13+ App Router, you can't export metadata from a 'use client' file.
// We will separate the metadata to a parent server component or metadata file.


import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SearchResultsPage() {
    const params = useParams();
    const locale = params.locale as string || 'en';
    const t = useTranslations('Search');
    const tNav = useTranslations('Navbar');
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState<PaginatedResponse<Hadith> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState({
        collection: '',
        grade: '',
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (type: 'collection' | 'grade', value: string) => {
        setActiveFilters(prev => ({
            ...prev,
            [type]: prev[type] === value ? '' : value
        }));
        setPage(1); // Reset to first page when filters change
    };

    useEffect(() => {
        async function performSearch() {
            if (!query) return;

            setLoading(true);
            setError(null);

            try {
                const data = await hadithApi.searchHadiths({
                    q: query,
                    page,
                    limit: 20,
                    language: locale,
                    collection: activeFilters.collection,
                    grade: activeFilters.grade
                });
                setResults(data);
            } catch (err) {
                console.error('Search failed', err);
                setError(t('error_desc'));
            } finally {
                setLoading(false);
            }
        }

        performSearch();
    }, [query, locale, page, activeFilters]);

    const tHadith = useTranslations('Hadith');

    return (
        <main className="min-h-screen relative bg-[var(--page-bg)] text-[var(--page-text)] transition-colors duration-500">
            <StructuredData data={generateBreadcrumbSchema([
                { name: tNav('home'), item: BASE_URL },
                { name: t('title'), item: `${BASE_URL}/search` }
            ])} />
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Search Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
                            >
                                <SearchIcon className="w-4 h-4" />
                                {t('title')}
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-display font-bold"
                            >
                                {query ? t('results_for', { query }) : t('all_hadiths')}
                            </motion.h1>
                            {results && (
                                <p className="mt-4 opacity-40 font-medium">
                                    {t('found_results', { count: results.pagination.total.toLocaleString() })}
                                    {results.pagination.total > 0 && ` • ${t('showing_page', { page: results.pagination.page, total: results.pagination.totalPages })}`}
                                </p>
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-sm text-sm font-bold uppercase tracking-widest hover:border-emerald-600/20 transition-all">
                                <SlidersHorizontal className="w-4 h-4" />
                                {t('filters')}
                            </button>
                            <div className="h-10 w-px bg-current opacity-10 hidden md:block" />
                            <div className="flex items-center gap-1">
                                {['all', 'sahih', 'hasan'].map((grade) => (
                                    <button
                                        key={grade}
                                        onClick={() => handleFilterChange('grade', grade === 'all' ? '' : grade)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                                            (grade === 'all' && !activeFilters.grade) || activeFilters.grade === grade
                                                ? "bg-emerald-600 text-white shadow-md"
                                                : "opacity-40 hover:opacity-100 hover:bg-emerald-600/5"
                                        )}
                                    >
                                        {grade === 'all' ? t('all_hadiths') : tHadith(`grades.${grade}`)}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Filters - Desktop */}
                        <div className="hidden lg:block space-y-8">
                            <div className="p-8 rounded-[2rem] bg-emerald-900/5 border border-emerald-900/5">
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6 border-b border-current opacity-10 pb-4">
                                    <Filter className="w-4 h-4" />
                                    {t('collections')}
                                </h3>
                                <div className="space-y-3">
                                    {['Bukhari', 'Muslim', 'Abu Dawud', 'Tirmidhi', 'Nasa\'i', 'Ibn Majah'].map((col) => (
                                        <label
                                            key={col}
                                            className="flex items-center gap-3 group cursor-pointer"
                                            onClick={() => handleFilterChange('collection', col)}
                                        >
                                            <div className={cn(
                                                "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                                                activeFilters.collection === col
                                                    ? "bg-emerald-600 border-emerald-600"
                                                    : "border-current opacity-10 group-hover:opacity-30"
                                            )}>
                                                {activeFilters.collection === col && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-2 h-2 bg-white rounded-full"
                                                    />
                                                )}
                                            </div>
                                            <span className={cn(
                                                "text-sm font-medium transition-opacity",
                                                activeFilters.collection === col
                                                    ? "opacity-100"
                                                    : "opacity-60 group-hover:opacity-100"
                                            )}>{col}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-900 to-emerald-950 text-white relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                <h3 className="text-xl font-display font-bold mb-4 relative z-10">{t('advanced_search')}</h3>
                                <p className="text-emerald-100/60 text-sm leading-relaxed mb-6 relative z-10">
                                    {t('advanced_search_desc')}
                                </p>
                                <button className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-emerald-950 font-bold rounded-xl transition-all shadow-lg relative z-10 text-sm uppercase tracking-widest">
                                    {t('try_it_now')}
                                </button>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="lg:col-span-3 space-y-8">
                            {loading ? (
                                <div className="space-y-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-full h-80 bg-emerald-900/5 rounded-[2rem] animate-pulse" />
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="p-12 text-center bg-ruby/5 rounded-[2rem] border border-ruby/10">
                                    <AlertCircle className="w-12 h-12 text-ruby mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-ruby mb-2">{t('error')}</h3>
                                    <p className="text-emerald-950/60">{error}</p>
                                </div>
                            ) : results?.data.length === 0 ? (
                                <div className="p-20 text-center bg-[var(--card-bg)] rounded-[3rem] border border-[var(--card-border)] shadow-islamic">
                                    <div className="w-20 h-20 bg-emerald-900/5 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <SearchIcon className="w-10 h-10 text-emerald-900/20" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">{t('no_results')}</h3>
                                    <p className="text-emerald-900/60 max-w-sm mx-auto mb-8">
                                        {t('no_results_desc')}
                                    </p>
                                    <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-emerald-600/20">
                                        {t('clear_search')}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {results?.data.map((hadith, idx) => (
                                        <HadithCard key={hadith.id} hadith={hadith} />
                                    ))}

                                    {/* Pagination */}
                                    {results && results.pagination.totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 pt-8">
                                            <button
                                                onClick={() => handlePageChange(results.pagination.page - 1)}
                                                className="px-6 py-3 rounded-xl border border-[var(--card-border)] font-bold text-sm tracking-widest uppercase hover:bg-emerald-600/5 transition-all disabled:opacity-30"
                                                disabled={!results.pagination.hasPrev || loading}
                                            >
                                                {tHadith('previous')}
                                            </button>
                                            <div className="px-6 py-3 font-bold text-emerald-900">
                                                {t('showing_page', { page: results.pagination.page, total: results.pagination.totalPages })}
                                            </div>
                                            <button
                                                onClick={() => handlePageChange(results.pagination.page + 1)}
                                                className="px-6 py-3 rounded-xl border border-[var(--card-border)] font-bold text-sm tracking-widest uppercase hover:bg-emerald-600/5 transition-all disabled:opacity-30"
                                                disabled={!results.pagination.hasNext || loading}
                                            >
                                                {tHadith('next')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

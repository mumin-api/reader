'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { motion } from 'framer-motion';
import { Moon, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { hadithApi, Hadith } from '@/lib/api/client';
import { useTranslations } from 'next-intl';

export default function TopicDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const locale = params.locale as string || 'en';
    const t = useTranslations('Collections');
    const tHome = useTranslations('Home');
    const tHadith = useTranslations('Hadith');
    const tNav = useTranslations('Navbar');

    const [hadiths, setHadiths] = useState<Hadith[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const topicName = slug === 'ramadan' ? tHome('ramadan_special') : slug.replace(/-/g, ' ');

    useEffect(() => {
        async function loadHadiths() {
            setLoading(true);
            try {
                const response = await hadithApi.getHadiths({
                    topic: slug,
                    page,
                    limit: 20,
                    language: locale
                });

                // The response might be paginated or a raw array depending on client.ts implementation
                // Based on client.ts: return response.data.data || response.data;
                // Since our API returns { data: [], pagination: {} }, let's handle both
                const data = response.data || response;
                const pagination = response.pagination;

                setHadiths(Array.isArray(data) ? data : []);
                setTotalPages(pagination?.totalPages || 1);
            } catch (err) {
                console.error('Failed to load topic hadiths', err);
                setHadiths([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        }
        loadHadiths();
    }, [slug, page, locale]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const response = await hadithApi.searchHadiths({
                q: searchQuery,
                topic: slug,
                page: 1,
                limit: 20,
                language: locale
            } as any); // Assuming searchHadiths might eventually support topic filter too

            const data = response.data || response;
            const pagination = response.pagination;

            setHadiths(Array.isArray(data) ? data : []);
            setTotalPages(pagination?.totalPages || 1);
            setPage(1);
        } catch (err) {
            console.error('Search failed', err);
            setHadiths([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative">
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 text-center flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-24 h-24 rounded-[2rem] bg-emerald-900 flex items-center justify-center shadow-xl mb-8 group overflow-hidden relative"
                        >
                             <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <Moon className="w-12 h-12 text-gold-500 relative z-10" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-display font-bold text-emerald-900 mb-4"
                        >
                            {topicName}
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-emerald-900/60 max-w-2xl mb-12"
                        >
                            {slug === 'ramadan' ? tHome('ramadan_subtitle') : t('browse_hadiths')}
                        </motion.p>

                        <form onSubmit={handleSearch} className="relative max-w-2xl w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/40" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search_within')}
                                className="w-full pl-14 pr-6 py-5 rounded-[2rem] border border-emerald-900/10 bg-white shadow-islamic focus:outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all text-lg"
                            />
                        </form>
                    </div>

                    {/* Hadiths List */}
                    <div className="grid grid-cols-1 gap-8">
                        {loading ? (
                            <div className="space-y-8">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-64 bg-emerald-900/5 rounded-[3rem] animate-pulse" />
                                ))}
                            </div>
                        ) : hadiths.length > 0 ? (
                            <>
                                {hadiths.map((hadith, idx) => (
                                    <motion.div
                                        key={hadith.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <HadithCard hadith={hadith} />
                                    </motion.div>
                                ))}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-6 pt-12">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                            {tHadith('previous')}
                                        </button>
                                        <span className="text-emerald-900/40 font-bold tracking-widest">
                                            {page} / {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            {tHadith('next')}
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="p-20 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic">
                                <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">{t('no_hadiths')}</h3>
                                <p className="text-emerald-900/60 mb-8">{t('no_hadiths_subtitle')}</p>
                                <Link href="/" className="text-emerald-600 font-bold uppercase tracking-widest text-sm hover:underline">
                                    {tNav('home')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

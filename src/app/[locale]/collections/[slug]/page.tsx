'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { motion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Link, useRouter, usePathname } from '@/lib/navigation';
import { hadithApi, Hadith } from '@/lib/api/client';
import { StructuredData, generateBreadcrumbSchema } from '@/components/StructuredData';
import { useTranslations } from 'next-intl';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

const COLLECTION_NAMES: Record<string, string> = {
    'sahih-bukhari': 'Sahih al-Bukhari',
    'sahih-muslim': 'Sahih Muslim',
    'sunan-abu-dawud': 'Sunan Abi Dawud',
    'jami-at-tirmidhi': 'Jami` at-Tirmidhi',
    'sunan-an-nasai': 'Sunan an-Nasa\'i',
    'sunan-ibn-majah': 'Sunan Ibn Majah',
    'muwatta-malik': 'Muwatta Malik',
    'musnad-ahmad': 'Musnad Ahmad bin Hanbal',
};

export default function CollectionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const locale = params.locale as string || 'en';
    const t = useTranslations('Collections');
    const tHadith = useTranslations('Hadith');
    const tNav = useTranslations('Navbar');

    const [hadiths, setHadiths] = useState<Hadith[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const collectionName = COLLECTION_NAMES[slug] || slug.replace(/-/g, ' ');

    useEffect(() => {
        async function loadHadiths() {
            setLoading(true);
            try {
                const response = await hadithApi.getHadiths({
                    collection: slug,
                    page,
                    limit: 20,
                    language: locale
                });

                setHadiths(response.data);
                setTotalPages(response.pagination?.totalPages || 1);
            } catch (err) {
                console.error('Failed to load hadiths', err);
                setHadiths([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        }
        loadHadiths();
    }, [slug, page]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const response = await hadithApi.searchHadiths({
                q: searchQuery,
                page: 1,
                limit: 20,
                language: locale
            });

            setHadiths(response.data);
            setTotalPages(response.pagination?.totalPages || 1);
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
            <StructuredData data={generateBreadcrumbSchema([
                { name: tNav('home'), item: BASE_URL },
                { name: tNav('collections'), item: `${BASE_URL}/collections` },
                { name: collectionName, item: `${BASE_URL}/collections/${slug}` }
            ])} />
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-emerald-900/40 mb-6">
                            <Link href="/collections" className="hover:text-emerald-900 transition-colors">{t('library')}</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-emerald-900">{collectionName}</span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-6 mb-8"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-emerald-900 flex items-center justify-center shadow-xl">
                                <BookOpen className="w-10 h-10 text-gold-500" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-display font-bold text-emerald-900 mb-2">
                                    {collectionName}
                                </h1>
                                <p className="text-emerald-900/60">
                                    {t('browse_hadiths')}
                                </p>
                            </div>
                        </motion.div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative max-w-2xl">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/40" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search_within')}
                                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-emerald-900/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600/20 transition-all"
                            />
                        </form>
                    </div>

                    {/* Hadiths List */}
                    <div className="space-y-6">
                        {loading ? (
                            <div className="space-y-6">
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
                                        <Link href={`/collections/${slug}/${hadith.hadithNumber}`}>
                                            <HadithCard hadith={hadith} />
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 pt-8">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            {tHadith('previous')}
                                        </button>
                                        <span className="text-emerald-900/60 font-semibold">
                                            {t('page_info', { page, total: totalPages })}
                                        </span>
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            {tHadith('next')}
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="p-20 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic">
                                <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">{t('no_hadiths')}</h3>
                                <p className="text-emerald-900/60 mb-8">{t('no_hadiths_subtitle')}</p>
                                <Link href="/collections" className="text-emerald-600 font-bold uppercase tracking-widest text-sm">
                                    {t('return_to_library')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

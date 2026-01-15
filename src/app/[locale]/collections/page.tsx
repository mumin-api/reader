'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { CollectionCard } from '@/components/CollectionCard';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { StructuredData, generateBreadcrumbSchema } from '@/components/StructuredData';
import { hadithApi } from '@/lib/api/client';
import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/lib/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

import { useParams } from 'next/navigation';

export default function CollectionsPage() {
    const params = useParams();
    const locale = params.locale as string || 'en';
    const t = useTranslations('Collections');
    const tNav = useTranslations('Navbar');
    const [collections, setCollections] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('');

    React.useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await hadithApi.getCollections(); // API doesn't seem to take language for collections list yet, but good to have context
                setCollections(data);
            } catch (error) {
                console.error('Failed to fetch collections:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCollections();
    }, []);

    const filteredCollections = collections.filter(col =>
        col.nameEnglish.toLowerCase().includes(filter.toLowerCase()) ||
        (col.nameArabic && col.nameArabic.includes(filter))
    );

    const displayCollections = filteredCollections.length > 0 ? filteredCollections : (isLoading ? [] : []);

    return (
        <main className="min-h-screen relative">
            <StructuredData data={generateBreadcrumbSchema([
                { name: tNav('home'), item: BASE_URL },
                { name: tNav('collections'), item: `${BASE_URL}/collections` }
            ])} />
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
                            >
                                <BookOpen className="w-4 h-4" />
                                {t('library')}
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl font-display font-bold text-emerald-900 mb-6"
                            >
                                {t('title')}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-emerald-900/60 leading-relaxed"
                            >
                                {t('subtitle')}
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-full md:w-80"
                        >
                            <input
                                type="text"
                                placeholder={t('filter_placeholder')}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-emerald-900/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/10 focus:border-emerald-600/20 transition-all font-medium"
                            />
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20" />
                        </motion.div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-64 rounded-3xl bg-emerald-900/5 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {displayCollections.map((col, idx) => (
                                <motion.div
                                    key={col.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * (idx % 3) }}
                                >
                                    <CollectionCard
                                        slug={col.slug}
                                        nameEnglish={col.nameEnglish}
                                        nameArabic={col.nameArabic}
                                        count={col.totalHadith || col.count || 0}
                                        description={col.description}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-20 bg-emerald-900/5 border-y border-emerald-900/5 mt-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">{t('stats.hadiths')}</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">{t('stats.hadiths_label')}</p>
                    </div>
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">{t('stats.collections')}</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">{t('stats.collections_label')}</p>
                    </div>
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">{t('stats.languages')}</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">{t('stats.languages_label')}</p>
                    </div>
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">{t('stats.authentic')}</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">{t('stats.authentic_label')}</p>
                    </div>
                </div>
            </section>
        </main >
    );
}

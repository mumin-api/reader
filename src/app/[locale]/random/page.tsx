'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { ReadingSettingsPanel } from '@/components/ReadingSettingsPanel';
import { hadithApi, Hadith } from '@/lib/api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Sparkles, ChevronRight, RefreshCw } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { StructuredData, generateBreadcrumbSchema } from '@/components/StructuredData';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';

export default function RandomHadithPage() {
    const params = useParams();
    const locale = params.locale as string || 'en';
    const t = useTranslations('Home');
    const tNav = useTranslations('Navbar');

    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [count, setCount] = useState(0);

    const fetchRandom = async () => {
        setIsRefreshing(true);
        setLoading(true);
        try {
            const data = await hadithApi.getRandomHadith();
            setHadith(data);
            setCount(c => c + 1);
        } catch (err) {
            console.error('Failed to fetch random hadith', err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => { fetchRandom(); }, []);

    return (
        <main className="min-h-screen relative" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <StructuredData data={generateBreadcrumbSchema([
                { name: 'Home', item: BASE_URL },
                { name: 'Random Hadith', item: `${BASE_URL}/random` }
            ])} />
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase mb-8 border"
                            style={{ backgroundColor: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.25)', color: '#d4af37' }}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Spiritual Discovery
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl font-display font-bold mb-6"
                            style={{ color: 'var(--page-text)' }}
                        >
                            Random <span className="gradient-text">Wisdom</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg max-w-xl mx-auto leading-relaxed mb-10"
                            style={{ color: 'var(--muted-text)' }}
                        >
                            Let the universe guide you to a narration that speaks to your soul today.
                            Discover unexpected wisdom from the vast Prophetic tradition.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-4"
                        >
                            <button
                                onClick={fetchRandom}
                                disabled={isRefreshing}
                                className="flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase text-white hover:scale-105 transition-all shadow-2xl disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 20px 60px rgba(5,150,105,0.3)' }}
                            >
                                {isRefreshing
                                    ? <RefreshCw className="w-5 h-5 animate-spin" />
                                    : <Shuffle className="w-5 h-5" />
                                }
                                {isRefreshing ? 'Discovering...' : 'Get Random Hadith'}
                            </button>

                            {count > 0 && (
                                <div className="px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--muted-text)', backgroundColor: 'var(--card-bg)' }}>
                                    #{count} today
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Hadith Card */}
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-96 rounded-[2rem] animate-pulse"
                                style={{ backgroundColor: 'var(--card-bg)' }}
                            />
                        ) : hadith ? (
                            <motion.div
                                key={hadith.id}
                                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97, y: -20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            >
                                <HadithCard hadith={hadith} />

                                {/* Meta strip */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 flex items-center justify-center gap-8 px-4 py-6 rounded-2xl border"
                                    style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
                                >
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--muted-text)' }}>Collection</p>
                                        <p className="font-bold text-sm" style={{ color: 'var(--page-text)' }}>{hadith.collection}</p>
                                    </div>
                                    <div className="w-px h-8" style={{ backgroundColor: 'var(--border-color)' }} />
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--muted-text)' }}>Reference</p>
                                        <p className="font-bold text-sm" style={{ color: 'var(--page-text)' }}>№ {hadith.hadithNumber}</p>
                                    </div>
                                    <div className="w-px h-8" style={{ backgroundColor: 'var(--border-color)' }} />
                                    <Link
                                        href={`/hadith/${hadith.id}`}
                                        className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
                                    >
                                        View Context <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="p-20 text-center rounded-[2rem] border"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                                <p style={{ color: 'var(--muted-text)' }}>Failed to load a random hadith. Please try again.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <ReadingSettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </main>
    );
}

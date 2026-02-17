'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { ReadingSettingsPanel } from '@/components/ReadingSettingsPanel';
import { hadithApi, Hadith } from '@/lib/api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Sparkles, Filter, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { StructuredData, generateBreadcrumbSchema } from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';

// This is a client-side only component.

export default function RandomHadithPage() {
    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchRandom = async () => {
        setIsRefreshing(true);
        setLoading(true);
        try {
            const data = await hadithApi.getRandomHadith();
            setHadith(data);
        } catch (err) {
            console.error('Failed to fetch random hadith', err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchRandom();
    }, []);

    return (
        <main className="min-h-screen relative">
            <StructuredData data={generateBreadcrumbSchema([
                { name: 'Home', item: BASE_URL },
                { name: 'Random Hadith', item: `${BASE_URL}/random` }
            ])} />
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16 px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-6 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 backdrop-blur-md mb-8"
                        >
                            <span className="text-sm font-bold tracking-[0.3em] text-gold-700 uppercase flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Spiritual Discovery
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl font-display font-bold text-emerald-900 mb-6"
                        >
                            Random <span className="gradient-text">Wisdom</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-emerald-900/60 max-w-xl leading-relaxed mb-10"
                        >
                            Let the universe guide you to a narration that speaks to your soul today.
                            Discover unexpected wisdom from the vast Prophetic tradition.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-4"
                        >
                            <button
                                onClick={fetchRandom}
                                disabled={isRefreshing}
                                className="flex items-center gap-3 px-10 py-4 bg-emerald-900 text-white font-bold rounded-full text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl shadow-emerald-900/20 disabled:opacity-50"
                            >
                                <Shuffle className={cn("w-5 h-5", isRefreshing && "animate-spin")} />
                                {isRefreshing ? 'Discovering...' : 'Get Random Hadith'}
                            </button>
                            <button className="p-4 rounded-full bg-white border border-emerald-900/10 text-emerald-900 hover:bg-emerald-900/5 transition-all">
                                <Filter className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-96 bg-emerald-900/5 rounded-[3rem] animate-pulse"
                                />
                            ) : hadith ? (
                                <motion.div
                                    key={hadith.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                >
                                    <HadithCard hadith={hadith} />

                                    <div className="mt-12 flex items-center justify-center gap-8 px-4 py-8 border-y border-emerald-900/5">
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">Collection</p>
                                            <p className="font-bold text-emerald-900">{hadith.collection}</p>
                                        </div>
                                        <div className="w-px h-8 bg-emerald-900/10" />
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">Reference</p>
                                            <p className="font-bold text-emerald-900">№ {hadith.hadithNumber}</p>
                                        </div>
                                        <div className="w-px h-8 bg-emerald-900/10" />
                                        <Link
                                            href={`/hadith/${hadith.id}`}
                                            className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
                                        >
                                            View Context <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="p-20 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic">
                                    <p className="text-emerald-900/40">Failed to load a random hadith. Please try again.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <ReadingSettingsPanel
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </main>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

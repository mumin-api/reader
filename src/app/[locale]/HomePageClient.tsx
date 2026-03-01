'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { CollectionCard } from '@/components/CollectionCard';
import { Hadith } from '@/lib/api/client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Sparkles, ArrowRight, Moon, BookOpen, Search, Star,
    ChevronDown
} from 'lucide-react';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RamadanAtmosphere } from '@/components/RamadanAtmosphere';

// ─── Floating Orb ─────────────────────────────────────────────────────────────
const FloatingOrb = ({ size, x, y, color, delay = 0 }: { size: number; x: string; y: string; color: string; delay?: number }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(80px)', opacity: 0.15 }}
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
);

// ─── Main Component ────────────────────────────────────────────────────────────
interface HomePageClientProps {
    initialDailyHadith: Hadith | null;
    initialFeaturedCollections: any[];
    initialEvents: any[];
    locale: string;
}

export default function HomePageClient({ initialDailyHadith, initialFeaturedCollections, initialEvents, locale }: HomePageClientProps) {
    const t = useTranslations('Home');
    const tNav = useTranslations('Navbar');
    const tFooter = useTranslations('Footer');
    const [dailyHadith] = useState<Hadith | null>(initialDailyHadith);
    const [featuredCollections] = useState<any[]>(initialFeaturedCollections);
    const [activeEvents] = useState<any[]>(initialEvents);
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroY = useTransform(scrollY, [0, 400], [0, -60]);

    const ramadanEvent = activeEvents.find(e => e.slug === 'ramadan');

    return (
        <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <GeometricPattern opacity={0.02} />
            <Navbar />

            {/* ── HERO ──────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-4 overflow-hidden">
                {ramadanEvent && <RamadanAtmosphere />}

                {/* Floating background orbs */}
                <FloatingOrb size={600} x="-10%" y="-5%" color="radial-gradient(circle, #059669, transparent)" delay={0} />
                <FloatingOrb size={400} x="70%" y="10%" color="radial-gradient(circle, #d4af37, transparent)" delay={2} />
                <FloatingOrb size={300} x="20%" y="60%" color="radial-gradient(circle, #0369a1, transparent)" delay={4} />

                <motion.div style={{ opacity: heroOpacity, y: heroY }} className="max-w-7xl mx-auto relative z-10 w-full">
                    <div className="text-center mb-16">
                        {/* Eyebrow badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase mb-10 border"
                            style={{ backgroundColor: 'rgba(5,150,105,0.08)', borderColor: 'rgba(5,150,105,0.25)', color: '#059669' }}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            {ramadanEvent ? t('ramadan_mubarak') : t('daily_inspiration')}
                        </motion.div>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
                            className="text-6xl md:text-8xl font-display font-bold leading-[1.05] mb-8 tracking-tight"
                        >
                            {ramadanEvent ? (
                                <span className="gradient-text">{t('ramadan_title')}</span>
                            ) : (
                                <>
                                    <span style={{ color: 'var(--page-text)' }}>{t('hero_title_1')}</span>
                                    <br />
                                    <span className="gradient-text">{t('hero_title_2')}</span>
                                </>
                            )}
                        </motion.h1>

                        {/* Arabic subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl md:text-3xl font-amiri mb-6 opacity-40"
                            dir="rtl"
                        >
                            الحديث النبوي الشريف
                        </motion.p>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                            style={{ color: 'var(--muted-text)' }}
                        >
                            {ramadanEvent ? t('ramadan_hero_subtitle') : t('hero_subtitle')}
                        </motion.p>

                        {/* CTA Buttons & Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-2xl mx-auto mb-16"
                        >
                            <form action={`/${locale}/search`} className="relative group mb-8">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 transition-transform group-focus-within:scale-110" />
                                <input
                                    name="q"
                                    type="text"
                                    placeholder={tNav('search_results')}
                                    className="w-full pl-14 pr-6 py-5 rounded-2xl border text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--page-text)' }}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                >
                                    {tNav('search_results')}
                                </button>
                            </form>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href="/collections"
                                    className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase text-white shadow-2xl hover:scale-105 transition-all duration-300"
                                    style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', boxShadow: '0 20px 60px rgba(5,150,105,0.35)' }}
                                >
                                    <BookOpen className="w-4 h-4" />
                                    {t('explore_collections')}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/random"
                                    className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase border hover:scale-105 transition-all duration-300"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--page-text)', backgroundColor: 'var(--card-bg)', backdropFilter: 'blur(12px)' }}
                                >
                                    <Sparkles className="w-4 h-4 text-emerald-600" />
                                    {tNav('random')}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    style={{ color: 'var(--muted-text)' }}
                >
                    <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ── DAILY HADITH ──────────────────────────────────────────────── */}
            <section className="py-24 px-4 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between mb-10"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">{t('daily_inspiration')}</p>
                            <h2 className="text-3xl font-display font-bold" style={{ color: 'var(--page-text)' }}>{t('daily_hadith')}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-text)' }}>
                                {new Date().toLocaleDateString(locale, { weekday: 'long' })}
                            </p>
                            <p className="text-sm font-medium" style={{ color: 'var(--muted-text)' }}>
                                {new Date().toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </motion.div>

                    {dailyHadith ? (
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <HadithCard hadith={dailyHadith} />
                        </motion.div>
                    ) : (
                        <div className="p-12 text-center rounded-[2rem] border"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                            <p style={{ color: 'var(--muted-text)' }}>{t('unable_load')}</p>
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center"
                    >
                        <Link href="/random"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:gap-4"
                            style={{ color: 'var(--muted-text)' }}>
                            {t('refresh')} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>



            {/* ── FOOTER ────────────────────────────────────────────────────── */}
            <footer className="relative overflow-hidden border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--page-bg-soft)' }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #059669, transparent)' }} />

                <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 transition-transform hover:scale-105 w-fit">
                            <div className="relative w-10 h-10">
                                <Image src="/icons/logo.svg" alt="Mumin Logo" fill className="object-contain" />
                            </div>
                            <span className="text-xl font-display font-bold" style={{ color: 'var(--page-text)' }}>Mumin Hadith</span>
                        </Link>
                        <p className="max-w-sm leading-relaxed mb-8 text-sm" style={{ color: 'var(--muted-text)' }}>
                            {tFooter('description')}
                        </p>
                        <div className="w-12 h-1 rounded-full bg-emerald-600 opacity-60" />
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-emerald-600">{tFooter('platform')}</h4>
                        <ul className="space-y-3 text-sm" style={{ color: 'var(--muted-text)' }}>
                            {[
                                { href: '/collections', label: tNav('collections') },
                                { href: '/random', label: tNav('random') },
                                { href: '/search', label: tNav('search_results') },
                                { href: '/bookmarks', label: tNav('bookmarks') },
                            ].map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-emerald-600 transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-emerald-600">{tFooter('about')}</h4>
                        <ul className="space-y-3 text-sm" style={{ color: 'var(--muted-text)' }}>
                            {[
                                { href: '/about', label: tFooter('mission') },
                                { href: '/methodology', label: tFooter('methodology') },
                                { href: '/developers', label: tFooter('developers') },
                                { href: '/privacy', label: tFooter('privacy') },
                                { href: '/terms', label: tFooter('terms') },
                            ].map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-emerald-600 transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t py-6 text-center text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--muted-text)' }}>
                    {tFooter('rights')}
                </div>
            </footer>
        </main>
    );
}

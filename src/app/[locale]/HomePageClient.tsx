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
    Zap, Globe, Shield, ChevronDown, Quote
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

// ─── Animated Counter ─────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const step = target / 60;
                const timer = setInterval(() => {
                    start += step;
                    if (start >= target) { setCount(target); clearInterval(timer); }
                    else setCount(Math.floor(start));
                }, 16);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ─── Ramadan Banner ────────────────────────────────────────────────────────────
const RamadanBanner = ({ t }: { t: any }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mb-20 px-4">
        <Link href="/topics/ramadan"
            className="group relative block overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-transform hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 50%, #011c16 100%)' }}>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full -mr-40 -mt-40 blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                    <Moon className="w-10 h-10" style={{ color: '#d4af37' }} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{t('ramadan_special')}</h2>
                    <p className="text-lg" style={{ color: 'rgba(212,175,55,0.7)' }}>{t('ramadan_subtitle')}</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg transition-all group-hover:scale-105"
                    style={{ background: '#d4af37', color: '#022c22' }}>
                    {t('view_ramadan_hadiths')} <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
    </motion.div>
);

// ─── Testimonial / Quote Card ──────────────────────────────────────────────────
const QuoteCard = ({ text, source }: { text: string; source: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative p-8 rounded-[2rem] border overflow-hidden"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
    >
        <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-600 opacity-20" />
        <p className="text-lg font-amiri leading-relaxed mb-4" style={{ color: 'var(--page-text)' }}>{text}</p>
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{source}</p>
    </motion.div>
);

// ─── Feature Card ──────────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc, gradient }: { icon: any; title: string; desc: string; gradient: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="relative p-8 rounded-[2rem] border overflow-hidden group"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
    >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${gradient}15 0%, transparent 60%)` }} />
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: `${gradient}20` }}>
            <Icon className="w-6 h-6" style={{ color: gradient }} />
        </div>
        <h3 className="text-lg font-display font-bold mb-3" style={{ color: 'var(--page-text)' }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>{desc}</p>
    </motion.div>
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

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-4 mb-16"
                        >
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
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap items-center justify-center gap-6"
                        >
                            {[
                                { icon: Shield, label: '100% Authentic' },
                                { icon: Globe, label: '7 Languages' },
                                { icon: Star, label: '8 Collections' },
                                { icon: Zap, label: '50,000+ Hadiths' },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--muted-text)' }}>
                                    <Icon className="w-3.5 h-3.5 text-emerald-600" />
                                    {label}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Ramadan Banner */}
                    {ramadanEvent && <RamadanBanner t={t} />}
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

            {/* ── STATS ─────────────────────────────────────────────────────── */}
            <section className="py-20 px-4 border-y" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--page-bg-soft)' }}>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: 50000, suffix: '+', label: 'Hadiths' },
                        { value: 8, suffix: '', label: 'Collections' },
                        { value: 7, suffix: '', label: 'Languages' },
                        { value: 100, suffix: '%', label: 'Verified' },
                    ].map(({ value, suffix, label }) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <p className="text-4xl md:text-5xl font-display font-bold text-emerald-600 mb-2">
                                <AnimatedCounter target={value} suffix={suffix} />
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted-text)' }}>{label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── FEATURED COLLECTIONS ──────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-14">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">{t('library')}</p>
                            <h2 className="text-4xl font-display font-bold mb-3" style={{ color: 'var(--page-text)' }}>{t('explore_collections')}</h2>
                            <p style={{ color: 'var(--muted-text)' }}>{t('explore_collections_subtitle')}</p>
                        </motion.div>
                        <Link href="/collections"
                            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase text-white hover:scale-105 transition-all shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
                            {t('view_all')} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCollections.map((col, idx) => (
                            <motion.div
                                key={col.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
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

                    <div className="mt-10 text-center md:hidden">
                        <Link href="/collections"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase text-white shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
                            {t('view_all_collections')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── WHY MUMIN ─────────────────────────────────────────────────── */}
            <section className="py-24 px-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-16">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Why Mumin</p>
                        <h2 className="text-4xl font-display font-bold mb-4" style={{ color: 'var(--page-text)' }}>
                            Sacred Knowledge, <span className="gradient-text">Modern Experience</span>
                        </h2>
                        <p className="max-w-xl mx-auto" style={{ color: 'var(--muted-text)' }}>
                            We believe prophetic wisdom deserves a premium digital home — beautiful, fast, and accessible to all.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard icon={Shield} title="Authenticated Sources" gradient="#059669"
                            desc="Every hadith is sourced from the Kutub al-Sittah — the six canonical collections verified by generations of scholars." />
                        <FeatureCard icon={Globe} title="7 Languages" gradient="#0369a1"
                            desc="Read prophetic traditions in English, Arabic, Russian, Turkish, Uzbek, and more — making knowledge truly global." />
                        <FeatureCard icon={Search} title="Powerful Search" gradient="#7c3aed"
                            desc="Find any narration instantly with full-text search across all collections, filtered by grade and narrator." />
                        <FeatureCard icon={Star} title="Bookmark & Reflect" gradient="#d4af37"
                            desc="Save hadiths that resonate with you, build your personal collection, and revisit them anytime." />
                        <FeatureCard icon={Zap} title="Lightning Fast" gradient="#059669"
                            desc="Built with Next.js and server-side rendering for instant page loads and a seamless reading experience." />
                        <FeatureCard icon={BookOpen} title="Reading Modes" gradient="#be123c"
                            desc="Customize your experience with Light, Dark, Sepia, and High Contrast modes, plus adjustable Arabic fonts." />
                    </div>
                </div>
            </section>

            {/* ── QUOTES ────────────────────────────────────────────────────── */}
            <section className="py-24 px-4 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--page-bg-soft)' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-14">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">From the Sunnah</p>
                        <h2 className="text-4xl font-display font-bold" style={{ color: 'var(--page-text)' }}>Words of the Prophet ﷺ</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <QuoteCard
                            text='"The best of you are those who learn the Quran and teach it."'
                            source="Sahih al-Bukhari • 5027"
                        />
                        <QuoteCard
                            text='"Seeking knowledge is an obligation upon every Muslim."'
                            source="Sunan Ibn Majah • 224"
                        />
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ────────────────────────────────────────────────── */}
            <section className="py-24 px-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-[3rem] p-12 md:p-16 text-center"
                        style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' }}
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -mr-48 -mt-48 blur-3xl opacity-20"
                            style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }} />
                        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-3xl opacity-10"
                            style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />
                        <div className="relative z-10">
                            <p className="text-4xl md:text-5xl font-amiri text-white opacity-30 mb-6">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                Start Your Journey Today
                            </h2>
                            <p className="text-lg mb-10" style={{ color: 'rgba(212,175,55,0.7)' }}>
                                Explore 50,000+ authenticated hadiths from the greatest scholars of Islam.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link href="/collections"
                                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
                                    style={{ background: '#d4af37', color: '#022c22' }}>
                                    Explore Collections <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="/random"
                                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase border hover:scale-105 transition-all"
                                    style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                    Random Hadith
                                </Link>
                            </div>
                        </div>
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

'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { CollectionCard } from '@/components/CollectionCard';
import { Hadith } from '@/lib/api/client';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Moon } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { IslamicOrnaments } from '@/components/IslamicOrnaments';

const RamadanBanner = ({ t }: { t: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="max-w-4xl mx-auto mb-20 px-4"
  >
    <Link 
      href="/topics/ramadan"
      className="group relative block overflow-hidden rounded-[3rem] bg-emerald-900 p-8 md:p-12 shadow-2xl transition-transform hover:scale-[1.02]"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-gold-500/20 transition-colors" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
          <Moon className="w-10 h-10 text-gold-500" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            {t('ramadan_special')}
          </h2>
          <p className="text-emerald-100/60 text-lg">
            {t('ramadan_subtitle')}
          </p>
        </div>
        
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gold-500 text-emerald-900 font-bold text-sm tracking-widest uppercase shadow-lg group-hover:bg-gold-400 transition-colors">
          {t('view_ramadan_hadiths')} <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  </motion.div>
);

interface HomePageClientProps {
  initialDailyHadith: Hadith | null;
  initialFeaturedCollections: any[];
  initialEvents: any[];
  locale: string;
}

export default function HomePageClient({ 
  initialDailyHadith, 
  initialFeaturedCollections,
  initialEvents,
  locale
}: HomePageClientProps) {
  const t = useTranslations('Home');
  const tNav = useTranslations('Navbar');
  const tFooter = useTranslations('Footer');
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(initialDailyHadith);
  const [featuredCollections] = useState<any[]>(initialFeaturedCollections);
  const [activeEvents] = useState<any[]>(initialEvents);
  const [loading, setLoading] = useState(false);

  const ramadanEvent = activeEvents.find(e => e.slug === 'ramadan');

  // We could add refresh logic here if needed, but for now we use initial data
  
  return (
    <main className="min-h-screen relative overflow-hidden">
      <GeometricPattern opacity={0.03} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden transition-[background-color] duration-1000 bg-transparent">
        {/* Decorative Ornaments for Ramadan */}
        {ramadanEvent && <IslamicOrnaments />}
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs tracking-widest uppercase mb-6"
            >
              <Sparkles className="w-4 h-4" />
              {ramadanEvent ? t('ramadan_mubarak') : t('daily_inspiration')}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
            >
              {ramadanEvent ? (
                <span className="gradient-text">{t('ramadan_title')}</span>
              ) : (
                <>
                  {t('hero_title_1')} <br />
                  <span className="gradient-text">{t('hero_title_2')}</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto opacity-60"
            >
              {ramadanEvent ? t('ramadan_hero_subtitle') : t('hero_subtitle')}
            </motion.p>
          </div>

          {ramadanEvent && <RamadanBanner t={t} />}

          {/* Daily Hadith Hero Card */}
          <div className="max-w-4xl mx-auto mb-32">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">
                {t('daily_hadith')}
              </h2>
              <div className="h-px flex-1 mx-8 bg-current opacity-10" />
              <button className="text-sm font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest flex items-center gap-2">
                {t('refresh')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {loading ? (
              <div className="w-full h-96 bg-emerald-900/5 rounded-[3rem] animate-pulse" />
            ) : dailyHadith ? (
              <HadithCard hadith={dailyHadith} />
            ) : (
              <div className="p-12 text-center bg-white rounded-[3rem] border border-emerald-900/5">
                <p className="text-emerald-900/40">{t('unable_load')}</p>
              </div>
            )}
          </div>

          {/* Collections Grid */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold mb-2">{t('explore_collections')}</h2>
                <p className="opacity-60">{t('explore_collections_subtitle')}</p>
              </div>
              <Link
                href="/collections"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-lg"
              >
                {t('view_all')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCollections.map((col, idx) => (
                <CollectionCard
                  key={col.slug}
                  slug={col.slug}
                  nameEnglish={col.nameEnglish}
                  nameArabic={col.nameArabic}
                  count={col.totalHadith || col.count || 0}
                  description={col.description}
                />
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-bold text-sm tracking-widest uppercase shadow-lg"
              >
                {t('view_all_collections')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-600 text-white py-20 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 transition-transform hover:scale-105">
              <div className="relative w-12 h-12">
                <Image
                  src="/icons/logo.svg"
                  alt="Mumin Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-display font-bold">Mumin Hadith</span>
            </Link>
            <p className="text-emerald-100/60 max-w-sm leading-relaxed mb-8">
              {tFooter('description')}
            </p>
            <div className="flex items-center gap-6">
              {/* Social Icons */}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-gold-500">{tFooter('platform')}</h4>
            <ul className="space-y-4 text-emerald-100/60">
              <li><Link href="/collections" className="hover:text-white transition-colors">{tNav('collections')}</Link></li>
              <li><Link href="/random" className="hover:text-white transition-colors">{tNav('random')}</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">{tNav('search_results')}</Link></li>
              <li><Link href="/bookmarks" className="hover:text-white transition-colors">{tNav('bookmarks')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-gold-500">{tFooter('about')}</h4>
            <ul className="space-y-4 text-white/40">
              <li><Link href="/about" className="hover:text-white transition-colors">{tFooter('mission')}</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">{tFooter('methodology')}</Link></li>
              <li><Link href="/developers" className="hover:text-white transition-colors">{tFooter('developers')}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">{tFooter('privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">{tFooter('terms')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-white/20 text-xs">
          {tFooter('rights')}
        </div>
      </footer>
    </main>
  );
}

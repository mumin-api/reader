'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { ReadingSettingsPanel } from '@/components/ReadingSettingsPanel';
import { Hadith } from '@/lib/api/client';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Settings,
    Share2,
    Printer,
    Flag,
    Copy,
    Check,
    Loader2,
    AlertCircle,
    X
} from 'lucide-react';
import { Link, useRouter } from '@/lib/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { hadithApi } from '@/lib/api/client';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';

import { RelatedHadiths } from '@/components/RelatedHadiths';

interface HadithDeepViewClientProps {
    hadith: Hadith | null;
    relatedHadiths: Hadith[];
    slug: string;
    number: number;
    locale: string;
}

export default function HadithDeepViewClient({
    hadith,
    relatedHadiths,
    slug,
    number,
    locale
}: HadithDeepViewClientProps) {
    const router = useRouter();
    const t = useTranslations('Hadith');
    const tColl = useTranslations('Collections');
    const tSettings = useTranslations('Settings');
    const tNav = useTranslations('Navbar');

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showCopyToast, setShowCopyToast] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportMessage, setReportMessage] = useState('');
    const [isReporting, setIsReporting] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowCopyToast(true);
            setTimeout(() => setShowCopyToast(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleReport = async () => {
        if (!hadith || !reportMessage.trim()) return;
        setIsReporting(true);
        try {
            await hadithApi.reportExplanation(hadith.id, reportMessage);
            setShowReportModal(false);
            setReportMessage('');
            // Show a simple success state or toast
            alert(tNav('report_success' as any) || 'Report sent successfully');
        } catch (error) {
            console.error('Failed to report:', error);
        } finally {
            setIsReporting(false);
        }
    };

    const navigateTo = (direction: 'next' | 'prev') => {
        const nextNumber = direction === 'next' ? number + 1 : number - 1;
        if (nextNumber > 0) {
            router.push(`/collections/${slug}/${nextNumber}`);
        }
    };

    return (
        <main className="min-h-screen relative">
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs & Navigation */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-emerald-900/40">
                            <Link href="/collections" className="hover:text-emerald-900 transition-colors">{tColl('library')}</Link>
                            <ChevronRight className="w-3 h-3" />
                            {hadith && (
                                <Link href={`/collections/${slug}`} className="hover:text-emerald-900 transition-colors">
                                    {hadith.collection}
                                </Link>
                            )}
                            <ChevronRight className="w-3 h-3 text-emerald-900/10" />
                            <span className="text-emerald-900">{t('book')} {number}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigateTo('prev')}
                                disabled={number <= 1}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                {t('previous')}
                            </button>
                            <button
                                onClick={() => navigateTo('next')}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 transition-all"
                            >
                                {t('next')}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Context Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <div className="p-8 rounded-[2.5rem] bg-white border border-emerald-900/5 shadow-islamic">
                                    <h3 className="text-lg font-display font-bold text-emerald-900 mb-6 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-gold-500" />
                                        {t('collection_context')}
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">{t('book')}</p>
                                            <p className="font-semibold text-emerald-900 leading-tight">{t('book')} {hadith?.bookNumber || '...'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">{tColl('title')}</p>
                                            <p className="text-sm text-emerald-900/60 leading-relaxed">{hadith?.collection || '...'}</p>
                                        </div>
                                    </div>
                                    <Link href={`/collections/${slug}`} className="block w-full mt-8 py-3 bg-emerald-900/5 hover:bg-emerald-900 hover:text-white text-emerald-900 font-bold rounded-xl text-center transition-all text-xs uppercase tracking-widest">
                                        {t('view_full_collection')}
                                    </Link>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-emerald-900 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                    <Settings className="w-8 h-8 text-gold-500 mb-4" />
                                    <h3 className="text-xl font-display font-bold mb-4">{tSettings('title')}</h3>
                                    <p className="text-emerald-100/60 text-sm leading-relaxed mb-6">
                                        {tSettings('customize')}
                                    </p>
                                    <button
                                        onClick={() => setIsSettingsOpen(true)}
                                        className="w-full py-3 bg-white text-emerald-900 font-bold rounded-xl transition-all shadow-lg text-sm uppercase tracking-widest"
                                    >
                                        {tSettings('open_settings')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Hadith Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {hadith ? (
                                <>
                                    <HadithCard hadith={hadith} showDetails />

                                    {/* Additional Commentary */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="p-8 md:p-12 rounded-[3rem] bg-emerald-900/5 border border-emerald-900/5"
                                    >
                                        <h3 className="text-xl font-display font-bold text-emerald-900 mb-6 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-emerald-950">
                                                <span className="font-bold">?</span>
                                            </div>
                                            {t('understanding')}
                                        </h3>
                                        <div className="space-y-6 text-emerald-950/70 leading-relaxed">
                                            <p>
                                                {t('understanding_text', { collection: hadith.collection })}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Actions Row */}
                                    <div className="flex flex-wrap items-center gap-4 justify-center">
                                        <button 
                                            onClick={handleShare}
                                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-emerald-900/60 hover:text-emerald-900 transition-all uppercase tracking-widest relative"
                                        >
                                            <AnimatePresence>
                                                {showCopyToast ? (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Check className="w-4 h-4 text-emerald-600" />
                                                        <span>{tNav('search_results' as any) === 'Search' ? 'Copied' : 'Скопировано'}</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Share2 className="w-4 h-4" />
                                                        {t('share_link')}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                        <button 
                                            onClick={handlePrint}
                                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-emerald-900/60 hover:text-emerald-900 transition-all uppercase tracking-widest"
                                        >
                                            <Printer className="w-4 h-4" />
                                            {t('print')}
                                        </button>
                                        <button 
                                            onClick={() => setShowReportModal(true)}
                                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-ruby hover:bg-ruby/5 transition-all uppercase tracking-widest"
                                        >
                                            <Flag className="w-4 h-4" />
                                            {t('report_error')}
                                        </button>
                                    </div>

                                    <RelatedHadiths hadiths={relatedHadiths} />
                                </>
                            ) : (
                                <div className="p-20 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic">
                                    <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">{t('not_found')}</h3>
                                    <p className="text-emerald-900/60 mb-8">{t('not_found_message', { number, collection: slug })}</p>
                                    <Link href="/collections" className="text-emerald-600 font-bold uppercase tracking-widest text-sm">{tColl('return_to_library')}</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <ReadingSettingsPanel
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
            {/* Report Modal */}
            <AnimatePresence>
                {showReportModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowReportModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-white border border-emerald-900/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[5rem] -mr-16 -mt-16" />
                            
                            <h3 className="text-xl font-display font-bold mb-2 relative z-10 text-emerald-900" style={{ color: 'var(--page-text)' }}>
                                {tNav('report_error' as any) || 'Found an error?'}
                            </h3>
                            <p className="text-sm opacity-60 mb-6 relative z-10 text-emerald-900/60" style={{ color: 'var(--muted-text)' }}>
                                {tNav('report_desc' as any) || 'Describe what is wrong. we will check and fix it.'}
                            </p>
                            
                            <textarea
                                value={reportMessage}
                                onChange={(e) => setReportMessage(e.target.value)}
                                placeholder="..."
                                className="w-full h-32 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-sm focus:outline-none focus:border-emerald-500/30 transition-colors mb-6 resize-none"
                                style={{ backgroundColor: 'var(--page-bg-soft)', borderColor: 'var(--border-color)', color: 'var(--page-text)' }}
                            />
                            
                            <div className="flex items-center justify-end gap-3 relative z-10">
                                <button
                                    onClick={() => setShowReportModal(false)}
                                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                                    style={{ color: 'var(--page-text)' }}
                                >
                                    {tNav('cancel' as any) || 'Cancel'}
                                </button>
                                <button
                                    onClick={handleReport}
                                    disabled={isReporting || !reportMessage.trim()}
                                    className="px-8 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:shadow-none transition-all"
                                >
                                    {isReporting ? (tNav('sending' as any) || 'Sending...') : (tNav('send' as any) || 'Send')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}

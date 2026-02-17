'use client';

import React, { useState } from 'react';
import {
    Heart,
    Share2,
    Copy,
    ExternalLink,
    Info,
    Check
} from 'lucide-react';
import { cn, getCollectionSlug } from '@/lib/utils';
import { Hadith } from '@/lib/api/client';
import { useReadingSettings } from '@/store/useReadingSettings';
import { useBookmarks } from '@/store/useBookmarks';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

interface HadithCardProps {
    hadith: Hadith;
    showDetails?: boolean;
}

// Grades are moved inside component to use translations

export const HadithCard: React.FC<HadithCardProps> = ({ hadith, showDetails = false }) => {
    const { textSize, arabicFont, mode, showTranslation } = useReadingSettings();
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
    const [showCopyToast, setShowCopyToast] = useState(false);
    const [showIsnad, setShowIsnad] = useState(false);
    const t = useTranslations('Hadith');

    const GRADES = {
        sahih: { label: t('grades.sahih'), color: 'bg-emerald-600' },
        hasan: { label: t('grades.hasan'), color: 'bg-amber-500' },
        daif: { label: t('grades.daif'), color: 'bg-red-500' },
        mawdu: { label: t('grades.mawdu'), color: 'bg-zinc-500' },
    };

    const bookmarked = isBookmarked(hadith.id);
    const grade = hadith.translation?.grade?.toLowerCase() as keyof typeof GRADES || 'sahih';
    const gradeInfo = GRADES[grade] || GRADES.sahih;

    const fontSizes = {
        1: { arabic: 'text-lg', english: 'text-sm' },
        2: { arabic: 'text-xl', english: 'text-base' },
        3: { arabic: 'text-2xl', english: 'text-lg' },
        4: { arabic: 'text-3xl', english: 'text-xl' },
        5: { arabic: 'text-4xl', english: 'text-2xl' },
    };

    const currentSize = fontSizes[textSize as keyof typeof fontSizes];

    const handleBookmark = () => {
        if (bookmarked) {
            removeBookmark(hadith.id);
        } else {
            addBookmark({
                hadithId: hadith.id,
                collection: hadith.collection,
                bookNumber: hadith.bookNumber,
                hadithNumber: hadith.hadithNumber,
                textPreview: hadith.translation?.text.substring(0, 100) || '',
                timestamp: Date.now(),
            });
        }
    };

    const copyToClipboard = async () => {
        const text = `${hadith.arabicText}\n\n${hadith.translation?.text}\n\n— ${hadith.collection} ${hadith.hadithNumber}`;

        try {
            // Try modern clipboard API first
            await navigator.clipboard.writeText(text);
            setShowCopyToast(true);
            setTimeout(() => setShowCopyToast(false), 2000);
        } catch (err) {
            // Fallback for browsers/systems that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setShowCopyToast(true);
                setTimeout(() => setShowCopyToast(false), 2000);
            } catch (e) {
                console.error('Failed to copy', e);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/collections/${hadith.collection}/${hadith.hadithNumber}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Hadith ${hadith.hadithNumber} - ${hadith.collection}`,
                    text: hadith.translation?.text || hadith.arabicText,
                    url: url
                });
            } catch (err) {
                // User cancelled or error occurred
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy link to clipboard
            navigator.clipboard.writeText(url);
            setShowCopyToast(true);
            setTimeout(() => setShowCopyToast(false), 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--page-text)'
            }}
            className={cn(
                "group relative p-6 md:p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-600/20"
            )}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                            {hadith.collection} • {hadith.hadithNumber}
                        </span>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider", gradeInfo.color)}>
                        {gradeInfo.label}
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={handleBookmark}
                        className={cn(
                            "p-2.5 rounded-full transition-all duration-300",
                            bookmarked ? "text-gold-500 bg-gold-500/10" : "opacity-30 hover:opacity-100 hover:bg-emerald-600/5"
                        )}
                    >
                        <Heart className={cn("w-5 h-5", bookmarked && "fill-current scale-110")} />
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="p-2.5 rounded-full opacity-30 hover:opacity-100 hover:bg-emerald-600/5 transition-all"
                        title={t('copy')}
                    >
                        <Copy className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2.5 rounded-full opacity-30 hover:opacity-100 hover:bg-emerald-600/5 transition-all"
                        title={t('share')}
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Arabic Text */}
            <div className="mb-8 relative z-10" dir="rtl">
                <p className={cn(
                    "leading-[2.2] text-right font-medium",
                    currentSize.arabic,
                    arabicFont === 'Amiri' && "font-amiri",
                    arabicFont === 'Cairo' && "font-cairo",
                    arabicFont === 'Traditional Arabic' && "font-serif"
                )}>
                    {hadith.arabicText}
                </p>
            </div>

            {/* Translation */}
            {showTranslation && hadith.translation && (
                <div className="mt-8 pt-8 border-t border-[var(--card-border)] relative z-10">
                    <div className="flex items-center gap-2 mb-4 opacity-30">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('translation')}</span>
                    </div>
                    <p className={cn(
                        "leading-relaxed font-sans opacity-80",
                        currentSize.english
                    )}>
                        {hadith.translation.text}
                    </p>
                    {hadith.translation.narrator && (
                        <p className="mt-4 text-sm font-medium italic opacity-60">
                            — {t('narrator', { narrator: hadith.translation.narrator })}
                        </p>
                    )}
                </div>
            )}

            {/* Footer / Actions */}
            <div className="mt-8 flex items-center justify-between relative z-10 pt-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowIsnad(!showIsnad)}
                        className="flex items-center gap-2 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
                    >
                        <Info className="w-4 h-4" />
                        {showIsnad ? t('hide_isnad') : t('isnad')}
                    </button>
                    <Link
                        href={`/collections/${hadith.collection.toLowerCase().replace(/\s+/g, '-')}/${hadith.hadithNumber}`}
                        className="flex items-center gap-2 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
                    >
                        <ExternalLink className="w-4 h-4" />
                        {t('reference')}
                    </Link>
                </div>
            </div>

            {/* Isnad Section */}
            <AnimatePresence>
                {showIsnad && hadith.arabicNarrator && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-emerald-900/10 relative z-10"
                    >
                        <div className="flex items-center gap-2 mb-3 opacity-40">
                            <Info className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">{t('chain_of_narration')}</span>
                        </div>
                        <p className="text-sm opacity-60 leading-relaxed" dir="rtl">
                            {hadith.arabicNarrator}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Copy Toast */}
            <AnimatePresence>
                {showCopyToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-20"
                    >
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('copied')}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Globe = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" className={className}
    >
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

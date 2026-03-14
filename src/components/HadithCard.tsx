'use client';

import React, { useState, useEffect } from 'react';
import {
    Heart,
    Share2,
    Copy,
    ExternalLink,
    Info,
    Check,
    Globe,
    Sparkles,
    AlertCircle,
    MessageSquare,
    Loader2,
    BookOpen,
    History,
    Scale,
    FileText,
    Fingerprint,
    Image as ImageIcon
} from 'lucide-react';
import { cn, getCollectionSlug } from '@/lib/utils';
import { Hadith, hadithApi, HadithExplanation } from '@/lib/api/client';
import { useReadingSettings } from '@/store/useReadingSettings';
import { useBookmarks } from '@/store/useBookmarks';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { ShareImageModal } from './ShareImageModal';

interface HadithCardProps {
    hadith: Hadith;
    showDetails?: boolean;
    hideAI?: boolean;
}

// Grades are moved inside component to use translations

export const HadithCard: React.FC<HadithCardProps> = ({ 
    hadith, 
    showDetails = false,
    hideAI = false 
}) => {
    const { textSize, arabicFont, mode, showTranslation, uiVariant } = useReadingSettings();
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
    const [showCopyToast, setShowCopyToast] = useState(false);
    const [showIsnad, setShowIsnad] = useState(false);
    const [explanation, setExplanation] = useState<HadithExplanation | null>(null);
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [reportMessage, setReportMessage] = useState('');
    const [isReporting, setIsReporting] = useState(false);
    const locale = useLocale();
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
                if (process.env.NODE_ENV === 'development') {
                    console.error('Failed to copy', e);
                }
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
                if (process.env.NODE_ENV === 'development') {
                    console.log('Share cancelled');
                }
            }
        } else {
            // Fallback: copy link to clipboard
            navigator.clipboard.writeText(url);
            setShowCopyToast(true);
            setTimeout(() => setShowCopyToast(false), 2000);
        }
    };

    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLoadingExplanation) {
            interval = setInterval(() => {
                setLoadingMessageIndex((prev) => (prev + 1) % 3);
            }, 3500);
        } else {
            setLoadingMessageIndex(0);
        }
        return () => clearInterval(interval);
    }, [isLoadingExplanation]);

    const handleFetchExplanation = async () => {
        if (explanation) {
            setExplanation(null);
            return;
        }

        setIsLoadingExplanation(true);
        setExplanation(null);

        try {
            const eventSource = hadithApi.streamExplanation(hadith.id, locale);
            
            let accumulatedContent = '';
            
            eventSource.onmessage = (event) => {
                if (event.data === '[DONE]') {
                    eventSource.close();
                    setIsLoadingExplanation(false);
                    return;
                }

                try {
                    const data = JSON.parse(event.data);
                    
                    // The API might send chunks of the explanation object or just text
                    // Our current API sends the full updated object in each SSE message for simplicity, 
                    // but let's handle the specific 'content' update pattern.
                    setExplanation(prev => {
                        if (!prev) return data;
                        return {
                            ...data,
                            content: data.content
                        };
                    });
                    
                    setIsLoadingExplanation(false); // Stop loading skeleton as soon as first data arrives
                } catch (e) {
                    console.error('Failed to parse SSE message', e);
                }
            };

            eventSource.onerror = (err) => {
                console.error('SSE Error:', err);
                eventSource.close();
                setIsLoadingExplanation(false);
            };

            return () => eventSource.close();
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Failed to start explanation stream:', error);
            }
            setIsLoadingExplanation(false);
        }
    };

    const handleReport = async () => {
        if (!reportMessage.trim()) return;
        setIsReporting(true);
        try {
            await hadithApi.reportExplanation(hadith.id, reportMessage);
            setShowReportModal(false);
            setReportMessage('');
            // Optional: show success toast
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Failed to report error:', error);
            }
        } finally {
            setIsReporting(false);
        }
    };

    const renderExplanationContent = (content: any) => {
        if (!content) return null;
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) return content.join(' ');
        if (typeof content === 'object') {
            return Object.entries(content)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
        }
        return String(content);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                backgroundColor: uiVariant === 'cinematic' ? 'transparent' : 'var(--card-bg)',
                borderColor: uiVariant === 'cinematic' ? 'transparent' : 'var(--border-color)',
                color: 'var(--page-text)'
            }}
            className={cn(
                "group relative rounded-[2.5rem] border transition-all duration-700 overflow-hidden",
                uiVariant === 'cinematic' 
                    ? "glass-cinematic golden-glow p-10 md:p-14 mb-10" 
                    : "bg-[var(--card-bg)] border-[var(--card-border)] p-6 md:p-8 mb-8 shadow-sm hover:shadow-2xl hover:border-emerald-600/20",
                showDetails && "ring-2 ring-emerald-600/20"
            )}
        >
            {uiVariant === 'cinematic' && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] -ml-24 -mb-24" />
                </div>
            )}
            
            <div className={cn(
                "flex flex-col gap-8",
                uiVariant === 'cinematic' && "items-center text-center"
            )}>

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className={cn(
                    "flex flex-wrap items-center gap-3",
                    uiVariant === 'cinematic' && "justify-center"
                )}>
                    <div className={cn(
                        "px-4 py-1.5 rounded-full border backdrop-blur-md",
                        uiVariant === 'cinematic' 
                            ? "bg-amber-500/10 border-amber-500/20" 
                            : "bg-emerald-500/10 border-emerald-500/20"
                    )}>
                        <span className={cn(
                            "text-xs font-bold tracking-widest uppercase",
                            uiVariant === 'cinematic' ? "text-amber-500" : "text-emerald-600"
                        )}>
                            {hadith.collection} • {hadith.hadithNumber}
                        </span>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider", gradeInfo.color)}>
                        {gradeInfo.label}
                    </div>
                </div>

                <div className={cn(
                    "flex items-center gap-2",
                    uiVariant === 'cinematic' && "justify-center"
                )}>
                    <button
                        onClick={handleBookmark}
                        className={cn(
                            "p-2.5 rounded-full transition-all duration-300",
                            uiVariant === 'cinematic'
                                ? (bookmarked ? "text-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : "text-white/30 hover:text-white/80 hover:bg-white/5")
                                : (bookmarked ? "text-gold-500 bg-gold-500/10" : "opacity-30 hover:opacity-100 hover:bg-emerald-600/5")
                        )}
                        aria-label={bookmarked ? t('remove_bookmark') : t('bookmark')}
                        title={bookmarked ? t('remove_bookmark') : t('bookmark')}
                    >
                        <Heart className={cn("w-5 h-5", bookmarked && "fill-current scale-110")} />
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "p-2.5 rounded-full transition-all",
                            uiVariant === 'cinematic'
                                ? "text-white/30 hover:text-white/80 hover:bg-white/5"
                                : "opacity-30 hover:opacity-100 hover:bg-emerald-600/5"
                        )}
                        title={t('copy')}
                        aria-label={t('copy')}
                    >
                        <Copy className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleShare}
                        className={cn(
                            "p-2.5 rounded-full transition-all",
                            uiVariant === 'cinematic'
                                ? "text-white/30 hover:text-white/80 hover:bg-white/5"
                                : "opacity-30 hover:opacity-100 hover:bg-emerald-600/5"
                        )}
                        title={t('share')}
                        aria-label={t('share')}
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowImageModal(true)}
                        className={cn(
                            "p-2.5 rounded-full transition-all",
                            uiVariant === 'cinematic'
                                ? "text-white/30 hover:text-white/80 hover:bg-white/5"
                                : "opacity-30 hover:opacity-100 hover:bg-emerald-600/5 transition-all"
                        )}
                        title={t('share_as_image')}
                        aria-label={t('share_as_image')}
                    >
                        <ImageIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Arabic Text */}
            <div className={cn(
                "mb-8 relative z-10",
                uiVariant === 'cinematic' ? "text-center" : "text-right"
            )} dir="rtl">
                <p className={cn(
                    "leading-[2.2] font-medium",
                    uiVariant === 'cinematic' ? "text-center" : "text-right",
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
                <div className={cn(
                    "mt-8 pt-8 border-t relative z-10",
                    uiVariant === 'cinematic' ? "border-white/10" : "border-[var(--card-border)]"
                )}>
                    <div className={cn(
                        "flex items-center gap-2 mb-4 opacity-30",
                        uiVariant === 'cinematic' && "justify-center"
                    )}>
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{t('translation')}</span>
                    </div>
                    <p className={cn(
                        "leading-relaxed font-sans",
                        uiVariant === 'cinematic' ? "opacity-90" : "opacity-80",
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

            {/* AI Explanation (MuminAI) */}
            <AnimatePresence>
                {explanation && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        className="mt-8 p-6 md:p-8 rounded-[2rem] bg-emerald-500/[0.03] dark:bg-emerald-400/[0.02] border border-emerald-500/10 backdrop-blur-md relative z-10 overflow-hidden group/ai shadow-inner"
                    >
                        {/* Glassmorphism AURA */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                    <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400">
                                    {t('MuminAI.title')}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-sm",
                                    explanation?.content?.certainty_level === 'high' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                    explanation?.content?.certainty_level === 'low' ? "bg-red-500/10 text-red-600 border-red-500/20" :
                                    "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                )}>
                                    <Fingerprint className="w-3 h-3" />
                                    {t('MuminAI.certainty_level', { level: explanation?.content?.certainty_level || 'medium' })}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 relative">
                            {/* Meaning Section */}
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <BookOpen className="w-4 h-4 text-emerald-600/50" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 dark:text-emerald-100/40">
                                        {t('MuminAI.sections.meaning')}
                                    </h4>
                                </div>
                                <p className={cn("leading-relaxed opacity-90 font-serif italic text-emerald-950 dark:text-emerald-50", currentSize.english)}>
                                    {renderExplanationContent(explanation?.content?.long_meaning || explanation?.content?.meaning)}
                                </p>
                            </motion.div>

                            {/* Context Section */}
                            {explanation?.content?.context && explanation?.content?.context !== 'нет достоверной информации' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <History className="w-4 h-4 text-emerald-600/50" />
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 dark:text-emerald-100/40">
                                            {t('MuminAI.sections.context')}
                                        </h4>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 group-hover/ai:bg-emerald-500/[0.04] transition-colors">
                                        <p className={cn("whitespace-pre-line leading-relaxed opacity-80", currentSize.english)}>
                                            {renderExplanationContent(explanation?.content?.context)}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                            
                            {/* Legal Aspect */}
                            {explanation?.content?.legal_note && explanation?.content?.legal_note !== 'нет достоверной информации' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <Scale className="w-4 h-4 text-emerald-600/50" />
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 dark:text-emerald-100/40">
                                            {t('MuminAI.sections.legal')}
                                        </h4>
                                    </div>
                                    <p className={cn("leading-relaxed opacity-80 border-l-2 border-emerald-500/20 pl-4 py-1", currentSize.english)}>
                                        {renderExplanationContent(explanation?.content?.legal_note)}
                                    </p>
                                </motion.div>
                            )}

                            {/* Benefits */}
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-emerald-600/50" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 dark:text-emerald-100/40">
                                        {t('MuminAI.sections.benefit')}
                                    </h4>
                                </div>
                                <p className={cn("leading-relaxed opacity-80", currentSize.english)}>
                                    {renderExplanationContent(explanation?.content?.benefit)}
                                </p>
                            </motion.div>

                            {/* Additional Notes */}
                            {explanation?.content?.notes && explanation?.content?.notes !== 'нет достоверной информации' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText className="w-4 h-4 text-emerald-600/50" />
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 dark:text-emerald-100/40">
                                            {t('MuminAI.sections.additional')}
                                        </h4>
                                    </div>
                                    <p className={cn("leading-relaxed opacity-60 text-sm", currentSize.english)}>
                                        {renderExplanationContent(explanation?.content?.notes)}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        <div className="mt-10 pt-6 border-t border-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 opacity-30 group-hover/ai:opacity-50 transition-opacity">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-medium leading-none max-w-[200px] sm:max-w-none">
                                    {t('MuminAI.disclaimer')}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowReportModal(true)}
                                className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-600/60 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                {t('MuminAI.report_error')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Loading State (Atmospheric Skeleton) */}
            <AnimatePresence>
                {isLoadingExplanation && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="mt-8 p-8 rounded-[2rem] bg-emerald-500/[0.03] border border-dashed border-emerald-500/20 relative z-10 overflow-hidden"
                    >
                        {/* Shimmering Aura */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                                <div className="h-4 w-24 bg-emerald-500/10 rounded-full animate-pulse" />
                            </div>

                            <div className="space-y-3">
                                <div className="h-4 w-full bg-emerald-500/5 rounded-full animate-pulse" />
                                <div className="h-4 w-5/6 bg-emerald-500/5 rounded-full animate-pulse delay-75" />
                                <div className="h-4 w-4/6 bg-emerald-500/5 rounded-full animate-pulse delay-150" />
                            </div>

                            <div className="pt-4 flex flex-col items-center gap-2">
                                <motion.span 
                                    key={loadingMessageIndex}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600/40 text-center min-h-[1.5em]"
                                >
                                    {loadingMessageIndex === 0 ? t('MuminAI.loading') : 
                                     loadingMessageIndex === 1 ? t('MuminAI.consulting_commentaries') : 
                                     t('MuminAI.analyzing_context')}
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer / Actions */}
            <div className="mt-8 flex items-center justify-between relative z-10 pt-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowIsnad(!showIsnad)}
                        className="flex items-center gap-2 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
                        aria-label={showIsnad ? t('hide_isnad') : t('isnad')}
                    >
                        <Info className="w-4 h-4" />
                        {showIsnad ? t('hide_isnad') : t('isnad')}
                    </button>
                    <Link
                        href={`/collections/${getCollectionSlug(hadith.collection)}/${hadith.hadithNumber}`}
                        className="flex items-center gap-2 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
                    >
                        <ExternalLink className="w-4 h-4" />
                        {t('reference')}
                    </Link>
                </div>

                {!hideAI && (
                    <button
                        onClick={handleFetchExplanation}
                        disabled={isLoadingExplanation}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 transform active:scale-95",
                            explanation 
                                ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-700" 
                                : "bg-emerald-500/5 text-emerald-700 hover:bg-emerald-500/10 border border-emerald-500/10"
                        )}
                    >
                        <Sparkles className={cn("w-3.5 h-3.5", isLoadingExplanation && "animate-spin")} />
                        {explanation ? t('MuminAI.hide_meaning') : t('MuminAI.show_meaning')}
                    </button>
                )}
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

            </div>

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
                            className={cn(
                                "relative w-full max-w-md border rounded-[2rem] p-8 shadow-2xl overflow-hidden",
                                uiVariant === 'cinematic' ? "glass-cinematic border-white/10" : "bg-[var(--card-bg)] border-[var(--border-color)]"
                            )}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[5rem] -mr-16 -mt-16" />
                            
                            <h3 className="text-xl font-bold mb-2 relative z-10">Нашли ошибку?</h3>
                            <p className="text-sm opacity-60 mb-6 relative z-10">Опишите, что именно не так в ответе MuminAI. Мы проверим и исправим.</p>
                            
                            <textarea
                                value={reportMessage}
                                onChange={(e) => setReportMessage(e.target.value)}
                                placeholder="Опишите ошибку..."
                                className="w-full h-32 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-sm focus:outline-none focus:border-emerald-500/30 transition-colors mb-6 resize-none"
                            />
                            
                            <div className="flex items-center justify-end gap-3 relative z-10">
                                <button
                                    onClick={() => setShowReportModal(false)}
                                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={handleReport}
                                    disabled={isReporting || !reportMessage.trim()}
                                    className="px-8 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:shadow-none transition-all"
                                >
                                    {isReporting ? 'Отправка...' : 'Отправить'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Share Image Modal */}
            <AnimatePresence>
                {showImageModal && (
                    <ShareImageModal
                        hadith={hadith}
                        isOpen={showImageModal}
                        onClose={() => setShowImageModal(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};


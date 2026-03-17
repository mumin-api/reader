'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Image as ImageIcon, Check, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { toPng } from 'html-to-image';
import { cn } from '@/lib/utils';
import { Hadith } from '@/lib/api/client';
import { useTranslations } from 'next-intl';

interface ShareImageModalProps {
    hadith: Hadith;
    isOpen: boolean;
    onClose: () => void;
}

const BACKGROUNDS = [
    { id: 'emerald_gold', name: 'Emerald Gold', url: '/backgrounds/emerald_gold.png', textColor: 'text-white' },
    { id: 'dark_mosque', name: 'Midnight Mosque', url: '/backgrounds/dark_mosque.png', textColor: 'text-white' },
    { id: 'light_spiritual', name: 'Dawn Light', url: '/backgrounds/light_spiritual.png', textColor: 'text-emerald-950' },
];

export const ShareImageModal: React.FC<ShareImageModalProps> = ({ hadith, isOpen, onClose }) => {
    const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
    const [isExporting, setIsExporting] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('Hadith');

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            // We give it a little time to ensure fonts and images are fully ready
            const dataUrl = await toPng(cardRef.current, {
                quality: 1,
                pixelRatio: 2, // Retina quality
                cacheBust: true,
            });
            const link = document.createElement('a');
            link.download = `mumin-hadith-${hadith.hadithNumber}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to export image:', err);
        } finally {
            setIsExporting(false);
        }
    };

    // Smart truncation
    const truncate = (text: string, limit: number) => {
        if (!text) return '';
        if (text.length <= limit) return text;
        return text.substring(0, limit) + '...';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#0a1a16] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* Left Side: Preview Area */}
                <div className="flex-1 p-6 md:p-10 bg-gray-100 dark:bg-black/20 flex items-center justify-center">
                    <div className="w-full aspect-square max-w-[400px] shadow-2xl rounded-2xl overflow-hidden relative group">
                        {/* The part we actually capture */}
                        <div 
                            ref={cardRef}
                            className="w-full h-full relative p-8 flex flex-col justify-between overflow-hidden"
                            style={{
                                backgroundImage: `url(${selectedBg.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Overlay for better readability */}
                            <div className={cn(
                                "absolute inset-0 pointer-events-none",
                                selectedBg.id === 'light_spiritual' ? "bg-white/10" : "bg-black/20"
                            )} />

                            {/* Logo Top */}
                            <div className="relative z-10 flex items-center gap-2">
                                <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
                                    <BookOpen className="w-4 h-4 text-emerald-50" />
                                </div>
                                <span className={cn("text-lg font-display font-bold", selectedBg.textColor)}>
                                    Mumin
                                </span>
                            </div>

                            {/* Content Middle */}
                            <div className="relative z-10 flex flex-col gap-6 flex-grow justify-center py-4">
                                <p 
                                    className={cn(
                                        "font-medium leading-relaxed text-right",
                                        selectedBg.textColor,
                                        "text-xl"
                                    )} 
                                    dir="rtl"
                                >
                                    {truncate(hadith.arabicText, 180)}
                                </p>
                                <div className={cn("w-12 h-1 rounded-full", selectedBg.id === 'light_spiritual' ? "bg-emerald-800/20" : "bg-white/20")} />
                                <p className={cn("text-base leading-relaxed font-sans font-medium", selectedBg.textColor)}>
                                    {truncate(hadith.translation?.text || '', 300)}
                                </p>
                            </div>

                            {/* Footer Bottom */}
                            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className={cn("text-[10px] uppercase tracking-widest font-bold opacity-60", selectedBg.textColor)}>
                                    {hadith.collection} #{hadith.hadithNumber}
                                </span>
                                <span className={cn("text-[9px] font-medium opacity-40", selectedBg.textColor)}>
                                    mumin.ink
                                </span>
                            </div>
                        </div>

                        {/* Hint */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                Card Preview
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Controls */}
                <div className="w-full md:w-64 p-8 border-l border-emerald-900/5 dark:border-white/5 flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">{t('share_as_image') || 'Share Image'}</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <X className="w-5 h-5 opacity-40" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Choose Style</span>
                        <div className="grid grid-cols-1 gap-3">
                            {BACKGROUNDS.map((bg) => (
                                <button
                                    key={bg.id}
                                    onClick={() => setSelectedBg(bg)}
                                    className={cn(
                                        "relative h-20 rounded-xl overflow-hidden border-2 transition-all group",
                                        selectedBg.id === bg.id ? "border-emerald-500 scale-[1.02]" : "border-transparent opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <span className="text-[10px] text-white font-bold uppercase tracking-tight shadow-sm">{bg.name}</span>
                                    </div>
                                    {selectedBg.id === bg.id && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto space-y-4">
                        <button
                            onClick={handleDownload}
                            disabled={isExporting}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isExporting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Download className="w-5 h-5" />
                            )}
                            <span className="uppercase tracking-widest text-xs">Download PNG</span>
                        </button>
                        <p className="text-[9px] text-center opacity-40">
                            Square image optimized for Instagram & Telegram
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

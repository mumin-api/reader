'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Image as ImageIcon, Check, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { toPng } from 'html-to-image';
import { cn } from '@/lib/utils';
import { Hadith, HadithExplanation } from '@/lib/api/client';
import { useTranslations } from 'next-intl';

interface ShareImageModalProps {
    hadith: Hadith;
    explanation?: HadithExplanation;
    isOpen: boolean;
    onClose: () => void;
}

const BACKGROUNDS = [
    { id: 'emerald_gold', name: 'Emerald Gold', url: '/backgrounds/emerald_gold.png', textColor: 'text-white' },
    { id: 'dark_mosque', name: 'Midnight Mosque', url: '/backgrounds/dark_mosque.png', textColor: 'text-white' },
    { id: 'light_spiritual', name: 'Dawn Light', url: '/backgrounds/light_spiritual.png', textColor: 'text-emerald-950' },
];

const PremiumSwitch: React.FC<{
    label: string;
    isActive: boolean;
    onChange: (val: boolean) => void;
    icon?: React.ReactNode;
}> = ({ label, isActive, onChange, icon }) => (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-emerald-500/10 transition-all">
        <div className="flex items-center gap-3">
            {icon && <div className="text-emerald-600 opacity-60">{icon}</div>}
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">{label}</span>
        </div>
        <button 
            onClick={() => onChange(!isActive)}
            className={cn(
                "relative w-10 h-5 rounded-full transition-colors duration-300",
                isActive ? "bg-emerald-600" : "bg-gray-300 dark:bg-white/10"
            )}
        >
            <motion.div 
                animate={{ x: isActive ? 22 : 4 }}
                className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </button>
    </div>
);

export const ShareImageModal: React.FC<ShareImageModalProps> = ({ hadith, explanation, isOpen, onClose }) => {
    const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
    const [isExporting, setIsExporting] = useState(false);
    
    // Visibility States
    const [showArabic, setShowArabic] = useState(true);
    const [showTranslation, setShowTranslation] = useState(true);
    const [showAI, setShowAI] = useState(!!explanation);
    const [fontSize, setFontSize] = useState(18);

    const cardRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('Hadith');

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            const dataUrl = await toPng(cardRef.current, {
                quality: 1,
                pixelRatio: 3, // Even higher for extra crispness
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
                className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0a1a16] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"
            >
                {/* Left Side: Preview Area */}
                <div className="flex-1 p-4 md:p-12 bg-gray-100 dark:bg-black/40 flex items-center justify-center min-h-[350px] md:min-h-[500px]">
                    <div className="w-full aspect-square max-w-[320px] sm:max-w-[400px] md:max-w-[450px] shadow-2xl rounded-2xl overflow-hidden relative group">
                        {/* The part we actually capture */}
                        <div 
                            ref={cardRef}
                            className="w-full h-full relative p-10 flex flex-col justify-between overflow-hidden"
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

                            {/* Official Logo Top */}
                            <div className="relative z-10 flex items-center gap-3">
                                <div className="w-10 h-10 bg-white dark:bg-emerald-950/30 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                                    <img src="/icons/logo.svg" alt="Mumin" className="w-7 h-7" />
                                </div>
                                <span className={cn("text-xl font-display font-black tracking-tight", selectedBg.textColor)}>
                                    Mumin
                                </span>
                            </div>

                            {/* Content Middle */}
                            <div className="relative z-10 flex flex-col gap-6 flex-grow justify-center py-4">
                                {showArabic && (
                                    <p 
                                        className={cn(
                                            "font-medium leading-relaxed text-right drop-shadow-sm",
                                            selectedBg.textColor
                                        )} 
                                        dir="rtl"
                                        style={{ fontSize: `${fontSize * 1.2}px` }}
                                    >
                                        {hadith.arabicText}
                                    </p>
                                )}
                                
                                {showTranslation && showArabic && (
                                    <div className={cn("w-12 h-1 rounded-full mx-auto", selectedBg.id === 'light_spiritual' ? "bg-emerald-800/20" : "bg-white/20")} />
                                )}

                                {showTranslation && (
                                    <p 
                                        className={cn("leading-snug font-sans font-semibold drop-shadow-sm", selectedBg.textColor)}
                                        style={{ fontSize: `${fontSize}px` }}
                                    >
                                        {hadith.translation?.text || ''}
                                    </p>
                                )}

                                {showAI && explanation?.content && (
                                    <div className="mt-2 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                                        <div className="flex items-center gap-2 mb-2 opacity-60">
                                            <Sparkles className={cn("w-3 h-3", selectedBg.textColor)} />
                                            <span className={cn("text-[9px] font-bold uppercase tracking-widest", selectedBg.textColor)}>
                                                {t('MuminAI.title')}
                                            </span>
                                        </div>
                                        <p 
                                            className={cn("italic leading-relaxed", selectedBg.textColor)}
                                            style={{ fontSize: `${fontSize * 0.8}px` }}
                                        >
                                            {explanation.content.short_meaning || explanation.content.meaning}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer Bottom */}
                            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className={cn("text-[11px] uppercase tracking-widest font-black opacity-60", selectedBg.textColor)}>
                                    {hadith.collection} #{hadith.hadithNumber}
                                </span>
                                <span className={cn("text-[11px] font-bold opacity-40", selectedBg.textColor)}>
                                    mumin.ink
                                </span>
                            </div>
                        </div>

                        {/* Hint */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                                Card Preview
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Controls */}
                <div className="w-full md:w-80 p-6 md:p-8 border-t md:border-t-0 md:border-l border-emerald-900/5 dark:border-white/5 flex flex-col gap-8 md:overflow-y-auto md:max-h-[90vh]">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black tracking-tight">{t('share_as_image')}</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <X className="w-5 h-5 opacity-40" />
                        </button>
                    </div>

                    {/* Visibility Controls */}
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Настройка текста</span>
                        <div className="flex flex-col gap-2">
                            <PremiumSwitch 
                                label="Арабский" 
                                isActive={showArabic} 
                                onChange={setShowArabic} 
                            />
                            <PremiumSwitch 
                                label="Перевод" 
                                isActive={showTranslation} 
                                onChange={setShowTranslation} 
                            />
                            {explanation && (
                                <PremiumSwitch 
                                    label="Смысл от ИИ" 
                                    isActive={showAI} 
                                    onChange={setShowAI} 
                                    icon={<Sparkles className="w-3.5 h-3.5" />}
                                />
                            )}
                        </div>
                    </div>

                    {/* Font Size Control */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Размер шрифта</span>
                            <span className="text-xs font-bold text-emerald-600">{fontSize}px</span>
                        </div>
                        <input 
                            type="range"
                            min="12"
                            max="28"
                            step="1"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-emerald-500/10 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                    </div>

                    {/* Style Controls */}
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Стиль карточки</span>
                        <div className="grid grid-cols-1 gap-3">
                            {BACKGROUNDS.map((bg) => (
                                <button
                                    key={bg.id}
                                    onClick={() => setSelectedBg(bg)}
                                    className={cn(
                                        "relative h-16 rounded-2xl overflow-hidden border-2 transition-all group",
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

                    <div className="mt-auto pt-4 space-y-4">
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
                            <span className="uppercase tracking-widest text-xs">Скачать PNG</span>
                        </button>
                        <p className="text-[9px] text-center opacity-40 leading-relaxed font-medium">
                            Квадратное изображение (1:1), оптимизированное для Instagram, Telegram и WhatsApp
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

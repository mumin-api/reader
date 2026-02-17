'use client';

import React from 'react';
import {
    X,
    Type,
    Sun,
    Moon,
    Coffee,
    Eye,
    Smartphone,
    Check
} from 'lucide-react';
import { useReadingSettings, ReadingMode, ArabicFont } from '@/store/useReadingSettings';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ReadingSettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const MODES: { value: ReadingMode; label: string; icon: any; className: string }[] = [
    { value: 'light', label: 'Light', icon: Sun, className: 'bg-white text-emerald-950 border-emerald-950/10' },
    { value: 'sepia', label: 'Sepia', icon: Coffee, className: 'bg-[#f4ecd8] text-[#433422] border-[#433422]/10' },
    { value: 'dark', label: 'Dark', icon: Moon, className: 'bg-[#0a1a16] text-[#e0e0e0] border-white/10' },
    { value: 'contrast', label: 'Contrast', icon: Eye, className: 'bg-black text-white border-white/20' },
];

const FONTS: { value: ArabicFont; label: string }[] = [
    { value: 'Amiri', label: 'Amiri (Classic)' },
    { value: 'Cairo', label: 'Cairo (Modern)' },
    { value: 'Traditional Arabic', label: 'Traditional' },
];

export const ReadingSettingsPanel: React.FC<ReadingSettingsPanelProps> = ({ isOpen, onClose }) => {
    const {
        textSize, setTextSize,
        mode, setMode,
        arabicFont, setArabicFont,
        showTranslation, toggleTranslation,
        showIsnad, toggleIsnad,
        resetSettings
    } = useReadingSettings();
    const t = useTranslations('Settings');

    const MODES: { value: ReadingMode; label: string; icon: any; className: string }[] = [
        { value: 'light', label: t('themes.light'), icon: Sun, className: 'bg-white text-emerald-950 border-emerald-950/10' },
        { value: 'sepia', label: t('themes.sepia'), icon: Coffee, className: 'bg-[#f4ecd8] text-[#433422] border-[#433422]/10' },
        { value: 'dark', label: t('themes.dark'), icon: Moon, className: 'bg-[#0a1a16] text-[#e0e0e0] border-white/10' },
        { value: 'contrast', label: t('themes.contrast'), icon: Eye, className: 'bg-black text-white border-white/20' },
    ];

    const FONTS: { value: ArabicFont; label: string }[] = [
        { value: 'Amiri', label: t('fonts.amiri') },
        { value: 'Cairo', label: t('fonts.cairo') },
        { value: 'Traditional Arabic', label: t('fonts.traditional') },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-emerald-950/20 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-sm shadow-2xl z-[70] overflow-y-auto border-l border-[var(--border-color)]"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--page-text)' }}>{t('title')}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-[var(--hover-bg)] rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" style={{ color: 'var(--page-text)' }} />
                                </button>
                            </div>

                            {/* Theme Mode */}
                            <div className="mb-8">
                                <label
                                    className="text-sm font-semibold uppercase tracking-wider mb-4 block"
                                    style={{ color: 'var(--muted-text)' }}
                                >
                                    {t('theme')}
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {MODES.map((m) => (
                                        <button
                                            key={m.value}
                                            onClick={() => setMode(m.value)}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-2xl border transition-all text-sm font-medium",
                                                m.className,
                                                mode === m.value ? "ring-2 ring-emerald-600 scale-[1.02]" : "opacity-80 hover:opacity-100"
                                            )}
                                        >
                                            <m.icon className="w-4 h-4" />
                                            {m.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Text Size */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <label
                                        className="text-sm font-semibold uppercase tracking-wider block"
                                        style={{ color: 'var(--muted-text)' }}
                                    >
                                        {t('text_size')}
                                    </label>
                                    <span className="font-bold" style={{ color: 'var(--page-text)' }}>{t('level', { level: textSize })}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Type className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value={textSize}
                                        onChange={(e) => setTextSize(parseInt(e.target.value))}
                                        className="flex-1 accent-emerald-600 h-1.5 bg-emerald-900/10 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <Type className="w-6 h-6" style={{ color: 'var(--muted-text)' }} />
                                </div>
                            </div>

                            {/* Arabic Font */}
                            <div className="mb-8">
                                <label
                                    className="text-sm font-semibold uppercase tracking-wider mb-4 block"
                                    style={{ color: 'var(--muted-text)' }}
                                >
                                    {t('arabic_font')}
                                </label>
                                <div className="flex flex-col gap-2">
                                    {FONTS.map((f) => (
                                        <button
                                            key={f.value}
                                            onClick={() => setArabicFont(f.value)}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border transition-all text-left",
                                                arabicFont === f.value
                                                    ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                                                    : "border-emerald-900/5 text-emerald-900/60 hover:border-emerald-600/30"
                                            )}
                                        >
                                            <span className="font-medium">{f.label}</span>
                                            {arabicFont === f.value && <Check className="w-4 h-4 text-emerald-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="mb-8 space-y-4">
                                <div
                                    className="flex items-center justify-between p-4 rounded-2xl"
                                    style={{ backgroundColor: 'var(--page-bg-soft)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-5 h-5" style={{ color: 'var(--muted-text)' }} />
                                        <div>
                                            <p className="font-medium" style={{ color: 'var(--page-text)' }}>{t('toggles.translations')}</p>
                                            <p className="text-xs" style={{ color: 'var(--muted-text)' }}>{t('toggles.translations_desc')}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleTranslation}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative",
                                            showTranslation ? "bg-emerald-600" : "bg-emerald-900/20"
                                        )}
                                    >
                                        <motion.div
                                            animate={{ x: showTranslation ? 26 : 4 }}
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </div>

                                <div
                                    className="flex items-center justify-between p-4 rounded-2xl"
                                    style={{ backgroundColor: 'var(--page-bg-soft)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Eye className="w-5 h-5" style={{ color: 'var(--muted-text)' }} />
                                        <div>
                                            <p className="font-medium" style={{ color: 'var(--page-text)' }}>{t('toggles.narrator_chain')}</p>
                                            <p className="text-xs" style={{ color: 'var(--muted-text)' }}>{t('toggles.narrator_chain_desc')}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleIsnad}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative",
                                            showIsnad ? "bg-emerald-600" : "bg-emerald-900/20"
                                        )}
                                    >
                                        <motion.div
                                            animate={{ x: showIsnad ? 26 : 4 }}
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={resetSettings}
                                className="w-full p-4 rounded-2xl text-emerald-600 font-semibold hover:bg-emerald-600/5 transition-colors border border-emerald-600/20"
                            >
                                {t('reset')}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
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

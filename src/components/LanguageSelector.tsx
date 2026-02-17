'use client';

import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { locales } from '@/i18n';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';

interface LanguageSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

const LANGUAGE_NAMES: Record<string, { name: string; native: string }> = {
    en: { name: 'English', native: 'English' },
    ar: { name: 'Arabic', native: 'العربية' },
    ru: { name: 'Russian', native: 'Русский' },
    ur: { name: 'Urdu', native: 'اردو' },
    tr: { name: 'Turkish', native: 'Türkçe' },
    id: { name: 'Indonesian', native: 'Bahasa Indonesia' },
    uz: { name: 'Uzbek', native: 'Oʻzbekcha' },
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const t = useTranslations('Language');

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        onClose();
    };

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
                                <h2 className="text-2xl font-display font-bold text-emerald-900">{t('select')}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-emerald-900/5 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-emerald-900" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {locales.map((locale) => {
                                    const details = LANGUAGE_NAMES[locale] || { name: locale, native: locale };
                                    const isActive = currentLocale === locale;

                                    return (
                                        <button
                                            key={locale}
                                            onClick={() => handleLanguageChange(locale)}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border transition-all text-left",
                                                isActive
                                                    ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                                                    : "border-emerald-900/5 text-emerald-900/60 hover:border-emerald-600/30"
                                            )}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-bold text-emerald-900">{details.native}</span>
                                                <span className="text-xs text-emerald-900/40">{details.name}</span>
                                            </div>
                                            {isActive && <Check className="w-4 h-4 text-emerald-600" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

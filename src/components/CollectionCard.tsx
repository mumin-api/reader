'use client';

import React from 'react';
import { Link } from '@/lib/navigation';
import { BookOpen, Hash, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Unique accent colors per collection slug for visual differentiation
const COLLECTION_ACCENTS: Record<string, { from: string; to: string; icon: string }> = {
    bukhari:   { from: '#059669', to: '#047857', icon: '#d4af37' },
    muslim:    { from: '#0369a1', to: '#075985', icon: '#7dd3fc' },
    tirmidhi:  { from: '#7c3aed', to: '#6d28d9', icon: '#c4b5fd' },
    abudawud:  { from: '#b45309', to: '#92400e', icon: '#fcd34d' },
    ibnmajah:  { from: '#be123c', to: '#9f1239', icon: '#fda4af' },
    nasai:     { from: '#0f766e', to: '#0d6b63', icon: '#5eead4' },
    malik:     { from: '#854d0e', to: '#713f12', icon: '#fde68a' },
    riyadh:    { from: '#065f46', to: '#064e3b', icon: '#6ee7b7' },
};

function getAccent(slug: string) {
    const key = Object.keys(COLLECTION_ACCENTS).find(k => slug.toLowerCase().includes(k));
    return key ? COLLECTION_ACCENTS[key] : { from: '#059669', to: '#047857', icon: '#d4af37' };
}

interface CollectionCardProps {
    slug: string;
    nameEnglish: string;
    nameArabic: string;
    count: number;
    description: string;
    color?: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
    slug,
    nameEnglish,
    nameArabic,
    count,
    description,
}) => {
    const t = useTranslations('Collections');
    const accent = getAccent(slug);

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
            <Link
                href={`/collections/${slug}`}
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--page-text)',
                }}
                className="group relative block rounded-[2rem] border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
                {/* Gradient accent strip at top */}
                <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-80"
                    style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
                />

                {/* Subtle background glow on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${accent.from}10 0%, transparent 60%)` }}
                />

                <div className="relative z-10 p-6">
                    {/* Header: icon + count badge */}
                    <div className="flex justify-between items-start mb-5">
                        <div
                            className="p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110"
                            style={{ background: `${accent.from}18` }}
                        >
                            <BookOpen
                                className="w-5 h-5 transition-colors duration-500"
                                style={{ color: accent.from }}
                            />
                        </div>

                        <div
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest"
                            style={{
                                backgroundColor: 'var(--page-bg-soft)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--muted-text)',
                            }}
                        >
                            <Hash className="w-3 h-3" />
                            {t('hadith_count', { count: count.toLocaleString() })}
                        </div>
                    </div>

                    {/* Title block */}
                    <div className="mb-4">
                        <h3
                            className="text-xl font-display font-bold mb-1.5 leading-tight transition-colors duration-300"
                            style={{ color: 'var(--page-text)' }}
                        >
                            <span
                                className="group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                }}
                            >
                                {nameEnglish}
                            </span>
                        </h3>
                        <p
                            className="text-xl font-amiri transition-opacity duration-300 opacity-30 group-hover:opacity-70"
                            dir="rtl"
                            style={{ color: 'var(--page-text)' }}
                        >
                            {nameArabic}
                        </p>
                    </div>

                    {/* Description */}
                    <p
                        className="text-sm line-clamp-2 mb-6 leading-relaxed"
                        style={{ color: 'var(--muted-text)' }}
                    >
                        {description}
                    </p>

                    {/* CTA row */}
                    <div className="flex items-center justify-between">
                        <span
                            className="text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300"
                            style={{ color: accent.from }}
                        >
                            {t('explore')}
                        </span>
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 group-hover:translate-x-1"
                            style={{ background: `${accent.from}18`, color: accent.from }}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

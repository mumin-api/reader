'use client';

import React from 'react';
import { Link } from '@/lib/navigation';
import { Book, Hash, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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
    color = 'emerald',
}) => {
    const t = useTranslations('Collections');
    const tHadith = useTranslations('Hadith');

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Link
                href={`/collections/${slug}`}
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--page-text)'
                }}
                className="group relative block p-6 rounded-[2.5rem] border shadow-islamic hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-900/5 rounded-bl-[4rem] transition-transform duration-700 group-hover:scale-125" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-500/5 rounded-tr-[3rem] transition-transform duration-700 group-hover:scale-110" />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-900/5 rounded-2xl group-hover:bg-emerald-900 group-hover:text-white transition-colors duration-500">
                            <Book className="w-6 h-6" />
                        </div>
                        <div className="px-3 py-1 bg-gold-500/10 rounded-full border border-gold-500/20">
                            <span className="text-[10px] font-bold text-gold-700 uppercase tracking-widest flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {t('hadith_count', { count: count.toLocaleString() })}
                            </span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-emerald-900 mb-1 leading-tight group-hover:text-emerald-700 transition-colors">
                            {nameEnglish}
                        </h3>
                        <p className="text-2xl font-amiri text-emerald-950/40 group-hover:text-emerald-900 transition-colors" dir="rtl">
                            {nameArabic}
                        </p>
                    </div>

                    <p className="text-sm text-emerald-900/60 line-clamp-2 mb-6 leading-relaxed">
                        {description}
                    </p>

                    <Link
                        href={`/collections/${slug}`}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-500"
                        aria-label={`Open the ${nameEnglish} collection`}
                        title={`${t('explore')} ${nameEnglish}`}
                    >
                        {t('explore')} {nameEnglish}
                        <ChevronRight className="w-4 h-4 text-gold-500" />
                    </Link>
                </div>
            </Link>
        </motion.div>
    );
};

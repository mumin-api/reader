'use client';

import React from 'react';
import { Hadith } from '@/lib/api/client';
import { CollectionCard } from '@/components/CollectionCard';
import { HadithCard } from '@/components/HadithCard';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

interface RelatedHadithsProps {
    hadiths: Hadith[];
}

export const RelatedHadiths: React.FC<RelatedHadithsProps> = ({ hadiths }) => {
    const t = useTranslations('Hadith');

    if (!hadiths || hadiths.length === 0) return null;

    return (
        <section className="mt-20">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-emerald-900">
                        {t('related_hadiths' as any) || 'Related Hadiths'}
                    </h2>
                    <p className="text-emerald-900/40 text-sm font-medium uppercase tracking-widest">
                        {t('based_on_topics' as any) || 'Based on Topic & Context'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {hadiths.map((h, idx) => (
                    <motion.div
                        key={h.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <HadithCard hadith={h} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: `The Scholars of Hadith | Mumin`,
        description: 'Biographies and contributions of the great collectors of authentic prophetic traditions.',
    };
}

const SCHOLARS = [
    {
        name: "Imam Muhammad al-Bukhari",
        birth: "194 AH / 810 CE",
        death: "256 AH / 870 CE",
        contribution: "Author of Sahih al-Bukhari, universally regarded as the most authentic book after the Quran.",
        wiki: "https://en.wikipedia.org/wiki/Muhammad_al-Bukhari"
    },
    {
        name: "Imam Muslim ibn al-Hajjaj",
        birth: "204 AH / 820 CE",
        death: "261 AH / 875 CE",
        contribution: "Author of Sahih Muslim, famous for its rigorous categorization and focus on the integrity of narration chains.",
        wiki: "https://en.wikipedia.org/wiki/Muslim_ibn_al-Hajjaj"
    },
    {
        name: "Imam Abu Dawud",
        birth: "202 AH / 817 CE",
        death: "275 AH / 889 CE",
        contribution: "Author of Sunan Abu Dawud, prioritizing hadiths related to legal rulings (Fiqh).",
        wiki: "https://en.wikipedia.org/wiki/Abu_Dawood"
    }
];

export default async function ScholarsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const scholarsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Great Scholars of Hadith",
        "numberOfItems": SCHOLARS.length,
        "itemListElement": SCHOLARS.map((s, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
                "@type": "Person",
                "name": s.name,
                "description": s.contribution,
                "url": s.wiki
            }
        }))
    };

    return (
        <main className="min-h-screen relative">
            <StructuredData data={scholarsSchema} />
            <GeometricPattern opacity={0.03} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-emerald-900 mb-6">The Scholars</h1>
                        <p className="text-xl text-emerald-900/60 max-w-2xl leading-relaxed">
                            The integrity of our faith relies on the monumental efforts of the scholars who dedicated their lives to preserving the words of the Messenger (ﷺ).
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SCHOLARS.map((s, idx) => (
                            <div key={idx} className="p-10 rounded-[3rem] bg-white border border-emerald-900/5 shadow-islamic hover:shadow-2xl transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                                    <span className="font-bold">{idx + 1}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-emerald-900 mb-2">{s.name}</h3>
                                <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-6">
                                    {s.birth} — {s.death}
                                </p>
                                <p className="text-emerald-900/70 leading-relaxed mb-8">
                                    {s.contribution}
                                </p>
                                <a
                                    href={s.wiki}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold text-emerald-900/40 hover:text-emerald-900 uppercase tracking-widest transition-colors"
                                >
                                    Read Biography →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

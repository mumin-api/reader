import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';
import { ExternalLink, Star } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'The Scholars of Hadith | Mumin',
        description: 'Biographies and contributions of the great collectors of authentic prophetic traditions.',
    };
}

const SCHOLARS = [
    {
        name: "Imam Muhammad al-Bukhari",
        arabicName: "الإمام البخاري",
        birth: "194 AH / 810 CE",
        death: "256 AH / 870 CE",
        contribution: "Author of Sahih al-Bukhari, universally regarded as the most authentic book after the Quran. He traveled extensively to collect over 600,000 narrations, selecting only 7,275.",
        collection: "Sahih al-Bukhari",
        color: "#059669",
        wiki: "https://en.wikipedia.org/wiki/Muhammad_al-Bukhari"
    },
    {
        name: "Imam Muslim ibn al-Hajjaj",
        arabicName: "الإمام مسلم",
        birth: "204 AH / 820 CE",
        death: "261 AH / 875 CE",
        contribution: "Author of Sahih Muslim, famous for its rigorous categorization and focus on the integrity of narration chains. A student of Imam Bukhari.",
        collection: "Sahih Muslim",
        color: "#0369a1",
        wiki: "https://en.wikipedia.org/wiki/Muslim_ibn_al-Hajjaj"
    },
    {
        name: "Imam Abu Dawud",
        arabicName: "الإمام أبو داود",
        birth: "202 AH / 817 CE",
        death: "275 AH / 889 CE",
        contribution: "Author of Sunan Abu Dawud, prioritizing hadiths related to legal rulings (Fiqh). He collected 500,000 hadiths and selected 4,800 for his Sunan.",
        collection: "Sunan Abu Dawud",
        color: "#7c3aed",
        wiki: "https://en.wikipedia.org/wiki/Abu_Dawood"
    },
    {
        name: "Imam al-Tirmidhi",
        arabicName: "الإمام الترمذي",
        birth: "209 AH / 824 CE",
        death: "279 AH / 892 CE",
        contribution: "Author of Jami al-Tirmidhi, notable for including commentary on the legal opinions of scholars and grading each hadith.",
        collection: "Jami at-Tirmidhi",
        color: "#b45309",
        wiki: "https://en.wikipedia.org/wiki/Al-Tirmidhi"
    },
    {
        name: "Imam an-Nasa'i",
        arabicName: "الإمام النسائي",
        birth: "215 AH / 829 CE",
        death: "303 AH / 915 CE",
        contribution: "Author of Sunan an-Nasa'i, known for its strict criteria in accepting narrators — considered the most critical of the six compilers.",
        collection: "Sunan an-Nasa'i",
        color: "#0f766e",
        wiki: "https://en.wikipedia.org/wiki/Al-Nasa%27i"
    },
    {
        name: "Imam Ibn Majah",
        arabicName: "الإمام ابن ماجه",
        birth: "209 AH / 824 CE",
        death: "273 AH / 887 CE",
        contribution: "Author of Sunan Ibn Majah, the sixth of the canonical collections. Contains unique hadiths not found in other collections.",
        collection: "Sunan Ibn Majah",
        color: "#be123c",
        wiki: "https://en.wikipedia.org/wiki/Ibn_Majah"
    },
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
        <main className="min-h-screen relative" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <StructuredData data={scholarsSchema} />
            <GeometricPattern opacity={0.025} />
            <Navbar />

            <section className="pt-36 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase mb-8 border"
                            style={{ backgroundColor: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.25)', color: '#d4af37' }}>
                            <Star className="w-3.5 h-3.5" />
                            The Great Imams
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6" style={{ color: 'var(--page-text)' }}>
                            The Scholars
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-text)' }}>
                            The integrity of our faith relies on the monumental efforts of the scholars who dedicated
                            their lives to preserving the words of the Messenger (ﷺ).
                        </p>
                    </div>

                    {/* Scholars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SCHOLARS.map((s, idx) => (
                            <div key={idx}
                                className="group relative p-8 rounded-[2rem] border hover:shadow-xl transition-all duration-500 overflow-hidden"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                                {/* Accent top strip */}
                                <div className="absolute top-0 left-0 right-0 h-1 opacity-80"
                                    style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse at top left, ${s.color}10 0%, transparent 60%)` }} />

                                <div className="relative z-10">
                                    {/* Number badge */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                                            style={{ backgroundColor: `${s.color}18`, color: s.color }}>
                                            {idx + 1}
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                                            style={{ borderColor: `${s.color}30`, color: s.color, backgroundColor: `${s.color}08` }}>
                                            {s.collection}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-xl font-display font-bold mb-1" style={{ color: 'var(--page-text)' }}>{s.name}</h3>
                                    <p className="text-lg font-amiri mb-2 opacity-40" dir="rtl" style={{ color: 'var(--page-text)' }}>{s.arabicName}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--muted-text)' }}>
                                        {s.birth} — {s.death}
                                    </p>

                                    {/* Contribution */}
                                    <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-text)' }}>
                                        {s.contribution}
                                    </p>

                                    {/* Link */}
                                    <a href={s.wiki} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
                                        style={{ color: s.color }}>
                                        Read Biography <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

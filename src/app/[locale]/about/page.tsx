import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';
import { BookOpen, Shield, Globe, ExternalLink } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Footer' });
    return {
        title: `${t('mission')} | Mumin Hadith`,
        description: 'Learn about our mission to provide authentic prophetic traditions with high authoritativeness and trust.',
    };
}

const PILLARS = [
    {
        icon: Shield,
        title: 'Authentic Sources',
        desc: 'Every narration is cross-referenced with classical manuscripts and authorized modern publications.',
        color: '#059669',
    },
    {
        icon: BookOpen,
        title: 'Preservation',
        desc: 'We maintain the original Arabic text alongside precise translations to preserve the nuances of the Sunnah.',
        color: '#d4af37',
    },
    {
        icon: Globe,
        title: 'Global Access',
        desc: 'Available in 7 languages, making prophetic wisdom accessible to Muslims and seekers worldwide.',
        color: '#0369a1',
    },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Footer' });

    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "Mumin Hadith Reader",
            "description": t('description'),
            "url": BASE_URL,
            "logo": `${BASE_URL}/icons/logo.png`
        }
    };

    return (
        <main className="min-h-screen relative" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <StructuredData data={aboutSchema} />
            <GeometricPattern opacity={0.025} />
            <Navbar />

            {/* Hero */}
            <section className="pt-36 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase mb-8 border"
                        style={{ backgroundColor: 'rgba(5,150,105,0.08)', borderColor: 'rgba(5,150,105,0.2)', color: '#059669' }}>
                        <BookOpen className="w-3.5 h-3.5" />
                        Our Mission
                    </div>

                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight" style={{ color: 'var(--page-text)' }}>
                        {t('mission')}
                    </h1>

                    <p className="text-xl leading-relaxed mb-16" style={{ color: 'var(--muted-text)' }}>
                        {t('description')}
                    </p>

                    {/* Divider */}
                    <div className="h-px mb-16" style={{ background: 'linear-gradient(90deg, #059669, transparent)' }} />

                    {/* Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                        {PILLARS.map(({ icon: Icon, title, desc, color }) => (
                            <div key={title} className="p-8 rounded-[2rem] border"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: `${color}18` }}>
                                    <Icon className="w-6 h-6" style={{ color }} />
                                </div>
                                <h3 className="text-lg font-display font-bold mb-3" style={{ color: 'var(--page-text)' }}>{title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Methodology */}
                    <h2 className="text-3xl font-display font-bold mb-6" style={{ color: 'var(--page-text)' }}>Our Methodology</h2>
                    <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-text)' }}>
                        Mumin Hadith Reader is built on the foundation of authenticity and scholarly rigor. We source our hadiths
                        exclusively from established collections, primarily the <em>Kutub al-Sittah</em> (The Six Major Books).
                        Each hadith is presented with its original Arabic text, grade classification, and chain of narration.
                    </p>

                    <h2 className="text-3xl font-display font-bold mb-6" style={{ color: 'var(--page-text)' }}>Technological Excellence</h2>
                    <p className="leading-relaxed mb-12" style={{ color: 'var(--muted-text)' }}>
                        We believe that sacred knowledge deserves a premium digital experience. Our platform uses state-of-the-art
                        technologies (Next.js SSR, ISR, and Advanced SEO) to ensure that prophetic wisdom is accessible and
                        discoverable by millions globally.
                    </p>

                    {/* CTA */}
                    <div className="p-10 rounded-[2rem] text-center"
                        style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.08), rgba(5,150,105,0.04))', border: '1px solid rgba(5,150,105,0.15)' }}>
                        <h3 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--page-text)' }}>
                            Explore the API
                        </h3>
                        <p className="mb-6" style={{ color: 'var(--muted-text)' }}>
                            Build your own Islamic applications with our free, open Hadith API.
                        </p>
                        <a href="/developers"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase text-white hover:scale-105 transition-all"
                            style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
                            View Developers Docs <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

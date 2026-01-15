import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Footer' });

    return {
        title: `${t('mission')} | Mumin Hadith`,
        description: 'Learn about our mission to provide authentic prophetic traditions with high authoritativeness and trust.',
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
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
        <main className="min-h-screen relative">
            <StructuredData data={aboutSchema} />
            <GeometricPattern opacity={0.03} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-emerald-900 mb-8">{t('mission')}</h1>

                    <div className="prose prose-lg prose-emerald max-w-none">
                        <p className="lead text-xl text-emerald-900/60 mb-12">
                            {t('description')}
                        </p>

                        <h2 className="text-3xl font-display font-bold text-emerald-900 mt-16 mb-6">Our Methodology</h2>
                        <p>
                            Mumin Hadith Reader is built on the foundation of authenticity and scholarly rigor. We source our hadiths exclusively from established collections, primarily the *Kutub al-Sittah* (The Six Major Books).
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                            <div className="p-8 rounded-3xl bg-emerald-900/5 border border-emerald-900/5">
                                <h3 className="text-xl font-bold text-emerald-900 mb-4">Authentic Sources</h3>
                                <p className="text-sm text-emerald-900/60">
                                    Every narration is cross-referenced with classical manuscripts and authorized modern publications.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-emerald-900/5 border border-emerald-900/5">
                                <h3 className="text-xl font-bold text-emerald-900 mb-4">Preservation</h3>
                                <p className="text-sm text-emerald-900/60">
                                    We maintain the original Arabic text alongside precise translations to preserve the nuances of the Sunnah.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-display font-bold text-emerald-900 mt-16 mb-6">Technological Excellence</h2>
                        <p>
                            We believe that sacred knowledge deserves a premium digital experience. Our platform uses state-of-the-art technologies (SSR, ISR, and Advanced SEO) to ensure that prophetic wisdom is accessible and discoverable by millions globally.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

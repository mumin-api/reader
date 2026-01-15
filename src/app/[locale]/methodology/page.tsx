import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Book, Shield, Database, Github } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Methodology' });

    return {
        title: `${t('title')} | Mumin Hadith`,
        description: t('description'),
        alternates: {
            canonical: `/${locale}/methodology`,
        }
    };
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Methodology' });

    const keyPoints = [
        {
            icon: Book,
            title: t('sources_title'),
            desc: t('sources_desc')
        },
        {
            icon: Shield,
            title: t('verification_title'),
            desc: t('verification_desc')
        },
        {
            icon: Database,
            title: t('tech_title'),
            desc: t('tech_desc')
        },
        {
            icon: Github,
            title: t('open_source_title'),
            desc: t('open_source_desc')
        }
    ];

    return (
        <main className="min-h-screen relative">
            <GeometricPattern opacity={0.03} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/5 text-emerald-900 font-bold text-xs uppercase tracking-widest mb-6 border border-emerald-900/10">
                            <Shield className="w-4 h-4" />
                            {t('title')}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-emerald-900 mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-emerald-900/60 leading-relaxed max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {keyPoints.map((point, idx) => (
                            <div
                                key={idx}
                                className="p-8 rounded-[2.5rem] bg-white border border-emerald-900/5 shadow-sm hover:shadow-xl hover:border-emerald-900/10 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-emerald-900/5 flex items-center justify-center mb-6 text-emerald-900">
                                    <point.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-emerald-900 mb-3 font-display">
                                    {point.title}
                                </h3>
                                <p className="text-emerald-900/60 leading-relaxed">
                                    {point.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 rounded-[3rem] bg-emerald-900 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-display font-bold mb-6">Join Our Mission</h2>
                            <p className="text-emerald-100/70 mb-8 text-lg">
                                We are always looking for contributors, scholars, and developers to help us serve the Ummah better.
                            </p>
                            <a
                                href="https://github.com/abubakrmuminov/mumin-api-reader"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-900 font-bold hover:scale-105 transition-transform"
                            >
                                <Github className="w-5 h-5" />
                                Contribute on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

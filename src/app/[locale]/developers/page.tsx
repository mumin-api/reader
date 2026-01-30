import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';
import { 
    Terminal, 
    Smartphone, 
    Zap, 
    Globe, 
    Search,
    Bot,
    MessageSquare,
    Cpu,
    ShieldCheck,
    Code
} from 'lucide-react';

const API_WEB_URL = "https://api.mumin.ink";
const BOT_URL = "https://t.me/mumin_bot";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Developers' });

    return {
        title: `${t('title')} | Mumin Hadith`,
        description: t('subtitle'),
    };
}

export default async function DevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Developers' });

    const ecosystemSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t('title'),
        "description": t('subtitle'),
    };

    return (
        <main className="min-h-screen relative overflow-hidden bg-white">
            <StructuredData data={ecosystemSchema} />
            <GeometricPattern opacity={0.03} />
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-900/5 border border-emerald-900/10 backdrop-blur-sm mb-8 animate-fade-in">
                        <Terminal className="w-4 h-4 text-emerald-900" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-900">Mumin Ecosystem</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-emerald-900 mb-8 leading-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-emerald-900/60 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
                
                {/* Decorative gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full" />
                </div>
            </section>

            {/* API Showcase */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="w-20 h-20 rounded-[2rem] bg-emerald-900 flex items-center justify-center shadow-2xl shadow-emerald-900/20">
                                <Cpu className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-emerald-900">{t('api_title')}</h2>
                            <p className="text-lg text-emerald-900/70 leading-relaxed max-w-xl">
                                {t('api_description')}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { icon: Search, title: t('api_feature_1_title'), desc: t('api_feature_1_desc') },
                                    { icon: Globe, title: t('api_feature_2_title'), desc: t('api_feature_2_desc') },
                                    { icon: Zap, title: t('api_feature_3_title'), desc: t('api_feature_3_desc') },
                                ].map((feature, i) => (
                                    <div key={i} className="group p-6 rounded-[2.5rem] bg-white border border-emerald-900/5 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-900/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <feature.icon className="w-6 h-6 text-emerald-900" />
                                        </div>
                                        <h3 className="font-bold text-emerald-900 mb-2">{feature.title}</h3>
                                        <p className="text-sm text-emerald-900/50 leading-relaxed">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a 
                                    href={API_WEB_URL} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-full bg-emerald-900 text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-lg hover:shadow-emerald-900/30 flex items-center gap-2"
                                >
                                    {t('read_docs')} <Globe className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-900/5 rounded-[3.5rem] rotate-3 translate-x-4 scale-[1.02]" />
                            <div className="relative glass-card rounded-[3.5rem] overflow-hidden border border-emerald-900/10 shadow-2xl p-8 bg-black/90">
                                <div className="flex items-center gap-2 mb-6 opacity-30">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="space-y-4 font-mono text-sm">
                                    <div className="flex gap-4 border-b border-white/5 pb-4">
                                        <span className="text-emerald-400">GET</span>
                                        <span className="text-white">/v1/hadith/daily</span>
                                    </div>
                                    <pre className="text-emerald-400/80 overflow-auto py-4 leading-relaxed">
{`{
  "success": true,
  "data": {
    "id": 218,
    "collection": "S. Muslim",
    "text": "Faith has over seventy...",
    "arabic": "الإيمان بضع وسبعون..."
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Telegram Bot Showcase */}
            <section className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-emerald-900 rounded-[4rem] p-12 md:p-20 overflow-hidden relative shadow-2xl shadow-emerald-900/40">
                        {/* Background blobs */}
                        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gold-500/10 rounded-full blur-[80px]" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/10">
                                    <MessageSquare className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">{t('bot_title')}</h2>
                                <p className="text-lg text-emerald-100/70 mb-10 leading-relaxed max-w-xl">
                                    {t('bot_description')}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                    {[
                                        { icon: Smartphone, title: t('bot_feature_1_title'), desc: t('bot_feature_1_desc') },
                                        { icon: ShieldCheck, title: t('bot_feature_2_title'), desc: t('bot_feature_2_desc') },
                                    ].map((feature, i) => (
                                        <div key={feature.title} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                                            <feature.icon className="w-6 h-6 text-gold-500 mb-4" />
                                            <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                                            <p className="text-sm text-emerald-100/50 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <a 
                                    href={BOT_URL} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gold-500 text-emerald-900 font-bold text-sm tracking-[0.2em] uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gold-500/20"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {t('try_bot')} <Smartphone className="w-5 h-5" />
                                    </span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                </a>
                            </div>

                            <div className="relative lg:block hidden">
                                <div className="absolute inset-0 flex items-center justify-center blur-2xl opacity-20 bg-emerald-900" />
                                <div className="relative mx-auto w-[320px] aspect-[9/18.5] bg-[#1a1a1a] rounded-[3.5rem] p-3 shadow-2xl border-4 border-emerald-800/50">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-3xl z-20" />
                                    <div className="h-full w-full bg-emerald-900/40 backdrop-blur-2xl rounded-[2.8rem] overflow-hidden flex flex-col items-center justify-center border border-white/5">
                                        <Bot className="w-24 h-24 text-white/20 mb-12" />
                                        <div className="space-y-4 w-full px-6">
                                            <div className="h-3 w-3/4 bg-white/10 rounded-full" />
                                            <div className="h-3 w-1/2 bg-white/10 rounded-full" />
                                            <div className="h-3 w-full bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

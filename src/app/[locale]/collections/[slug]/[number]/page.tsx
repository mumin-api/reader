import React from 'react';
import { hadithApi, Hadith } from '@/lib/api/client';
import HadithDeepViewClient from './HadithDeepViewClient';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { StructuredData, generateHadithSchema, generateBreadcrumbSchema } from '@/components/StructuredData';
import { getRelatedHadiths } from '@/lib/seo/related';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string; number: string }> }): Promise<Metadata> {
    const { locale, slug, number } = await params;
    const hadithNumber = parseInt(number);
    const t = await getTranslations({ locale, namespace: 'Hadith' });

    try {
        const response = await hadithApi.getHadiths({
            collection: slug,
            hadithNumber,
            limit: 1,
            language: locale
        });
        const hadiths = response.data || response;
        const hadith = Array.isArray(hadiths) && hadiths.length > 0 ? hadiths[0] : null;

        if (!hadith) return { title: 'Hadith Not Found' };

        return {
            title: `Hadith ${hadith.hadithNumber} - ${hadith.collection} | Mumin`,
            description: hadith.translation?.text?.substring(0, 160) || `Read Hadith ${hadith.hadithNumber} from ${hadith.collection}`,
            alternates: {
                canonical: `/${locale}/collections/${slug}/${number}`,
                languages: {
                    'en': `/en/collections/${slug}/${number}`,
                    'ru': `/ru/collections/${slug}/${number}`,
                    'ar': `/ar/collections/${slug}/${number}`,
                    'ur': `/ur/collections/${slug}/${number}`,
                    'tr': `/tr/collections/${slug}/${number}`,
                    'id': `/id/collections/${slug}/${number}`,
                    'x-default': `/en/collections/${slug}/${number}`,
                }
            },
            openGraph: {
                title: `Hadith ${hadith.hadithNumber} - ${hadith.collection}`,
                description: hadith.translation?.text?.substring(0, 160),
                images: [`/api/og?id=${hadith.id}`],
            }
        };
    } catch (err) {
        return { title: 'Mumin Hadith' };
    }
}

export default async function HadithDeepViewPage({ params }: { params: Promise<{ locale: string; slug: string; number: string }> }) {
    const { locale, slug, number } = await params;
    const hadithNumber = parseInt(number);
    const tNav = await getTranslations({ locale, namespace: 'Navbar' });
    const tHadith = await getTranslations({ locale, namespace: 'Hadith' });

    let hadith = null;
    let relatedHadiths: Hadith[] = [];

    try {
        const response = await hadithApi.getHadiths({
            collection: slug,
            hadithNumber,
            limit: 1,
            language: locale
        });
        const hadiths = response.data || response;
        if (Array.isArray(hadiths) && hadiths.length > 0) {
            hadith = hadiths[0];
            // Fetch related hadiths
            relatedHadiths = await getRelatedHadiths(hadith, locale);
        }
    } catch (err) {
        console.error('Failed to load hadith on server', err);
    }

    return (
        <>
            {hadith && (
                <>
                    <StructuredData data={generateHadithSchema(hadith, BASE_URL)} />
                    <StructuredData data={generateBreadcrumbSchema([
                        { name: tNav('home'), item: BASE_URL },
                        { name: tNav('collections'), item: `${BASE_URL}/collections` },
                        { name: hadith.collection, item: `${BASE_URL}/collections/${slug}` },
                        { name: `${tHadith('book')} ${hadith.hadithNumber}`, item: `${BASE_URL}/collections/${slug}/${hadith.hadithNumber}` }
                    ])} />
                </>
            )}
            <HadithDeepViewClient
                hadith={hadith}
                relatedHadiths={relatedHadiths}
                slug={slug}
                number={hadithNumber}
                locale={locale}
            />
        </>
    );
}

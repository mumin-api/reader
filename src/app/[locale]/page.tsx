import React from 'react';
import { hadithApi } from '@/lib/api/client';
import HomePageClient from './HomePageClient';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Home' });

  return {
    title: t('hero_title_1') + ' | ' + t('hero_title_2'),
    description: t('hero_subtitle'),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let dailyHadith = null;
  let featuredCollections = [];
  let initialEvents = [];

  try {
    const [hadith, collections, events] = await Promise.all([
      hadithApi.getDailyHadith(locale),
      hadithApi.getCollections(),
      hadithApi.getActiveEvents()
    ]);
    dailyHadith = hadith;
    if (Array.isArray(collections)) {
      featuredCollections = collections.slice(0, 3);
    }
    initialEvents = Array.isArray(events) ? events : [];
  } catch (err) {
    console.error('Failed to load home page data on server', err);
  }

  return (
    <HomePageClient
      initialDailyHadith={dailyHadith}
      initialFeaturedCollections={featuredCollections}
      initialEvents={initialEvents}
      locale={locale}
    />
  );
}

'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA || '99602444'; // Example ID

export const Analytics = () => {
    const pathname = usePathname();

    return (
        <>
            {/* Vercel Analytics - tracks page views and user behavior */}
            <VercelAnalytics />

            {/* Vercel Speed Insights - monitors performance metrics */}
            <SpeedInsights />
        </>
    );
};

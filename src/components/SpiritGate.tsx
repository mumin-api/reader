'use client';

import React, { useEffect, useState } from 'react';
import { hadithApi } from '@/lib/api/client';
import { SparkleEffect } from './SparkleEffect';
import { SpiritGreeting } from './SpiritGreeting';

export const SpiritGate = () => {
    const [activeEvents, setActiveEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        hadithApi.getActiveEvents()
            .then(events => setActiveEvents(events || []))
            .catch(() => setActiveEvents([]))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return null;

    const ramadanEvent = activeEvents.find(e => e.slug === 'ramadan');

    if (!ramadanEvent) return null;

    return (
        <>
            {ramadanEvent.config?.showStars && <SparkleEffect />}
            {ramadanEvent.config?.greeting && <SpiritGreeting event={ramadanEvent} />}
            <style jsx global>{`
                ${ramadanEvent.config?.theme === 'ramadan-gold' ? `
                    .gradient-text {
                        background: linear-gradient(135deg, #d4af37 0%, #f97316 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                ` : ''}
            `}</style>
        </>
    );
};

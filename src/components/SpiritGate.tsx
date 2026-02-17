'use client';

import React, { useEffect, useState } from 'react';
import { hadithApi } from '@/lib/api/client';
import { SparkleEffect } from './SparkleEffect';
import { SpiritGreeting } from './SpiritGreeting';

export const SpiritGate = () => {
    const [activeEvents, setActiveEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await hadithApi.getActiveEvents();
                if (Array.isArray(events)) {
                    setActiveEvents(events);
                }
            } catch (err) {
                // Silently fail to not break the app if API is down
                console.warn('Events system unavailable');
            }
        };
        fetchEvents();
    }, []);

    const ramadanEvent = activeEvents.find(e => e.slug === 'ramadan');

    if (!ramadanEvent) return null;

    return (
        <>
            {ramadanEvent.config?.showStars && <SparkleEffect />}
            {ramadanEvent.config?.greeting && <SpiritGreeting event={ramadanEvent} />}
            <style jsx global>{`
                ${ramadanEvent.config?.theme === 'ramadan-gold' ? `
                    :root {
                        --emerald-900: #042f24;
                        --emerald-950: #021a14;
                    }
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

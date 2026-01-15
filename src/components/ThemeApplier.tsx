'use client';

import { useEffect } from 'react';
import { useReadingSettings } from '@/store/useReadingSettings';

export const ThemeApplier = () => {
    const { mode } = useReadingSettings();

    useEffect(() => {
        // Remove any existing reading-* classes
        const body = document.body;
        const classes = Array.from(body.classList).filter(c => c.startsWith('reading-'));
        classes.forEach(c => body.classList.remove(c));

        // Add the current mode class
        body.classList.add(`reading-${mode}`);

        // Return cleanup to avoid side effects if component unmounts
        return () => {
            body.classList.remove(`reading-${mode}`);
        };
    }, [mode]);

    return null; // This component doesn't render anything
};

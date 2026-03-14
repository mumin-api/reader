'use client';

import { useEffect } from 'react';
import { useReadingSettings } from '@/store/useReadingSettings';

export const ThemeApplier = () => {
    const { mode, uiVariant } = useReadingSettings();

    useEffect(() => {
        const body = document.body;
        
        // Remove existing theme classes
        const themeClasses = Array.from(body.classList).filter(c => 
            c.startsWith('reading-')
        );
        themeClasses.forEach(c => body.classList.remove(c));

        // Add both mode and variant classes
        // mode: light | dark | sepia | contrast
        // uiVariant: classic | cinematic
        body.classList.add(`reading-${mode}`);
        
        if (uiVariant === 'cinematic') {
            body.classList.add('reading-cinematic');
        }

        return () => {
            body.classList.remove(`reading-${mode}`);
            body.classList.remove('reading-cinematic');
        };
    }, [mode, uiVariant]);

    return null;
};

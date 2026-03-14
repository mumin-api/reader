'use client';

import React from 'react';
import Image from 'next/image';
import { useReadingSettings } from '@/store/useReadingSettings';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicBackground: React.FC = () => {
    const { uiVariant } = useReadingSettings();

    return (
        <AnimatePresence>
            {uiVariant === 'cinematic' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
                >
                    {/* Fixed background image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/backgrounds/cinematic_bg.png"
                            alt="Cinematic Background"
                            fill
                            className="object-cover scale-105"
                            priority
                            quality={100}
                        />
                    </div>
                    
                    {/* Darkening/Stylizing Overlays */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                    
                    {/* Magical Glows */}
                    <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amber-500/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
                    <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-emerald-950/30 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const IslamicOrnaments = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top Right Ornament */}
            <motion.div 
                initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                animate={{ opacity: 0.15, rotate: 0, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute -top-24 -right-24 w-96 h-96 text-gold-500"
            >
                <svg viewBox="0 0 200 200" fill="currentColor">
                    <path d="M100 0c0 55.228-44.772 100-100 100 55.228 0 100 44.772 100 100 0-55.228 44.772-100 100-100-55.228 0-100-44.772-100-100z" />
                </svg>
            </motion.div>

            {/* Bottom Left Ornament */}
            <motion.div 
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 0.1, rotate: 0, scale: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                className="absolute -bottom-32 -left-32 w-80 h-80 text-emerald-500"
            >
                <svg viewBox="0 0 200 200" fill="currentColor">
                    <path d="M100 0c0 55.228-44.772 100-100 100 55.228 0 100 44.772 100 100 0-55.228 44.772-100 100-100-55.228 0-100-44.772-100-100z" />
                </svg>
            </motion.div>

            {/* Subtle Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px]" />
        </div>
    );
};

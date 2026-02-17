'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Star } from 'lucide-react';

const Lantern = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
    <motion.div
        animate={{ 
            rotate: [1, -2, 1],
            x: [0, 2, 0]
        }}
        transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay 
        }}
        className={className}
    >
        <div className="relative">
            {/* The string */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-transparent to-gold-500/40" />
            
            {/* The lantern body */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-12">
                <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold-500 transition-colors drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                    <path d="M50 0L80 30V120L50 150L20 120V30L50 0Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4"/>
                    <path d="M20 50H80" stroke="currentColor" strokeWidth="4"/>
                    <path d="M20 100H80" stroke="currentColor" strokeWidth="4"/>
                    <path d="M50 0V150" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="75" r="10" fill="currentColor" fillOpacity="0.4" />
                </svg>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full animate-pulse" />
            </div>
        </div>
    </motion.div>
);

const TwinklingStar = ({ top, left, delay, size = 1 }: { top: string; left: string; delay: number; size?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
        }}
        transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay 
        }}
        style={{ top, left }}
        className="absolute pointer-events-none"
    >
        <Star className="text-gold-200 fill-current" size={size === 1 ? 4 : 8} />
    </motion.div>
);

export const RamadanAtmosphere = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* Twinkling Star Field */}
            <TwinklingStar top="10%" left="15%" delay={0.2} size={1} />
            <TwinklingStar top="25%" left="45%" delay={1.2} size={2} />
            <TwinklingStar top="15%" left="75%" delay={0.5} size={1} />
            <TwinklingStar top="40%" left="85%" delay={2.1} size={1} />
            <TwinklingStar top="60%" left="10%" delay={1.5} size={2} />
            <TwinklingStar top="80%" left="50%" delay={0.8} size={1} />
            <TwinklingStar top="15%" left="30%" delay={3.2} size={1} />

            {/* Glowing Moon & Star in Top Right */}
            <motion.div 
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-12 right-12 md:top-24 md:right-32"
            >
                <div className="relative">
                    <Moon className="w-16 h-16 md:w-24 md:h-24 text-gold-500 fill-gold-500/10 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]" />
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-1 -right-1"
                    >
                        <Star className="w-6 h-6 md:w-8 md:h-8 text-gold-500 fill-gold-500" />
                    </motion.div>
                    {/* Moon Glow */}
                    <div className="absolute inset-0 bg-gold-400/10 blur-[50px] rounded-full" />
                </div>
            </motion.div>

            {/* Hanging Lanterns */}
            <Lantern className="absolute top-0 left-[10%] hidden md:block" delay={0} />
            <Lantern className="absolute top-0 left-[25%] hidden lg:block" delay={1.5} />
            <Lantern className="absolute top-0 right-[15%] hidden md:block" delay={0.8} />
            <Lantern className="absolute top-0 right-[40%] hidden xl:block" delay={2.2} />

            {/* Decorative Corner Ornaments - Enhanced */}
            <motion.div 
                initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                animate={{ opacity: 0.2, rotate: 0, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute -top-32 -left-32 w-96 h-96 text-gold-500/20"
            >
                <svg viewBox="0 0 200 200" fill="currentColor">
                    <path d="M100 0c0 55.228-44.772 100-100 100 55.228 0 100 44.772 100 100 0-55.228 44.772-100 100-100-55.228 0-100-44.772-100-100z" />
                </svg>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 0.15, rotate: 0, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute -bottom-48 -right-48 w-[500px] h-[500px] text-emerald-500/10"
            >
                <svg viewBox="0 0 200 200" fill="currentColor">
                    <path d="M100 0c0 55.228-44.772 100-100 100 55.228 0 100 44.772 100 100 0-55.228 44.772-100 100-100-55.228 0-100-44.772-100-100z" />
                </svg>
            </motion.div>

            {/* Overall Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-gold-500/[0.02] to-transparent pointer-events-none" />
        </div>
    );
};

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, X } from 'lucide-react';

export const SpiritGreeting = ({ event }: { event: any }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const hasSeen = sessionStorage.getItem(`seen_greeting_${event.slug}`);
        if (!hasSeen) {
            const timer = setTimeout(() => setShow(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [event.slug]);

    const handleClose = () => {
        setShow(false);
        sessionStorage.setItem(`seen_greeting_${event.slug}`, 'true');
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/60"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-[3rem] p-12 max-w-lg w-full text-center relative shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gold-500" />
                        <button onClick={handleClose} className="absolute top-6 right-6 p-2 text-emerald-900/40 hover:text-emerald-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>

                        <div className="w-20 h-20 rounded-2xl bg-emerald-900 flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <Moon className="w-10 h-10 text-gold-500" />
                        </div>

                        <h2 className="text-4xl font-display font-bold text-emerald-900 mb-4">
                            {event.config?.greeting || 'Ramadan Mubarak'}
                        </h2>
                        <p className="text-emerald-900/60 text-lg mb-10 leading-relaxed">
                            {event.slug === 'ramadan' 
                                ? 'May this blessed month bring peace, joy, and spiritual growth to you and your family.'
                                : 'Welcome to our special event!'}
                        </p>

                        <button
                            onClick={handleClose}
                            className="w-full py-5 rounded-full bg-emerald-900 text-white font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                        >
                            Amin
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

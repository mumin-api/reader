'use client';

import React from 'react';
import { GeometricPattern } from '@/components/GeometricPattern';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RootNotFound() {
    return (
        <html lang="en">
            <body>
                <main className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-gold-50">
                    <GeometricPattern opacity={0.03} />

                    <div className="max-w-2xl w-full text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-12"
                        >
                            <div className="w-32 h-32 bg-emerald-900/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 relative">
                                <Search className="w-12 h-12 text-emerald-900/20" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-dashed border-gold-500/20 rounded-[2.5rem]"
                                />
                            </div>
                            <h1 className="text-8xl font-bold text-emerald-900 mb-4">404</h1>
                            <h2 className="text-2xl font-bold text-emerald-950 mb-6">Page Not Found</h2>
                            <p className="text-emerald-900/60 leading-relaxed mb-12">
                                The path you are looking for has been moved or doesn't exist.
                                Perhaps you can find what you seek in the library?
                            </p>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/en"
                                className="flex items-center gap-2 px-8 py-4 bg-emerald-900 text-white font-bold rounded-full text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-emerald-900/20 w-full sm:w-auto"
                            >
                                <Home className="w-4 h-4" />
                                Back to Home
                            </Link>
                            <Link
                                href="/en/collections"
                                className="flex items-center gap-2 px-8 py-4 bg-white border border-emerald-900/10 text-emerald-900 font-bold rounded-full text-sm tracking-widest uppercase hover:bg-emerald-900/5 transition-all w-full sm:w-auto"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Explore Library
                            </Link>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}

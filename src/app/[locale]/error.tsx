'use client';

import React, { useEffect } from 'react';
import { GeometricPattern } from '@/components/GeometricPattern';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen relative flex items-center justify-center p-4">
            <GeometricPattern opacity={0.03} />

            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                >
                    <div className="w-32 h-32 bg-ruby/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 relative">
                        <AlertTriangle className="w-12 h-12 text-ruby/20" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-emerald-900 mb-4">Something went wrong</h1>
                    <p className="text-emerald-900/60 leading-relaxed mb-12">
                        An unexpected error occurred while loading this page. Our team has been notified.
                        You can try refreshing or return to safe ground.
                    </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="flex items-center gap-2 px-8 py-4 bg-emerald-900 text-white font-bold rounded-full text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-emerald-900/20 w-full sm:w-auto"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-4 bg-white border border-emerald-900/10 text-emerald-900 font-bold rounded-full text-sm tracking-widest uppercase hover:bg-emerald-900/5 transition-all w-full sm:w-auto"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

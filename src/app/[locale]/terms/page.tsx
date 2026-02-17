'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <main className="min-h-screen relative bg-[var(--page-bg)] text-[var(--page-text)] transition-colors duration-500">
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-display font-bold mb-12"
                    >
                        Terms of Use
                    </motion.h1>

                    <div className="prose prose-emerald dark:prose-invert prose-lg opacity-70">
                        <h2 className="text-emerald-900">1. Acceptance of Terms</h2>
                        <p>
                            By accessing Mumin Hadith Reader, you agree to be bound by these terms.
                            The content provided is for educational and spiritual purposes.
                        </p>

                        <h2 className="text-emerald-900">2. Use of Content</h2>
                        <p>
                            The Hadith data belongs to the public domain or is used under open licenses.
                            We encourage sharing and disseminating this knowledge, provided it is
                            done with respect and accuracy.
                        </p>

                        <h2 className="text-emerald-900">3. Accuracy of Information</h2>
                        <p>
                            While we strive for 100% accuracy, errors may occur in digital transcriptions.
                            Always cross-reference with printed classical sources for academic research.
                            Please report any errors you find.
                        </p>

                        <h2 className="text-emerald-900">4. Disclaimer</h2>
                        <p>
                            Mumin Hadith Reader is provided "as is" without warranties of any kind.
                            We are not responsible for any interpretations or actions taken based on
                            the content provided.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

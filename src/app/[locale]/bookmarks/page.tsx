'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ExternalLink, Download, Share2, BookOpen, Bookmark } from 'lucide-react';
import { useBookmarks } from '@/store/useBookmarks';
import { Link } from '@/lib/navigation';
import { getCollectionSlug } from '@/lib/utils';

export default function BookmarksPage() {
    const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

    const exportBookmarks = () => {
        const data = JSON.stringify(bookmarks, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mumin_bookmarks.json';
        a.click();
    };

    return (
        <main className="min-h-screen relative" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--page-text)' }}>
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase mb-4"
                                style={{ color: '#d4af37' }}
                            >
                                <Heart className="w-4 h-4 fill-current" />
                                Saved Wisdom
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl font-display font-bold mb-4"
                                style={{ color: 'var(--page-text)' }}
                            >
                                Your Bookmarks
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg leading-relaxed"
                                style={{ color: 'var(--muted-text)' }}
                            >
                                Manage your personal collection of saved hadiths. Revisit the narrations
                                that touched your heart and share them with the Ummah.
                            </motion.p>
                        </div>

                        {bookmarks.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3"
                            >
                                <button
                                    onClick={exportBookmarks}
                                    className="flex items-center gap-2 px-5 py-3 rounded-2xl border text-xs font-bold uppercase tracking-widest hover:border-emerald-600/30 transition-all"
                                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--page-text)' }}
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <button
                                    onClick={clearBookmarks}
                                    className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all"
                                    style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Count badge */}
                    {bookmarks.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 mb-8"
                        >
                            <div className="px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--muted-text)' }}>
                                {bookmarks.length} saved
                            </div>
                        </motion.div>
                    )}

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {bookmarks.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-32 text-center rounded-[2.5rem] border"
                                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                                >
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                                        style={{ backgroundColor: 'var(--page-bg-soft)' }}>
                                        <Bookmark className="w-10 h-10" style={{ color: 'var(--muted-text)', opacity: 0.3 }} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--page-text)' }}>
                                        No bookmarks yet
                                    </h3>
                                    <p className="max-w-sm mx-auto mb-8" style={{ color: 'var(--muted-text)' }}>
                                        Start exploring hadiths and click the heart icon to save them to your personal collection.
                                    </p>
                                    <Link
                                        href="/collections"
                                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase text-white shadow-lg hover:scale-105 transition-all"
                                        style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
                                    >
                                        Start Exploring
                                    </Link>
                                </motion.div>
                            ) : (
                                bookmarks.map((bookmark, idx) => (
                                    <motion.div
                                        key={bookmark.hadithId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group flex flex-col p-8 rounded-[2rem] border hover:shadow-xl transition-all duration-500"
                                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 rounded-xl"
                                                    style={{ backgroundColor: 'var(--page-bg-soft)' }}>
                                                    <BookOpen className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                                        {bookmark.collection}
                                                    </p>
                                                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-text)' }}>
                                                        Book {bookmark.bookNumber} • #{bookmark.hadithNumber}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeBookmark(bookmark.hadithId)}
                                                className="p-2 rounded-full transition-all"
                                                style={{ color: 'rgba(239,68,68,0.3)' }}
                                                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.3)')}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <p className="leading-relaxed mb-8 line-clamp-3 text-sm" style={{ color: 'var(--page-text)', opacity: 0.8 }}>
                                            {bookmark.textPreview}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-5 border-t"
                                            style={{ borderColor: 'var(--border-color)' }}>
                                            <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted-text)' }}>
                                                Saved {new Date(bookmark.timestamp).toLocaleDateString()}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 rounded-full transition-colors"
                                                    style={{ color: 'var(--muted-text)' }}>
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                                <Link
                                                    href={`/collections/${getCollectionSlug(bookmark.collection)}/${bookmark.hadithNumber}`}
                                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105"
                                                    style={{ backgroundColor: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }}
                                                >
                                                    View Full <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
}

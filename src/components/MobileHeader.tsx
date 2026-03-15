'use client';

import React from 'react';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useReadingSettings } from '@/store/useReadingSettings';

export const MobileHeader: React.FC = () => {
    const { uiVariant } = useReadingSettings();

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] px-4 py-3 flex items-center justify-between transition-all duration-300",
                uiVariant === 'cinematic' 
                    ? "bg-transparent" 
                    : "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-emerald-900/10 dark:border-emerald-500/10"
            )}
        >
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
                    <div className="relative w-9 h-9 flex items-center justify-center">
                        <Image
                            src="/icons/logo.svg"
                            alt="Mumin Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>
            </div>

            {/* Placeholder for future status/user indicators if needed */}
            <div className="flex items-center gap-2">
                {/* Possibly a simple spiritual indicator or streak counter later */}
            </div>
        </header>
    );
};

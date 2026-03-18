'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Globe2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import { GeometricPattern } from '@/components/GeometricPattern';
import Link from 'next/link';

interface NotAvailableClientProps {
  title: string;
  description: string;
  supportLinkText: string;
}

export default function NotAvailableClient({ title, description, supportLinkText }: NotAvailableClientProps) {
  return (
    <main className="min-h-screen relative flex flex-col">
      <GeometricPattern opacity={0.05} />
      
      {/* Minimal Logo Header */}
      <header className="absolute top-0 w-full p-6 sm:p-8 flex items-center justify-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <BookOpen className="w-5 h-5 text-emerald-50" />
          </div>
          <span className="text-xl font-logo font-bold px-1 bg-gradient-to-r from-emerald-950 to-emerald-800 dark:from-emerald-50 dark:to-emerald-200 bg-clip-text text-transparent">
            Mumin
          </span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10 overflow-hidden">
        
        {/* Optimized Mesh-like Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.15] dark:opacity-[0.1]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ef4444_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#10b981_0%,transparent_50%)] animate-pulse duration-[10s]" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 max-w-4xl w-full mx-auto"
        >
          {/* Main Content Area - Optimized glassmorphism */}
          <div className="relative rounded-[2.5rem] p-8 sm:p-16 overflow-hidden text-center group bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl">
            
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 pointer-events-none" />

            {/* Icon Group - Optimized animation */}
            <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-8 sm:mb-12 relative flex items-center justify-center">
              {/* Spinning ring - CSS only for performance */}
              <div className="absolute inset-0 border border-dashed border-red-500/20 dark:border-red-400/20 rounded-full animate-[spin_40s_linear_infinite]" />
              
              {/* Core Orb */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-red-50 to-red-200 dark:from-red-900/60 dark:to-red-950 border border-red-200 dark:border-red-800/50 rounded-full flex items-center justify-center shadow-inner"
              >
                <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 dark:text-red-300 relative z-10 drop-shadow-md" />
              </motion.div>
            </div>

            {/* Text Payload */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Region Locked
                </div>
                <h1 className="text-4xl sm:text-7xl font-display font-bold text-emerald-950 dark:text-white tracking-tight leading-[1.1]">
                  {title}
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-emerald-900/60 dark:text-emerald-100/60 font-inter leading-relaxed">
                {description}
              </p>

              <div className="pt-4 sm:pt-8 text-center flex justify-center">
                <a 
                  href="https://t.me/mumin_api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-900 dark:bg-emerald-800 text-white font-bold rounded-full text-sm sm:text-base tracking-widest uppercase transition-all duration-300 hover:shadow-[0_20px_40px_rgba(6,78,59,0.3)] hover:-translate-y-1 active:translate-y-0"
                >
                  <span className="relative z-10">{supportLinkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </a>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </main>
  );
}

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
      <header className="absolute top-0 w-full p-6 sm:p-8 flex items-center justify-center sm:justify-start z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <BookOpen className="w-5 h-5 text-emerald-50" />
          </div>
          <span className="text-xl font-display font-bold px-1 bg-gradient-to-r from-emerald-950 to-emerald-800 dark:from-emerald-50 dark:to-emerald-200 bg-clip-text text-transparent">
            Mumin
          </span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10 overflow-hidden">
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-red-900/10 dark:bg-red-500/10 blur-[120px] rounded-full mix-blend-screen" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.05, 0.15],
              rotate: [90, 0, 90]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-emerald-900/10 dark:bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen" 
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 max-w-4xl w-full mx-auto"
        >
          {/* Main Content Area - Extravagant Card */}
          <div className="relative rounded-[3rem] p-10 sm:p-20 overflow-hidden text-center group bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
            
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-emerald-500/10 via-transparent to-red-500/10 pointer-events-none" />

            {/* Icon Group */}
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 50 }}
              className="mx-auto w-40 h-40 mb-12 relative flex items-center justify-center perspective-[1000px]"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-red-500/30 dark:border-red-400/30 rounded-full"
              />
              
              {/* Inner animated blur */}
              <div className="absolute inset-4 bg-red-500/20 dark:bg-red-600/30 rounded-full blur-2xl animate-pulse" />
              
              {/* Center Orb */}
              <div className="relative w-28 h-28 bg-gradient-to-br from-red-100 to-red-300 dark:from-red-900/60 dark:to-red-950 border border-red-300 dark:border-red-800/50 rounded-full flex items-center justify-center shadow-[inset_0_-10px_20px_rgba(0,0,0,0.2)]">
                <Globe2 className="w-14 h-14 text-red-600 dark:text-red-400 absolute opacity-30 blur-[4px]" />
                <ShieldAlert className="w-12 h-12 text-red-700 dark:text-red-300 relative z-10 drop-shadow-md" />
              </div>
            </motion.div>

            {/* Text Payload */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
                  <AlertTriangle className="w-4 h-4" />
                  Region Locked
                </div>
                <h1 className="text-5xl sm:text-7xl font-display font-bold text-emerald-950 dark:text-white tracking-tight leading-[1.1]">
                  {title}
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl sm:text-2xl text-emerald-900/70 dark:text-emerald-100/70 font-inter leading-relaxed"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="pt-8"
              >
                <a 
                  href="https://t.me/mumin_ink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-900 dark:bg-emerald-800 text-white font-bold rounded-full text-sm sm:text-base tracking-widest uppercase hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(6,78,59,0.3)] hover:shadow-[0_0_60px_rgba(6,78,59,0.5)]"
                >
                  <span>{supportLinkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </main>
  );
}

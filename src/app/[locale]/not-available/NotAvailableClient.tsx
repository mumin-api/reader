'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Globe2 } from 'lucide-react';

interface NotAvailableClientProps {
  title: string;
  description: string;
  supportLinkText: string;
}

export default function NotAvailableClient({ title, description, supportLinkText }: NotAvailableClientProps) {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/10 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="elegant-card p-8 sm:p-12 text-center relative overflow-hidden group">
          
          {/* Subtle hover effect light */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Icon Animation */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="mx-auto w-24 h-24 mb-8 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-full h-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-900/20 border border-red-200 dark:border-red-800/50 rounded-full flex items-center justify-center shadow-inner">
              <Globe2 className="w-10 h-10 text-red-600 dark:text-red-400 absolute opacity-50 blur-[2px]" />
              <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400 relative z-10" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-playfair font-bold text-emerald-950 dark:text-emerald-50 mb-6 tracking-tight leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg sm:text-xl text-emerald-800/80 dark:text-emerald-200/80 font-inter leading-relaxed max-w-lg mx-auto mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-900/5 dark:bg-emerald-500/10 border border-emerald-900/10 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-100 font-medium text-sm sm:text-base backdrop-blur-sm transition-all hover:bg-emerald-900/10 dark:hover:bg-emerald-500/20 cursor-default">
              {supportLinkText}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

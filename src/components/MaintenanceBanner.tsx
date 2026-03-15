'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Hammer } from 'lucide-react';

interface MaintenanceBannerProps {
  isVisible: boolean;
  featureName: string;
  message?: string;
  type?: 'warning' | 'info' | 'error';
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  isVisible,
  featureName,
  message,
  type = 'warning'
}) => {
  if (!isVisible) return null;

  const defaultMessage = `Функция "${featureName}" временно недоступна из-за технических работ по улучшению точности поиска. 🤲`;

  const colors = {
    warning: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-200',
    info: 'from-sky-500/20 to-indigo-500/20 border-sky-500/30 text-sky-200',
    error: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-200',
  };

  const Icons = {
    warning: AlertTriangle,
    info: Info,
    error: Hammer,
  };

  const Icon = Icons[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        className="w-full mb-6 pointer-events-none"
      >
        <div className={`
          relative overflow-hidden
          px-6 py-4 rounded-2xl
          border backdrop-blur-xl bg-gradient-to-r
          ${colors[type]}
          flex items-center gap-4
          shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        `}>
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          
          <div className="flex-shrink-0">
            <div className="p-2 rounded-xl bg-white/10">
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-grow">
            <p className="text-sm md:text-base font-medium leading-relaxed">
              {message || defaultMessage}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="hidden md:block flex-shrink-0 opacity-30 select-none">
            <Hammer className="w-12 h-12 -rotate-12 transform" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

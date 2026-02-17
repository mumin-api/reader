'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SparkleEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Reduced particle count for better performance
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1, // Slightly smaller
      duration: Math.random() * 4 + 3, // Slower for less "jitter"
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
            translateY: [0, -30, 0], // Use translateY for GPU acceleration
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear", // Linear is cheaper than easeInOut
          }}
          className="absolute bg-gold-400/60 rounded-full blur-[1px] will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
};

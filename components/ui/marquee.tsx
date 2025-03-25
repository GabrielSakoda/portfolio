"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
}

export const Marquee = ({
  children,
  direction = 'left',
  speed = 20,
}: MarqueeProps) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{
          x: direction === 'left' ? '-100%' : '100%',
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="inline-block"
        animate={{
          x: direction === 'left' ? '0%' : '-200%',
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-neogreen"
      >
        <Leaf className="h-12 w-12" />
      </motion.div>
    </div>
  );
}
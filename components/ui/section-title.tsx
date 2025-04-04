'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, highlight, className = '' }: SectionTitleProps) {
  const words = title.split(' ');
  const highlightWord = highlight || words[words.length - 1];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {words.map((word, index) => (
          <span key={index}>
            {word === highlightWord ? (
              <span className="text-neogreen">{word}</span>
            ) : (
              word
            )}{' '}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
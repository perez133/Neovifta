'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  delay?: number;
}

export function TeamMemberCard({ name, role, image, delay = 0 }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="text-neogreen">{role}</p>
    </motion.div>
  );
}
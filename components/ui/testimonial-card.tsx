'use client';

import { motion } from 'framer-motion';
import { Card } from './card';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  image?: string;
}

export function TestimonialCard({ name, role, testimonial, image }: TestimonialCardProps) {
  return (
    <Card className="p-6 mx-4">
      <div className="flex items-center mb-4">
        {image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h4>
          <p className="text-sm text-neogreen">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 italic">{testimonial}</p>
    </Card>
  );
}
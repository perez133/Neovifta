'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/a-propos', label: 'À Propos' },
  { path: '/impact', label: 'Notre Impact' },
  { path: '/quiz', label: 'Quiz' },
  { path: '/partenaires', label: 'Partenaires' },
  { path: '/contact', label: 'Contact' },
  { path: '/admin', label: 'NeoVifta Team' }, // ✅ Ajout du lien admin ici
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-neogreen" />
              <span className="text-xl font-bold text-neogreen">NeoVifta</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                  <Link
                      key={item.path}
                      href={item.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                          pathname === item.path
                              ? 'text-neogreen'
                              : 'text-foreground hover:text-neogreen'
                      }`}
                  >
                    {item.label}
                    {pathname === item.path && (
                        <motion.div
                            layoutId="underline"
                            className="absolute left-0 right-0 bottom-0 h-0.5 bg-neogreen"
                        />
                    )}
                  </Link>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="ml-2 p-2 text-foreground"
                  aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="md:hidden py-4 bg-background/95 backdrop-blur"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                      <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`px-4 py-2 text-sm font-medium ${
                              pathname === item.path
                                  ? 'text-neogreen'
                                  : 'text-foreground hover:text-neogreen'
                          }`}
                      >
                        {item.label}
                      </Link>
                  ))}
                </div>
              </motion.div>
          )}
        </div>
      </motion.nav>
  );
}

export { Navbar };

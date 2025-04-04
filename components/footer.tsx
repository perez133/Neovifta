'use client';

import { Facebook, Twitter, Instagram, Leaf } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-neogreen" />
              <span className="text-lg font-bold text-neogreen">NeoVifta</span>
            </div>
            <p className="text-gray-600 text-sm">
              Ensemble, transformons l'éco-anxiété en action positive pour un avenir meilleur.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-neogreen">Accueil</Link></li>
              <li><Link href="/a-propos" className="text-gray-600 hover:text-neogreen">À Propos</Link></li>
              <li><Link href="/impact" className="text-gray-600 hover:text-neogreen">Notre Impact</Link></li>
              <li><Link href="/quiz" className="text-gray-600 hover:text-neogreen">Quiz</Link></li>
              <li><Link href="/partenaires" className="text-gray-600 hover:text-neogreen">Partenaires</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-neogreen">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 text-sm">
              Email: contact@neovifta.fr<br />
              Tél: +33 1 23 45 67 89
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-neogreen">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-neogreen">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-neogreen">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© 2025 NeoVifta. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
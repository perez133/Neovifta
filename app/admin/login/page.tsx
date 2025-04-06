'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Marquer comme connecté
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      toast({
        title: 'Erreur de connexion',
        description: data.message || 'Email ou mot de passe incorrect.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.svg"
            alt="NeoVifta"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-2xl font-heading text-neogreen font-semibold">
            Connexion Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Accès réservé à l&apos;équipe NeoVifta
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@neovifta.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-neogreen text-white hover:bg-neocean transition"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </div>
      </div>
    </main>
  );
}

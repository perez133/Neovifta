'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('isAdmin', 'true');
            router.push('/admin');
        } else {
            alert(data.message);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center space-y-4 p-6">
            <h1 className="text-2xl font-bold">Connexion Admin</h1>
            <Input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Input
                placeholder="Mot de passe"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Se connecter</Button>
        </main>
    );
}

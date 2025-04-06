import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Champs manquants' });
    }

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    const { score } = req.body;
    if (typeof score !== 'number') {
        return res.status(400).json({ message: 'Score invalide' });
    }

    const filePath = path.join(process.cwd(), 'data', 'quiz.json');
    const newEntry = { score, date: new Date().toISOString() };

    let data = [];
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    data.push(newEntry);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true });
}

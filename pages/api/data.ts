import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'data', 'quiz.json');
    if (!fs.existsSync(filePath)) {
        return res.status(200).json([]);
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(data);
}

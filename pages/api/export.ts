import type { NextApiRequest, NextApiResponse } from 'next';
import { Workbook } from 'exceljs';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { password } = req.query;

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    if (password !== process.env.NEXT_PUBLIC_EXPORT_PASSWORD) {
        return res.status(401).json({ error: 'Mot de passe invalide' });
    }

    const dataPath = path.join(process.cwd(), 'data', 'contact.json');
    if (!fs.existsSync(dataPath)) {
        return res.status(404).json({ error: 'Aucune donnée trouvée' });
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const entries = JSON.parse(rawData);

    const workbook = new Workbook();
    const sheet = workbook.addWorksheet("Réponses Contact");

    sheet.columns = [
        { header: "Nom", key: "name", width: 20 },
        { header: "Email", key: "email", width: 30 },
        { header: "Sujet", key: "subject", width: 25 },
        { header: "Message", key: "message", width: 50 },
        { header: "Date", key: "date", width: 25 },
    ];

    sheet.addRows(entries);

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=reponses.xlsx');

    await workbook.xlsx.write(res);
    res.end();
}

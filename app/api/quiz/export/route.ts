import { NextRequest, NextResponse } from 'next/server';
import { Workbook } from 'exceljs';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password');

  if (password !== process.env.NEXT_PUBLIC_EXPORT_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe invalide' }, { status: 401 });
  }

  const filePath = path.join(process.cwd(), 'data', 'quiz.json');
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Aucune donnée trouvée' }, { status: 404 });
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const entries = JSON.parse(rawData);

  const workbook = new Workbook();
  const sheet = workbook.addWorksheet("Résultats Quiz");

  sheet.columns = [
    { header: 'Nom', key: 'name', width: 20 },
    { header: 'Score', key: 'score', width: 10 },
    { header: 'Date', key: 'date', width: 25 },
  ];

  sheet.addRows(entries);

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=resultats-quiz.xlsx',
    },
  });
}

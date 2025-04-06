import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { score } = await req.json();

    const filePath = path.join(process.cwd(), 'data', 'quiz.json');

    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent.trim() !== '') {
        existingData = JSON.parse(fileContent);
      }
    }

    const newEntry = {
      score,
      date: new Date().toISOString(),
    };

    existingData.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 });
  }
}

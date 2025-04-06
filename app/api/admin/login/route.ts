// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Champs manquants' },
      { status: 400 }
    );
  }

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { message: 'Identifiants incorrects' },
    { status: 401 }
  );
}

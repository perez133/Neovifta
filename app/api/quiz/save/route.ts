import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { score, ageGroup } = await req.json();

    const { error } = await supabase.from('quiz').insert({
      score,
      age_group: ageGroup,
    });

    if (error) {
      console.error('[SUPABASE INSERT ERROR]', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 });
  }
}

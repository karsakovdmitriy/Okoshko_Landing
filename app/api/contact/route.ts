import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

interface SupabaseError {
  message?: string;
  code?: string;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials are not set');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([
        { name, email, phone }
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const error = err as SupabaseError;
    console.error('Error saving contact:', error);

    let message = 'Internal Server Error';
    if (error.message?.includes('Can\'t reach database server')) {
       message = 'Database connection unreachable. Please check your DB settings.';
    } else if (error.code === '42501') {
       message = 'Database permission error (RLS). Please follow the README instructions.';
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    // Check if DATABASE_URL is set to avoid Prisma initialization errors
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set in environment variables');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    console.error('Error saving contact:', error);

    // Check for specific Prisma errors
    if (error.message?.includes('Can\'t reach database server')) {
      return NextResponse.json({
        error: 'Database connection unreachable. Please check your DB settings and Pooler configuration.'
      }, { status: 500 });
    }

    if (error.message?.includes('DATABASE_URL')) {
      return NextResponse.json({ error: 'Database connection string error' }, { status: 500 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

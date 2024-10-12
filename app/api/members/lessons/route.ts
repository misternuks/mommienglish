// app/api/members/lessons/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(lessons, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

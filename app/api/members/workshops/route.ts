// app/api/members/workshops/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { Workshop } from '@prisma/client'; // Import Prisma types for server-side code

export async function GET() {
  try {
    const workshops: Workshop[] = await prisma.workshop.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(workshops, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

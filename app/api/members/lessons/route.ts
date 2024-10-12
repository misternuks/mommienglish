// app/api/members/lessons/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust the path accordingly

export async function GET(request: Request) {
  const session = await getServerSession({ req: request, ...authOptions });

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(lessons, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }
}

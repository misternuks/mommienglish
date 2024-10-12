// app/api/admin/lessons/route.ts
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
      { status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
       }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { href, heading, title, password, imageUrl } = await request.json();

    // Basic validation
    if (!href || !heading || !title || !password || !imageUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
          { status: 400,
            headers: {
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    // Create a new lesson
    const lesson = await prisma.lesson.create({
      data: { href, heading, title, password, imageUrl },
    });

    return NextResponse.json(lesson,
      { status: 201,
        headers: {
          'Cache-Control': 'no-store',
        },
      });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

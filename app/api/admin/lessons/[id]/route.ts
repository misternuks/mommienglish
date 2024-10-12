//app/api/admin/lessons/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: Number(params.id) },
    });
    if (lesson) {
      return NextResponse.json(lesson, {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404,
          headers: {
            'Cache-Control': 'no-store',
          },
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updatedLesson = await prisma.lesson.update({
      where: { id: Number(params.id) },
      data: { href, heading, title, password, imageUrl },
    });

    return NextResponse.json(updatedLesson, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.lesson.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(
      { message: 'Lesson deleted' },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

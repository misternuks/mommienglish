import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id: Number(params.id) },
    });
    if (workshop) {
      return NextResponse.json(workshop);
    } else {
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workshop' }, { status: 500 });
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
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const updatedWorkshop = await prisma.workshop.update({
      where: { id: Number(params.id) },
      data: { href, heading, title, password, imageUrl },
    });

    return NextResponse.json(updatedWorkshop);
  } catch (error) {
    console.error('Error updating workshop:', error);
    return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.workshop.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: 'Workshop deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 });
  }
}

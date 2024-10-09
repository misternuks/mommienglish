import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { href, heading, title, password, imageUrl } = await request.json();

    // Basic validation
    if (!href || !heading || !title || !password || !imageUrl) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create a new workshop
    const workshop = await prisma.workshop.create({
      data: { href, heading, title, password, imageUrl },
    });

    return NextResponse.json(workshop, { status: 201 });
  } catch (error) {
    console.error('Error creating workshop:', error);
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}

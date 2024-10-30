// app/api/admin/events/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { start: 'asc' },
    });

    const parsedEvents = events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));

    return NextResponse.json(parsedEvents, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { eventName, start, end } = await request.json();

    // Basic validation
    if (!eventName || !start || !end) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Create a new event
    const event = await prisma.event.create({
      data: { eventName, start: new Date(start), end: new Date(end) },
    });

    return NextResponse.json(event, {
      status: 201,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

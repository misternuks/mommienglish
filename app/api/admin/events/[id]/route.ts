//app/api/admin/events/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({ where: { id: Number(params.id) } });
    if (event) {
      return NextResponse.json(event, {
        headers: { 'Cache-Control': 'no-store' },
      });
    } else {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      );
    }
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { eventName, start, end } = await request.json();

    // Basic validation
    if (!eventName || !start || !end) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const updatedEvent = await prisma.event.update({
      where: { id: Number(params.id) },
      data: { eventName, start: new Date(start), end: new Date(end) },
    });

    return NextResponse.json(updatedEvent, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.event.delete({ where: { id: Number(params.id) } });
    return NextResponse.json(
      { message: 'Event deleted' },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

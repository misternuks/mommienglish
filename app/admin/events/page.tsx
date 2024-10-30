// app/admin/events/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

type Event = {
  id: number;
  text: string;
  start: string;
  end: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/admin/events');
      if (res.ok) {
        const data: Event[] = await res.json();
        setEvents(data);
      } else {
        alert('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents(events.filter((event) => event.id !== id));
      } else {
        alert('Failed to delete the event.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Events</h1>
      {events.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Event</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.text}</td>
                <td>{new Date(event.start).toLocaleString()}</td>
                <td>{new Date(event.end).toLocaleString()}</td>
                <td>
                  <Link href={`/admin/events/${event.id}/edit`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events found.</p>
      )}
      <Link href="/admin/events/new">
        <button className={styles.createButton}>Create New Event</button>
      </Link>
      <Link href="/admin/dashboard">
        <button className={styles.backButton}>Back to Admin Dashboard</button>
      </Link>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../admin.module.css';
import Link from 'next/link';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id;

  const [formData, setFormData] = useState({
    eventName: '',
    start: '',
    end: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`/api/admin/events/${eventId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          eventName: data.eventName,
          start: new Date(data.start).toISOString().slice(0, 16), // Format for datetime-local input
          end: new Date(data.end).toISOString().slice(0, 16),
        });
      } else {
        alert('Failed to fetch event data.');
        router.push('/admin/events');
      }
    };

    fetchEvent();
  }, [eventId, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.eventName || !formData.start || !formData.end) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);

      // Send updated data to the API
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: formData.eventName,
          start: new Date(formData.start),
          end: new Date(formData.end),
        }),
      });

      if (res.ok) {
        router.push('/admin/events');
      } else {
        alert('Failed to update event.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date and Time:</label>
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date and Time:</label>
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.createButton} type="submit" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update Event'}
        </button>
      </form>
      <Link href="/admin/events">
        <button className={styles.backButton}>Back to Events</button>
      </Link>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';
import Link from 'next/link';

export default function NewEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventName: '',
    start: '',
    end: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.eventName || !formData.start || !formData.end) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);

      // Send data to the API to create the event
      const res = await fetch('/api/admin/events', {
        method: 'POST',
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
        alert('Failed to create event.');
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
      <h1>Create New Event</h1>
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
          {submitting ? 'Submitting...' : 'Create Event'}
        </button>
      </form>
      <Link href="/admin/events">
        <button className={styles.backButton}>Back to Events</button>
      </Link>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';
import { Workshop } from '@/types/workshop';

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const res = await fetch('/api/admin/workshops');
      if (res.ok) {
        const data: Workshop[] = await res.json();
        setWorkshops(data);
      } else {
        // Handle error response
        alert('Failed to fetch workshops.');
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Manage Workshops</h1>
      {workshops.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop) => (
              <tr key={workshop.id}>
                <td>{workshop.heading}</td>
                <td>{workshop.title}</td>
                <td>
                  <Link href={`/admin/workshops/${workshop.id}/edit`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(workshop.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No workshops found.</p>
      )}
      <Link href="/admin/workshops/new">
        <button className={styles.createButton}>Create New Workshop</button>
      </Link>
      <Link href="/admin/dashboard">
        <button className={styles.backButton}>Back to Admin Dashboard</button>
      </Link>
    </div>
  );

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this workshop?')) {
      const res = await fetch(`/api/admin/workshops/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setWorkshops(workshops.filter((workshop) => workshop.id !== id));
      } else {
        alert('Failed to delete the workshop.');
      }
    }
  }
}

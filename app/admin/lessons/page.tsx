// app/admin/lessons/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';
import { Lesson } from '@/types/lesson';

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch('/api/admin/lessons');
      if (res.ok) {
        const data: Lesson[] = await res.json();
        setLessons(data);
      } else {
        // Handle error response
        alert('Failed to fetch lessons.');
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Manage Lessons</h1>
      {lessons.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.heading}</td>
                <td>{lesson.title}</td>
                <td>
                  <Link href={`/admin/lessons/${lesson.id}/edit`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(lesson.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No lessons found.</p>
      )}
      <Link href="/admin/lessons/new">
        <button className={styles.createButton}>Create New Lesson</button>
      </Link>
      <Link href="/admin/dashboard">
        <button className={styles.backButton}>Back to Admin Dashboard</button>
      </Link>
    </div>
  );

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      const res = await fetch(`/api/admin/lessons/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLessons(lessons.filter((lesson) => lesson.id !== id));
      } else {
        alert('Failed to delete the lesson.');
      }
    }
  }
}

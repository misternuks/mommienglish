// app/admin/dashboard/page.tsx

import styles from '../admin.module.css'
export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li className={styles.editButton}><a href="/admin/lessons">Manage Lessons</a></li>
        <li className={styles.editButton}><a href="/admin/workshops">Manage Workshops</a></li>
        <li className={styles.editButton}><a href="/admin/events">Manage Calendar Events</a></li>
        <li className={styles.backButton}><a href="/">Back to the Homepage</a></li>
      </ul>

    </div>
  );
}

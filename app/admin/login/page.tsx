//app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send credentials to the login API route
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Login successful, response:', data); // Debug: Check the server response
      console.log('Login successful, redirecting to dashboard');
      router.push('/admin/dashboard'); // Redirect after successful login
    } else {
      const data = await res.json();
      alert(`Login failed: ${data.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin Login</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <button className={styles.createButton} type="submit">Login</button>
      </form>
    </div>
  );
}

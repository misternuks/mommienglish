'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import bcrypt from 'bcrypt';
import { useFlashMessage } from '@/app/context/FlashMessageContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Perform a POST request to the API to create a new user
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (response.ok) {
      // Show success message and redirect to the sign-in page after successful registration
      setFlashMessage({ type: 'success', message: 'User created successfully!' });
      router.push('/auth/signin');
    } else {
      // Show error message)
      const { error } = await response.json();
      setFlashMessage({ type: 'error', message: error || 'Sign-up failed.' });
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Sign Up</h2>
        <form className="card-form" onSubmit={handleSignUp}>
          <input
            className="form-field"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="red-border-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

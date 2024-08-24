'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          email: { value: string };
          password: { value: string };
        };

        signIn('credentials', {
          redirect: false,
          email: target.email.value,
          password: target.password.value,
        });
      }}>
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

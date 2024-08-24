'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <div className="card-container">
      <div className="card">
        <Image
          src='/images/logo_group.png'
          alt='MommiEnglish logo and slogan group'
          width={600}
          height={150}
        />
        <form className="card-form" onSubmit={(e) => {
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
          <input name="email" type="text" placeholder="Email" className="form-field"/>
          <input name="password" type="password" placeholder="Password" className="form-field" />
          <button type="submit" className="red-border-button" >Sign in</button>
        </form>
      </div>
    </div>
  );
}

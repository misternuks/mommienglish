'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(()=> {
    if (status === 'authenticated') {
      router.push('/members'); // Redirect to the members pager if already authenticated
    }
  }, [status, router]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const result = await signIn('credentials', {
      redirect: false,
      email: target.email.value,
      password: target.password.value,
    });

    if (result?.ok) {
      router.push('/members'); // Redirect to the members page after successful login
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <Image
          src='/images/logo_group.png'
          alt='MommiEnglish logo and slogan group'
          width={600}
          height={150}
        />
        <form className="card-form" onSubmit={handleSignIn}>
          <input name="email" type="text" placeholder="Email" className="form-field"/>
          <input name="password" type="password" placeholder="Password" className="form-field" />
          <button type="submit" className="red-border-button" >Sign in</button>
        </form>
      </div>
    </div>
  );
}

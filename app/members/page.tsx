'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Members() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // redirect to sign-in page
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className = "member-banner">
      <h2>Coming soon!</h2>
    </div>
  );
}

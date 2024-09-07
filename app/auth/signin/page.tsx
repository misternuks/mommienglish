'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { useFlashMessage } from '@/app/context/FlashMessageContext';

import HomeButton from '@/app/components/HomeButton';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();

  useEffect(()=> {
    if (status === 'authenticated') {
      router.push('/members'); // Redirect to the members pager if already authenticated
    }
  }, [status, router]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      passcode: { value: string };
    };

    const result = await signIn('credentials', {
      redirect: false,
      passcode: target.passcode.value,
    });

    if (result?.ok) {
      setFlashMessage({ type: 'success', message: 'Successfully signed in!' });
      router.push('/members'); // Redirect to the members page after successful login
    } else if (result?.error) {
      setFlashMessage({ type: 'error', message: 'Incorrect passcode. Please try again.' });
    } else {
      setFlashMessage({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div>
      <div className="card-container">
        <div className="card">
          <Image
            src='/images/logo_group.png'
            alt='MommiEnglish logo and slogan group'
            width={600}
            height={150}
          />
          <form className="card-form" onSubmit={handleSignIn}>
            <input name="passcode" type="password" placeholder="Passcode" className="form-field" />
            <button type="submit" className="red-border-button" >Sign in</button>
          </form>
        </div>
        <HomeButton />
      </div>
    </div>
  );
}

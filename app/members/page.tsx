'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import Image from 'next/image';
import Logout from '../logout';


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
      <div className="member-banner-left">
        <div>
          <h2 className="member-banner-h3">おうち英語習慣化プログラム</h2>
        </div>
        <div className="member-banner-center">
          <h2 className="member-banner-h3">ママと子どもの</h2>
          <h1>英語共育</h1>
          <h2 className="member-banner-h3">プロジェクト</h2>
        </div>
        <div>
          <h2 className="member-banner-h3">Wednesday class: 10:00~ </h2>
          <h2 className="member-banner-h3">Friday class: 21:30~ </h2>
        </div>
      </div>
      <div className="member-banner-right">

      </div>
    </div>
  );
}

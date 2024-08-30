'use client';
import { Darumadrop_One } from 'next/font/google';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import styles from "./member.module.css"
import Image from 'next/image';
// import Logout from '../logout';

const darumadropOne = Darumadrop_One({
  weight: ['400'],
  subsets: ['latin'],
});

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
    <div className={styles["member-banner"]}>
      <div className={styles["member-banner-left"]}>
        <div>
          <h2 className={styles["member-banner-h3"]}>おうち英語習慣化プログラム</h2>
        </div>
        <ul />
        <div className={styles["member-banner-center"]}>
          <h2 className={styles["member-banner-h3"]}>ママと子どもの</h2>
          <h1>英語<span className={styles["member-banner-center-red-text"]}>共</span>育</h1>
          <h2 className={styles["member-banner-h3"]}>プロジェクト</h2>
        </div>
        <ul />
        <div>
          <h2 className={styles["member-banner-h3"]}>Wednesday class: 10:00~ </h2>
          <h2 className={styles["member-banner-h3"]}>Friday class: 21:30~ </h2>
        </div>
      </div>
      <div className={styles["member-banner-right"]}>
        <div className={styles["member-banner-right-text"]}>
          <h1 className={darumadropOne.className}>
            <span className="red-text">M</span>ake <span className="red-text">E</span>nglish<br />
            a <span className="red-text">H</span>abit at <span className="red-text">H</span>ome
          </h1>
        </div>
        <div className={styles['banner-logo']}>
          <Image
            src='/images/logo_group_white.png'
            alt='white logo group'
            width={400}
            height={80}
          />
        </div>
      </div>
    </div>
  );
}

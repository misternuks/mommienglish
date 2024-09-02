'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './MembersContact.module.css'

export default function MembersContact() {

  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      id='members-contact'
    >
      <div className={styles['members-contact-container']}>
        <div className={styles['members-contact-us']}>
          <h2 id="contact" className="members-header">contact</h2>
          <div className={styles['members-contact-text']}>
            <p>受講生の皆さまと一緒に<wbr />サービスを創り上げたいと思っています。</p>
            <p>レッスンや交流会、<wbr />ワークショップなどどんなことでも</p>
            <p>質問やご要望がありましたら<wbr />お気軽にお問い合わせください</p>
          </div>
          <button className="red-button">
            <a href="https://forms.gle/1Av7cpG1hpMKSNq27">お問い合わせはこちら
            </a>
          </button>
        </div>
        <div className={styles['members-contact-us']}>
        <h2 id="contact" className="members-header">1 on 1セッション予約</h2>
          <div className={styles['members-contact-text']}>
            <p>1 on 1 習慣化コーチング・1 on 1<wbr /> アウトプットセッションの</p>
            <p>予約はこちらからできます。</p>
            <p>※別サイトに移行します。</p>
          </div>
          <button className="red-button">
            <a href="https://app.spirinc.com/patterns/availability-sharing/9bCh-7cwPGilEnrwby9Vz/confirm">
              予約する
            </a>
          </button>
        </div>
      </div>
    </motion.section>
  );
};

'use client';

import styles from './banner.module.css'
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Banner() {

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

  const questionnaire = process.env.NEXT_PUBLIC_QUESTIONNAIRE;

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className = {styles.banner}
    >
      <div className = {styles['banner-content']}>
        <div>

        </div>
        <div className = {styles['banner-hero']}>
          <Image
            src='/images/me_logo.png'
            alt='Red MommiEnglish Logo'
            width={150}
            height={150}
            className={styles['']}
          />
          <div>
          <h2>ママが<span className = 'red-text'>笑</span>っていれば</h2><br />
          <h2>それだけで<span className = 'red-text'>嬉</span>しい。</h2>
          </div>
          <a
            className = 'red-button'
            href={questionnaire}
            target='_blank'
          >
            お問い合わせはこちら
          </a>
        </div>
      </div>
    </motion.section>
  );
}

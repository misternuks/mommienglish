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
        <div className = {styles['banner-left']}>
          <div>
          <Image
            src='/images/me_colorful_logo.png'
            alt='MommiEnglish Logo'
            width={405}
            height={76}
            className={styles['']}
          />
          </div>
          <div>
            <h1>あなたの英語習慣を</h1><br />
            <span><h1>デザインします</h1></span>
          </div>
          <a
            className = 'red-button'
            href={questionnaire}
            target='_blank'
          >
            お問い合わせはこちら
          </a>
        </div>
        <div className = {styles['banner-right']}>
          <Image
            src='/images/banner_moena.png'
            alt='Photo of Moena'
            width={622}
            height={746}
            className={styles['']}
          />
        </div>
      </div>
    </motion.section>
  );
}

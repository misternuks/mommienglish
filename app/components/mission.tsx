'use client';

import styles from './mission.module.css'
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Mission() {

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
      id='mission'
      className = {styles.mission}
    >
      <div>
        <h2>Our <span className = 'red-text'>M</span>ission</h2>
      </div>
      <div className = {styles['mission-column-container']} >
        <div className = {styles['mission-column']} >
          <Image
            src='/images/mission01.png'
            alt='hand holding a paper with yes I can'
            width={320}
            height={320}
            className={styles['mission-image']}
          />
          <h5 className = 'red-text'>英語の苦手意識をなくす</h5>
          <p>
            英語は教科ではなく、日本語と同じ、
            コミュニケーションツール。
            この意識を持ち続け生活の一部として英語を取り入れます。
          </p>
        </div>
        <div className = {styles['mission-column']} >
          <Image
            src='/images/mission02.png'
            alt='mother helping a child write'
            width={320}
            height={320}
            className={styles['mission-image']}
          />
          <h5 className = 'red-text'>おうち英語の習慣化</h5>
          <p>
            週に１回のグループセッションにて、
            ママがすぐに使える英語フレーズと単語を導入し、
            それを一週間ご家庭で使ってもらいます。
            このサイクルを繰り返し、英語習慣化を目指します。
          </p>
        </div>
        <div className = {styles['mission-column']} >
          <Image
            src='/images/mission03.png'
            alt='mother talking to boy and girl on the couch'
            width={320}
            height={320}
            className={styles['mission-image']}
          />
          <h5 className = 'red-text'>ママが英語好きのきっかけになる</h5>
          <p>
            ママには子どもに英語の指導をするのではなく、
            英語が楽しいことを伝えるガイドになって欲しいです。
            英語は勉強ではなく日常のものだと伝えることがおうち
            英語の最大の目的です。
          </p>
        </div>
      </div>
      <div className = {styles['mission-english-banner']}>

      </div>
    </motion.section>
  );
}

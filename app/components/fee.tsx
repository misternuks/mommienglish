'use client';

import styles from './fee.module.css'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Fee() {

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

  return(
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      id='fee'
      className = {styles.fee}
    >
      <div>
        <h2>料金のご<span className = 'red-text'>案</span>内</h2>
      </div>
      <div className = {styles['fee-content-container']}>
        <Image
          src='/images/fee01.png'
          alt='woman smiling and clapping while using laptop'
          width={450}
          height={450}
        />
        <div className = {styles['fee-content-list']}>
          <div className='red-box'>
            ママと子どもの英語共育プロジェクト
          </div>
          <div className = {styles['fee-list-item']} >
            <div className = {styles['fee-list-number']} >1</div>
            <div className = 'red-text'>週に１回のグループインプットセッション</div>
          </div>
          <div className = {styles['fee-list-item']} >
            <div className = {styles['fee-list-number']} >2</div>
            <div className = 'red-text'>月に２回の交流会 or ワークショップ</div>
          </div>
          <div className = {styles['fee-list-item']} >
            <div className = {styles['fee-list-number']} >3</div>
            <div className = 'red-text'>マンツーマンおうち英語習慣化コーチング</div>
          </div>
          <div className = {styles['fee-list-item']} >
            <div className = {styles['fee-list-number']} >4</div>
            <div className = 'red-text'>マンツーマンアウトプット強化セッション</div>
          </div>
          <p className = {styles['fee-money-text']}>月額 ￥8,000</p>
        </div>
      </div>
    </motion.section>
  );
}

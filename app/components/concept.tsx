'use client';

import styles from './concept.module.css'
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Concept() {

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
      id='concept'
      className = {styles.concept}
    >
      <div className = {styles['concept-vertical-text-container']}>
        <div className = {styles['concept-vertical-text']}>ママのための</div>
        <div className = {styles['concept-vertical-text']}>英語習慣化プログラム</div>
      </div>
      <div className = {styles['concept-horizontal-text-container']}>
        <div className = {styles['concept-title']}>
          <h1>子どもと一緒に</h1>
          <h1>親子の英会話を楽しむ</h1>
        </div>
        <div className = {styles['concept-paragraph']}>
          <p>
            留学してから気づいた、実用性のない中学・高校英語。
            子どもができてから知った、ママと子どもの信頼関係。
            国際寮で身近に感じた、学生たちの英語への向き合い方と成長。
            英会話の先生になって実感した、日本の違和感のある英語教育。
            ママであり、英語の先生でもある私だから伝えられる
            子どもだけが頑張るのではなく、ママだけが悩むのではない。
            親子両想い型の英語共育を広げたい。
          </p>
        </div>
      </div>
    </motion.section>
  );
}

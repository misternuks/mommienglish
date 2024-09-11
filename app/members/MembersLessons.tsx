'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './MembersLessons.module.css'
import Image from 'next/image';

export default function MembersLessons() {

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
      id='members-lessons'
    >
      <div className={styles['members-lessons-container']}>
        <div className={styles['members-new-lessons-container']}>
          <h2 id="lessons" className="members-header">new lessons</h2>
          <div className={styles['members-new-lessons']}>
            <div className={styles['members-new-lesson-card']}>
            <a
              href="https://zoom.us/rec/share/ZkSIKDgK9ZmWckVDsRxW4uOnch6LKFWsYTjB7n28kRs2B1GZV-B5sKMg_0qDGCUq.fp23ZqHIJRoKvdks"
              target="_blank"
            >
              <Image
                src="/images/lesson_01_image.png"
                alt="lesson 1"
                width={280}
                height={160}
                className={styles['members-new-lesson-image']}
              />
            </a>
            <p>
              Day 1 for Wednesday class<br />
              『Morning routine』<br />
              Password : me!20240911<br />
            </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

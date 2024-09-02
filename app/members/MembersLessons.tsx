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

  const thumbnailText = "The first lesson is coming soon! Stay tuned!";

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
            <div className={styles['members-new-lesson-thumbnail']}>
              <Image
                src="/images/members_video_thumb_01.webp"
                alt="mother talking to children"
                width={200}
                height={200}
              />
              <p>
                {thumbnailText}
              </p>
            </div>
            <div className={styles['members-new-lesson-thumbnail']}>
              <Image
                src="/images/members_video_thumb_02.webp"
                alt="mother talking to children"
                width={200}
                height={200}
              />
              <p>
                {thumbnailText}
              </p>
            </div>
            <div className={styles['members-new-lesson-thumbnail']}>
              <Image
                src="/images/members_video_thumb_03.webp"
                alt="mother talking to children"
                width={200}
                height={200}
              />
              <p>
                {thumbnailText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

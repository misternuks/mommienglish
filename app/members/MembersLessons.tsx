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
                『<span className={styles['title']}>Morning routine</span>』<br />
                Password:<span className={styles['password']}> me!20240911</span><br />
              </p>
            </div>
            <div className={styles['members-new-lesson-card']}>
              <a
                href="https://zoom.us/rec/share/nZIu22TF-QeWXb-6m10x6BaCS8y7jPUDYGNtT9x6TBJPuCc9XN8RDqd83w6rOj_0.tJwbZkjzsBvxb2R_"
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
                Day 1 for Friday class<br />
                『<span className={styles['title']}>Morning routine</span>』<br />
                Password:<span className={styles['password']}> me!20240913</span><br />
              </p>
            </div>
            <div className={styles['members-new-lesson-card']}>
              <a
                href="https://zoom.us/rec/share/QDnRC5TDBZxRWNz-_OCQCVeMoA48v9xUW24nbx9W_WvxH_rdHnhJnW1qSQX2Ud7x.hKZEwiA9YXHMnzLy"
                target="_blank"
              >
                <Image
                  src="/images/lesson_02_image.png"
                  alt="lesson 2"
                  width={280}
                  height={160}
                  className={styles['members-new-lesson-image']}
                />
              </a>
              <p>
                Day 2 for Wednesday class<br />
                『<span className={styles['title']}>褒め言葉</span>』<br />
                Password:<span className={styles['password']}> me!20240918</span><br />
              </p>
            </div>
            <div className={styles['members-new-lesson-card']}>
              <a
                href="https://zoom.us/rec/share/FbEvREKG2_adDnzzGO0LvvINeomDxkqnHjQuDmnoEdn09uQPkzWwJyjsQYhiziqQ.Ze4LxM1BsikJXRVp"
                target="_blank"
              >
                <Image
                  src="/images/lesson_02_image.png"
                  alt="lesson 2"
                  width={280}
                  height={160}
                  className={styles['members-new-lesson-image']}
                />
              </a>
              <p>
                Day 2 for Friday class<br />
                『<span className={styles['title']}>褒め言葉</span>』<br />
                Password:<span className={styles['password']}> me!20240920</span><br />
              </p>
            </div>
            <div className={styles['members-new-lesson-card']}>
              <a
                href="https://zoom.s/rec/share/6U76H5lWZiKDN739Lh0Otc8_LBw5d7f194FZXKEPJK4VFeCmqoLSluvJ8UoUi4m6.hcel_3Iq6VjEnk4Y"
                target="_blank"
              >
                <Image
                  src="/images/lesson_03_image.png"
                  alt="lesson 3"
                  width={280}
                  height={160}
                  className={styles['members-new-lesson-image']}
                />
              </a>
              <p>
                Day 3 for Wednesday class<br />
                『<span className={styles['title']}>Before dinner time</span>』<br />
                Password:<span className={styles['password']}> me!20240925</span><br />
              </p>
            </div>
            <div className={styles['members-new-lesson-card']}>
              <a
                href="https://zoom.us/rec/share/2kj5atV3fKNhCueTGcSWV1FL-3gwLzoaBtxc_lcO-gZMiIDoCxIWkASGwWu6mnij.a9K_oAUcLl0CT5mj"
                target="_blank"
              >
                <Image
                  src="/images/lesson_03_image.png"
                  alt="lesson 3"
                  width={280}
                  height={160}
                  className={styles['members-new-lesson-image']}
                />
              </a>
              <p>
                Day 3 for Friday class<br />
                『<span className={styles['title']}>Before dinner time</span>』<br />
                Password :<span className={styles['password']}> me!20240927</span><br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

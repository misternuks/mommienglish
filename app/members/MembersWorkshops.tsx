'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './MembersWorkshops.module.css'
import Image from 'next/image';

export default function MembersWorkshops() {

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
      id='members-workshops'
    >
      <div className={styles['members-workshops-container']}>
        <div className={styles['members-new-workshops-container']}>
          <h2 id="workshops" className="members-header">workshops / events</h2>
          <div className={styles['members-new-workshops']}>
            <Image
              src="/images/coming_soon_workshops.png"
              alt="lessons coming soon"
              width={280}
              height={160}
              className={styles['members-image']}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

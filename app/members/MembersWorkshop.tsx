'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './MembersWorkshop.module.css'
import Image from 'next/image';

export default function MembersWorkshop() {

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

  const thumbnailText = "The first workshop is coming soon! Stay tuned!";
  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      id='members-workshop'
    >
      <div className={styles['members-workshop-container']}>
        <div className={styles['members-new-workshop-container']}>
          <h2 id="workshop" className="members-header">workshop</h2>
          <div className={styles['members-new-workshop']}>
            <div className={styles['members-new-workshop-thumbnail']}>
              <Image
                src="/images/members_workshop_thumb_01.webp"
                alt="mother talking to children"
                width={200}
                height={200}
                className={styles['members-image']}
              />
              <p>
                {thumbnailText}
              </p>
            </div>
            <div className={styles['members-new-workshop-thumbnail']}>
              <Image
                src="/images/members_workshop_thumb_02.webp"
                alt="mother talking to children"
                width={200}
                height={200}
                className={styles['members-image']}
              />
              <p>
                {thumbnailText}
              </p>
            </div>
            <div className={styles['members-new-workshop-thumbnail']}>
              <Image
                src="/images/members_workshop_thumb_03.webp"
                alt="mother talking to children"
                width={200}
                height={200}
                className={styles['members-image']}
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

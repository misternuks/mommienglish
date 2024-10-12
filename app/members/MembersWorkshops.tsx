'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import styles from './MembersWorkshops.module.css';
import useSWR from 'swr';

interface Workshop {
  id: number;
  href: string;
  heading: string;
  title: string;
  password: string;
  imageUrl: string;
}

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const { data: workshops, error } = useSWR<Workshop[]>(`${baseUrl}/api/members/workshops`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (error) return <div>Failed to load workshops.</div>;
  if (!workshops) return <div>Loading...</div>;

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
          <h2 id="workshops" className="members-header">New Workshops</h2>
          <div className={styles['members-new-workshops']}>
            {workshops.map((workshop) => (
              <div key={workshop.id} className={styles['members-new-workshop-card']}>
                <a href={workshop.href} target="_blank">
                  <Image
                    src={workshop.imageUrl}
                    alt={workshop.title}
                    width={280}
                    height={160}
                    className={styles['members-new-workshop-image']}
                  />
                </a>
                <p>
                  {workshop.heading}<br />
                  『<span className={styles['title']}>{workshop.title}</span>』<br />
                  Password: <span className={styles['password']}>{workshop.password}</span><br />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

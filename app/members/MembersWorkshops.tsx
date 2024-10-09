'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import styles from './MembersWorkshops.module.css';

interface Workshop {
  id: number;
  href: string;
  heading: string;
  title: string;
  password: string;
  imageUrl: string;
}

export default function MembersWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  // Fetch workshops when the component mounts
  useEffect(() => {
    const fetchWorkshops = async () => {
      const res = await fetch('/api/members/workshops');
      if (res.ok) {
        const data: Workshop[] = await res.json();
        setWorkshops(data);
      } else {
        alert('Failed to fetch workshops.');
      }
    };

    fetchWorkshops();
  }, []);

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

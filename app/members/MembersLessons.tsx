'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import styles from './MembersLessons.module.css';

interface Lesson {
  id: number;
  href: string;
  heading: string;
  title: string;
  password: string;
  imageUrl: string;
}

export default function MembersLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  // Fetch lessons when the component mounts
  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch('/api/members/lessons');
      if (res.ok) {
        const data: Lesson[] = await res.json();
        console.log(data);  //Debug
        setLessons(data);
      } else {
        alert('Failed to fetch lessons.');
      }
    };

    fetchLessons();
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
      id='members-lessons'
    >
      <div className={styles['members-lessons-container']}>
        <div className={styles['members-new-lessons-container']}>
          <h2 id="lessons" className="members-header">new lessons</h2>
          <div className={styles['members-new-lessons']}>
            {lessons.map((lesson) => (
              <div key={lesson.id} className={styles['members-new-lesson-card']}>
                <a href={lesson.href} target="_blank">
                  <Image
                    src={lesson.imageUrl}
                    alt={lesson.title}
                    width={280}
                    height={160}
                    className={styles['members-new-lesson-image']}
                  />
                </a>
                <p>
                  {lesson.heading}<br />
                  『<span className={styles['title']}>{lesson.title}</span>』<br />
                  Password: <span className={styles['password']}>{lesson.password}</span><br />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

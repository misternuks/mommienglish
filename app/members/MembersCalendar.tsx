'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './MembersCalendar.module.css'

export default function MembersCalendar() {

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
      id='members-calendar'
    >
      <div className={styles['members-calendar-container']}>
        <h2 id="calendar" className="members-header">September</h2>
        <div className={styles['members-calendar']}>
        <div className={styles['members-calendar-header']}>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className={styles['members-calendar-grid']}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8<p>9:30pm Event - Kick-off</p></div>
        <div>9</div>
        <div>10</div>
        <div>11<p>10am Day 1</p></div>
        <div>12</div>
        <div>13<p>9:30pm Day 1</p></div>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18<p>10am Day 2</p></div>
        <div>19</div>
        <div>20<p>9:30pm Day 2</p></div>
        <div>21</div>
        <div>22</div>
        <div>23</div>
        <div>24</div>
        <div>25<p>10am Day 3</p></div>
        <div>26</div>
        <div>27<p>9:30pm Day 3</p></div>
        <div>28<p>9:30pm Event - guest 1</p></div>
        <div>29</div>
        <div>30</div>
        <div>Oct 1</div>
        <div>2<p>10am Day 4</p></div>
        <div>3</div>
        <div>4<p>9:30pm Day 4</p></div>
        <div>5</div>
      </div>
        </div>
      </div>
    </motion.section>
  );
};

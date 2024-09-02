'use client';

import styles from './contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';


export default function Contact() {

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

  const questionnaire = process.env.NEXT_PUBLIC_QUESTIONNAIRE;

  return(
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      id='contact'
      className = {styles.contact}
    >
      <div className = {styles['contact-content']}>
        <div>
          <h2>お<span className = 'red-text'>問</span>い合わせ</h2>
        </div>
        <div>
          <p>
          サービスに関するお問い合わせは、お問い合わせフォーム、<br></br>
          X(旧twitter)またはInstagarmのDMにてお受け付けしております。
          </p>
        </div>
        <a
            className = 'red-button'
            href={questionnaire}
            target='_blank'
          >
            お問い合わせはこちら
          </a>
        <div className = {styles['contact-sns']}>
          <a href="https://www.instagram.com/mommienglish_s2/"
            target="_blank"><FontAwesomeIcon icon={faSquareInstagram} />
          </a>
          <a href="https://x.com/m_webdesign_85"
            target="_blank"><FontAwesomeIcon icon={faXTwitter} />
          </a>
        </div>
      </div>
    </motion.section>
  );
}

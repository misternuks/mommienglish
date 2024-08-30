'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import styles from './HomeButton.module.css';

const HomeButton = () => {
  const pathname = usePathname();

  const buttonColorClass = pathname === '/' ? styles['home-button-color'] : styles['default-button-color'];

  return (
    <a href="/" className={`${styles['home-button']} ${buttonColorClass}`}>
      <FontAwesomeIcon icon={faHouse} />
    </a>
  );
};

export default HomeButton;

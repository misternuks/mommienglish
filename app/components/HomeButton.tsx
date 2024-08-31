'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import styles from './HomeButton.module.css';

const HomeButton = () => {

  return (
    <a href="/" className={styles['home-button']}>
      <FontAwesomeIcon icon={faHouse} />
    </a>
  );
};

export default HomeButton;

'use client';

import { useEffect } from 'react';
import { useFlashMessage } from '../context/FlashMessageContext';
import styles from './FlashMessage.module.css'

const FlashMessage = () => {
  const { flashMessage, clearFlashMessage} = useFlashMessage();

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        clearFlashMessage();
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [flashMessage, clearFlashMessage]);

  if (!flashMessage) return null;

  return (
    <div className={`${styles['flash-message']} ${styles[flashMessage.type]}`}>
      {flashMessage.message}
    </div>
  );
};

export default FlashMessage;

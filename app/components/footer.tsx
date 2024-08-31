import styles from './footer.module.css'
import Image from 'next/image';

export default function Footer() {
  return(
    <section>
      <div className={styles.footer}>
        <Image
          src='/me_colorful_logo.png'
          alt='MommiEnglish logo in red and green'
          width={256}
          height={40}
        />
        <p>&copy; 2024 MommiEnglish</p>
      </div>
    </section>
  );
}

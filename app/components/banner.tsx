import styles from './banner.module.css'
import Image from 'next/image';

export default function Banner() {

  const questionnaire = process.env.NEXT_PUBLIC_QUESTIONNAIRE;

  return (
    <section className = {styles.banner} >
      <div className = {styles['banner-content']}>
        <div>

        </div>
        <div className = {styles['banner-hero']}>
          <Image
            src='/images/me_logo.png'
            alt='Red MommiEnglish Logo'
            width={150}
            height={150}
            className={styles['']}
          />
          <div>
          <h2>ママが<span className = 'red-text'>笑</span>っていれば</h2><br />
          <h2>それだけで<span className = 'red-text'>嬉</span>しい。</h2>
          </div>
          <a
            className = 'red-button'
            href={questionnaire}
            target='_blank'
          >
            お問い合わせはこちら
          </a>
        </div>
      </div>
    </section>
  );
}

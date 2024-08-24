import styles from './banner.module.css'
import Image from 'next/image';

export default function Banner() {
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
          <button className = 'red-button'>
            お問い合わせはこちら
          </button>
        </div>
      </div>
    </section>
  );
}

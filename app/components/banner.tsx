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
          <h2>
            ママが<span className = 'red-text'>笑</span>っていれば<br />
            それだけで<span className = 'red-text'>嬉</span>しい。
          </h2>
          <button className = 'red-button'>
            お問い合わせはこちら
          </button>
        </div>
      </div>
      <div>
        <ul className= {styles['banner-buttons']} >
          <li><a href='#mission'>Mission</a></li>
          <li><a href='#service'>サービス内容</a></li>
          <li><a href='#fee'>料金</a></li>
          <li><a href='#contact'>お問い合わせ</a></li>
          <li><a href='#student-page'>受講生専用PAGE</a></li>
        </ul>
      </div>
    </section>
  );
}

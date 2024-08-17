import styles from './mission.module.css'
import Image from 'next/image';

export default function Mission() {
  return (
    <section className = {styles.mission} >
      <div>
        <h5>Our <span className = 'red-text'>M</span>ission</h5>
      </div>
      <div className = {styles['mission-column-container']} >
        <div className = {styles['mission-column']} >
          <Image
            src='/images/mission01.png'
            alt='hand holding a paper with yes I can'
            width={320}
            height={320}
            className={styles['mission-image']}
          />
          <h5 className = 'red-text'>英語の苦手意識をなくす</h5>
          <p>
            英語は教科ではなく、日本語と同じ、
            コミュニケーションツール。
            この意識を持ち続け生活の一部として英語を取り入れます。
          </p>
        </div>
        <div className = {styles['mission-column']} >
          <Image
            src='/images/mission02.png'
            alt='hand holding a paper with yes I can'
            width={320}
            height={320}
            className={styles['mission-image']}
          />
          <h5 className = 'red-text'>おうち英語の習慣化</h5>
          <p>
            週に１回のグループセッションにて、
            ママがすぐに使える英語フレーズと単語を導入し、
            それを一週間ご家庭で使ってもらいます。
            このサイクルを繰り返し、英語習慣化を目指します。
          </p>
        </div>
        <div className = {styles['mission-column']} >
          <Image
            src='/images/mission03.png'
            alt='hand holding a paper with yes I can'
            width={320}
            height={320}
            className={styles['mission-image']}
          />
          <h5 className = 'red-text'>ママが英語好きのきっかけになる</h5>
          <p>
            ママには子どもに英語の指導をするのではなく、
            英語が楽しいことを伝えるガイドになって欲しいです。
            英語は勉強ではなく日常のものだと伝えることがおうち
            英語の最大の目的です。
          </p>
        </div>
      </div>
    </section>
  );
}

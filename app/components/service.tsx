import styles from './service.module.css'
import Image from 'next/image';

export default function Service() {
  return (
    <section className = {styles.service} >
      <div>
        <h2>サービス<span className = 'red-text'>内</span>容</h2>
      </div>
      <div className = {styles['service-feature-container']} >
        <div className = {styles['service-feature-column']} >
          <Image
              src='/images/service01.png'
              alt='notebook computer displaying faces'
              width={400}
              height={400}
          />
        </div>
        <div className = {styles['service-feature-column']} >
          <p className = {styles['service-feature-number']} >
            feature 1
          </p>
        </div>
        <div className = {styles['service-feature-column']}>
          <p className = {styles['service-feature-title-text']}>
            週に１回の<br></br>
            グループインプットセッション
          </p>
          <p>
            <strong>週に１回50分、グループでインプットセッションを行います。
            このセッションで導入したフレーズや単語をご家庭で使っていただき、
            インプットとアウトプットを繰り返すことで、おうち英語を習慣化していきます。</strong>
          </p>
        </div>
      </div>
      <div className = {styles['service-feature-container']} >
        <div className = {styles['service-feature-column']} >
          <p className = {styles['service-feature-number']} >
            feature 2
          </p>
        </div>
        <div className = {styles['service-feature-column']}>
          <p className = {styles['service-feature-title-text']}>
            月に２回の<br></br>
            交流会 or ワークショップ
          </p>
          <p>
            <strong>英語教育の情報交換をしたり、ネイティブを呼んでのお話し会を実施いたします。また、異文化理解のワークショップを行ったり、子どもと楽しめるDIY玩具作りなど、お子さまが五感を使って英語体験をしていただくセッションも準備しております。</strong>
          </p>
        </div>
        <div className = {styles['service-feature-column']} >
          <Image
              src='/images/service02.png'
              alt='notebook computer displaying faces'
              width={400}
              height={400}
          />
        </div>
      </div>
      <div className = {styles['service-feature-container']} >
        <div className = {styles['service-feature-column']} >
          <Image
              src='/images/service03.png'
              alt='notebook computer displaying faces'
              width={400}
              height={400}
          />
        </div>
        <div className = {styles['service-feature-column']} >
          <p className = {styles['service-feature-number']} >
            feature 3
          </p>
        </div>
        <div className = {styles['service-feature-column']}>
          <p className = {styles['service-feature-title-text']}>
            マンツーマン<br></br>
            おうち英語習慣化コーチング
          </p>
          <p>
            <strong>まずは目的、ゴールの可視化をすることでモチベーション維持を目指します。ご家庭での英語使用頻度の報告やそれに沿ったアドバイス、お子様の年齢にあった声かけ指導、絵本や教材の紹介などもさせていただきます。</strong>
          </p>
        </div>
      </div>
      <div className = {styles['service-feature-container']} >
        <div className = {styles['service-feature-column']} >
          <p className = {styles['service-feature-number']} >
            feature 4
          </p>
        </div>
        <div className = {styles['service-feature-column']}>
          <p className = {styles['service-feature-title-text']}>
            マンツーマン<br></br>
            アウトプット強化セッション
          </p>
          <p>
            <strong>発音・イントネーションの指導と練習、インプットセッションで学んだフレーズの確認などを行います。レベルに合わせて講師との英語での会話も可能です。マンツーマンなので間違うことを恐れず、恥ずかしがらずに英語でのアウトプットができます。</strong>
          </p>
        </div>
        <div className = {styles['service-feature-column']} >
          <Image
              src='/images/service04.png'
              alt='notebook computer displaying faces'
              width={400}
              height={400}
          />
        </div>
      </div>
    </section>
  );
}

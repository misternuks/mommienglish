import styles from './banner.module.css'

export default function Banner() {
  return (
    <section className = {styles.banner} >
      <div className = {styles['banner-hero']}>
        <h2>
          ママが<span className='red-text'>笑</span>っていれば</h2>
          <h2>それだけで<span className='red-text'>嬉</span>しい。</h2>
      <button className='red-button'>
        お問い合わせはこちら
      </button>
      </div>
      <div >
        <ul className= {styles['banner-buttons']} >
          <li><a href="">HOME</a></li>
          <li><a href="">サービス内容</a></li>
          <li><a href="">料金</a></li>
          <li><a href="">お問い合わせ</a></li>
          <li><a href="">受講生専用PAGE</a></li>
        </ul>
      </div>
    </section>
  );
}

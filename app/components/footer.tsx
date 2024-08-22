import styles from './footer.module.css'

export default function Footer() {
  return(
    <section className = {styles.footer}>
       <div >
        <ul className= {styles['footer-buttons']} >
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

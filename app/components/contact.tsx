import styles from './contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';



export default function Contact() {
  return(
    <section id='contact' className = {styles.contact} >
      <div className = {styles['contact-content']}>
        <div>
          <h2>お<span className = 'red-text'>問</span>い合わせ</h2>
        </div>
        <div>
          <p>
          サービスに関するお問い合わせは、お問い合わせフォーム、<br></br>
          X(旧twitter)またはInstagarmのDMにてお受け付けしております。
          </p>
        </div>
        <button className = 'red-button'>
          お問い合わせはこちら
        </button>
        <div className = {styles['contact-sns']}>
          <FontAwesomeIcon icon={faSquareInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
        </div>
      </div>
    </section>
  );
}

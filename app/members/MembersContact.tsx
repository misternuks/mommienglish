import styles from './MembersContact.module.css'

export default function MembersContact() {

  return (
    <div className={styles['members-contact-container']}>
      <div className={styles['members-contact-us']}>
        <h2 id="contact" className="members-header">contact</h2>
        <div className={styles['members-contact-text']}>
          <p>受講生の皆さまと一緒に<wbr />サービスを創り上げたいと思っています。</p>
          <p>レッスンや交流会、<wbr />ワークショップなどどんなことでも</p>
          <p>質問やご要望がありましたら<wbr />お気軽にお問い合わせください</p>
        </div>
        <button className="red-button">
          <a href="https://forms.gle/1Av7cpG1hpMKSNq27">お問い合わせはこちら
          </a>
        </button>
      </div>
      <div className={styles['members-contact-us']}>
      <h2 id="contact" className="members-header">1 on 1セッション予約</h2>
        <div className={styles['members-contact-text']}>
          <p>1 on 1 習慣化コーチング・1 on 1<wbr /> アウトプットセッションの</p>
          <p>予約はこちらからできます。</p>
          <p>※別サイトに移行します。</p>
        </div>
        <button className="red-button">
          <a href="https://app.spirinc.com/patterns/availability-sharing/9bCh-7cwPGilEnrwby9Vz/confirm">
            予約する
          </a>
        </button>
      </div>
    </div>
  );
};

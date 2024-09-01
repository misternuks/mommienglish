import styles from './MembersCalendar.module.css'

export default function MembersCalendar() {

  return (
    <div className={styles['members-calendar-container']}>
      <h2 id="calendar" className="members-header">calendar</h2>
      <div className={styles['members-calendar']}>

      </div>
    </div>
  );
};

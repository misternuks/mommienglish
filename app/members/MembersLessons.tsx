import styles from './MembersLessons.module.css'
import Image from 'next/image';

export default function MembersLessons() {

  const thumbnailText = "The first lesson is coming soon! Stay tuned!";
  return (
    <div className={styles['members-lessons-container']}>
      <div className={styles['members-new-lessons-container']}>
        <h2 id="lessons" className="members-header">new lessons</h2>
        <div className={styles['members-new-lessons']}>
          <div className={styles['members-new-lesson-thumbnail']}>
            <Image
              src="/images/members_video_thumb_01.webp"
              alt="mother talking to children"
              width={200}
              height={200}
            />
            <p>
              {thumbnailText}
            </p>
          </div>
          <div className={styles['members-new-lesson-thumbnail']}>
            <Image
              src="/images/members_video_thumb_02.webp"
              alt="mother talking to children"
              width={200}
              height={200}
            />
            <p>
              {thumbnailText}
            </p>
          </div>
          <div className={styles['members-new-lesson-thumbnail']}>
            <Image
              src="/images/members_video_thumb_03.webp"
              alt="mother talking to children"
              width={200}
              height={200}
            />
            <p>
              {thumbnailText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

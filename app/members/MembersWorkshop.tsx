import styles from './MembersWorkshop.module.css'
import Image from 'next/image';

export default function MembersWorkshop() {

  const thumbnailText = "The first workshop is coming soon! Stay tuned!";
  return (
    <div className={styles['members-workshop-container']}>
      <div className={styles['members-new-workshop-container']}>
        <h2 id="workshop" className="members-header">workshop</h2>
        <div className={styles['members-new-workshop']}>
          <div className={styles['members-new-workshop-thumbnail']}>
            <Image
              src="/images/members_workshop_thumb_01.webp"
              alt="mother talking to children"
              width={200}
              height={200}
            />
            <p>
              {thumbnailText}
            </p>
          </div>
          <div className={styles['members-new-workshop-thumbnail']}>
            <Image
              src="/images/members_workshop_thumb_02.webp"
              alt="mother talking to children"
              width={200}
              height={200}
            />
            <p>
              {thumbnailText}
            </p>
          </div>
          <div className={styles['members-new-workshop-thumbnail']}>
            <Image
              src="/images/members_workshop_thumb_03.webp"
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

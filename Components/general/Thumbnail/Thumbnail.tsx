import React from 'react';
import styles from './Thumbnail.module.css';
import Link from 'next/link';

interface ThumbnailProps {

  title: string;
  description: string;
  linkUrl: string;
  imageUrl?: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ title, description, linkUrl = '/', imageUrl }) => {
  return (
    <div className={styles["thumbnail-card"]}>
      <Link href={linkUrl}>
        <div className=''>
          {imageUrl &&
            <img src={imageUrl} alt={title} />}
          <div className={styles["thumbnail-card-content"]}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;

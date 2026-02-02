import Image from 'next/image';
import styles from './RecommendationCard.module.css';

interface RecommendationCardProps {
  name: string;
  company: string;
  title: string;
  recommendation: string;
  imageSrc?: string;
  imageAlt?: string;
}

const RecommendationCard = ({
  name,
  company,
  title,
  recommendation,
  imageSrc,
  imageAlt,
}: RecommendationCardProps) => {
  return (
    <div className={styles.card}>
      {imageSrc ? (
        <div className={styles.sticker}>
          <Image
            src={imageSrc}
            alt={imageAlt ?? `${name} recommendation highlight`}
            fill
            sizes="72px"
            className={styles.stickerImage}
          />
        </div>
      ) : null}
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.company}>{company}</p>
        <p className={styles.title}>{title}</p>
      </div>
      <p className={styles.recommendation}>{recommendation}</p>
    </div>
  );
};

export default RecommendationCard;

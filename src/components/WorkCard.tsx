import Image from 'next/image';
import styles from './WorkCard.module.css';

type WorkCardProps = {
  tech: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  reverse?: boolean;
  visible?: boolean;
  className?: string;
};

const WorkCard = ({
  tech,
  title,
  description,
  imageSrc,
  imageAlt,
  priority = false,
  reverse = false,
  visible = false,
  className = '',
}: WorkCardProps) => {
  return (
    <article
      className={`${styles.card} ${reverse ? styles.cardReverse : ''} ${
        visible ? styles.cardVisible : ''
      } ${className}`}
    >
      <div className={styles.content}>
        <span className={styles.label}>{tech}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.frame}>
        <Image
          className={styles.image}
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1000px) 100vw, 1000px"
          quality={90}
          priority={priority}
        />
      </div>
    </article>
  );
};

export default WorkCard;

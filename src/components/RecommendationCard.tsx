import styles from './RecommendationCard.module.css';

interface RecommendationCardProps {
  name: string;
  company: string;
  title: string;
  recommendation: string;
}

const RecommendationCard = ({ name, company, title, recommendation }: RecommendationCardProps) => {
  return (
    <div className={styles.card}>
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

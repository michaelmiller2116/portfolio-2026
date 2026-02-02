import styles from './ExperienceCard.module.css';

export interface Experience {
  role: string;
  company: string;
  employmentType?: string;
  dateRange: string;
  location?: string;
  workMode?: string;
  highlights?: string[];
  summary?: string;
}

interface ExperienceCardProps {
  exp: Experience;
}

const ExperienceCard = ({ exp }: ExperienceCardProps) => {
  const { role, company, employmentType, dateRange, location, workMode, highlights, summary } = exp;
  const roleDetails = [employmentType, location, workMode].filter(Boolean);

  return (
    <div className={styles.card}>
      <p className={styles.company}>{company}</p>
      <h3 className={styles.title}>{role}</h3>
      <div className={styles.role}>
        <p className={styles.date}>{dateRange}</p>
        {roleDetails.length > 0 ? (
          <p className={styles.roleLine}>{roleDetails.join(' · ')}</p>
        ) : null}
      </div>

      {highlights && highlights.length > 0 ? (
        <ul className={styles.highlights}>
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {summary ? <p className={styles.description}>{summary}</p> : null}
    </div>
  );
};

export default ExperienceCard;

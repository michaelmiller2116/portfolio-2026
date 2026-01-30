import Image from 'next/image';
import styles from './about.module.css';

const AboutPage = () => {
  const email = 'mike@example.com';
  const emailSubject = encodeURIComponent("Let's build something delightfully weird");
  const linkedInHandle = '@webdevelmike';
  const linkedInUrl = 'https://www.linkedin.com/in/webdevelmike';
  const twitterHandle = '@yourhandle';
  const twitterUrl = 'https://twitter.com/yourhandle';

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>About</p>
          <h1>Design-obsessed frontend engineer who ships fast.</h1>
          <p className={styles.subhead}>
            I build interfaces that feel crisp, human, and inevitable. If you want
            thoughtful UX with clean, resilient code, we should probably talk.
          </p>
        </div>
        <div className={styles.heroMedia}>
          <Image
            src="/about-hero.svg"
            alt="Abstract landscape with layered gradients"
            className={styles.heroImage}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
          />
        </div>
      </section>

      <section className={styles.actions}>
        <a
          className={styles.actionCard}
          href={`mailto:${email}?subject=${emailSubject}`}
        >
          <div className={styles.actionTitle}>Hire me</div>
          <div className={styles.actionMeta}>{email}</div>
          <div className={styles.actionHint}>Send a note. I reply quickly.</div>
        </a>
        <a
          className={styles.actionCard}
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.actionTitle}>LinkedIn</div>
          <div className={styles.actionMeta}>{linkedInHandle}</div>
          <div className={styles.actionHint}>Let's connect professionally.</div>
        </a>
        <a
          className={styles.actionCard}
          href={twitterUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.actionTitle}>Twitter</div>
          <div className={styles.actionMeta}>{twitterHandle}</div>
          <div className={styles.actionHint}>Find me on the bird app.</div>
        </a>
      </section>
    </div>
  );
};

export default AboutPage;

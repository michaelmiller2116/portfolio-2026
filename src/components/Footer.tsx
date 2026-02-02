import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCard}>
          <div className={styles.avatarWrap}>
            <Image
              src="/mike-work.jpeg"
              alt="Mike Miller"
              width={44}
              height={44}
              className={styles.avatar}
            />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Mike Miller</span>
            <span className={styles.brandRole}>Senior Frontend Engineer</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          <Link className={styles.navLink} href="/#work">
            Work
          </Link>
          <Link className={styles.navLink} href="/about">
            About
          </Link>
          <Link className={styles.navLink} href="/recommendations">
            Recommendations
          </Link>
          <Link
            className={styles.navLink}
            href="mailto:please.respond.mike@gmail.com?subject=New%20Message%20from%20Your%20Future%20Best%20Client"
          >
            Contact
          </Link>
        </nav>

        <div className={styles.socials}>
          <Link
            className={styles.socialButton}
            href="https://x.com/mikemiller2116"
            aria-label="X"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" className={styles.socialIcon}>
              <path
                d="M5 4.5h4.1l3.2 4.3 3.7-4.3H19l-4.9 5.6L19 19.5h-4.1l-3.6-4.7-4.2 4.7H5l5.5-6.2L5 4.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            className={styles.socialButton}
            href="https://www.linkedin.com/in/webdevelmike"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" className={styles.socialIcon}>
              <path
                d="M6.5 9.5v8.5M6.5 6.5v.2M10.5 9.5h3.1a3.4 3.4 0 0 1 3.4 3.4V18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M10.5 18v-5.4a3.1 3.1 0 0 1 3.1-3.1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

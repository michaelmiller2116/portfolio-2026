import Image from 'next/image';
import styles from './about.module.css';
import ScrollImageTrack from './ScrollImageTrack';

const AboutPage = () => {
  const funFacts = [
    {
      label: 'Favorite Book',
      title: 'Dune',
      subtitle: 'Frank Herbert',
      image: '/dune.jpg',
      imageAlt: 'Dune book cover',
    },
    {
      label: 'Favorite Podcast',
      title: 'Syntax FM',
      subtitle: 'Wes Bos & Scott Tolinski',
      image: '/syntax.jpg',
      imageAlt: 'Syntax FM podcast cover',
    },
    {
      label: 'Favorite Movie',
      title: 'Fight Club',
      subtitle: 'David Fincher',
      image: '/fight-club.jpg',
      imageAlt: 'Fight Club movie poster',
    },
    {
      label: 'Active Hobby',
      title: 'Bonsai',
      subtitle: 'Small tree, big patience',
      image: '/bonsai.jpeg',
      imageAlt: 'Bonsai tree',
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.aboutHeader}>
        <section className={styles.aboutHeaderText}>
          <h1 className="section-heading">About</h1>
          <div>
            <p>
              I&apos;m a frontend engineer who enjoys turning complex problems into interfaces that
              feel simple, fast, and reliable, basically the digital version of getting three kids
              out the door on time.
            </p>
            <p>
              I&apos;ve worked across startups and larger organizations, learning when to move
              quickly and when to slow down and build things to last (kind of like bedtime routines
              vs. weekend pancake experiments).
            </p>
            <p>
              My path includes Galvanize, an early startup role at Manatee, a fast-moving skunkworks
              team at Seaspan in Denver, and more recently ClickBank, where I focused on building
              frontend systems that hold up in production. Outside of work, I&apos;m a dad to three
              girls, a husband, and a lifelong tinkerer, usually bouncing between IoT projects, 3D
              printing, and trying to keep bonsai trees (and my coffee) alive.
            </p>
          </div>
        </section>
        <div className={styles.aboutHeaderMedia}>
          <Image
            src="/linkedIn-profile-dev.png"
            alt="Mike profile"
            width={760}
            height={900}
            className={styles.aboutHeaderImage}
            priority
          />
        </div>
      </div>
      <section id="fun-facts" className={styles.funFacts}>
        <div className={styles.funFactsHeader}>
          <div>
            <h2 className="section-heading">Fun Facts</h2>
            <p className={styles.funFactsUpdated}>Updated Feb 1, 2026</p>
          </div>
        </div>
        <div className={styles.funFactsGrid}>
          {funFacts.map((fact) => (
            <article key={fact.label} className={styles.funFactCard}>
              <div className={styles.funFactMedia}>
                <span className={styles.funFactPill}>{fact.label}</span>
                <Image
                  src={fact.image}
                  alt={fact.imageAlt}
                  width={520}
                  height={340}
                  className={styles.funFactImage}
                />
              </div>
              <div className={styles.funFactContent}>
                <h3 className={styles.funFactHeading}>{fact.title}</h3>
                <p className={styles.funFactSubheading}>{fact.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ScrollImageTrack />
    </div>
  );
};

export default AboutPage;

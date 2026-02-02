import styles from './page.module.css';
import RecommendationCard from '../../components/RecommendationCard';

const RecommendationsPage = () => {
  const recommendations = [
    {
      name: 'Becca Owens',
      company: 'ClickBank',
      title: 'Senior Frontend Developer',
      imageSrc: '/Becca.jpeg',
      imageAlt: 'Wildflowers',
      recommendation:
        "If you're looking for an engineer who will deliver the requirements and do exactly what is asked of them, you're looking in the wrong place. Mike will deliver the requirements and more, and he'll do it while throwing out new ideas and stunning you with hilarity along the way. To say he's creative is an insult to the word. If you don't like to laugh, don't talk to him. If you want the bare minimum done with no new ideas or suggestions for innovation, look elsewhere. Mike will show up with guns blazing and keyboard smoking. Get in line, cuz he's a hot commodity.",
    },
    {
      name: 'Jason Scherer',
      company: 'ClickBank',
      imageSrc: '/Jason.jpeg',
      title: 'CTO',
      recommendation:
        "Mike is an exceptionally talented engineer who excels across the entire front-end spectrum. He has a rare gift for building applications that are not only performant and scalable but also visually polished and intuitive for the end-user. What sets Mike apart is his ability to rapidly grasp complex product domains and technical challenges; his speed of execution never comes at the expense of quality. During his time here, Mike was a cornerstone of several highly visible, mission-critical client products. Beyond his technical prowess, he is a fantastic collaborator and teammate who actively contributes product recommendations and listens intently to feedback. He doesn't just push for completion—he pushes for excellence. I highly recommend Mike to any team looking for a high-output engineer who truly cares about building world-class products.",
    },
    {
      name: 'Chris Victory',
      company: 'ClickBank',
      imageSrc: '/Victory.jpeg',
      title: 'Directory of Software Engineering',
      recommendation:
        "Mike is exceptional at React development and Micro Front End Architecture. His technical expertise is matched by his ability to collaborate and build solid relationships across teams. I've seen firsthand how Mike balances technical excellence with interpersonal effectiveness, making him a valuable asset to any organization.",
    },
    {
      name: 'Andrew Dewar',
      company: 'Microsoft',
      imageSrc: '/Andrew.jpeg',
      title: 'Sarcastically Serious Software Engineer 🤣',
      recommendation:
        "I worked with Mike briefly while I was in an advisory role, and he's a rare combo: genuinely good human + excellent front-end dev. He communicates clearly, ships clean UI, and somehow makes the workday more interesting. Instant hire. Much good. Very recommend.",
    },
    {
      name: 'Benjamin Texier',
      company: 'ClickBank',
      imageSrc: '/Ben.jpeg',
      title: 'Principal Software Engineer',
      recommendation:
        'Mike was a key person in migrating our highly customizable eCommerce checkout page with high traffic, from a monolithic architecture to modern React application. He has a rare ability to grasp complex business logic while ensuring that critical features remain the top priority. Beyond his technical expertise, Mike is a fantastic person to work with. His positive attitude and collaborative spirit bring a great energy to the team. I would welcome the chance to work with him again and highly recommend him as a valuable asset to any organization.',
    },
    {
      name: 'Ashley Young',
      company: 'ClickBank',
      imageSrc: '/Ashley.jpeg',
      title: 'Principal Product Manager',
      recommendation:
        "Mike is the epitome of a great teammate. He brings positive energy and consistent enthusiasm to every project in a way that feels genuine and authentic. He has a positive impact on every team he works with, elevating the dynamic and uplifting those around him without even trying. That authenticity shows up in other important ways. Mike isn't afraid to ask thoughtful questions or call out gaps and issues when he sees them, always with the goal of improving the work and the end result. As a product manager, one of the qualities I value most about Mike is how collaborative he is. There have been countless times when another teammate or I brought him designs or usability concerns, and he worked closely with us to find solutions that were easier to implement while still fully addressing user needs. He helps teams move faster, brings no ego into the process, and is always willing to revisit or improve work he's already built to create a truly delightful experience. His investment in the quality of the end product is genuine. Mike is a strong advocate for user experience, thoughtful design systems, and development processes that enable teams to build and test quickly while still achieving excellent results. If you're looking for a collaborative front-end engineer who is deeply invested in building the best possible product for users, you don't need to look any further than Mike.",
    },
    {
      name: 'Ed Reeseg',
      company: 'Clickbank',
      imageSrc: '/Ed.jpeg',
      title: 'Senior Software Engineer',
      recommendation:
        "There is very little I can say about Mike that won't become apparent within moments of meeting him. He is an adept, creative engineer - capable of overcoming Herculean tasks with unreasonable regularity. He's both an expert in a variety of full-stack solutions, as well as a pleasant and reliable teammate. His steadfast dedication to quality and willingness to rise to any challenge have been more of a boon than I could ever properly put to words. I cannot recommend Mike highly enough.",
    },

    {
      name: 'Armando Cervantez',
      company: 'Clickbank',
      imageSrc: '/Armando.jpeg',
      title: 'Senior Product Designer',
      recommendation:
        "Mike is one of those rare senior front-end engineers who can truly make anything feel feasible. He has a strong eye for design and a deep understanding of the user journey, consistently building experiences that balance technical excellence with real user needs. What sets Mike apart is his collaborative, approachable style. He explains complex technical concepts clearly and thoughtfully, making cross-functional work with design, PMs, and engineers incredibly smooth. He's professional, consistent, and someone you can always rely on. On top of that, Mike brings incredible energy to the team. He's fun to work with, lifts those around him, and is often the heartbeat of the group — all while maintaining a high bar for quality and professionalism. I'd enjoy working with him again, but any team would be lucky to have him.",
    },

    {
      name: 'Nate Reed',
      company: 'ClickBank',
      imageSrc: '/Nate.jpeg',
      title: 'Engineering Software Engineer',
      recommendation:
        "I worked with Mike to on a new version of our offer information UI at ClickBank. Mike demonstrated front-development expertise and modern best practices in React and Typescript, as well as strong overall software engineering practices (testing, maintainability, clean code, etc). I relied on him as well for help with the backend, a Node.js + Express service deployed as a Docker container on Kubernetes. His code reviews resulted in a more maintainable and better quality solution and helped fill in the gaps in my knowledge. He's thoughtful, pragmatic and provides constructive feedback. I'll also miss his sense of humor!",
    },

    {
      name: 'Adam Hinckley',
      company: 'ClickBank',
      imageSrc: '/Adam.jpeg',
      title: 'Senior Software Engineer',
      recommendation:
        "Mike is a pleasure to work with. Not only is he a talented engineer that gives thoughtful feedback in code reviews, he's just fun to communicate with. He cares deeply about making sure the products he works on are top tier and have comprehensive test coverage. He would be an amazing asset for any company that is a mix of being incredibly like-able, people focused, and has serious technical ability.",
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className="section-heading">Recommendations</h1>
          <p className={styles.subtitle}>
            Notes from teammates, leaders, and collaborators I&apos;ve worked with.
          </p>
        </div>
        <div className={styles.recommendationsGrid}>
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={index}
              name={rec.name}
              company={rec.company}
              title={rec.title}
              recommendation={rec.recommendation}
              imageSrc={rec.imageSrc}
              imageAlt={rec.imageAlt}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecommendationsPage;

import React from 'react';
import { Link } from 'react-router-dom';  // Use Link for navigation to other pages
import styles from './LandingPage.module.css';  // Import the CSS module for styling

// Adjusted import paths to the correct filenames
import section1Image from '../images/section_1_image.webp';
import section2Image from '../images/section_2_image.webp';
import section3Image from '../images/section_3_image.webp';
import section4Image from '../images/section_4_image.webp';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      {/* Section 1: Welcome Message */}
      <section className={styles.section}>
        <img src={section1Image} alt="Online Safety" className={styles.sectionImage} />
        <div className={styles.sectionContent}>
          <h1>Welcome to SecureUs</h1>
          <p>Welcome to SecureUs, a comprehensive platform dedicated to empowering women with the knowledge and tools they need to stay safe online. We provide resources to help you understand the dangers of the digital world and teach you how to navigate it securely. Whether you are browsing social media, shopping online, or using apps, we ensure that you have the necessary skills to protect your personal information and privacy.
          </p>
        </div>
      </section>

      {/* Section 2: Learn from Interactive Videos */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2>Learn from Interactive Videos</h2>
          <p>
            These videos teach you about women's safe online interactions. We cover awareness videos that range from safe browsing to secure social media interaction. From the videos, women can learn about different types of threats they may encounter while interacting with online platforms or browsing the internet.
          </p>
          <Link to="/videos" className={styles.button}>Try It</Link>
        </div>
        <img src={section2Image} alt="Interactive Videos" className={styles.sectionImage} />
      </section>

      {/* Section 3: Quizzes */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2>Interactive Quizzes</h2>
          <p>
            Based on the videos, we have created quizzes that help assess the understanding of how secure a woman's behavior online is. The scores they get from taking the quiz indicate their level of knowledge on interacting with online platforms and browsing the internet, helping them assess their awareness of different online threats.
          </p>
          <Link to="/quiz" className={styles.button}>Take the Quiz</Link>
        </div>
        <img src={section3Image} alt="Quiz" className={styles.sectionImage} />
      </section>

      {/* Section 4: Discussion Forum */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2>Discussion Forum</h2>
          <p>
            Most women face similar types of cyber risks. Sharing experiences on this platform helps alert others. Here, women can discuss and learn from each other. This feature combines the latest news and articles, which inform and discuss recent or most occurring cyber attacks. Women can post their experiences after approval from the admin, making the platform a safe space for learning and awareness.
          </p>
          <Link to="/forum" className={styles.button}>Join the Discussion</Link>
        </div>
        <img src={section4Image} alt="Forum" className={styles.sectionImage} />
      </section>
    </div>
  );
};

export default LandingPage;

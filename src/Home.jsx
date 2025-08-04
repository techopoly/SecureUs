import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.brandName}>SecureUs</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Empowering Women in Cybersecurity Through Education and Community
          </p>
          <p className={styles.heroDescription}>
            Join a supportive community of women learning cybersecurity fundamentals. 
            Build your knowledge, test your skills, and connect with like-minded professionals 
            in a safe, encouraging environment.
          </p>
          <Link to="/video" className={styles.ctaButton}>
            Start Learning Today
          </Link>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.securityIcon}>🔒</div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            **SecureUs** is dedicated to closing the gender gap in cybersecurity by providing 
            women with accessible, comprehensive, and engaging cybersecurity education. We believe 
            that cybersecurity knowledge should be available to everyone, and we're committed to 
            creating a welcoming space where women can learn, grow, and thrive in the digital world.
          </p>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>65%</div>
              <div className={styles.statLabel}>Women are Vulnerable</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>68%</div>
              <div className={styles.statLabel}>Women Use Smartphone</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>40%</div>
              <div className={styles.statLabel}>Gender Gap in Mobile Internet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className={styles.componentsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Explore Our Learning Platform</h2>
          
          <div className={styles.componentsGrid}>
            {/* Video Tutorials */}
            <div className={styles.componentCard}>
              <div className={styles.componentIcon}>📹</div>
              <h3 className={styles.componentTitle}>Video Tutorials</h3>
              <p className={styles.componentDescription}>
                Learn cybersecurity fundamentals through engaging video content organized by topic. 
                From social media security to network protection, our bite-sized tutorials make 
                complex concepts easy to understand.
              </p>
              <ul className={styles.featureList}>
                <li>Social Media Security Awareness</li>
                <li>Safe Browsing Practices</li>
                <li>Network Connection Security</li>
                <li>Interactive modal viewing experience</li>
              </ul>
              <Link to="/video" className={styles.componentButton}>
                Watch Videos
              </Link>
            </div>

            {/* Interactive Quizzes */}
            <div className={styles.componentCard}>
              <div className={styles.componentIcon}>🎯</div>
              <h3 className={styles.componentTitle}>Interactive Quizzes</h3>
              <p className={styles.componentDescription}>
                Test your knowledge and track your progress with our comprehensive quiz system. 
                Get instant feedback, monitor your scores, and identify areas for improvement.
              </p>
              <ul className={styles.featureList}>
                <li>10 specialized cybersecurity topics</li>
                <li>Real-time progress tracking</li>
                <li>Color-coded performance indicators</li>
                <li>Retake functionality for improvement</li>
              </ul>
              <Link to="/quiz" className={styles.componentButton}>
                Take Quiz
              </Link>
            </div>

            {/* Community Forum */}
            <div className={styles.componentCard}>
              <div className={styles.componentIcon}>💬</div>
              <h3 className={styles.componentTitle}>Community Forum</h3>
              <p className={styles.componentDescription}>
                Connect with fellow learners, ask questions, and share experiences in our 
                supportive community forum. Get help from peers and contribute to discussions 
                that matter to women in cybersecurity.
              </p>
              <ul className={styles.featureList}>
                <li>Peer-to-peer support system</li>
                <li>Expert-moderated discussions</li>
                <li>Topic-specific conversation threads</li>
                <li>Safe and inclusive environment</li>
              </ul>
              <Link to="/forum" className={styles.componentButton}>
                Join Forum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SecureUs */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose SecureUs?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>👩‍💻</div>
              <h4>Women-Focused Approach</h4>
              <p>Content and community designed specifically for women's learning styles and experiences</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>📚</div>
              <h4>Comprehensive Learning</h4>
              <p>From basics to advanced topics, covering all essential cybersecurity domains</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🤝</div>
              <h4>Supportive Community</h4>
              <p>Connect with mentors, peers, and industry professionals in a safe environment</p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>📊</div>
              <h4>Progress Tracking</h4>
              <p>Monitor your learning journey with detailed analytics and personalized feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaSectionTitle}>Ready to Secure Your Digital Future?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of women who are building their cybersecurity knowledge and advancing their careers.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/video" className={styles.primaryCta}>Start Learning</Link>
            <Link to="/quiz" className={styles.secondaryCta}>Test Your Knowledge</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';  // Use Link for navigation to other pages
import styles from './LandingPage.module.css';  // Import the CSS module for styling

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <h1>Welcome to SecureUs!</h1>
        <p>Your secure solution for online safety.</p>
      </header>
      
      <div className={styles.content}>
        <p>We're glad you're here! Get started by exploring our features:</p>
        
        <div className={styles.buttons}>
          <Link to="/videos" className={styles.button}>Videos</Link>
          <Link to="/quiz" className={styles.button}>Quiz</Link>
          <Link to="/forum" className={styles.button}>Forum</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

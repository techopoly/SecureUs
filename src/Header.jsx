import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';  // Import the CSS module

const Header = () => {
  return (
    <header className={styles.header}> {/* Apply header styles */}
      <div className={styles.logo}><Link className={styles.logo} to="/">SecureUs</Link></div> {/* Logo Text */}
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/" className={styles.navLink}>Video</Link></li> {/* Link to VideoList */}
          <li><Link to="/quiz" className={styles.navLink}>Quiz</Link></li>
          <li><Link to="/forum" className={styles.navLink}>Forum</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

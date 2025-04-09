import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import styles from './BackButton.module.css';  // Import the CSS module

const BackButton = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  // Function to navigate back
  const goBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <button onClick={goBack} className={styles.backButton}>
      <span className={styles.arrow}>&larr;</span> {/* Left arrow symbol */}
      Back
    </button>
  );
};

export default BackButton;

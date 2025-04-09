import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuizCard.module.css';

const QuizCard = ({ quiz, score, progress }) => {
  const progressColor = progress >= 80 ? '#4CAF50' : progress >= 50 ? '#FF9800' : '#F44336'; // Color spectrum

  return (
    <div className={styles.card}>
      <h3>{quiz.title}</h3>
      <p>Score: {score} / 10</p>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%`, backgroundColor: progressColor }}
        ></div>
      </div>
      <Link to={`/quiz/${quiz.id}`} className={styles.startButton}>Take Quiz</Link>
    </div>
  );
};

export default QuizCard;

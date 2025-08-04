import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuizCard.module.css';

const QuizCard = ({ quiz, score, progress }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#757575';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 60) return '#FF9800';
    if (progress >= 40) return '#2196F3';
    return '#F44336';
  };

  const getProgressText = (progress) => {
    if (progress === 0) return 'Not Started';
    if (progress === 100) return 'Completed';
    return 'In Progress';
  };

  return (
    <div className={styles.quizCard}>
      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <h3 className={styles.quizTitle}>{quiz.title}</h3>
          <span 
            className={styles.difficultyBadge}
            style={{ backgroundColor: getDifficultyColor(quiz.difficulty) }}
          >
            {quiz.difficulty}
          </span>
        </div>
        <div className={styles.quizMeta}>
          <span className={styles.questionCount}>📝 {quiz.questions} Questions</span>
          <span className={styles.estimatedTime}>⏱️ {quiz.estimatedTime}</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.quizDescription}>{quiz.description}</p>
        
        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>Progress</span>
            <span className={styles.progressText}>{getProgressText(progress)}</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ 
                width: `${progress}%`, 
                backgroundColor: getProgressColor(progress) 
              }}
            />
          </div>
          <div className={styles.progressPercentage}>{progress}%</div>
        </div>

        {score > 0 && (
          <div className={styles.scoreSection}>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreLabel}>Best Score:</span>
              <span className={styles.scoreValue}>{score}/{quiz.questions}</span>
              <span className={styles.scorePercentage}>({Math.round((score/quiz.questions) * 100)}%)</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <Link to={`/quiz/${quiz.id}`} className={styles.startButton}>
          {progress === 0 ? 'Start Quiz' : progress === 100 ? 'Retake Quiz' : 'Continue Quiz'}
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './QuizCard.module.css';

// const QuizCard = ({ quiz, score, progress }) => {
//   const progressColor = progress >= 80 ? '#4CAF50' : progress >= 50 ? '#FF9800' : '#F44336'; // Color spectrum

//   return (
//     <div className={styles.card}>
//       <h3>{quiz.title}</h3>
//       <p>Score: {score} / 10</p>
//       <div className={styles.progressContainer}>
//         <div
//           className={styles.progressBar}
//           style={{ width: `${progress}%`, backgroundColor: progressColor }}
//         ></div>
//       </div>
//       <Link to={`/quiz/${quiz.id}`} className={styles.startButton}>Take Quiz</Link>
//     </div>
//   );
// };

// export default QuizCard;

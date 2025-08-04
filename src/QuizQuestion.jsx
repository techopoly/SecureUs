import React from 'react';
import styles from './QuizQuestion.module.css';

const QuizQuestion = ({ question, selectedAnswer, onAnswerSelect }) => {
  const handleOptionClick = (option) => {
    onAnswerSelect(question.id, option);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <h3 className={styles.questionText}>{question.question}</h3>
      </div>
      
      <div className={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`${styles.optionButton} ${
              selectedAnswer === option ? styles.selected : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <span className={styles.optionLetter}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className={styles.optionText}>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;

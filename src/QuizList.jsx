import React, { useState } from 'react';
import QuizCard from './QuizCard';
import styles from './QuizList.module.css';

const QuizList = () => {
  const quizzes = [
    { id: 1, title: "General Knowledge", questions: 10 },
    { id: 2, title: "Math Quiz", questions: 10 },
    { id: 3, title: "Science Quiz", questions: 10 },
    { id: 4, title: "History Quiz", questions: 10 },
    { id: 5, title: "Geography Quiz", questions: 10 },
    { id: 6, title: "Literature Quiz", questions: 10 },
    { id: 7, title: "Music Quiz", questions: 10 },
    { id: 8, title: "Movies Quiz", questions: 10 },
    { id: 9, title: "Sports Quiz", questions: 10 },
    { id: 10, title: "Technology Quiz", questions: 10 }
  ];

  const [scores, setScores] = useState(new Array(quizzes.length).fill(0));
  const [progress, setProgress] = useState(new Array(quizzes.length).fill(0));

  return (
    <div className={styles.quizGrid}>
      {quizzes.map((quiz, index) => (
        <QuizCard 
          key={quiz.id}
          quiz={quiz}
          score={scores[index]} 
          progress={progress[index]} 
        />
      ))}
    </div>
  );
};

export default QuizList;

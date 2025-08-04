import React, { useState } from 'react';
import QuizCard from './QuizCard';
import styles from './QuizList.module.css';

const QuizList = () => {
  const quizzes = [
    { id: 1, title: "Password Security", questions: 10, description: "Learn best practices for creating and managing secure passwords", difficulty: "Beginner", estimatedTime: "15 min" },
    { id: 2, title: "Phishing & Social Engineering", questions: 10, description: "Identify and protect against phishing attacks and social engineering", difficulty: "Intermediate", estimatedTime: "20 min" },
    { id: 3, title: "Network Security Basics", questions: 10, description: "Fundamental concepts of network security and protection", difficulty: "Beginner", estimatedTime: "18 min" },
    { id: 4, title: "Malware & Ransomware", questions: 10, description: "Understanding different types of malware and prevention strategies", difficulty: "Intermediate", estimatedTime: "22 min" },
    { id: 5, title: "Data Privacy & Protection", questions: 10, description: "Personal data protection and privacy regulations", difficulty: "Beginner", estimatedTime: "16 min" },
    { id: 6, title: "Secure Web Browsing", questions: 10, description: "Safe browsing practices and browser security settings", difficulty: "Beginner", estimatedTime: "14 min" },
    { id: 7, title: "Mobile Security", questions: 10, description: "Securing smartphones and mobile applications", difficulty: "Intermediate", estimatedTime: "19 min" },
    { id: 8, title: "Incident Response", questions: 10, description: "How to respond to cybersecurity incidents effectively", difficulty: "Advanced", estimatedTime: "25 min" },
    { id: 9, title: "Cryptography Fundamentals", questions: 10, description: "Basic principles of encryption and cryptographic systems", difficulty: "Advanced", estimatedTime: "28 min" },
    { id: 10, title: "Workplace Security Policies", questions: 10, description: "Understanding and implementing workplace cybersecurity policies", difficulty: "Intermediate", estimatedTime: "20 min" }
  ];

  const [scores, setScores] = useState(new Array(quizzes.length).fill(0));
  const [progress, setProgress] = useState(new Array(quizzes.length).fill(0));

  return (
    <div className={styles.quizListContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Cybersecurity Quizzes</h1>
        <p className={styles.pageDescription}>
          Test your cybersecurity knowledge with our comprehensive quiz collection. 
          Each quiz is designed to reinforce key concepts and help you identify areas for improvement.
        </p>
      </div>
      
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
    </div>
  );
};

export default QuizList;



// import React, { useState } from 'react';
// import QuizCard from './QuizCard';
// import styles from './QuizList.module.css';

// const QuizList = () => {
//   const quizzes = [
//     { id: 1, title: "General Knowledge", questions: 10 },
//     { id: 2, title: "Math Quiz", questions: 10 },
//     { id: 3, title: "Science Quiz", questions: 10 },
//     { id: 4, title: "History Quiz", questions: 10 },
//     { id: 5, title: "Geography Quiz", questions: 10 },
//     { id: 6, title: "Literature Quiz", questions: 10 },
//     { id: 7, title: "Music Quiz", questions: 10 },
//     { id: 8, title: "Movies Quiz", questions: 10 },
//     { id: 9, title: "Sports Quiz", questions: 10 },
//     { id: 10, title: "Technology Quiz", questions: 10 }
//   ];

//   const [scores, setScores] = useState(new Array(quizzes.length).fill(0));
//   const [progress, setProgress] = useState(new Array(quizzes.length).fill(0));

//   return (
//     <div className={styles.quizGrid}>
//       {quizzes.map((quiz, index) => (
//         <QuizCard 
//           key={quiz.id}
//           quiz={quiz}
//           score={scores[index]} 
//           progress={progress[index]} 
//         />
//       ))}
//     </div>
//   );
// };

// export default QuizList;

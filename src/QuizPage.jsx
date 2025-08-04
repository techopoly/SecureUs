import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizQuestion from './QuizQuestion';
import BackButton from './BackButton';
import styles from './QuizPage.module.css';

const QuizPage = () => {
  const { quizId } = useParams();

  // Sample quiz data - you can replace this with dynamic data loading
  const quizData = {
    1: {
      title: "Password Security",
      description: "Test your knowledge of password security best practices",
      questions: [
        {
          id: 1,
          question: "What is the minimum recommended length for a strong password?",
          options: ["6 characters", "8 characters", "12 characters", "16 characters"],
          correct: "12 characters",
          explanation: "Security experts recommend at least 12 characters for strong passwords, with longer passwords being even more secure."
        },
        {
          id: 2,
          question: "Which of the following is the most secure way to store passwords?",
          options: ["Write them down on paper", "Use a password manager", "Save them in browser", "Memorize all passwords"],
          correct: "Use a password manager",
          explanation: "Password managers encrypt your passwords and generate strong, unique passwords for each account."
        },
        {
          id: 3,
          question: "What makes a password vulnerable to dictionary attacks?",
          options: ["Using common words", "Using numbers", "Using symbols", "Using uppercase letters"],
          correct: "Using common words",
          explanation: "Dictionary attacks try common words and phrases, making passwords with common words vulnerable."
        },
        {
          id: 4,
          question: "How often should you change your passwords?",
          options: ["Every 30 days", "Every 90 days", "Only when compromised", "Every year"],
          correct: "Only when compromised",
          explanation: "Modern security practices recommend changing passwords only when there's evidence of compromise, focusing instead on strong, unique passwords."
        },
        {
          id: 5,
          question: "What is two-factor authentication (2FA)?",
          options: ["Using two passwords", "Using password + security question", "Using password + second verification method", "Using biometrics only"],
          correct: "Using password + second verification method",
          explanation: "2FA adds an extra layer of security by requiring a second form of verification beyond just your password."
        }
      ]
    }
    // Add more quiz data for other IDs as needed
  };

  const quiz = quizData[quizId] || quizData[1]; // Fallback to first quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className={styles.quizContainer}>
        <BackButton />
        
        <div className={styles.resultsCard}>
          <div className={styles.resultsHeader}>
            <h2>Quiz Complete!</h2>
            <div className={styles.quizTitle}>{quiz.title}</div>
          </div>
          
          <div className={styles.scoreDisplay}>
            <div 
              className={styles.scoreCircle}
              style={{ borderColor: getScoreColor(percentage) }}
            >
              <span className={styles.scoreNumber}>{score}</span>
              <span className={styles.scoreTotal}>/{quiz.questions.length}</span>
            </div>
            <div className={styles.scoreText}>
              <div 
                className={styles.scorePercentage}
                style={{ color: getScoreColor(percentage) }}
              >
                {percentage}%
              </div>
              <div className={`${styles.scoreStatus} ${passed ? styles.passed : styles.failed}`}>
                {passed ? '🎉 Great Job!' : '📚 Keep Learning!'}
              </div>
            </div>
          </div>

          <div className={styles.resultsSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Questions Answered:</span>
              <span className={styles.summaryValue}>{quiz.questions.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Correct Answers:</span>
              <span className={styles.summaryValue}>{score}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Accuracy:</span>
              <span className={styles.summaryValue}>{percentage}%</span>
            </div>
          </div>

          <div className={styles.resultsActions}>
            <button onClick={resetQuiz} className={styles.retakeButton}>
              Retake Quiz
            </button>
            <BackButton className={styles.backToQuizzes} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <BackButton />
      
      <div className={styles.quizHeader}>
        <h1 className={styles.quizTitle}>{quiz.title}</h1>
        <p className={styles.quizDescription}>{quiz.description}</p>
        <div className={styles.progressIndicator}>
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <QuizQuestion
        question={quiz.questions[currentQuestion]}
        selectedAnswer={answers[quiz.questions[currentQuestion].id]}
        onAnswerSelect={handleAnswer}
      />

      <div className={styles.navigationButtons}>
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={styles.prevButton}
        >
          Previous
        </button>
        
        <button 
          onClick={handleNext}
          disabled={!answers[quiz.questions[currentQuestion].id]}
          className={styles.nextButton}
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;



// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './QuizPage.module.css'; // Import the CSS module
// import BackButton from './BackButton'; 

// const QuizPage = () => {
//   const { quizId } = useParams();

//   // Example 10 questions
//   const quiz = {
//     title: "General Knowledge",
//     questions: [
//       {
//         question: "What is the capital of France?",
//         options: ["Berlin", "Madrid", "Paris", "Rome"],
//         correct: "Paris"
//       },
//       {
//         question: "Which planet is known as the Red Planet?",
//         options: ["Earth", "Mars", "Jupiter", "Saturn"],
//         correct: "Mars"
//       },
//       {
//         question: "What is the largest ocean on Earth?",
//         options: ["Atlantic", "Indian", "Pacific", "Arctic"],
//         correct: "Pacific"
//       },
//       {
//         question: "What is the tallest mountain in the world?",
//         options: ["Mount Kilimanjaro", "Mount Everest", "K2", "Mount Fuji"],
//         correct: "Mount Everest"
//       },
//       {
//         question: "Who wrote the play 'Romeo and Juliet'?",
//         options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
//         correct: "Shakespeare"
//       },
//       {
//         question: "Which is the longest river in the world?",
//         options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
//         correct: "Amazon"
//       },
//       {
//         question: "What is the currency of Japan?",
//         options: ["Yuan", "Yen", "Won", "Ringgit"],
//         correct: "Yen"
//       },
//       {
//         question: "Which element has the chemical symbol 'O'?",
//         options: ["Oxygen", "Osmium", "Ozone", "Oxygenium"],
//         correct: "Oxygen"
//       },
//       {
//         question: "Which country is the largest by area?",
//         options: ["USA", "Canada", "Russia", "China"],
//         correct: "Russia"
//       },
//       {
//         question: "Who is known as the father of computers?",
//         options: ["Charles Babbage", "Alan Turing", "Thomas Edison", "Nikola Tesla"],
//         correct: "Charles Babbage"
//       }
//     ]
//   };

//   const [answers, setAnswers] = useState([]);
//   const [score, setScore] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleAnswer = (questionIndex, answer) => {
//     const newAnswers = [...answers];
//     newAnswers[questionIndex] = answer;
//     setAnswers(newAnswers);

//     if (answer === quiz.questions[questionIndex].correct) {
//       setScore(score + 1);
//     }
//   };

//   const handleSubmit = () => {
//     setIsSubmitted(true);
//   };

//   const handleRetake = () => {
//     setAnswers((existingAnswers) => []);
//     setScore(0);
//     setIsSubmitted(false);
//   };

//   // Calculate progress (percentage score)
//   const progress = (score / quiz.questions.length) * 100;

//   // Determine color spectrum for the progress bar (from red to green)
//   const getProgressBarColor = (progress) => {
//     if (progress <= 25) {
//       return `linear-gradient(to right, #ff0000 ${progress}%, #ff7f00 ${progress}%)`; // Red to Orange
//     } else if (progress <= 50) {
//       return `linear-gradient(to right, #ff7f00 ${progress}%, #ffff00 ${progress}%)`; // Orange to Yellow
//     } else if (progress <= 75) {
//       return `linear-gradient(to right, #ffff00 ${progress}%, #4caf50 ${progress}%)`; // Yellow to Green
//     } else {
//       return `linear-gradient(to right, #4caf50 ${progress}%, #008000 ${progress}%)`; // Green (dark)
//     }
//   };

//   return (
//     <div className={styles.quizPageContainer}>
//       <BackButton/>
//       <h3 className={styles.quizTitle}>{quiz.title}</h3>
//       <form>
//         {quiz.questions.map((question, index) => (
//           <div key={index} className={styles.questionContainer}>
//             <p className={styles.questionText}>
//               {index + 1}. {question.question}
//             </p>
//             {question.options.map((option, idx) => (
//               <label key={idx} className={styles.optionContainer}>
//                 <input
//                   type="radio"
//                   name={`question${index}`}
//                   value={option}
//                   onChange={() => handleAnswer(index, option)}
//                   disabled={isSubmitted} // Disable answers after submission
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         ))}
//         {!isSubmitted ? (
//           <button type="button" onClick={handleSubmit}>
//             Submit Quiz
//           </button>
//         ) : (
//           <>
//             <p className={styles.score}>Your Score: {score} / {quiz.questions.length}</p>
//             <div className={styles.progressBarContainer}>
//               <div
//                 className={styles.progressBar}
//                 style={{
//                   width: `${progress}%`,
//                   background: getProgressBarColor(progress)
//                 }}
//               ></div>
//             </div>
//             <button type="button" onClick={handleRetake} className={styles.retakeButton}>
//               Retake Quiz
//             </button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// };

// export default QuizPage;

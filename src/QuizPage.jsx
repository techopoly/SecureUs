import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './QuizPage.module.css'; // Import the CSS module
import BackButton from './BackButton'; 

const QuizPage = () => {
  const { quizId } = useParams();

  // Example 10 questions
  const quiz = {
    title: "General Knowledge",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correct: "Pacific"
      },
      {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Kilimanjaro", "Mount Everest", "K2", "Mount Fuji"],
        correct: "Mount Everest"
      },
      {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correct: "Shakespeare"
      },
      {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correct: "Amazon"
      },
      {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Yen", "Won", "Ringgit"],
        correct: "Yen"
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Osmium", "Ozone", "Oxygenium"],
        correct: "Oxygen"
      },
      {
        question: "Which country is the largest by area?",
        options: ["USA", "Canada", "Russia", "China"],
        correct: "Russia"
      },
      {
        question: "Who is known as the father of computers?",
        options: ["Charles Babbage", "Alan Turing", "Thomas Edison", "Nikola Tesla"],
        correct: "Charles Babbage"
      }
    ]
  };

  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);

    if (answer === quiz.questions[questionIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers((existingAnswers) => []);
    setScore(0);
    setIsSubmitted(false);
  };

  // Calculate progress (percentage score)
  const progress = (score / quiz.questions.length) * 100;

  // Determine color spectrum for the progress bar (from red to green)
  const getProgressBarColor = (progress) => {
    if (progress <= 25) {
      return `linear-gradient(to right, #ff0000 ${progress}%, #ff7f00 ${progress}%)`; // Red to Orange
    } else if (progress <= 50) {
      return `linear-gradient(to right, #ff7f00 ${progress}%, #ffff00 ${progress}%)`; // Orange to Yellow
    } else if (progress <= 75) {
      return `linear-gradient(to right, #ffff00 ${progress}%, #4caf50 ${progress}%)`; // Yellow to Green
    } else {
      return `linear-gradient(to right, #4caf50 ${progress}%, #008000 ${progress}%)`; // Green (dark)
    }
  };

  return (
    <div className={styles.quizPageContainer}>
      <BackButton/>
      <h3 className={styles.quizTitle}>{quiz.title}</h3>
      <form>
        {quiz.questions.map((question, index) => (
          <div key={index} className={styles.questionContainer}>
            <p className={styles.questionText}>
              {index + 1}. {question.question}
            </p>
            {question.options.map((option, idx) => (
              <label key={idx} className={styles.optionContainer}>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={option}
                  onChange={() => handleAnswer(index, option)}
                  disabled={isSubmitted} // Disable answers after submission
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        {!isSubmitted ? (
          <button type="button" onClick={handleSubmit}>
            Submit Quiz
          </button>
        ) : (
          <>
            <p className={styles.score}>Your Score: {score} / {quiz.questions.length}</p>
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${progress}%`,
                  background: getProgressBarColor(progress)
                }}
              ></div>
            </div>
            <button type="button" onClick={handleRetake} className={styles.retakeButton}>
              Retake Quiz
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default QuizPage;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import VideoList from './VideoList';
import Header from './Header';
import Quiz from './Quiz';
import Forum from './Forum';
import QuizPage from './QuizPage';
import Home from './Home';

createRoot(document.getElementById('root')).render(
  <Router basename="/SecureUs"> {/* Add the basename prop */}
    <div>
      <Header /> {/* Include header */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default page */}
        <Route path="/video" element={<VideoList />} /> {/* video page */}
        <Route path="/quiz" element={<Quiz />} /> {/* Quiz page */}
        <Route path="/forum" element={<Forum />} /> {/* Forum page */}
        <Route path="/quiz/:quizId" element={<QuizPage />} />
      </Routes>
    </div>
  </Router>
);

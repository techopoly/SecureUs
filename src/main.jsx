import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import VideoList from './VideoList';
import Header from './Header';
import Quiz from './Quiz';
import Forum from './Forum';
import QuizPage from './QuizPage';


createRoot(document.getElementById('root')).render(
     <Router>
      <div>
        <Header /> {/* Include header */}
        <Routes>
          <Route path="/" element={<VideoList />} /> {/* Default page */}
          <Route path="/quiz" element={<Quiz />} /> {/* Quiz page */}
          <Route path="/forum" element={<Forum />} /> {/* Forum page */}
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Routes>
      </div>
    </Router> 
)

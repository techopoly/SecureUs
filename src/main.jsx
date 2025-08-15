import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import './index.css';
import VideoList from './VideoList';
import Header from './Header';
import Quiz from './Quiz';
import Forum from './Forum';
import QuizPage from './QuizPage';
import Home from './Home';
import ProfilePage from './ProfilePage';
import AppointmentPage from './AppointmentPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router basename="/SecureUs">
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video" element={<VideoList />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/appointments" element={<AppointmentPage />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  </StrictMode>
);

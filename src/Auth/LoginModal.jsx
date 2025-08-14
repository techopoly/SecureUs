import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './LoginModal.module.css';

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login flow
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onSuccess && onSuccess();
          onClose();
        } else {
          setError(result.message);
        }
      } else {
        // Register flow
        const result = await register(formData.username, formData.email, formData.password);
        if (result.success) {
          setIsLogin(true);
          setError('');
          setFormData({ username: '', email: '', password: '' });
          // Show success message
          alert('Account created successfully! Please login.');
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }

    setIsLoading(false);
  };

  // Toggle between login and register
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', email: '', password: '' });
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isLogin ? 'Welcome Back!' : 'Join SecureUs'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          <p className={styles.modalSubtitle}>
            {isLogin 
              ? 'Please login to to continue activities' 
              : 'Create your account to join our community'
            }
          </p>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {/* Username field (only for register) */}
            {!isLogin && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Choose a username"
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password field */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="Enter your password"
                required
                minLength="6"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          {/* Toggle between login/register */}
          <div className={styles.toggleSection}>
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleMode}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

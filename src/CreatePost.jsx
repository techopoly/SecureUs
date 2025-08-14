import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import LoginModal from './Auth/LoginModal';
import styles from './CreatePost.module.css';

const CreatePost = ({ onPostCreated, showAsForm = false }) => {
  const { isAuthenticated, checkAuthStatus, isLoading, hasStoredToken } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isCreating, setIsCreating] = useState(showAsForm); // Start as form if showAsForm is true
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: 'General Discussion'
  });

  // Categories for the forum
  const categories = [
    'General Discussion',
    'Cybersecurity Incidents',
    'Security Best Practices',
    'Career Advice',
    'Tools & Resources',
    'Learning & Education',
    'Industry News'
  ];

  // Watch for authentication state changes after verification
  useEffect(() => {
    if (waitingForAuth) {
      if (isAuthenticated) {
        setWaitingForAuth(false);
        setShowLoginModal(false);
        setIsCreating(true);
      } else {
        setWaitingForAuth(false);
        setShowLoginModal(true);
      }
    }
  }, [isAuthenticated, waitingForAuth]);

  // Handle create post button click
  const handleCreatePostClick = async () => {
    if (!hasStoredToken()) {
      setShowLoginModal(true);
      return;
    }

    setWaitingForAuth(true);
    await checkAuthStatus();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      const result = await response.json();
      
      if (result.success) {
        setPostData({ title: '', content: '', category: 'General Discussion' });
        onPostCreated && onPostCreated(result.post);
        
        // Only close the form if it's not in permanent form mode
        if (!showAsForm) {
          setIsCreating(false);
        }
      } else {
        if (response.status === 401) {
          setShowLoginModal(true);
          setIsCreating(false);
        } else {
          alert('Failed to create post: ' + result.message);
        }
      }
    } catch (error) {
      console.error('Post creation error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel post creation
  const handleCancel = () => {
    if (showAsForm) {
      // Reset form but don't close it
      setPostData({ title: '', content: '', category: 'General Discussion' });
    } else {
      // Close the form
      setIsCreating(false);
      setPostData({ title: '', content: '', category: 'General Discussion' });
    }
  };

  // Close login modal when authentication succeeds
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsCreating(true);
  };

  return (
    <>
      <div className={styles.createPostContainer}>
        {!isCreating && !showAsForm ? (
          // Create Post Button (only show if not in form mode)
          <button 
            className={styles.createPostButton}
            onClick={handleCreatePostClick}
            disabled={waitingForAuth || isLoading}
          >
            <span className={styles.buttonIcon}>✍️</span>
            {waitingForAuth || isLoading 
              ? 'Verifying authentication...' 
              : "What's on your mind? Share with the community..."
            }
          </button>
        ) : (
          // Create Post Form
          <div className={styles.createPostForm}>
            <form onSubmit={handleSubmitPost}>
              {/* Category Selection */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Category</label>
                <select
                  name="category"
                  value={postData.category}
                  onChange={handleInputChange}
                  className={styles.selectField}
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Post Title */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={postData.title}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="What's your post about?"
                  required
                  maxLength="100"
                  disabled={isSubmitting}
                />
                <small className={styles.charCount}>
                  {postData.title.length}/100 characters
                </small>
              </div>

              {/* Post Content */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Content</label>
                <textarea
                  name="content"
                  value={postData.content}
                  onChange={handleInputChange}
                  className={styles.textareaField}
                  placeholder="Share your thoughts, experiences, or questions..."
                  rows="6"
                  required
                  maxLength="2000"
                  disabled={isSubmitting}
                />
                <small className={styles.charCount}>
                  {postData.content.length}/2000 characters
                </small>
              </div>

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                  disabled={isSubmitting}
                >
                  {showAsForm ? 'Clear' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting || !postData.title.trim() || !postData.content.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Posting...
                    </>
                  ) : (
                    'Post to Community'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Only show login modal if not in permanent form mode */}
      {!showAsForm && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default CreatePost;

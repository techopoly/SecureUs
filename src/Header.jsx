import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginModal from './Auth/LoginModal';
import styles from './Header.module.css';

const Header = () => {
  const { isAuthenticated, user, logout, hasStoredToken } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Add this

  // Handle login button click
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate('/profile'); // Use navigate instead of window.location.href
  };

  // Close user menu when clicking outside
  const handleUserMenuClick = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
  };

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Logo/Brand */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🔐</span>
            <span className={styles.logoText}>SecureUs</span>
          </Link>

          {/* Navigation Links */}
          <nav className={styles.navigation}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActiveRoute('/') ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/video" 
              className={`${styles.navLink} ${isActiveRoute('/video') ? styles.active : ''}`}
            >
              Videos
            </Link>
            <Link 
              to="/quiz" 
              className={`${styles.navLink} ${isActiveRoute('/quiz') ? styles.active : ''}`}
            >
              Quizzes
            </Link>
            <Link 
              to="/forum" 
              className={`${styles.navLink} ${isActiveRoute('/forum') ? styles.active : ''}`}
            >
              Forum
            </Link>
            <Link 
              to="/appointments" 
              className={`${styles.navLink} ${isActiveRoute('/appointments') ? styles.active : ''}`}
            >
              Appointments
            </Link>
          </nav>

          {/* Authentication Section */}
          <div className={styles.authSection}>
            {!isAuthenticated && !hasStoredToken() ? (
              // Login Button - Show when not authenticated
              <button 
                className={styles.loginButton}
                onClick={handleLoginClick}
              >
                <span className={styles.loginIcon}>👤</span>
                Login
              </button>
            ) : (
              // User Menu - Show when authenticated or has token
              <div className={styles.userMenu} onClick={() => setShowUserMenu(false)}>
                <button 
                  className={styles.userButton}
                  onClick={handleUserMenuClick}
                >
                  <span className={styles.userAvatar}>👩‍💻</span>
                  <span className={styles.userName}>
                    {user ? user.username : 'User'}
                  </span>
                  <span className={styles.dropdownIcon}>▼</span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <div className={styles.userInfoName}>
                        {user ? user.username : 'Loading...'}
                      </div>
                      <div className={styles.userInfoEmail}>
                        {user ? user.email : ''}
                      </div>
                    </div>
                    <hr className={styles.dropdownDivider} />
                    <button 
                      className={styles.dropdownItem}
                      onClick={handleProfileClick} // ✅ Fixed navigation
                    >
                      👤 My Profile
                    </button>
                    <button 
                      className={styles.dropdownItem}
                      onClick={() => alert('Settings feature coming soon!')}
                    >
                      ⚙️ Settings
                    </button>
                    <hr className={styles.dropdownDivider} />
                    <button 
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          // Optionally refresh auth status or redirect
        }}
      />
    </>
  );
};

export default Header;

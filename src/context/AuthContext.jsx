import React, { createContext, useContext, useState, useEffect } from 'react';


const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const AuthContext = createContext();


// Debug logs to check if it's working
console.log('API_BASE_URL:', API_BASE_URL);
console.log('import.meta.env:', import.meta.env);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // AUTO-VERIFY AUTHENTICATION ON APP STARTUP
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setIsLoading(false);
          setHasCheckedAuth(true);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('authToken');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('authToken');
        setUser(null);
      }
      
      setIsLoading(false);
      setHasCheckedAuth(true);
    };

    initializeAuth();
  }, []); // Run only once on app startup

  // Only check auth status when specifically requested
  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
      } else {
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('authToken');
      setUser(null);
    }
    
    setIsLoading(false);
  };

  // Quick check if user appears to be logged in (has token)
  const hasStoredToken = () => {
    return !!localStorage.getItem('authToken');
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      console.log(`sending request to: ${API_BASE_URL}`);
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        setHasCheckedAuth(true); // Mark as checked since we just logged in
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setHasCheckedAuth(false); // Reset so auth can be checked again later
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    checkAuthStatus,
    hasStoredToken: () => !!localStorage.getItem('authToken'),
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

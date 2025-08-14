// // API Configuration for SecureUs
// const API_CONFIG = {
//     development: 'http://localhost:5000',
//     production: 'https://secureus-backend.onrender.com'
//   };
  
//   // Determine current environment
//   const getEnvironment = () => {
//     // You can use different methods to determine environment
//     // Method 1: Based on hostname
//     if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//       return 'development';
//     }
    
//     // Method 2: Based on environment variable (if using .env)
//     // return process.env.NODE_ENV || 'development';
    
//     // Method 3: Based on URL
//     if (window.location.href.includes('github.io')) {
//       return 'production';
//     }
    
//     // Default to development
//     return 'development';
//   };
  
//   // Export the base URL based on current environment
//   export const API_BASE_URL = API_CONFIG[getEnvironment()];
  
//   // Export individual endpoints for better organization
//   export const API_ENDPOINTS = {
//     // Authentication endpoints
//     AUTH: {
//       LOGIN: `${API_BASE_URL}/api/auth/login`,
//       REGISTER: `${API_BASE_URL}/api/auth/register`,
//       VERIFY: `${API_BASE_URL}/api/auth/verify`,
//       UPDATE_PROFILE: `${API_BASE_URL}/api/auth/update-profile`
//     },
    
//     // Forum endpoints
//     FORUM: {
//       POSTS: `${API_BASE_URL}/api/forum/posts`,
//       MY_POSTS: `${API_BASE_URL}/api/forum/my-posts`,
//       CREATE_POST: `${API_BASE_URL}/api/forum/posts`,
//       UPDATE_POST: (id) => `${API_BASE_URL}/api/forum/posts/${id}`,
//       DELETE_POST: (id) => `${API_BASE_URL}/api/forum/posts/${id}`
//     },
    
//     // Appointment endpoints
//     APPOINTMENTS: {
//       BOOK: `${API_BASE_URL}/api/appointments`,
//       MY_APPOINTMENTS: `${API_BASE_URL}/api/appointments/my`
//     },
    
//     // Health check
//     HEALTH: `${API_BASE_URL}/api/health`
//   };
  
//   // Utility function for making API calls
//   export const apiCall = async (url, options = {}) => {
//     const defaultOptions = {
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers
//       }
//     };
  
//     // Add auth token if available
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       defaultOptions.headers.Authorization = `Bearer ${token}`;
//     }
  
//     try {
//       const response = await fetch(url, { ...defaultOptions, ...options });
      
//       // Check if response is ok
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('API call failed:', error);
//       throw error;
//     }
//   };
  
//   // Manual override function (for testing or manual switching)
//   export const setApiEnvironment = (env) => {
//     if (API_CONFIG[env]) {
//       // You could store this in localStorage for persistence
//       localStorage.setItem('forceApiEnvironment', env);
//       window.location.reload(); // Reload to apply changes
//     } else {
//       console.error('Invalid environment:', env);
//     }
//   };


//   // Add to your api.js file
// export const switchEnvironment = () => {
//     const current = getEnvironment();
//     const newEnv = current === 'development' ? 'production' : 'development';
//     localStorage.setItem('forceApiEnvironment', newEnv);
//     alert(`Switched to ${newEnv} environment. Page will reload.`);
//     window.location.reload();
//   };
  
  
//   export default API_BASE_URL;
  
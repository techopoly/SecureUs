import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    bio: ''
  });

  // Fetch user's posts when component loads
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserPosts();
      setEditFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || ''
      });
    }
  }, [isAuthenticated, user]);

  const fetchUserPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/forum/my-posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        setUserPosts(result.posts);
      } else {
        console.error('Failed to fetch user posts:', result.message);
        setUserPosts([]);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setUserPosts([]);
    }
    setIsLoadingPosts(false);
  };

  // Handle when a new post is created
  const handlePostCreated = (newPost) => {
    setUserPosts(prevPosts => [newPost, ...prevPosts]);
    setShowCreatePost(false);
    alert('🎉 Post created successfully!');
  };

  // Handle create post button click
  const handleCreatePostClick = () => {
    setShowCreatePost(true);
  };

  // Handle cancel creating post
  const handleCancelCreatePost = () => {
    setShowCreatePost(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Profile updated successfully!');
        setIsEditing(false);
        // Update user in context if needed
      } else {
        alert('Failed to update profile: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || ''
    });
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:5000/api/forum/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (result.success) {
          setUserPosts(userPosts.filter(post => post.id !== postId || post._id !== postId));
          alert('Post deleted successfully!');
        } else {
          alert('Failed to delete post: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    
    if (typeof timestamp === 'string') return timestamp;
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'just now';
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
      
      return date.toLocaleDateString();
    } catch (error) {
      return 'Unknown time';
    }
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.authRequired}>
        <div className={styles.authCard}>
          <div className={styles.authIcon}>🔒</div>
          <h2 className={styles.authTitle}>Authentication Required</h2>
          <p className={styles.authText}>
            Please log in to view your profile.
          </p>
          <Link to="/" className={styles.homeButton}>
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        
        {/* Profile Header Section */}
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <img 
                  src="https://randomuser.me/api/portraits/women/75.jpg" 
                  alt="Profile" 
                  className={styles.profileAvatar}
                />
                <div className={styles.avatarOverlay}>
                  <button className={styles.changeAvatarButton}>
                    📷
                  </button>
                </div>
              </div>
            </div>
            
            <div className={styles.userDetails}>
              {!isEditing ? (
                <div className={styles.userInfo}>
                  <h1 className={styles.userName}>{user?.username}</h1>
                  <p className={styles.userEmail}>{user?.email}</p>
                  <p className={styles.userBio}>
                    {user?.bio || "Passionate about cybersecurity and women empowerment in tech. Always learning and sharing knowledge!"}
                  </p>
                  <div className={styles.userStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{userPosts.length}</span>
                      <span className={styles.statLabel}>Posts</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>
                        {userPosts.reduce((total, post) => total + (post.likes || 0), 0)}
                      </span>
                      <span className={styles.statLabel}>Likes</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>
                        {userPosts.reduce((total, post) => total + (post.comments?.length || 0), 0)}
                      </span>
                      <span className={styles.statLabel}>Comments</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.editForm}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editFormData.username}
                      onChange={handleInputChange}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Bio</label>
                    <textarea
                      name="bio"
                      value={editFormData.bio}
                      onChange={handleInputChange}
                      className={styles.textareaField}
                      rows="3"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.profileActions}>
            {!isEditing ? (
              <>
                <button 
                  className={styles.editButton}
                  onClick={handleEditProfile}
                >
                  ✏️ Edit Profile
                </button>
                <button 
                  className={styles.logoutButton}
                  onClick={logout}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className={styles.saveButton}
                  onClick={handleSaveProfile}
                >
                  ✅ Save Changes
                </button>
                <button 
                  className={styles.cancelButton}
                  onClick={handleCancelEdit}
                >
                  ❌ Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className={styles.postsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>My Posts ({userPosts.length})</h2>
            {!showCreatePost && (
              <button 
                className={styles.createPostButton}
                onClick={handleCreatePostClick}
              >
                ✍️ Create New Post
              </button>
            )}
          </div>

          {/* Create Post Form */}
          {showCreatePost && (
            <div className={styles.createPostSection}>
              <div className={styles.createPostHeader}>
                <h3 className={styles.createPostTitle}>Create New Post</h3>
                <button 
                  className={styles.cancelCreateButton}
                  onClick={handleCancelCreatePost}
                >
                  ❌ Cancel
                </button>
              </div>
              <CreatePost 
            onPostCreated={handlePostCreated}
            showAsForm={true}  // This forces the form to show immediately
            />

            </div>
          )}

          {isLoadingPosts ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading your posts...</p>
            </div>
          ) : userPosts.length > 0 ? (
            <div className={styles.postsList}>
              {userPosts.map((post) => (
                <div key={post.id || post._id} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <div className={styles.postMeta}>
                      <span className={styles.categoryTag}>{post.category}</span>
                      <span className={styles.postTime}>
                        {formatTimestamp(post.timestamp || post.createdAt)}
                      </span>
                    </div>
                    <div className={styles.postActions}>
                      <button 
                        className={styles.editPostButton}
                        onClick={() => console.log('Edit post:', post.id || post._id)}
                        title="Edit post"
                      >
                        ✏️
                      </button>
                      <button 
                        className={styles.deletePostButton}
                        onClick={() => handleDeletePost(post.id || post._id)}
                        title="Delete post"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postContent}>
                    {post.content.length > 200 
                      ? `${post.content.substring(0, 200)}...` 
                      : post.content
                    }
                  </p>
                  
                  <div className={styles.postStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>👍</span>
                      <span className={styles.statValue}>{post.likes || 0}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>💬</span>
                      <span className={styles.statValue}>{post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noPosts}>
              <div className={styles.noPostsIcon}>📝</div>
              <h3 className={styles.noPostsTitle}>No posts yet</h3>
              <p className={styles.noPostsText}>
                You haven't created any posts yet. Share your knowledge and experiences with the community!
              </p>
              <button 
                className={styles.createFirstPostButton}
                onClick={handleCreatePostClick}
              >
                Create Your First Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

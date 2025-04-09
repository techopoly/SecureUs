import React, { useState } from 'react';
import PostModal from './PostModal';
import styles from './ForumPage.module.css';

// Dummy data for posts and comments
const postsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Post Title ${index + 1}`,
  content: `This is the content of post ${index + 1}.`,
  image: `https://fastly.picsum.photos/id/984/536/354.jpg?hmac=V1ZEeb4s8heIcZUiO6U-IFKBAqv_jxEtzCV1pBVi8RE`, // Some posts have images
  likes: 10,
  comments: Array.from({ length: 5 }, (_, commentIndex) => ({
    id: commentIndex + 1,
    user: `User ${commentIndex + 1}`,
    content: `This is comment ${commentIndex + 1} on post ${index + 1}`,
    replies: Array.from({ length: 2 }, (_, replyIndex) => ({
      id: replyIndex + 1,
      user: `Reply User ${replyIndex + 1}`,
      content: `This is a reply to comment ${commentIndex + 1}`
    }))
  }))
}));

const ForumPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(postsData);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div className={styles.forumPage}>
      <h2 className={styles.pageTitle}>Forum</h2>

      {/* Display all posts */}
      <div className={styles.postList}>
        {posts.map((post) => (
          <div 
            key={post.id} 
            className={styles.postCard} 
            onClick={() => handlePostClick(post)}  // Make the entire post clickable
          >
            <div className={styles.postHeader}>
              <div className={styles.userInfo}>
                <img src="https://randomuser.me/api/portraits/women/56.jpg" alt="User" className={styles.userProfilePic} />
                <div className={styles.userDetails}>
                  <p className={styles.userName}>User Name</p>
                  <span className={styles.postTime}>3 hours ago</span>
                </div>
              </div>
              <button className={styles.postOptions}>...</button>
            </div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className={styles.postImage} />}
            <div className={styles.postActions}>
              <button className={styles.actionButton} onClick={()=>console.log('liked')}>Like</button>
              <button className={styles.actionButton}>Comment</button>
              <button className={styles.actionButton}>Share</button>
            </div>
            {/* Display first 3 comments */}
            <div className={styles.comments}>
              {post.comments.slice(0, 3).map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <strong>{comment.user}</strong>: {comment.content}
                </div>
              ))}
              {post.comments.length > 3 && <span className={styles.moreComments}>...</span>}
            </div>
            <button className={styles.moreButton}>More</button>
          </div>
        ))}
      </div>

      {/* Modal for the selected post */}
      {showModal && <PostModal post={selectedPost} onClose={handleModalClose} />}
    </div>
  );
};

export default ForumPage;

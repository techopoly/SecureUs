import React, { useState } from 'react';
import styles from './PostModal.module.css';

const PostModal = ({ post, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: comments.length + 1,
      user: 'You',
      content: newComment,
      replies: []
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddComment();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className={styles.backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.postMeta}>
            <span className={styles.categoryTag}>{post.category}</span>
            <span className={styles.timestamp}>{post.timestamp}</span>
            <span className={styles.likes}>👍 {post.likes}</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className={styles.modalContent}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <div className={styles.authorInfo}>
            <img 
              src="https://randomuser.me/api/portraits/women/56.jpg" 
              alt="Author" 
              className={styles.authorAvatar} 
            />
            <span className={styles.authorName}>{post.user}</span>
          </div>
          
          <p className={styles.postContent}>{post.content}</p>
          
          {post.image && (
            <img src={post.image} alt="Post" className={styles.postImage} />
          )}
        </div>

        {/* Comments Section */}
        <div className={styles.commentsSection}>
          <h3 className={styles.commentsTitle}>
            Comments ({comments.length})
          </h3>
          
          {/* Add Comment */}
          <div className={styles.addCommentSection}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a comment... (Ctrl+Enter to post)"
              className={styles.commentTextarea}
            />
            <button 
              onClick={handleAddComment}
              className={styles.postCommentButton}
              disabled={!newComment.trim()}
            >
              Post Comment
            </button>
          </div>

          {/* Comments List */}
          <div className={styles.commentsList}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <strong className={styles.commentUser}>{comment.user}</strong>
                  <span className={styles.commentTime}>just now</span>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
              </div>
            ))}
            
            {comments.length === 0 && (
              <p className={styles.noComments}>
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;



// import React, { useState } from 'react';
// import styles from './PostModal.module.css';

// const PostModal = ({ post, onClose }) => {
//   const [newComment, setNewComment] = useState("");
//   const [replies, setReplies] = useState({});
//   const [replyText, setReplyText] = useState("");

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleReplyChange = (commentId, e) => {
//     setReplyText(e.target.value);
//     setReplies({ ...replies, [commentId]: e.target.value });
//   };

//   const handleCommentSubmit = () => {
//     if (newComment) {
//       alert(`Comment added: ${newComment}`);
//       setNewComment(""); // Clear input after submitting
//     }
//   };

//   const handleReplySubmit = (commentId) => {
//     if (replies[commentId]) {
//       alert(`Reply added: ${replies[commentId]}`);
//       setReplyText(""); // Clear input after submitting
//     }
//   };

//   return (
//     <div className={styles.modalBackdrop} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <h3>{post.title}</h3>
//         <p>{post.content}</p>
//         {post.image && <img src={post.image} alt="Post" className={styles.modalImage} />}

//         <div className={styles.commentSection}>
//           <div className={styles.comments}>
//             {post.comments.map((comment) => (
//               <div key={comment.id} className={styles.comment}>
//                 <div className={styles.commentHeader}>
//                   <img 
//                     src="https://randomuser.me/api/portraits/women/56.jpg" 
//                     alt="User" 
//                     className={styles.commenterImage} 
//                   />
//                   <strong>{comment.user}</strong>
//                 </div>
//                 <p>{comment.content}</p>
//                 {/* Reply Button */}
//                 <button
//                   className={styles.replyButton}
//                   onClick={() => handleReplySubmit(comment.id)}
//                 >
//                   Reply
//                 </button>

//                 {/* Show Reply Input */}
//                 {replies[comment.id] && (
//                   <div className={styles.replyInput}>
//                     <textarea
//                       value={replies[comment.id]}
//                       onChange={(e) => handleReplyChange(comment.id, e)}
//                       placeholder="Add your reply"
//                     />
//                     <button onClick={() => handleReplySubmit(comment.id)}>Post Reply</button>
//                   </div>
//                 )}

//                 {/* Display Replies */}
//                 {comment.replies.map((reply) => (
//                   <div key={reply.id} className={styles.reply}>
//                     <strong>{reply.user}</strong>: {reply.content}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           <div className={styles.addComment}>
//             <textarea
//               value={newComment}
//               onChange={handleCommentChange}
//               placeholder="Add a comment"
//             />
//             <button onClick={handleCommentSubmit}>Post Comment</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostModal;

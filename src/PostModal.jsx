import React, { useState } from 'react';
import styles from './PostModal.module.css';

const PostModal = ({ post, onClose }) => {
  const [newComment, setNewComment] = useState("");
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleReplyChange = (commentId, e) => {
    setReplyText(e.target.value);
    setReplies({ ...replies, [commentId]: e.target.value });
  };

  const handleCommentSubmit = () => {
    if (newComment) {
      alert(`Comment added: ${newComment}`);
      setNewComment(""); // Clear input after submitting
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replies[commentId]) {
      alert(`Reply added: ${replies[commentId]}`);
      setReplyText(""); // Clear input after submitting
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className={styles.modalImage} />}

        <div className={styles.commentSection}>
          <div className={styles.comments}>
            {post.comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.commentHeader}>
                  <img 
                    src="https://randomuser.me/api/portraits/women/56.jpg" 
                    alt="User" 
                    className={styles.commenterImage} 
                  />
                  <strong>{comment.user}</strong>
                </div>
                <p>{comment.content}</p>
                {/* Reply Button */}
                <button
                  className={styles.replyButton}
                  onClick={() => handleReplySubmit(comment.id)}
                >
                  Reply
                </button>

                {/* Show Reply Input */}
                {replies[comment.id] && (
                  <div className={styles.replyInput}>
                    <textarea
                      value={replies[comment.id]}
                      onChange={(e) => handleReplyChange(comment.id, e)}
                      placeholder="Add your reply"
                    />
                    <button onClick={() => handleReplySubmit(comment.id)}>Post Reply</button>
                  </div>
                )}

                {/* Display Replies */}
                {comment.replies.map((reply) => (
                  <div key={reply.id} className={styles.reply}>
                    <strong>{reply.user}</strong>: {reply.content}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.addComment}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment"
            />
            <button onClick={handleCommentSubmit}>Post Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

import React, { useState, useEffect } from 'react';
import styles from './VideoComponent.module.css';

const VideoComponent = ({ videoUrl, description, duration, categoryGradient }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url.split('/').pop();
  };

  const videoId = extractVideoId(videoUrl);

  // Open modal
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Thumbnail handling
  const getThumbnailUrl = (quality = 'maxresdefault') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const handleThumbnailError = (e) => {
    const currentSrc = e.target.src;
    
    if (currentSrc.includes('maxresdefault')) {
      e.target.src = getThumbnailUrl('hqdefault');
    } else if (currentSrc.includes('hqdefault')) {
      e.target.src = getThumbnailUrl('mqdefault');
    } else if (currentSrc.includes('mqdefault')) {
      e.target.src = getThumbnailUrl('default');
    } else {
      setThumbnailError(true);
    }
  };

  return (
    <>
      {/* Video Card */}
      <div className={styles.videoContainer}>
        <div className={styles.videoCard} onClick={openModal}>
          {/* Thumbnail Container */}
          <div className={styles.thumbnailContainer}>
            {!thumbnailError ? (
              <img 
                className={styles.videoThumbnail}
                src={getThumbnailUrl('maxresdefault')}
                alt={description}
                onError={handleThumbnailError}
              />
            ) : (
              <div className={styles.thumbnailPlaceholder}>
                <div className={styles.placeholderIcon}>🎥</div>
                <div className={styles.placeholderText}>Video Preview</div>
              </div>
            )}
            
            {/* Play Button Overlay */}
            <div className={styles.playOverlay}>
              <div className={styles.playButton} style={{ background: categoryGradient }}>
                <span className={styles.playIcon}>▶</span>
              </div>
            </div>
            
            {/* Duration Badge */}
            <div className={styles.durationBadge}>{duration}</div>
          </div>

          {/* Video Info */}
          <div className={styles.videoInfo}>
            <h3 className={styles.videoTitle}>{description}</h3>
            <div className={styles.videoMeta}>
              <span className={styles.viewCount}>👁️ Learn Now</span>
              <span className={styles.videoDuration}>⏱️ {duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED Modal with Proper Controls */}
      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
          <div className={styles.modalContent}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{description}</h3>
              <button 
                className={styles.closeButton} 
                onClick={closeModal}
                aria-label="Close video"
              >
                ×
              </button>
            </div>

            {/*    // Updated iframe in your modal */}
         
<div className={styles.videoPlayerContainer}>
  <iframe
    className={styles.videoPlayer}
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0`}
    frameBorder="0"
    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    allowFullScreen
    title={description}
  />
</div>

          </div>
        </div>
      )}
    </>
  );
};

export default VideoComponent;

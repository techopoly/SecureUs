import React, { useState } from 'react';
import styles from './VideoComponent.module.css';

const VideoComponent = ({ videoUrl, description }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Extract video ID from URL
  const videoId = videoUrl.split('/').pop();

  // Open modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Close modal
  const closeModal = (e) => {
    if (e.target.id === "backdrop") {
      setModalOpen(false);
    }
  };

  return (
    <div className={styles.videoContainer}>
      {/* The div that will open the modal when clicked */}
      <div onClick={openModal} >
        <iframe 
          className={styles.video}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}  // Don't autoplay in the container
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Shorts"
        ></iframe>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>

      {/* Modal with Backdrop */}
      {isModalOpen && (
        <div
          id="backdrop"
          className={styles.backdrop}
          onClick={closeModal} // Close modal if clicked outside the video
        >
          <div className={styles.modal}>
            <iframe
              className={styles.modalVideo}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  // Autoplay in the modal
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Shorts"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;

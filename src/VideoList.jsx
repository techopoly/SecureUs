import React from 'react';
import VideoComponent from './VideoComponent';
import styles from './VideoComponent.module.css';

const VideoList = () => {
    console.log("VideoList Component Loaded");
  const categories = [
    {
      category: "Social Media Security Awareness",
      videos: [
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 1 ....' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 2' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 3' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 4' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 5' },
      ]
    },
    {
      category: "Safe Browsing Awareness",
      videos: [
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 6' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 7' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 8' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 9' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 10' },
      ]
    },
    {
      category: "Network Connection Security Awareness",
      videos: [
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 11' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 12' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 13' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 14' },
        { videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', description: 'Short 15' },
      ]
    },
  ];

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} className={styles.categoryContainer}>
            <div className={styles.categoryBackground}>
        <h2 className={styles.categoryTitle}>{category.category}</h2>
        {/* Added background color for the category */}
        
          <div className={styles.videoGrid}>
            {category.videos.map((video, idx) => (
              <VideoComponent
                key={idx}
                videoUrl={video.videoUrl}
                description={video.description}
              />
            ))}
          </div>
        </div>
      </div>
      
      ))}
    </div>
  );
};

export default VideoList;

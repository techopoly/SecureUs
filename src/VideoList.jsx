import React from 'react';
import VideoComponent from './VideoComponent';
import styles from './VideoComponent.module.css';

const VideoList = () => {
  console.log("VideoList Component Loaded");
  
  const categories = [
    {
      category: "Social Media Security Awareness",
      icon: "📱",
      description: "Master privacy settings and stay safe on social platforms",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      videos: [
        { 
          videoUrl: 'https://youtu.be/euC9_23rjrc?si=2R-Nvf8ANr_wr1mS', 
          description: 'Instagram Privacy Settings Every Woman Should Know',
          duration: '2:30'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'LinkedIn Safety Tips for Professional Women',
          duration: '3:15'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Facebook Security: Protecting Your Personal Data',
          duration: '2:45'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'TikTok Privacy Controls Made Simple',
          duration: '1:50'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Twitter/X Safety for Women in Tech',
          duration: '2:20'
        },
      ]
    },
    {
      category: "Safe Browsing Awareness",
      icon: "🌐",
      description: "Browse confidently with smart security practices",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      videos: [
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Spotting Fake Shopping Websites',
          duration: '3:00'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Browser Security Settings You Need',
          duration: '2:40'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Password Manager Setup Guide',
          duration: '4:20'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Recognizing Phishing Emails',
          duration: '2:55'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Safe Online Banking Practices',
          duration: '3:30'
        },
      ]
    },
    {
      category: "Network Connection Security",
      icon: "🔐",
      description: "Secure your connections at home and on-the-go",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      videos: [
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Public WiFi: What You Need to Know',
          duration: '2:15'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Home Router Security Setup',
          duration: '4:10'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'VPN Basics for Beginners',
          duration: '3:25'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Mobile Hotspot Security Tips',
          duration: '2:35'
        },
        { 
          videoUrl: 'https://www.youtube.com/shorts/Un9ZFoJ2vPE', 
          description: 'Securing Your Work-From-Home Setup',
          duration: '3:50'
        },
      ]
    },
  ];

  return (
    <div className={styles.videoListContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <span className={styles.titleIcon}>🎥</span>
          Video Learning Hub
        </h1>
        <p className={styles.pageSubtitle}>
          Learn cybersecurity with bite-sized, engaging videos designed for women
        </p>
      </div>

      {categories.map((category, index) => (
        <div key={index} className={styles.categorySection}>
          <div className={styles.categoryHeader} style={{ background: category.gradient }}>
            <div className={styles.categoryInfo}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              <div>
                <h2 className={styles.categoryTitle}>{category.category}</h2>
                <p className={styles.categoryDescription}>{category.description}</p>
              </div>
            </div>
            <div className={styles.videoCount}>
              {category.videos.length} Videos
            </div>
          </div>
          
          <div className={styles.videoGrid}>
            {category.videos.map((video, idx) => (
              <VideoComponent
                key={idx}
                videoUrl={video.videoUrl}
                description={video.description}
                duration={video.duration}
                categoryGradient={category.gradient}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;

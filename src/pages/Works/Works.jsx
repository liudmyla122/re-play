import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Works.module.css'
import PlayIcon from '/icons/play.svg'

// ✅ Используем импорты файлов для каждого видео
import video1 from '/videos/video-1.mp4'
import thumb1 from '/thumbnails/thumb1.jpg'
import video2 from '/videos/video-2.mp4'
import thumb2 from '/thumbnails/thumb2.jpg'
import video3 from '/videos/video-3.mp4'
import thumb3 from '/thumbnails/thumb3.jpg'
import video4 from '/videos/video-4.mp4'
import thumb4 from '/thumbnails/thumb4.jpg'
import video5 from '/videos/video-5.mp4'
import thumb5 from '/thumbnails/thumb5.jpg'
import video6 from '/videos/video-6.mp4'
import thumb6 from '/thumbnails/thumb6.jpg'
import video7 from '/videos/video-7.mp4'
import thumb7 from '/thumbnails/thumb7.jpg'
import video8 from '/videos/video-8.mp4'
import thumb8 from '/thumbnails/thumb8.jpg'
import video9 from '/videos/video-9.mp4'
import thumb9 from '/thumbnails/thumb9.jpg'

const initialProjects = [
  {
    id: 1,
    videoUrl: video1,
    thumbnailUrl: thumb1,
    title: 'Video 1',
  },
  {
    id: 2,
    videoUrl: video2,
    thumbnailUrl: thumb2,
    title: 'Video 2',
  },
  {
    id: 3,
    videoUrl: video3,
    thumbnailUrl: thumb3,
    title: 'Video 3',
  },
  {
    id: 4,
    videoUrl: video4,
    thumbnailUrl: thumb4,
    title: 'Video 4',
  },
  {
    id: 5,
    videoUrl: video5,
    thumbnailUrl: thumb5,
    title: 'Video 5',
  },
  {
    id: 6,
    videoUrl: video6,
    thumbnailUrl: thumb6,
    title: 'Video 6',
  },
  {
    id: 7,
    videoUrl: video7,
    thumbnailUrl: thumb7,
    title: 'Video 7',
  },
  {
    id: 8,
    videoUrl: video8,
    thumbnailUrl: thumb8,
    title: 'Video 8',
  },
  {
    id: 9,
    videoUrl: video9,
    thumbnailUrl: thumb9,
    title: 'Video 9',
  },
]

const Works = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [viewedVideos, setViewedVideos] = useState({})
  const [projects, setProjects] = useState(initialProjects)

  const openModal = (videoUrl, id) => {
    setCurrentVideo(videoUrl)
    setModalOpen(true)
    setViewedVideos((prev) => ({ ...prev, [id]: true }))
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentVideo(null)
    document.body.style.overflow = 'auto'
  }

  return (
    // ✅ Добавлен id="works"
    <section id="works" className={styles.works}>
      <div className={styles.grid}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={`${styles.projectItem} ${
              viewedVideos[project.id] ? styles.viewed : ''
            }`}
            onClick={() => openModal(project.videoUrl, project.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className={styles.projectThumbnail}
            />
            <div className={styles.playButton}>
              <img src={PlayIcon} alt="Play" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Контейнер для кнопки "Больше проектов" */}
      <div className={styles.loadMoreButtonContainer}>
        <motion.button
          className={styles.loadMoreButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          БОЛЬШЕ ПРОЕКТОВ
        </motion.button>
      </div>

      {modalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.closeButton} onClick={closeModal}>
              &times;
            </span>
            {currentVideo && (
              <video
                className={styles.videoPlayer}
                src={currentVideo}
                controls
                autoPlay
                loop
                muted
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Works

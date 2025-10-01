import React from 'react'
import { motion } from 'framer-motion'
// ✅ Используем Link из react-scroll
import { Link } from 'react-scroll'
import styles from './Hero.module.css'

// Импортируем иконки для социальных сетей.
import InstagramIcon from '/icons/instagram.svg'
import FacebookIcon from '/icons/facebook.svg'
import LinkedinIcon from '/icons/linkedin.svg'

const Hero = () => {
  // Варианты анимации для контейнера.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  }

  // Варианты анимации для каждого отдельного элемента.
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.section
      // ✅ Обязательно оставляем id для react-scroll
      id="home"
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Контейнер для видео и затемняющего слоя */}
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          src="/videos/Video-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {/* Контейнер для всего контента на экране */}
      <div className={styles.content}>
        {/* Заголовок 're.play' с анимацией */}
        <motion.h1 className={styles.logo} variants={itemVariants}>
          re.play
        </motion.h1>

        {/* Контейнер для текста и полосок */}
        <motion.div className={styles.textContainer} variants={itemVariants}>
          {/* Верхняя полоска */}
          <span className={styles.line}></span>
          {/* Обертка для текста "Истории на - re.play" */}
          <div className={styles.textWrapper}>
            <span className={styles.textMain}>Истории на -</span>
            <span className={styles.textReplay}>re.play</span>
          </div>
          {/* Нижняя полоска */}
          <span className={styles.line}></span>
        </motion.div>

        <motion.div variants={itemVariants}>
          {/* ✅ Теперь используем Link из react-scroll с атрибутами для скролла */}
          <Link
            to="kontakty"
            spy={true}
            smooth={true}
            duration={600}
            offset={-50}
            className={styles.ctaButton}
          >
            ОБСУДИМ ИДЕЮ
          </Link>
        </motion.div>

        {/* Иконки социальных сетей */}
        <motion.div className={styles.socialIcons} variants={itemVariants}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={InstagramIcon} alt="Instagram" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={FacebookIcon} alt="Facebook" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LinkedinIcon} alt="LinkedIn" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Hero

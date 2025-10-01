import React from 'react'
import styles from './Etapy.module.css'
import logo from '/icons/Logo.svg'

const Marquee = () => {
  const items = Array(20).fill(null) // Уменьшим количество для производительности

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeWrapper}>
        {/* Основной контент */}
        <div className={styles.marqueeContent}>
          {items.map((_, index) => (
            <React.Fragment key={index}>
              <span className={styles.marqueeItem}>re.play</span>
              <span className={styles.marqueeDot}></span>
              <img
                src={logo}
                alt="re.play logo"
                className={styles.marqueeLogo}
              />
              <span className={styles.marqueeDot}></span>
            </React.Fragment>
          ))}
        </div>

        {/* Дубликат для бесконечной анимации */}
        <div className={styles.marqueeContent} aria-hidden="true">
          {items.map((_, index) => (
            <React.Fragment key={index}>
              <span className={styles.marqueeItem}>re.play</span>
              <span className={styles.marqueeDot}></span>
              <img
                src={logo}
                alt="re.play logo"
                className={styles.marqueeLogo}
              />
              <span className={styles.marqueeDot}></span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Marquee

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Stoimost.module.css'
import YourLogo from '/icons/Logo-gros.svg'

const Stoimost = () => {
  return (
    <section id="stoimost" className={styles.stoimost}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Левая часть с заголовком */}
          <div className={styles.leftSide}>
            <div className={styles.underline}></div>
            <h2 className={styles.title}>Сколько стоит видео?</h2>
          </div>

          {/* Центральная часть с логотипом и линиями */}
          <div className={styles.centerSection}>
            <div className={styles.logoContainer}>
              <motion.div
                className={styles.animatedLogo}
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                {/* ⚠️ Используйте тег <img> для отображения SVG-файла */}
                <img src={YourLogo} alt="Логотип" className={styles.logoSvg} />
              </motion.div>
            </div>

            {/* Верхняя линия-капля */}
            <div className={styles.lineTop}></div>

            {/* Нижняя линия-капля */}
            <div className={styles.lineBottom}></div>
          </div>

          {/* Правая часть с текстом */}
          <div className={styles.rightSide}>
            <p className={styles.description}>
              Каждый проект уникален. Мы создаем индивидуальные видео, учитывая
              особенности каждого клиента. Точная цена определяется после
              изучения брифа и технического задания.
              <br />
              <br />
              На стоимость влияют такие факторы, как формат и продолжительность
              ролика, место съемок, необходимость написания сценария, выезд в
              другой город, подбор моделей и другие параметры.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stoimost

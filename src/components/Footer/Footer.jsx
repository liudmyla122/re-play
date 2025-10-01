// src/components/Footer/Footer.jsx

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Footer.module.css'

// ⚠️ ПУТИ К ИКОНКАМ: УКАЖИТЕ СВОИ ПУТИ!
// Я предполагаю, что они лежат в src/public/icons/
import FacebookIcon from '../../../public/icons/Facebook.svg'
import InstagramIcon from '../../../public/icons/instagram.svg'
import LinkedinIcon from '../../../public/icons/linkedin.svg'

// Варианты анимации для Framer Motion
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// ✅ НОВЫЕ ВАРИАНТЫ АНИМАЦИИ ДЛЯ ЛОГОТИПА (Масштаб и Размытие)
const letterVariants = {
  // Изначальное состояние: маленький масштаб, размытие (blur), немного прозрачный
  hidden: {
    scale: 0.8,
    opacity: 0.1,
    filter: 'blur(5px)',
  },
  // Конечное состояние: полный размер, без размытия, полная видимость
  visible: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
  },
}

// УДАЛЯЕМ старую константу logoVariants, так как она больше не нужна.
// const logoVariants = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 1.5,
//       ease: 'easeOut',
//       delay: 0.3,
//     },
//   },
// }

const Footer = () => {
  const logoText = 're.play'

  return (
    <motion.footer
      className={styles.footer}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Анимация срабатывает, когда футер появляется в поле зрения
      viewport={{ once: true, amount: 0.3 }} // Срабатывает один раз, когда 30% видно
    >
      {/* --- ВЕРХНЯЯ ЧАСТЬ: Контакты и Соцсети --- */}
      <div className={styles.topRow}>
        <motion.div className={styles.contactGroup} variants={itemVariants}>
          <h4 className={styles.heading}>Email</h4>
          <a href="mailto:info@replay.io" className={styles.contactLink}>
            info@replay.io
          </a>
        </motion.div>

        <motion.div className={styles.contactGroup} variants={itemVariants}>
          <h4 className={styles.heading}>Телефоны</h4>
          <a href="tel:+39267463832" className={styles.contactLink}>
            +3 926 746-38-32
          </a>
        </motion.div>

        <motion.div className={styles.contactGroup} variants={itemVariants}>
          <h4 className={styles.heading}>Мессенджеры</h4>
          <div className={styles.socialIcons}>
            {/* ⚠️ Иконки: Укажите правильные пути выше */}
            <a href="#" target="_blank" aria-label="Facebook">
              <img
                src={FacebookIcon}
                alt="Facebook"
                className={styles.socialIcon}
              />
            </a>
            <a href="#" target="_blank" aria-label="Instagram">
              <img
                src={InstagramIcon}
                alt="Instagram"
                className={styles.socialIcon}
              />
            </a>
            <a href="#" target="_blank" aria-label="LinkedIn">
              <img
                src={LinkedinIcon}
                alt="LinkedIn"
                className={styles.socialIcon}
              />
            </a>
          </div>
        </motion.div>
      </div>

      {/* --- ГЛАВНЫЙ ЛОГОТИП (с анимацией масштаба) --- */}
      <div className={styles.mainLogoContainer}>
        <div className={styles.logoTextWrapper}>
          {/* ✅ РАЗБИВАЕМ СЛОВО НА БУКВЫ И АНИМИРУЕМ КАЖДУЮ */}
          {logoText.split('').map((char, index) => (
            <motion.span
              key={index}
              className={styles.mainLogoText}
              variants={letterVariants}
              initial="hidden"
              whileInView="visible" // Срабатывает при появлении в поле зрения
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 1.2, // Увеличиваем длительность для плавности
                ease: 'easeOut',
                delay: 0.2 + index * 0.08, // Легкая задержка для "волны"
              }}
            >
              {char === '.' ? char : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* --- НИЖНЯЯ ЧАСТЬ: Копирайт и Разработчик --- */}
      <motion.div className={styles.bottomRow} variants={itemVariants}>
        <span className={styles.copyright}>@2025</span>
        <span className={styles.developer}>
          Дизайн и разработка: Liudmyla Bakhtieieva
        </span>
      </motion.div>
    </motion.footer>
  )
}

export default Footer

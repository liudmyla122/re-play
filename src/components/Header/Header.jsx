import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, Events, animateScroll as scroll } from 'react-scroll'
import styles from './Header.module.css'
import Logo from '/icons/Logo.svg'
import ArrowDown from '/icons/Icon.svg'

// Список всех секций, которые нужно отслеживать
const SECTION_IDS = [
  'home',
  'works',
  'services',
  'etapy',
  'stoimost',
  'komanda',
  'kontakty', // <--- Ваша секция контактов
]

const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('RU')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // 1. Новое состояние для отслеживания активной секции
  const [activeSection, setActiveSection] = useState('home')

  const toggleLanguageDropdown = () => setIsLanguageOpen(!isLanguageOpen)
  const selectLanguage = (lang) => {
    setCurrentLanguage(lang)
    setIsLanguageOpen(false)
  }
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // Эффект для изменения фона заголовка при прокрутке
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 2. Эффект для Intersection Observer (отслеживание активной секции)
  useEffect(() => {
    // rootMargin: Секции будут считаться активными, когда они
    // находятся в 50% от верхней границы видимой области экрана.
    const observerOptions = {
      root: null,
      rootMargin: '-100% 0px -60% 0px', // Верхний и нижний отступ 50%
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Если секция пересекает "срединную линию" (rootMargin),
          // устанавливаем ее как активную
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Начинаем наблюдение за каждой секцией
    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Очистка при размонтировании компонента
    return () => {
      observer.disconnect()
    }
  }, []) // Запускаем только один раз при монтировании

  // --- Framer Motion Variants (без изменений) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }
  // ---------------------------------------------

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={childVariants}>
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={600}
          className={styles.logo}
          onClick={() => {
            setIsMobileMenuOpen(false)
            setActiveSection('home') // Устанавливаем при клике
          }}
        >
          <img src={Logo} alt="RE Logo" className={styles.logoImage} />
        </Link>
      </motion.div>
      <motion.nav
        className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}
        variants={childVariants}
      >
        <ul className={styles.navList}>
          {/* Карта пунктов меню, чтобы избежать дублирования */}
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <Link
                to={id}
                spy={true}
                smooth={true}
                duration={600}
                offset={id === 'stoimost' ? -91 : -100}
                // 3. Используем activeSection для определения класса
                className={`${styles.navLink} ${
                  activeSection === id ? styles.active : ''
                }`}
                // Переопределяем встроенное activeClass, чтобы избежать конфликта
                // activeClass={styles.active} // <-- УДАЛЕНО, так как используем свое состояние

                onClick={() => {
                  setIsMobileMenuOpen(false)
                  // Устанавливаем активную секцию при клике, чтобы подсветка была мгновенной
                  setActiveSection(id)
                }}
              >
                {/* Определяем текст ссылки по ID */}
                {id === 'works' && 'Работы'}
                {id === 'services' && 'Услуги'}
                {id === 'etapy' && 'Этапы'}
                {id === 'stoimost' && 'Стоимость'}
                {id === 'komanda' && 'Команда'}
                {id === 'kontakty' && 'Контакты'}
                {id === 'home' && 'Главная'}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
      {/* ... Остальная часть компонента без изменений ... */}
      <motion.div variants={childVariants}>
        <Link
          to="kontakty" // Логично, что "Начать проект" ведет на контакты
          spy={true}
          smooth={true}
          duration={600}
          offset={-100}
          className={styles.ctaButton}
          onClick={() => {
            setIsMobileMenuOpen(false)
            setActiveSection('kontakty') // Устанавливаем при клике
          }}
        >
          НАЧАТЬ ПРОЕКТ
        </Link>
      </motion.div>
      <motion.div className={styles.languageSwitcher} variants={childVariants}>
        <button
          onClick={toggleLanguageDropdown}
          className={styles.languageButton}
        >
          {currentLanguage}{' '}
          <img src={ArrowDown} alt="Arrow Down" className={styles.arrowIcon} />
        </button>
        {isLanguageOpen && (
          <ul className={styles.languageList}>
            <li onClick={() => selectLanguage('RU')}>RU</li>
            <li onClick={() => selectLanguage('EN')}>EN</li>
            <li onClick={() => selectLanguage('DE')}>DE</li>
            <li onClick={() => selectLanguage('UK')}>UK</li>
          </ul>
        )}
      </motion.div>
      <button className={styles.burgerButton} onClick={toggleMobileMenu}>
        ☰
      </button>
    </motion.header>
  )
}

export default Header

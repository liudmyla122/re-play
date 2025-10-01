import React from 'react'
import { motion } from 'framer-motion'
import styles from './Services.module.css'
import servicesIcon from '/icons/icon-pl.svg'

const servicesData = [
  // ... (ваш servicesData массив без изменений)
  {
    title: 'Рекламный видеоролик',
    description:
      'Короткое, яркое видео, которое демонстрирует ценность и востребованность вашего продукта. Такие ролики отлично заходят аудитории, цепляют внимание с первых секунд и реально влияют на продажи.',
    highlight: 'Повысит конверсию Вашей рекламной компании',
    position: 'left',
  },
  {
    title: 'Имиджевый фильм',
    description:
      'Мы подчеркиваем индивидуальность компании через креативные сценарии и выразительный визуал. Такой контент усиливает репутацию, демонстрирует ценности бренда и делает его узнаваемым.',
    highlight: 'Добавит репутации Вашей компании',
    position: 'right',
  },
  {
    title: 'Отчетные видео',
    description:
      'Мы снимаем отчетные видео с фестивалей, концертов, выставок, конференций и других мероприятий. Такой формат помогает сохранять атмосферу события. Поделиться результатами и подчеркнуть масштаб происходящего.',
    highlight: 'Показ результатов проделанной работы',
    position: 'left',
  },
  {
    title: 'Музыкальные клипы',
    description:
      'Мы создаём клипы, которые усиливают трек, визуализируют настроение и помогают артисту раскрыться перед аудиторией. Это не просто видео — это история, ритм и стиль, которые остаются в памяти.',
    highlight: 'Короткие видеоролики, созданные для визуального сопровождения.',
    position: 'right',
  },
]

const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.animatedBackground}></div>
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {servicesData
            .filter((item) => item.position === 'left')
            .map((service, index) => (
              <div key={index} className={styles.textBlock}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.highlight}>{service.highlight}</p>
                <p className={styles.description}>{service.description}</p>
              </div>
            ))}
        </motion.div>
        <div className={styles.centerColumn}>
          {/* ✅ Анимация для верхней полоски */}
          <motion.div
            className={styles.verticalLineTop}
            initial={{ height: 0, y: 0 }}
            whileInView={{ height: '300px', y: '-50px' }}
            transition={{ duration: 3.5 }}
            viewport={{ once: true }}
          ></motion.div>
          {/* ✅ Анимация для нижней полоски */}
          <motion.div
            className={styles.verticalLineBottom}
            initial={{ height: 0, y: 0 }}
            whileInView={{ height: '500px', y: '50px' }}
            transition={{ duration: 3.5 }}
            viewport={{ once: true }}
          ></motion.div>
          <motion.div
            className={styles.line}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
          <motion.div
            className={styles.centerContent}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.servicesTitle}>Услуги</h2>
            <motion.img
              src={servicesIcon}
              alt="Services Icon"
              className={styles.icon}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 2,
                },
              }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            />
          </motion.div>
        </div>
        <motion.div
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {servicesData
            .filter((item) => item.position === 'right')
            .map((service, index) => (
              <div key={index} className={styles.textBlock}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.highlight}>{service.highlight}</p>
                <p className={styles.description}>{service.description}</p>
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Komanda.module.css'
import Modal from './Modal'

// Импортируем SVG-файлы как изображения
import foto1 from '/Photos/Foto-1.svg'
import foto2 from '/Photos/Foto-2.svg'
import foto3 from '/Photos/Foto-3.svg'
import foto4 from '/Photos/Foto-4.svg'
import foto5 from '/Photos/Foto-5.svg'
import foto6 from '/Photos/Foto-6.svg'
import joinUsPhoto from '/Photos/Foto-7.svg'
import ArrowLeft from '/icons/Levo.svg'
import ArrowRight from '/icons/Pravo.svg'

const teamMembers = [
  {
    id: 1,
    name: 'Константин Рыбаченко',
    role: 'ОСНОВАТЕЛЬ-ОПЕРАТОР',
    photo: foto1,
  },
  {
    id: 2,
    name: 'Ксения Малевская',
    role: 'ПРОДЮСЕР',
    photo: foto2,
  },
  {
    id: 3,
    name: 'Александр Дин',
    role: 'МОНТАЖ',
    photo: foto3,
  },
  {
    id: 4,
    name: 'Владислав Ковалев',
    role: '3D ARTIST',
    photo: foto4,
  },
  {
    id: 5,
    name: 'Игорь Алексеенко',
    role: 'VFX',
    photo: foto5,
  },
  {
    id: 6,
    name: 'Штефан Филитов',
    role: 'ПРОДЮСЕР',
    photo: foto6,
  },
]

const Komanda = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <section id="komanda" className={styles.komanda}>
      <div className={styles.container}>
        <div className={styles.teamGrid}>
          <AnimatePresence>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={`${styles.teamCard} ${
                  styles[`teamCard${member.id}`]
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className={styles.photo}
                />
                <div className={styles.info}>
                  <p className={styles.role}>{member.role}</p>
                  <h3 className={styles.name}>{member.name}</h3>
                </div>
              </motion.div>
            ))}
            <motion.div
              key="join-us"
              className={`${styles.teamCard} ${styles.joinUsCard} ${styles.teamCard7}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: teamMembers.length * 0.1,
              }}
              onClick={toggleModal}
            >
              <img
                src={joinUsPhoto}
                alt="Присоединиться к команде"
                className={styles.photo}
              />
              <div className={styles.info}>
                <h3 className={styles.joinUsText}>
                  Вы можете стать частью нашей команды
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.controls}>
          <button className={styles.arrow}>
            <img src={ArrowLeft} alt="Предыдущий" />
          </button>
          <button className={styles.arrow}>
            <img src={ArrowRight} alt="Следующий" />
          </button>
        </div>
        <AnimatePresence>
          {modalOpen && <Modal onClose={toggleModal} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Komanda

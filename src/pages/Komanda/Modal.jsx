import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Modal.module.css'

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const RobotIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M20 6L9 17l-5-5"></path>
  </svg>
)

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    description: '',
  })
  const [isRobotChecked, setIsRobotChecked] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isRobotChecked) {
      alert('Пожалуйста, подтвердите, что вы не робот.')
      return
    }
    console.log('Form data submitted:', formData)
    onClose()
  }

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>

        <div className={styles.modalContent}>
          <h3 className={styles.sectionTitle}>Персональная информация</h3>

          <form onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Имя*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Сергей Иванов"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите Ваш Email"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Телефон*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+38 (000) 000-0000"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="role">Роль*</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Оператор"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Описание</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Опишите, что вы умеете"
                  className={styles.textarea}
                ></textarea>
              </div>

              {/* КАПЧА */}
              <div className={styles.recaptchaPlaceholder}>
                <div className={styles.recaptcha}>
                  <input
                    type="checkbox"
                    id="robotCheck"
                    checked={isRobotChecked}
                    onChange={() => setIsRobotChecked(!isRobotChecked)}
                    className={styles.robotCheckbox}
                  />
                  <label htmlFor="robotCheck" className={styles.recaptchaLabel}>
                    Я не робот
                  </label>

                  <div className={styles.captchaLogoContainer}>
                    <RobotIcon />
                    <div className={styles.captchaLogoText}>
                      re
                      <br />
                      CAPTCHA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!formData.name || !formData.email || !isRobotChecked}
            >
              Отправить
            </button>

            <p className={styles.agreementText}>
              Нажимая на кнопку, вы даете{' '}
              <a href="#" className={styles.agreementLink}>
                согласие
              </a>{' '}
              на обработку персональных данных и соглашаетесь с политикой
              конфиденциальности.
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal

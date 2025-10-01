import React, { useState, useRef, useEffect, useMemo } from 'react'
import './ContactForm.css' // Импорт стилей

// Вспомогательные иконки (для простоты используем простые символы/иконки)
const ClipIcon = () => <span className="clip-icon">📎</span>
const PlusIcon = () => <span className="plus">+</span>
// Иконка эмодзи
const ShieldIcon = () => <span className="recaptcha-icon">😺</span>

const PROJECT_OPTIONS = [
  'Рекламный ролик',
  'Корпоративное видео',
  'Музыкальный клип',
  'Документальный фильм',
  'Анимация',
  'Другое',
]
const MAX_IDEA_CHARS = 5000

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    site: '',
    idea: '',
    videoLink: '',
  })
  const [project, setProject] = useState('')
  const [projectOpen, setProjectOpen] = useState(false)
  const projectRef = useRef(null)

  // Логика загрузки/удаления изображений
  const [images, setImages] = useState([null, null, null]) // URL-ы для превью
  const [imageFiles, setImageFiles] = useState([null, null, null]) // Объекты File
  const fileInputRefs = useRef([]) // Ссылки на скрытые input[type=file]

  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [activeStep, setActiveStep] = useState(1) // Активный шаг для таймлайна

  // --- ЭФФЕКТЫ ---

  // Закрытие выпадающего списка при клике вне его
  useEffect(() => {
    const onDoc = (e) => {
      if (projectRef.current && !projectRef.current.contains(e.target)) {
        setProjectOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  // Обновление активного шага (логика "подсказок")
  useEffect(() => {
    let newStep = 1
    // Шаг 2: Базовая информация
    if (form.name && form.email && (form.phone || form.company)) {
      newStep = 2
      // Шаг 3: Выбран тип проекта
      if (project) {
        newStep = 3
        // Шаг 4: Описана идея (достаточно символов)
        if (form.idea.length > 50) {
          newStep = 4
        }
      }
    }
    setActiveStep(newStep)
  }, [form, project])

  // --- ОБРАБОТЧИКИ ---

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    // Убираем ошибку, когда пользователь начинает вводить
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleProjectSelect = (opt) => {
    setProject(opt)
    setProjectOpen(false)
    setErrors((prev) => ({ ...prev, project: '' }))
  }

  const handleImageChange = (e, idx) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой (макс 5 МБ).')
      e.target.value = null // Сбросить значение
      return
    }

    const url = URL.createObjectURL(file)
    const newImgs = [...images]
    const newFiles = [...imageFiles]

    // Освобождаем память от предыдущего URL, если он был
    if (newImgs[idx]) URL.revokeObjectURL(newImgs[idx])

    newImgs[idx] = url
    newFiles[idx] = file
    setImages(newImgs)
    setImageFiles(newFiles)
  }

  const handleRemoveImage = (e, idx) => {
    e.stopPropagation() // Остановить всплытие, чтобы не вызвать file input

    const newImgs = [...images]
    const newFiles = [...imageFiles]

    // Освобождаем память и сбрасываем ссылку
    if (newImgs[idx]) URL.revokeObjectURL(newImgs[idx])

    newImgs[idx] = null
    newFiles[idx] = null
    setImages(newImgs)
    setImageFiles(newFiles)

    // Сбросить значение скрытого input, чтобы можно было загрузить тот же файл снова
    if (fileInputRefs.current[idx]) {
      fileInputRefs.current[idx].value = null
    }
  }

  // --- ВАЛИДАЦИЯ И ОТПРАВКА ---

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Введите ваше имя'
    if (!form.email.trim()) err.email = 'Введите ваш Email'
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = 'Неверный формат Email'
    if (!project) err.project = 'Выберите тип проекта'
    if (!captchaChecked) err.captcha = 'Подтвердите, что вы не робот'
    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess('')

    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) {
      // Прокрутка к первому полю с ошибкой
      const firstErrorKey = Object.keys(err)[0]
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`)
      if (errorElement)
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)

    // --- ЛОГИКА ОТПРАВКИ ДАННЫХ ---

    const formData = new FormData()
    formData.append('name', form.name)
    // ... остальные поля ...

    imageFiles.forEach((file, index) => {
      if (file) {
        formData.append(`reference_${index}`, file)
      }
    })

    // ИМИТАЦИЯ ОТПРАВКИ
    try {
      await new Promise((res) => setTimeout(res, 1500))

      // Очистка формы
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        site: '',
        idea: '',
        videoLink: '',
      })
      setProject('')
      setCaptchaChecked(false)
      images.forEach((url) => url && URL.revokeObjectURL(url))
      setImages([null, null, null])
      setImageFiles([null, null, null])
      setSuccess(
        'Форма успешно отправлена. Мы свяжемся с вами в ближайшее время!'
      )
      setErrors({})
      setActiveStep(1)
    } catch (err) {
      console.error('Ошибка отправки:', err)
      setErrors({ submit: 'Ошибка при отправке. Попробуйте позже.' })
    } finally {
      setSubmitting(false)
    }
  }

  // --- JSX ---

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    project &&
    captchaChecked &&
    !submitting

  return (
    <section className="kontakty-section" id="kontakty">
      <h1 className="kontakty-header">Обсудим идею?</h1>

      <div className="kontakty-inner">
        {/* ==================================
            ЛЕВАЯ КОЛОНКА (ТАЙМЛАЙН)
            ================================== */}
        <aside className="kontakty-timeline">
          <div className="logo-left">re.play</div>

          <div className="timeline-list">
            <div className={`timeline-item ${activeStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Персональная информация</div>
            </div>
            {/* Линия между 1 и 2 */}
            <div className="vertical-line" />

            <div className={`timeline-item ${activeStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Тип проекта</div>
            </div>
            {/* Линия между 2 и 3 */}
            <div className="vertical-line" />

            <div className={`timeline-item ${activeStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Описание идеи/Задачи</div>
            </div>
            {/* Линия между 3 и 4 */}
            <div className="vertical-line" />

            <div className={`timeline-item ${activeStep >= 4 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <div className="step-label">Референсы</div>
            </div>
          </div>
        </aside>

        {/* ==================================
            ПРАВАЯ КОЛОНКА (ФОРМА)
            ================================== */}
        <main className="kontakty-form-wrap">
          <form className="kontakty-form" onSubmit={handleSubmit} noValidate>
            {/* 1. ПЕРСОНАЛЬНАЯ ИНФОРМАЦИЯ */}
            <h2 className="kontakty-title">Персональная информация</h2>

            <div className="row two">
              <div className="field">
                <label className="field-label">Имя*</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Наталья Тимофеева"
                  className={errors.name ? 'input error' : 'input'}
                  autoComplete="name"
                />
                {errors.name && (
                  <div className="field-error">{errors.name}</div>
                )}
              </div>

              <div className="field">
                <label className="field-label">Email*</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Ваш email"
                  className={errors.email ? 'input error' : 'input'}
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="field-error">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="row two">
              <div className="field">
                <label className="field-label">Телефон</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(925) 000-0000"
                  className="input"
                  autoComplete="tel"
                />
              </div>

              <div className="field">
                <label className="field-label">Компания</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Exp. Company"
                  className="input"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label className="field-label">Сайт/Соцсети</label>
                <input
                  name="site"
                  value={form.site}
                  onChange={handleChange}
                  placeholder="www.drugoi.de"
                  className="input"
                  autoComplete="url"
                />
              </div>
            </div>

            {/* 2. ТИП ПРОЕКТА */}
            <h2 className="kontakty-title">Тип проекта</h2>

            <div className="custom-select-wrapper" ref={projectRef}>
              <div
                className={`select-head ${errors.project ? 'error' : ''}`}
                onClick={() => setProjectOpen(!projectOpen)}
              >
                <span className={!project ? 'placeholder' : ''}>
                  {project || 'Выберите тип проекта'}
                </span>
                <span className="select-arrow">&#9660;</span>
              </div>
              {errors.project && (
                <div className="field-error">{errors.project}</div>
              )}

              {projectOpen && (
                <div className="select-list">
                  {PROJECT_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      className={`select-option ${
                        project === opt ? 'active' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProjectSelect(opt)
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. ОПИСАНИЕ ИДЕИ/ЗАДАЧИ */}
            <h2 className="kontakty-title" style={{ marginTop: '40px' }}>
              Описание идеи/задачи
            </h2>

            <div className="field">
              <textarea
                name="idea"
                placeholder="Опишите свою идею"
                value={form.idea}
                onChange={handleChange}
                maxLength={MAX_IDEA_CHARS}
                className="textarea"
              />
              <span className="textarea-counter">
                {form.idea.length}/{MAX_IDEA_CHARS}
              </span>
            </div>

            {/* 4. ВАШИ РЕФЕРЕНСЫ */}
            <h2 className="kontakty-title" style={{ marginTop: '40px' }}>
              Ваши референсы
            </h2>
            <p className="references-instruction">Добавьте свои референсы</p>

            <div className="section-references">
              <div className="video-link-container">
                <p className="video-link-label">Добавьте ссылки на видео</p>
                <input
                  name="videoLink"
                  value={form.videoLink}
                  onChange={handleChange}
                  className="input"
                  type="text"
                  placeholder="Ваша ссылка на видео"
                  style={{ height: '40px' }}
                />
              </div>

              <div className="uploads-block">
                {images.map((url, index) => (
                  <div key={index} className="upload-wrapper">
                    <div
                      className={`upload-box ${url ? 'has-image' : ''}`}
                      onClick={() =>
                        !url && fileInputRefs.current[index]?.click()
                      }
                    >
                      {url ? (
                        <img
                          src={url}
                          alt={`Reference ${index + 1}`}
                          className="preview-img"
                        />
                      ) : (
                        <div className="plus-icon">
                          <PlusIcon />
                        </div>
                      )}

                      <div
                        className="clip-icon-wrapper"
                        onClick={(e) =>
                          url
                            ? handleRemoveImage(e, index)
                            : fileInputRefs.current[index]?.click()
                        }
                        title={url ? 'Удалить референс' : 'Добавить референс'}
                      >
                        <ClipIcon />
                      </div>

                      {/* Скрытый input для загрузки файлов */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => (fileInputRefs.current[index] = el)}
                        className="hidden-file"
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CAPTCHA И КНОПКА ОТПРАВКИ */}
            <div className="bottom-row">
              <div className="captcha-box">
                {/* Чекбокс "Я не робот" */}
                <div
                  className={`captcha-inner ${errors.captcha ? 'error' : ''}`}
                >
                  <input
                    type="checkbox"
                    id="robot-check"
                    name="robot-check"
                    checked={captchaChecked}
                    onChange={() => {
                      setCaptchaChecked(!captchaChecked)
                      setErrors((prev) => ({ ...prev, captcha: '' }))
                    }}
                  />
                  <label className="captcha-text" htmlFor="robot-check">
                    Я не робот
                  </label>
                </div>

                {/* Placeholder для reCAPTCHA */}
                <div className="recaptcha-placeholder">
                  <ShieldIcon /> {/* Используем иконку эмодзи */}
                  <div className="recap-logo-text">reCAPTCHA</div>
                  <small>Privacy - Terms</small>
                </div>
                {errors.captcha && (
                  <div className="field-error">{errors.captcha}</div>
                )}
              </div>

              <div className="submit-box">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={!canSubmit}
                >
                  {submitting ? 'Отправляем...' : 'Отправить'}
                </button>
                {/* Сообщения об успехе/ошибке остаются в .submit-box для правильного выравнивания */}
                {success && (
                  <div className="form-message success">{success}</div>
                )}
                {errors.submit && (
                  <div className="form-message error">{errors.submit}</div>
                )}
              </div>
            </div>

            <p className="agreement-text">
              Нажимая на кнопку, вы даете{'\u00a0'}
              <a href="#" className="link">
                согласие{'\u00a0'}
              </a>
              на обработку персональных данных и соглашаетесь с политикой
              конфиденциальности.
            </p>
          </form>
        </main>
      </div>
    </section>
  )
}

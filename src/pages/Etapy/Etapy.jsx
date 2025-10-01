import React from 'react'
import styles from './Etapy.module.css'
// Логотип для бегущей строки
import logo from '/icons/Logo.svg'
// Иконка для центральной секции
import ServicesIcon from '/icons/icon-play.svg'

const Marquee = () => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          <span className={styles.marqueeItem}>re.play</span>
          <img src={logo} alt="re.play logo" className={styles.marqueeLogo} />
          <span className={styles.marqueeItem}>re.play</span>
          <img src={logo} alt="re.play logo" className={styles.marqueeLogo} />
          <span className={styles.marqueeItem}>re.play</span>
          <img src={logo} alt="re.play logo" className={styles.marqueeLogo} />
          <span className={styles.marqueeItem}>re.play</span>
          <img src={logo} alt="re.play logo" className={styles.marqueeLogo} />
          <span className={styles.marqueeItem}>re.play</span>
          <img src={logo} alt="re.play logo" className={styles.marqueeLogo} />
          <span className={styles.marqueeItem}>re.play</span>
          <img src={logo} alt="re.play logo" className={styles.marqueeLogo} />
          <span className={styles.marqueeItem}>re.play</span>
          <img src={logo} alt="re.play logo" className={styles.marqueeLogo} />
        </div>
      </div>
    </div>
  )
}

const Etapy = () => {
  return (
    <section id="etapy" className={styles.etapy}>
      <Marquee />
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.textBlock}>
            <div className={styles.flexHeader}>
              <h3 className={styles.number}>1</h3>
              <h4 className={styles.title}>Сбор информации</h4>
            </div>
            <p className={styles.description}>
              Заполняется бриф и проводится консультация с экспертом. Затем мы
              создаем несколько креативных идей и предлагаем варианты их
              воплощения.
            </p>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.flexHeader}>
              <h3 className={styles.number}>2</h3>
              <h4 className={styles.title}>Анализ проекта</h4>
            </div>
            <p className={styles.description}>
              Согласовываем все нюансы: концепцию, сроки, бюджет и техническое
              задание. Работа стартует только после полного утверждения.
            </p>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.flexHeader}>
              <h3 className={styles.number}>3</h3>
              <h4 className={styles.title}>Разработка</h4>
            </div>
            <p className={styles.description}>
              Готовимся к съемочному процессу: прорабатываем сценарий, создаем
              раскадровку, выбираем локации и подбираем актеров.
            </p>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <div className={styles.servicesTitleUnderline} />
          <h2 className={styles.servicesTitle}>Как мы работаем?</h2>
          <img src={ServicesIcon} alt="Services Icon" className={styles.icon} />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.textBlock}>
            <div className={styles.flexHeaderMirror}>
              <h4 className={styles.title}>Съемки</h4>
              <h3 className={styles.number}>4</h3>
            </div>
            <p className={styles.description}>
              В назначенный день команда re.play вместе с актерами и
              техническими специалистами реализует съемку согласно
              согласованному плану.
            </p>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.flexHeaderMirror}>
              <h4 className={styles.title}>Постпродакшн</h4>
              <h3 className={styles.number}>5</h3>
            </div>
            <p className={styles.description}>
              Отснятый видеоряд превращается в готовый ролик с добавлением
              графики, цветовой коррекции и звукового оформления.
            </p>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.flexHeaderMirror}>
              <h4 className={styles.title}>Финальные правки и сдача проекта</h4>
              <h3 className={styles.number}>6</h3>
            </div>
            <p className={styles.description}>
              Вносим необходимые изменения и передаем готовый видеоролик. После
              вашего утверждения подписываем все необходимые документы.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Etapy

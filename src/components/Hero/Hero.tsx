import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles['hero']}>
      <div className={styles['hero-content']}>
        <p className={styles['eyebrow']}>Rum för möten, fest &amp; fokus</p>
        <h1 className={styles['title']}>
          Hitta lokalen som <em className={styles['accent']}>passar dig</em>
        </h1>
        <p className={styles['lead']}>
          Handplockade rum i fyra städer. Boka per timme eller hela dagen – på
          under en minut.
        </p>
      </div>
    </section>
  );
}

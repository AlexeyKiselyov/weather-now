import styles from "./WeatherCardSkeleton.module.css";

const WeatherCardSkeleton = () => {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={`${styles.skeleton} ${styles.city}`}></div>
        <div className={`${styles.skeleton} ${styles.location}`}></div>
      </header>
      <div className={styles.iconContainer}>
        <div className={`${styles.skeleton} ${styles.icon}`}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.temp}`}></div>
      <div className={`${styles.skeleton} ${styles.description}`}></div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <div className={`${styles.skeleton} ${styles.detailLabel}`}></div>
          <div className={`${styles.skeleton} ${styles.detailValue}`}></div>
        </div>
        <div className={styles.detailItem}>
          <div className={`${styles.skeleton} ${styles.detailLabel}`}></div>
          <div className={`${styles.skeleton} ${styles.detailValue}`}></div>
        </div>
      </div>
    </article>
  );
};

export default WeatherCardSkeleton;

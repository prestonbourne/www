import styles from "./styles.module.css";

const circleSizes = Array.from({ length: 17 }, (_, i) => ({
  size: 100 - i * 5,
  index: i,
}));

export function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.circlesContainer}>
        {circleSizes.map(({ size, index }) => (
          <div
            key={index}
            className={styles.circle}
            style={{
              width: `${size}%`,
              height: `${size}%`,
              '--index': index
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
} 
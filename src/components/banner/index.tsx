'use client'
import styles from "./styles.module.css";
import { cx } from "class-variance-authority";

const circleSizes = Array.from({ length: 17 }, (_, i) => ({
  size: 100 - i * 5,
  index: i,
}));

type BannerProps = {
  className?: string;
}

export function Banner({ className }: BannerProps) {
  return (
    <div className={cx(styles.banner, className)}>
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
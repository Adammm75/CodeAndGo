import type { Project } from '@/data/projects';

import styles from './ProjectMockup.module.css';

type Props = {
  variant: Project['mockup'];
  accent: Project['accent'];
  /** Le premier projet est affiché en grand format. */
  featured?: boolean;
};

function Landing() {
  return (
    <>
      <div className={styles.rowSplit}>
        <div className={styles.col}>
          <span className={`${styles.line} ${styles.lineTitle}`} />
          <span className={`${styles.line} ${styles.lineW80}`} />
          <span className={`${styles.line} ${styles.lineW60}`} />
          <span className={styles.pill} />
        </div>
        <span className={styles.block} />
      </div>
      <div className={styles.trio}>
        <span className={styles.tile} />
        <span className={styles.tile} />
        <span className={styles.tile} />
      </div>
    </>
  );
}

function Shop() {
  return (
    <>
      <div className={styles.rowSplit}>
        <span className={`${styles.line} ${styles.lineW40}`} />
        <span className={`${styles.line} ${styles.lineW20}`} />
      </div>
      <div className={styles.quad}>
        <span className={styles.product} />
        <span className={styles.product} />
        <span className={styles.product} />
        <span className={styles.product} />
      </div>
      <div className={styles.rowSplit}>
        <span className={`${styles.line} ${styles.lineW30}`} />
        <span className={styles.pill} />
      </div>
    </>
  );
}

function Dashboard() {
  return (
    <>
      <div className={styles.rowSplit}>
        <span className={`${styles.line} ${styles.lineW40}`} />
        <span className={styles.dotRow}>
          <span className={styles.miniDot} />
          <span className={styles.miniDot} />
        </span>
      </div>
      <div className={styles.metrics}>
        <span className={styles.metric} />
        <span className={styles.metric} />
        <span className={styles.metric} />
      </div>
      <div className={styles.graph}>
        {[42, 64, 50, 78, 60, 88].map((height, index) => (
          <span key={index} className={styles.graphBar} style={{ height: `${height}%` }} />
        ))}
      </div>
    </>
  );
}

function Editorial() {
  return (
    <>
      <span className={`${styles.line} ${styles.lineTitle} ${styles.lineW60}`} />
      <div className={styles.gallery}>
        <span className={`${styles.frame} ${styles.frameTall}`} />
        <div className={styles.galleryCol}>
          <span className={styles.frame} />
          <span className={styles.frame} />
        </div>
      </div>
      <span className={`${styles.line} ${styles.lineW80}`} />
      <span className={`${styles.line} ${styles.lineW40}`} />
    </>
  );
}

const variants = {
  landing: Landing,
  shop: Shop,
  dashboard: Dashboard,
  editorial: Editorial,
};

/**
 * Maquette de site dessinée intégralement en CSS.
 * Purement illustrative : masquée aux technologies d'assistance, le contenu
 * réel du projet étant décrit en texte dans la carte.
 */
export function ProjectMockup({ variant, accent, featured = false }: Props) {
  const Variant = variants[variant];

  return (
    <div
      className={`${styles.mockup} ${styles[accent]} ${featured ? styles.featured : ''}`}
      aria-hidden="true"
    >
      <span className={styles.glow} />
      <div className={styles.window}>
        <div className={styles.bar}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.screen}>
          <Variant />
        </div>
      </div>
      <span className={styles.reflection} />
    </div>
  );
}

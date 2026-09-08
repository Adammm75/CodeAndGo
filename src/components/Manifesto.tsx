import { Reveal } from './Reveal';
import styles from './Manifesto.module.css';

const steps = [
  { index: '01', word: 'compris' },
  { index: '02', word: 'désiré' },
  { index: '03', word: 'choisi' },
];

/**
 * Rupture éditoriale claire au milieu d'un site sombre.
 * Le contraste de traitement fait partie du propos : on ralentit la lecture.
 */
export function Manifesto() {
  return (
    <section className={`invert ${styles.section}`} aria-labelledby="manifeste-titre">
      <div className={`container ${styles.inner}`}>
        <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
          Le manifeste
        </Reveal>

        <h2 id="manifeste-titre" className="sr-only">
          Notre manifeste : être compris, être désiré, être choisi
        </h2>

        <ol className={styles.list}>
          {steps.map((step, index) => (
            <Reveal as="li" key={step.index} delay={index * 110} className={styles.item}>
              <span className={styles.index}>{step.index}</span>
              <span className={styles.phrase}>
                Être <span className={styles.accent}>{step.word}</span>.
              </span>
            </Reveal>
          ))}
        </ol>

        <div className={styles.footer}>
          <Reveal as="p" from="left" className={styles.quick}>
            Votre visiteur décide vite.
          </Reveal>
          <Reveal from="right" delay={120} className={styles.role}>
            <span className={styles.roleLabel}>Notre rôle</span>
            <span className={styles.roleSlash} aria-hidden="true">
              /
            </span>
            <span className={styles.roleText}>rendre la décision évidente</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

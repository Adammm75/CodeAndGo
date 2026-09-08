import { qualityDisclaimer, qualityPoints, qualityTargets } from '@/data/differentiators';

import { Reveal } from './Reveal';
import styles from './QualityConsole.module.css';

export function QualityConsole() {
  return (
    <div className={styles.layout}>
      <div className={styles.editorial}>
        <ul className={styles.points}>
          {qualityPoints.map((point, index) => (
            <Reveal as="li" key={point.title} from="left" delay={index * 70} className={styles.point}>
              <h3 className={`h4 ${styles.pointTitle}`}>{point.title}</h3>
              <p className={styles.pointText}>{point.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal from="right" delay={120} className={styles.consoleWrap}>
        <div className={styles.console}>
          <div className={styles.head}>
            <span className={styles.headDots} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.headTitle}>Objectifs de qualité</span>
          </div>

          <ul className={styles.targets}>
            {qualityTargets.map((target, index) => (
              <li
                key={target.label}
                className={styles.target}
                style={
                  { '--w': `${target.value}%`, '--i': index } as React.CSSProperties
                }
              >
                <div className={styles.targetHead}>
                  <span className={styles.targetLabel}>{target.label}</span>
                  <span className={styles.targetValue}>{target.display}</span>
                </div>
                <div className={styles.track}>
                  <span className={styles.fill} aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>

          {/* Mention non négociable : ce sont des cibles, pas des audits obtenus. */}
          <p className={styles.disclaimer}>{qualityDisclaimer}</p>
        </div>
      </Reveal>
    </div>
  );
}

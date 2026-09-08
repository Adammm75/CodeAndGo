import { processSteps } from '@/data/process';

import { Reveal } from './Reveal';
import styles from './ProcessTimeline.module.css';

/**
 * Timeline horizontale sur desktop, verticale sur mobile.
 * La ligne de progression et les points s'animent à l'entrée dans le viewport
 * via la classe `is-visible` posée par MotionDirector.
 */
export function ProcessTimeline() {
  return (
    <Reveal className={styles.timeline}>
      <span className={styles.rail} aria-hidden="true">
        <span className={styles.railFill} />
      </span>

      <ol className={styles.steps}>
        {processSteps.map((step, index) => (
          <li
            key={step.index}
            className={styles.step}
            style={{ '--i': index } as React.CSSProperties}
          >
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.index}>{step.index}</span>
            <h3 className={`h4 ${styles.title}`}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
            <span className={styles.output}>{step.output}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

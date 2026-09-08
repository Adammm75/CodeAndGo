import { reassurance } from '@/data/site';

import { Check } from './Icons';
import { Reveal } from './Reveal';
import styles from './Reassurance.module.css';

/**
 * Bande de réassurance : ce sont des engagements de méthode, jamais des
 * résultats clients chiffrés.
 */
export function Reassurance() {
  return (
    <section className={styles.strip} aria-label="Nos engagements">
      <div className={`container ${styles.inner}`}>
        <ul className={styles.list}>
          {reassurance.map((item, index) => (
            <Reveal as="li" key={item} delay={index * 70} className={styles.item}>
              <Check className={styles.icon} />
              {item}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

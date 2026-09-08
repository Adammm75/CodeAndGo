import type { ReactNode } from 'react';

import { Reveal } from './Reveal';
import styles from './SectionIntro.module.css';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'start' | 'center';
  /** Contenu optionnel aligné à droite (lien, action). */
  aside?: ReactNode;
  /** Niveau de titre, pour garder une hiérarchie correcte selon le contexte. */
  as?: 'h2' | 'h3';
  id?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  lead,
  align = 'start',
  aside,
  as: Heading = 'h2',
  id,
}: Props) {
  return (
    <div className={`${styles.wrap} ${align === 'center' ? styles.center : ''}`}>
      <div className={styles.main}>
        <Reveal as="p" className="eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal delay={80}>
          <Heading id={id} className={`h2 ${styles.title}`}>
            {title}
          </Heading>
        </Reveal>
        {lead ? (
          <Reveal as="p" delay={150} className={`lead ${styles.lead}`}>
            {lead}
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal delay={200} className={styles.aside}>
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}

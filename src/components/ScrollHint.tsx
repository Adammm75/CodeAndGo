'use client';

import type { MouseEvent } from 'react';

import styles from './Hero.module.css';

type Props = {
  /** Identifiant de la section visée, sans le dièse. */
  target: string;
  label: string;
};

/**
 * Invitation à faire défiler la page.
 *
 * Le défilement doux est déclenché ici, à la demande, plutôt que via un
 * `scroll-behavior: smooth` global : ce dernier s'appliquait aussi au retour
 * en haut de page lors des changements de route, donnant une navigation lente.
 */
export function ScrollHint({ target, label }: Props) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById(target);
    if (!section) return;

    event.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    // L'ancre reste dans l'URL : le lien demeure partageable et réversible.
    history.replaceState(null, '', `#${target}`);
  };

  return (
    <a href={`#${target}`} className={styles.scrollHint} onClick={onClick}>
      <span className={styles.scrollTrack} aria-hidden="true">
        <span className={styles.scrollDot} />
      </span>
      {label}
    </a>
  );
}

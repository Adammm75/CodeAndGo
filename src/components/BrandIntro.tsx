'use client';

import { useEffect, useState } from 'react';

import styles from './BrandIntro.module.css';

const SESSION_KEY = 'cg-intro-played';
/* Le voile masquait la page pendant plus d'une seconde à chaque première
   arrivée. Il joue toujours, mais le site redevient lisible dès ~300 ms. */
const DURATION = 950;

/**
 * Introduction de marque au premier chargement.
 *
 * Contraintes tenues : elle ne bloque jamais l'interaction (`pointer-events:
 * none`), elle est invisible pour les technologies d'assistance, elle est
 * ignorée si l'utilisateur demande un mouvement réduit, et elle ne rejoue pas
 * pendant la même session de navigation.
 */
export function BrandIntro() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      return;
    }

    let alreadyPlayed = false;
    try {
      alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      // Stockage indisponible (navigation privée, réglages stricts) : on joue
      // simplement l'animation, ce n'est pas un état critique.
    }

    if (alreadyPlayed) {
      setPhase('done');
      return;
    }

    setPhase('playing');
    const timer = window.setTimeout(() => {
      setPhase('done');
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Sans stockage, l'introduction rejouera au prochain chargement complet.
      }
    }, DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  if (phase !== 'playing') return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.inner}>
        <p className={styles.wordmark}>
          <span className={styles.code}>CODE</span>
          <span className={styles.amp}>&amp;</span>
          <span className={styles.go}>GO</span>
        </p>
        <div className={styles.track}>
          <span className={styles.bar} />
        </div>
        <p className={styles.caption}>STRATÉGIE · DESIGN · TECHNOLOGIE</p>
      </div>
    </div>
  );
}

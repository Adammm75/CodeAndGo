'use client';

import { useEffect, useRef } from 'react';

import styles from './HeroVisual.module.css';

/**
 * Composition 3D du hero, entièrement dessinée en HTML/CSS (aucune image).
 * La parallaxe ne s'active que sur pointeur fin, et jamais en mouvement réduit.
 * L'ensemble est décoratif : masqué aux lecteurs d'écran, il duplique une
 * information déjà présente en texte dans le hero.
 */
export function HeroVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let tiltX = 0;
    let tiltY = 0;

    const paint = () => {
      frame = 0;
      scene.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      scene.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      // Amplitude volontairement faible : la parallaxe doit rester subliminale.
      tiltY = ((event.clientX / innerWidth) * 2 - 1) * 5;
      tiltX = ((event.clientY / innerHeight) * 2 - 1) * -3.5;
      if (frame === 0) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.stage} aria-hidden="true" data-anim>
      <div ref={sceneRef} className={styles.scene}>
        <span className={styles.orbit} />
        <span className={styles.orbitInner} />

        {/* Fenêtre de navigateur */}
        <div className={styles.browser}>
          <div className={styles.chrome}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.urlBar}>codeandgo.fr</span>
          </div>

          <div className={styles.viewport}>
            <span className={styles.scan} />

            <div className={styles.appHead}>
              <span className={styles.appTitle} />
              <span className={styles.appPill} />
            </div>

            <div className={styles.appBody}>
              <div className={styles.appHero}>
                <span className={styles.lineLg} />
                <span className={styles.lineMd} />
                <span className={styles.lineSm} />
                <span className={styles.appCta} />
              </div>

              <div className={styles.appAside}>
                <span className={styles.thumb} />
                <span className={styles.lineSm} />
                <span className={styles.lineXs} />
              </div>
            </div>

            <div className={styles.appGrid}>
              <span className={styles.cell} />
              <span className={styles.cell} />
              <span className={styles.cell} />
            </div>
          </div>
        </div>

        {/* Carte mobile */}
        <div className={styles.phone}>
          <span className={styles.notch} />
          <div className={styles.phoneScreen}>
            <span className={styles.phoneBar} />
            <span className={styles.phoneBlock} />
            <span className={styles.phoneLine} />
            <span className={styles.phoneLineShort} />
            <span className={styles.phoneCta} />
          </div>
        </div>

        {/* Score de performance */}
        <div className={styles.scoreCard}>
          <div className={styles.gauge}>
            <span className={styles.gaugeValue}>96</span>
          </div>
          <div className={styles.scoreMeta}>
            <span className={styles.scoreLabel}>Performance</span>
            <span className={styles.scoreHint}>objectif de build</span>
          </div>
        </div>

        {/* Indicateur de conversion + mini graphique */}
        <div className={styles.chartCard}>
          <div className={styles.chartHead}>
            <span className={styles.chartLabel}>Contacts</span>
            <span className={styles.chartTrend}>en hausse</span>
          </div>
          <div className={styles.chart}>
            {[38, 52, 44, 66, 58, 80, 92].map((height, index) => (
              <span
                key={index}
                className={styles.bar}
                style={{ '--h': `${height}%`, '--d': `${index * 90}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* Balises techniques */}
        <span className={`${styles.codeTag} ${styles.codeTagTop}`}>&lt;strategy /&gt;</span>
        <span className={`${styles.codeTag} ${styles.codeTagBottom}`}>SEO.ready()</span>

        {/* Sceau */}
        <div className={styles.seal}>
          <span className={styles.sealMark}>CG</span>
          <span className={styles.sealText}>Creative Engineering</span>
        </div>
      </div>
    </div>
  );
}

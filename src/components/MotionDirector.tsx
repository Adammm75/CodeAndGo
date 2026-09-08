'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Chef d'orchestre du mouvement, monté une seule fois dans le layout.
 *
 * - révèle les blocs `.reveal` à l'entrée dans le viewport (une seule fois) ;
 * - déplace un halo ambiant discret sous le pointeur, uniquement sur les
 *   appareils dotés d'un pointeur fin et si l'utilisateur ne demande pas de
 *   mouvement réduit.
 *
 * Aucun écouteur n'est laissé en place au démontage.
 */
export function MotionDirector() {
  const pathname = usePathname();

  // Révélation au scroll — relancée à chaque navigation client.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'));
    if (nodes.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    // Filet de sécurité : si l'observateur n'a jamais été appelé, c'est qu'il
    // est inopérant (onglet jamais rendu, moteur qui suspend les frames,
    // extension intrusive) et on affiche tout.
    //
    // Le critère est bien « l'observateur a-t-il été appelé » et non « un bloc
    // a-t-il été révélé » : sur l'accueil, le héros occupe tout le premier
    // écran, donc aucun bloc n'est révélé tant que le visiteur n'a pas fait
    // défiler. L'ancien critère prenait cette situation normale pour une panne
    // et affichait d'un coup les 67 blocs de la page — une seule image de
    // rendu à 450 ms, et plus aucune révélation au défilement ensuite.
    // Un IntersectionObserver appelle toujours son rappel après `observe()`,
    // même quand rien n'intersecte : le signal est donc fiable.
    let observerRan = false;

    const observer = new IntersectionObserver(
      (entries) => {
        observerRan = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          // `is-entering` ne promeut le bloc en calque que le temps de son
          // animation ; il est retiré dès la fin de la transition.
          node.classList.add('is-entering', 'is-visible');
          node.addEventListener(
            'transitionend',
            () => node.classList.remove('is-entering'),
            { once: true },
          );
          observer.unobserve(node);
        }
      },
      // Marge basse positive : le bloc est révélé un peu avant d'entrer dans
      // l'écran. En défilement rapide, le contenu est déjà en place au lieu
      // d'apparaître avec un temps de retard.
      { rootMargin: '0px 0px 25% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));

    const safety = window.setTimeout(() => {
      if (observerRan) return;
      observer.disconnect();
      nodes.forEach((node) => node.classList.add('is-visible'));
    }, 2000);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
  }, [pathname]);

  // Mise en pause des animations perpétuelles sorties du champ.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-anim]'));
    if (nodes.length === 0 || typeof IntersectionObserver === 'undefined') return;

    // Rien n'est mis en pause à l'avance. Si l'observateur ne répondait jamais
    // — onglet jamais rendu, moteur qui suspend les frames — tout mettre en
    // pause au départ figerait le site définitivement. On part donc de l'état
    // normal : au pire, l'optimisation ne s'applique pas.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('anim-paused', !entry.isIntersecting);
        }
      },
      // Marge généreuse : l'animation a repris bien avant que le bloc n'entre
      // dans le champ, on ne voit donc jamais un élément « démarrer ».
      { rootMargin: '200px 0px 200px 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  // Halo ambiant suivant le pointeur.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    const glow = document.createElement('div');
    glow.className = 'pointer-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      frame = 0;
      glow.style.setProperty('--px', `${x}px`);
      glow.style.setProperty('--py', `${y}px`);
      glow.classList.add('is-on');
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      // Une seule écriture de style par frame : pas de recalcul continu.
      if (frame === 0) frame = window.requestAnimationFrame(paint);
    };

    const onLeave = () => glow.classList.remove('is-on');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) window.cancelAnimationFrame(frame);
      glow.remove();
    };
  }, []);

  return null;
}

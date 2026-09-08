import Image from 'next/image';

import type { Project } from '@/data/projects';

import styles from './ProjectMockup.module.css';

type Props = {
  project: Project;
  /** Grand format : la carte occupe toute la largeur de la grille. */
  featured?: boolean;
  /** À activer uniquement pour une image visible au chargement (page projet). */
  priority?: boolean;
};

/**
 * Capture réelle du site publié, présentée dans le même cadre de fenêtre que
 * les maquettes CSS : le survol, le halo et le reflet restent identiques.
 *
 * L'image est décorative (le titre et le résumé du projet sont juste à côté),
 * d'où l'`alt` vide plutôt qu'une description redondante à l'oral.
 */
export function ProjectShot({ project, featured = false, priority = false }: Props) {
  if (!project.image) return null;

  return (
    <div className={`${styles.mockup} ${styles[project.accent]} ${featured ? styles.featured : ''}`}>
      <span className={styles.glow} aria-hidden="true" />
      <div className={styles.window}>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          {project.host ? <span className={styles.address}>{project.host}</span> : null}
        </div>
        <Image
          src={project.image}
          alt=""
          width={1600}
          height={1000}
          className={styles.photo}
          sizes={featured ? '(min-width: 1200px) 1160px, 100vw' : '(min-width: 900px) 50vw, 100vw'}
          placeholder="blur"
          blurDataURL={project.blur}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </div>
      <span className={styles.reflection} aria-hidden="true" />
    </div>
  );
}

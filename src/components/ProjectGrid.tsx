import type { Project } from '@/data/projects';

import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';
import styles from './ProjectGrid.module.css';

type Props = {
  projects: readonly Project[];
  /** Met le premier projet en grand format (grille éditoriale asymétrique). */
  featureFirst?: boolean;
};

export function ProjectGrid({ projects, featureFirst = true }: Props) {
  if (projects.length === 0) {
    return (
      <p className={styles.empty} role="status">
        Aucun projet ne correspond à ce filtre pour le moment. Essayez une autre catégorie ou
        affichez tous les projets.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <Reveal
          key={project.slug}
          delay={Math.min(index, 3) * 90}
          from={featureFirst && index === 0 ? 'bottom' : index % 2 === 0 ? 'left' : 'right'}
          className={featureFirst && index === 0 ? styles.featuredSlot : undefined}
        >
          <ProjectCard project={project} featured={featureFirst && index === 0} />
        </Reveal>
      ))}
    </div>
  );
}

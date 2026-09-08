import Link from 'next/link';

import type { Project } from '@/data/projects';

import { ArrowUpRight } from './Icons';
import { ProjectMockup } from './ProjectMockup';
import { ProjectShot } from './ProjectShot';
import styles from './ProjectCard.module.css';

type Props = {
  project: Project;
  /** Grand format éditorial, réservé au premier projet de la grille. */
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: Props) {
  return (
    <article className={`project-card ${styles.card} ${featured ? styles.featured : ''}`}>
      {/* Capture du site réel quand elle existe ; la maquette CSS reste le
          repli pour un projet sans visuel publiable. */}
      {project.image ? (
        <ProjectShot project={project} featured={featured} />
      ) : (
        <ProjectMockup variant={project.mockup} accent={project.accent} featured={featured} />
      )}

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
          <span className={styles.year}>{project.year}</span>
          {project.demo ? <span className={`demo-flag ${styles.demo}`}>Concept de démonstration</span> : null}

          {/* Ancre réelle, placée au-dessus de la zone cliquable de la carte :
              le visiteur peut ouvrir le site publié sans passer par la fiche. */}
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={styles.live}
              aria-label={`Ouvrir le site ${project.title} dans un nouvel onglet`}
            >
              <span className={styles.liveDot} aria-hidden="true" />
              Voir le site
            </a>
          ) : null}
        </div>

        <h3 className={`h3 ${styles.title}`}>
          {/* Le lien couvre toute la carte, tout en restant un lien unique et nommé. */}
          <Link href={`/realisations/${project.slug}`} className={styles.link}>
            {project.title}
            <ArrowUpRight className={styles.arrow} />
          </Link>
        </h3>

        <p className={styles.summary}>{project.summary}</p>

        <ul className={styles.tech}>
          {project.tech.map((item) => (
            <li key={item} className="tag">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

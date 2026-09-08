'use client';

import { useMemo, useState } from 'react';

import { projectCategories, projects, type ProjectCategory } from '@/data/projects';

import { ProjectGrid } from './ProjectGrid';
import styles from './ProjectFilter.module.css';

type Filter = ProjectCategory | 'toutes';

export function ProjectFilter() {
  const [filter, setFilter] = useState<Filter>('toutes');

  const visible = useMemo(
    () => (filter === 'toutes' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const options: readonly Filter[] = ['toutes', ...projectCategories];

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <div className={styles.filters} role="group" aria-label="Filtrer les réalisations">
          {options.map((option) => {
            const selected = filter === option;
            return (
              <button
                key={option}
                type="button"
                className={`${styles.chip} ${selected ? styles.chipActive : ''}`}
                aria-pressed={selected}
                onClick={() => setFilter(option)}
              >
                {option === 'toutes' ? 'Tous les projets' : option}
              </button>
            );
          })}
        </div>

        <p className={styles.count} aria-live="polite">
          {visible.length} projet{visible.length > 1 ? 's' : ''} affiché
          {visible.length > 1 ? 's' : ''}
        </p>
      </div>

      <ProjectGrid projects={visible} featureFirst={filter === 'toutes'} />
    </div>
  );
}

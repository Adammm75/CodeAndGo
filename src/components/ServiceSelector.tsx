'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import { services } from '@/data/services';

import { ArrowRight } from './Icons';
import styles from './ServiceSelector.module.css';

export function ServiceSelector() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, moveFocus = false) => {
    setActive(index);
    if (moveFocus) tabsRef.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = services.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    select(next, true);
  };

  const current = services[active] ?? services[0];
  if (!current) return null;

  return (
    <div className={styles.selector}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-orientation="vertical"
        aria-label="Nos domaines d’intervention"
      >
        {services.map((service, index) => {
          const selected = index === active;
          return (
            <button
              key={service.slug}
              ref={(node) => {
                tabsRef.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`service-tab-${service.slug}`}
              aria-selected={selected}
              aria-controls={`service-panel-${service.slug}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
              onClick={() => select(index)}
              onFocus={() => select(index)}
              onMouseEnter={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className={styles.tabIndex}>{service.index}</span>
              <span className={styles.tabTitle}>{service.title}</span>
              <ArrowRight className={styles.tabArrow} />
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`service-panel-${current.slug}`}
        aria-labelledby={`service-tab-${current.slug}`}
        tabIndex={0}
        className={styles.panel}
      >
        {/* La clé force le rejeu de l'animation d'entrée sans changer la hauteur du bloc. */}
        <div key={current.slug} className={styles.panelInner}>
          <div className={styles.panelHead}>
            <span className={styles.panelIndex}>{current.index}</span>
            <h3 className={`h3 ${styles.panelTitle}`}>{current.title}</h3>
          </div>

          <p className={styles.promise}>{current.promise}</p>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>Pour qui</dt>
              <dd>{current.audience}</dd>
            </div>
            <div className={styles.fact}>
              <dt>Ce que vous y gagnez</dt>
              <dd>{current.benefit}</dd>
            </div>
            <div className={styles.fact}>
              <dt>{current.objective.label}</dt>
              <dd className={styles.objective}>{current.objective.value}</dd>
            </div>
          </dl>

          <ul className={styles.tags}>
            {current.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>

          <Link href={`/services/${current.slug}`} className="link-arrow">
            Détail de la prestation
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

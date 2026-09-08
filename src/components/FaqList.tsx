'use client';

import { useState } from 'react';

import { faq } from '@/data/faq';

import { ChevronDown } from './Icons';
import styles from './FaqList.module.css';

/**
 * Accordéon accessible : boutons réels, `aria-expanded`, un seul panneau
 * ouvert à la fois, animation de hauteur via `grid-template-rows`.
 */
export function FaqList() {
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <ul className={styles.list}>
      {faq.map((item) => {
        const open = openId === item.id;
        return (
          <li key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-trigger-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span className={styles.question}>{item.question}</span>
                <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`} aria-hidden="true">
                  <ChevronDown />
                </span>
              </button>
            </h3>

            {/* `inert` plutôt que `hidden` : le panneau reste dans le flux, ce qui
                permet l'animation de hauteur, tout en le retirant du parcours
                clavier et de l'arbre d'accessibilité une fois replié. */}
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
              inert={!open}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

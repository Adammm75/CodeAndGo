import Link from 'next/link';

import { differentiators } from '@/data/differentiators';

import { ArrowRight } from './Icons';
import { Reveal } from './Reveal';
import styles from './WhyUs.module.css';

export function WhyUs() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="pourquoi-titre">
      <span className="halo halo--blue" aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.editorial}>
          <div className={styles.sticky}>
            <Reveal as="p" className="eyebrow">
              Pourquoi CodeAndGo
            </Reveal>
            <Reveal delay={80}>
              <h2 id="pourquoi-titre" className={`h2 ${styles.title}`}>
                Pas seulement un beau site.
                <br />
                <span className="gradient-text">Un outil conçu pour votre activité.</span>
              </h2>
            </Reveal>
            <Reveal as="p" delay={150} className={`lead ${styles.lead}`}>
              Un site n’est pas un objet décoratif : c’est le premier commercial de votre
              structure, disponible en permanence. Nous partons donc de ce qu’il doit produire —
              des appels, des messages, des devis — puis nous construisons le design, la
              structure et la technique autour de cet objectif.
            </Reveal>
            <Reveal delay={210}>
              <Link href="/a-propos" className="link-arrow">
                Notre façon de travailler
                <ArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>

        <ul className={styles.rows}>
          {differentiators.map((item, index) => (
            <Reveal as="li" key={item.index} from="right" delay={index * 80} className={styles.row}>
              <span className={styles.rowIndex}>{item.index}</span>
              <div className={styles.rowBody}>
                <h3 className={`h4 ${styles.rowTitle}`}>{item.title}</h3>
                <p className={styles.rowText}>{item.text}</p>
              </div>
              <span className={styles.sweep} aria-hidden="true" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

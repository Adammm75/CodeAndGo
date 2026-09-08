import Link from 'next/link';

import { site } from '@/data/site';

import { HeroVisual } from './HeroVisual';
import { ArrowRight } from './Icons';
import { ScrollHint } from './ScrollHint';
import styles from './Hero.module.css';

const expertises = [
  { label: 'Sites web', href: '/services/sites-web' },
  { label: 'E-commerce', href: '/services/e-commerce' },
  { label: 'SEO & refonte', href: '/services/seo-refonte' },
  { label: 'Solutions IA', href: '/services/solutions-ia' },
];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className="grid-lines" aria-hidden="true" />
      <span className={`halo halo--cyan ${styles.haloLeft}`} aria-hidden="true" />
      <span className={`halo halo--violet ${styles.haloRight}`} aria-hidden="true" />
      <span className={styles.ghost} aria-hidden="true">
        CONVAINCRE
      </span>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`badge-dot ${styles.badge}`}>{site.availability}</p>

          <p className={styles.label}>{site.tagline}</p>

          <h1 id="hero-title" className={`display ${styles.title}`}>
            Votre site web,
            <br />
            <span className="gradient-text">conçu pour convaincre.</span>
          </h1>

          <p className={`lead ${styles.intro}`}>{site.intro}</p>

          <div className={styles.actions}>
            <Link href="/devis" className="btn btn--primary">
              Parler de mon projet
              <ArrowRight />
            </Link>
            <Link href="/realisations" className="btn btn--ghost">
              Voir nos réalisations
            </Link>
          </div>

          <ul className={styles.expertises}>
            {expertises.map((item, index) => (
              <li key={item.href} style={{ '--i': index } as React.CSSProperties}>
                <Link href={item.href} className={styles.expertise}>
                  <span className={styles.expertiseDot} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <HeroVisual />
        </div>
      </div>

      <ScrollHint target="services" label="Découvrir" />
    </section>
  );
}

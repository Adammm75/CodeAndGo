import Link from 'next/link';

import { ArrowRight } from '@/components/Icons';
import { mainNav } from '@/data/site';

import styles from './status.module.css';

export default function NotFound() {
  return (
    <section className={styles.screen} aria-labelledby="notfound-titre">
      <div className="grid-lines" aria-hidden="true" />
      <span className={`halo halo--violet ${styles.halo}`} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <p className="eyebrow">Page introuvable</p>
        <h1 id="notfound-titre" className={`display ${styles.title}`}>
          Cette page a changé <span className="gradient-text">de direction.</span>
        </h1>
        <p className={`lead ${styles.text}`}>
          L’adresse demandée n’existe pas, ou plus. Rien n’est perdu : voici les chemins les plus
          utiles.
        </p>

        <div className={styles.actions}>
          <Link href="/" className="btn btn--primary">
            Retour à l’accueil
            <ArrowRight />
          </Link>
          <Link href="/contact" className="btn btn--ghost">
            Nous signaler le problème
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Pages principales">
          <ul className={styles.links}>
            {mainNav
              .filter((item) => item.href !== '/')
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

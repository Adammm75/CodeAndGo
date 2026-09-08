'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { ArrowRight } from '@/components/Icons';

import styles from './status.module.css';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    // Trace côté client : utile pour relier un incident à son identifiant.
    console.error('[erreur]', error.digest ?? error.message);
  }, [error]);

  return (
    <section className={styles.screen} aria-labelledby="erreur-titre">
      <div className="grid-lines" aria-hidden="true" />
      <span className={`halo halo--cyan ${styles.halo}`} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          500
        </p>
        <p className="eyebrow">Erreur inattendue</p>
        <h1 id="erreur-titre" className={`display ${styles.title}`}>
          Quelque chose <span className="gradient-text">s’est mal passé.</span>
        </h1>
        <p className={`lead ${styles.text}`}>
          Une erreur technique a interrompu l’affichage de cette page. Vous pouvez réessayer
          immédiatement ; si le problème persiste, écrivez-nous.
        </p>

        <div className={styles.actions}>
          <button type="button" className="btn btn--primary" onClick={reset}>
            Réessayer
            <ArrowRight />
          </button>
          <Link href="/" className="btn btn--ghost">
            Retour à l’accueil
          </Link>
        </div>

        {error.digest ? (
          <p className={styles.digest}>
            Référence de l’incident : <span className="num">{error.digest}</span>
          </p>
        ) : null}
      </div>
    </section>
  );
}

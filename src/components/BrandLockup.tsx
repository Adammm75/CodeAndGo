import Image from 'next/image';
import Link from 'next/link';

import { site } from '@/data/site';

import styles from './BrandLockup.module.css';

type Props = {
  /** `full` ajoute la baseline sous le nom. */
  variant?: 'compact' | 'full';
  /** Rend le bloc non cliquable (utile en pied de page ou dans une carte). */
  asLink?: boolean;
  /** Réservé à l'en-tête : précharge la marque avec le premier écran. */
  priority?: boolean;
};

export function BrandLockup({ variant = 'compact', asLink = true, priority = false }: Props) {
  const content = (
    <>
      <Image
        src={site.brand.circle}
        alt=""
        width={44}
        height={44}
        className={styles.mark}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes="44px"
      />
      <span className={styles.text}>
        <span className={styles.name}>CodeAndGo</span>
        {variant === 'full' ? <span className={styles.baseline}>{site.tagline}</span> : null}
      </span>
    </>
  );

  if (!asLink) {
    return <span className={styles.lockup}>{content}</span>;
  }

  return (
    <Link href="/" className={styles.lockup} aria-label={`${site.name} — retour à l’accueil`}>
      {content}
    </Link>
  );
}

import Link from 'next/link';

import { site } from '@/data/site';

import { ArrowRight, Mail, Phone } from './Icons';
import { Reveal } from './Reveal';
import styles from './FinalCta.module.css';

export function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-titre">
      <span className={styles.beam} aria-hidden="true" data-anim />
      <div className="grid-lines" aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <Reveal as="p" className={`eyebrow eyebrow--plain ${styles.eyebrow}`}>
          Prochaine étape
        </Reveal>

        <Reveal delay={90}>
          <h2 id="cta-titre" className={`display ${styles.title}`}>
            Et si votre site devenait enfin{' '}
            <span className="gradient-text">un vrai point de départ&nbsp;?</span>
          </h2>
        </Reveal>

        <Reveal as="p" delay={160} className={`lead ${styles.text}`}>
          Un premier échange suffit pour clarifier le besoin, le budget et la meilleure manière
          d’avancer.
        </Reveal>

        <Reveal delay={230} className={styles.actions}>
          <Link href="/devis" className="btn btn--primary">
            Discutons de votre projet
            <ArrowRight />
          </Link>
          <a href={site.contact.phoneHref} className="btn btn--ghost">
            <Phone />
            {site.contact.phone}
          </a>
        </Reveal>

        <Reveal as="p" delay={300} className={styles.alt}>
          <Mail className={styles.altIcon} />
          <a href={site.contact.emailHref} className={styles.altLink}>
            {site.contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

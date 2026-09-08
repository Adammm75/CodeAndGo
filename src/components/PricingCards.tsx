import Link from 'next/link';

import { plans, pricingDisclaimer, pricingTerms } from '@/data/pricing';

import { ArrowRight, Check } from './Icons';
import { Reveal } from './Reveal';
import styles from './PricingCards.module.css';

export function PricingCards() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {plans.map((plan, index) => (
          <Reveal
            key={plan.slug}
            delay={index * 90}
            className={`${styles.slot} ${plan.recommended ? styles.slotRecommended : ''}`}
          >
            <article className={`${styles.card} ${plan.recommended ? styles.recommended : ''}`}>
              {plan.recommended ? <p className={styles.flag}>Le plus demandé</p> : null}

              <header className={styles.head}>
                <h3 className={`h3 ${styles.name}`}>{plan.name}</h3>
                <p className={styles.audience}>{plan.audience}</p>
              </header>

              {/* La mensualité est lue en premier, le total juste en dessous :
                  l'information reste complète, elle est simplement présentée
                  dans l'ordre où elle se comprend. */}
              <p className={styles.price}>
                <span className={styles.priceFrom}>{plan.monthly ? 'À partir de' : 'Budget'}</span>
                <span className={styles.priceValue}>
                  {plan.monthly ?? 'Sur devis'}
                  {plan.monthly ? <span className={styles.priceUnit}> / mois</span> : null}
                </span>
                <span className={styles.priceNote}>{plan.priceNote}</span>
                <span className={styles.priceDelay}>{plan.delay}</span>
              </p>

              <p className={styles.summary}>{plan.summary}</p>

              <ul className={styles.includes}>
                {plan.includes.map((item) => (
                  <li key={item} className={styles.include}>
                    <Check className={styles.check} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/devis"
                className={`btn btn--block ${plan.recommended ? 'btn--primary' : 'btn--ghost'} ${styles.cta}`}
              >
                Demander un devis gratuit
                <ArrowRight />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal as="ul" delay={100} className={styles.terms}>
        {pricingTerms.map((term) => (
          <li key={term} className={styles.term}>
            <Check className={styles.termCheck} />
            <span>{term}</span>
          </li>
        ))}
      </Reveal>

      <Reveal as="p" delay={120} className={styles.disclaimer}>
        {pricingDisclaimer}
      </Reveal>
    </div>
  );
}

import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { QuoteWizard } from '@/components/QuoteWizard';
import { Reveal } from '@/components/Reveal';
import { site } from '@/data/site';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

import styles from './devis.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Demander un devis',
  description:
    'Décrivez votre projet en quelques étapes : type de site, objectifs, budget et délais. Réponse sous 24 à 48 heures ouvrées, sans engagement.',
  path: '/devis',
});

const steps = [
  'Vous décrivez votre projet en six étapes courtes.',
  'Nous revenons vers vous sous 24 à 48 heures ouvrées.',
  'Un échange de 20 minutes permet de cadrer le besoin.',
  'Vous recevez un devis écrit et détaillé, sans engagement.',
];

export default function DevisPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Devis', path: '/devis' },
        ])}
      />

      <PageHeader
        eyebrow="Demande de devis"
        title={
          <>
            Parlons de votre projet, <span className="gradient-text">sans engagement.</span>
          </>
        }
        lead="Quelques questions pour comprendre votre besoin. Cela prend environ deux minutes et nous permet d’arriver préparés au premier échange."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Devis', href: '/devis' },
        ]}
      />

      <section className="section" aria-label="Formulaire de demande de devis">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.form}>
              <QuoteWizard />
            </div>

            <Reveal from="right" delay={120} className={styles.asideWrap}>
              <aside className={styles.aside} aria-label="Comment se passe la suite">
                <h2 className={styles.asideTitle}>Ce qui se passe ensuite</h2>
                <ol className={styles.steps}>
                  {steps.map((text, index) => (
                    <li key={text} className={styles.step}>
                      <span className={styles.stepIndex}>{String(index + 1).padStart(2, '0')}</span>
                      <p>{text}</p>
                    </li>
                  ))}
                </ol>

                <div className={styles.direct}>
                  <h3 className={styles.directTitle}>Vous préférez appeler ?</h3>
                  <a href={site.contact.phoneHref} className={styles.directLink}>
                    {site.contact.phone}
                  </a>
                  <a href={site.contact.emailHref} className={styles.directLink}>
                    {site.contact.email}
                  </a>
                </div>

                <p className={styles.privacy}>
                  Vos informations servent uniquement à traiter votre demande. Elles ne sont ni
                  revendues, ni utilisées à des fins publicitaires.
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

import { FinalCta } from '@/components/FinalCta';
import { ArrowRight } from '@/components/Icons';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { Reveal } from '@/components/Reveal';
import { SectionIntro } from '@/components/SectionIntro';
import { services } from '@/data/services';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

import styles from './services.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Services — création de sites web, e-commerce, SEO et IA',
  description:
    'Création de sites vitrines, boutiques en ligne, refonte et référencement, solutions IA sur mesure. Découvrez nos prestations et leur périmètre.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />

      <PageHeader
        eyebrow="Nos prestations"
        title={
          <>
            Ce que nous <span className="gradient-text">construisons pour vous.</span>
          </>
        }
        lead="Quatre prestations, chacune répondant à une situation précise. Le point commun : un site pensé pour produire des contacts, pas seulement pour exister."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
      />

      <section className="section" aria-label="Liste des prestations">
        <div className="container">
          <ul className={styles.list}>
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 80} className={styles.item}>
                <article className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className={styles.index}>{service.index}</span>
                    <h2 className={`h3 ${styles.title}`}>
                      <Link href={`/services/${service.slug}`} className={styles.link}>
                        {service.title}
                        <ArrowRight className={styles.arrow} />
                      </Link>
                    </h2>
                  </div>

                  <p className={styles.promise}>{service.promise}</p>

                  <dl className={styles.facts}>
                    <div>
                      <dt>Pour qui</dt>
                      <dd>{service.audience}</dd>
                    </div>
                    <div>
                      <dt>{service.objective.label}</dt>
                      <dd className={styles.objective}>{service.objective.value}</dd>
                    </div>
                  </dl>

                  <ul className={styles.tags}>
                    {service.tags.map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="methode-services">
        <div className="container">
          <SectionIntro
            id="methode-services"
            eyebrow="Comment se déroule un projet"
            title={
              <>
                Une méthode <span className="gradient-text">identique pour tous les projets.</span>
              </>
            }
            lead="Quelle que soit la prestation, les six étapes restent les mêmes. Seule leur profondeur varie."
          />
          <ProcessTimeline />
        </div>
      </section>

      <FinalCta />
    </>
  );
}

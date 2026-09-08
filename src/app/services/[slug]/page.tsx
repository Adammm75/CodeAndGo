import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FinalCta } from '@/components/FinalCta';
import { ArrowRight, Check } from '@/components/Icons';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { PricingCards } from '@/components/PricingCards';
import { Reveal } from '@/components/Reveal';
import { SectionIntro } from '@/components/SectionIntro';
import { getService, services } from '@/data/services';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

import styles from './service.module.css';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return pageMetadata({
      title: 'Prestation introuvable',
      description: 'Cette prestation n’existe pas ou n’est plus proposée.',
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: service.title,
    description: service.promise,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={`Prestation ${service.index}`}
        title={service.title}
        lead={service.promise}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <ul className={styles.tags}>
          {service.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="section" aria-labelledby="approche-titre">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.main}>
              <Reveal as="p" className={styles.intro}>
                {service.intro}
              </Reveal>

              <h2 id="approche-titre" className={`h2 ${styles.sectionTitle}`}>
                Notre approche
              </h2>

              <ul className={styles.approach}>
                {service.approach.map((step, index) => (
                  <Reveal
                    as="li"
                    key={step.title}
                    delay={index * 80}
                    className={styles.approachItem}
                  >
                    <span className={styles.approachIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={`h4 ${styles.approachTitle}`}>{step.title}</h3>
                      <p className={styles.approachText}>{step.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal from="right" delay={120} className={styles.asideWrap}>
              <aside className={styles.aside} aria-label="Détail de la prestation">
                <div className={styles.asideBlock}>
                  <h2 className={styles.asideTitle}>Pour qui</h2>
                  <p className={styles.asideText}>{service.audience}</p>
                </div>

                <div className={styles.asideBlock}>
                  <h2 className={styles.asideTitle}>Ce que vous y gagnez</h2>
                  <p className={styles.asideText}>{service.benefit}</p>
                </div>

                <div className={styles.asideBlock}>
                  <h2 className={styles.asideTitle}>{service.objective.label}</h2>
                  <p className={styles.objective}>{service.objective.value}</p>
                </div>

                <div className={styles.asideBlock}>
                  <h2 className={styles.asideTitle}>Ce qui est livré</h2>
                  <ul className={styles.deliverables}>
                    {service.deliverables.map((item) => (
                      <li key={item} className={styles.deliverable}>
                        <Check className={styles.check} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/devis" className="btn btn--primary btn--block">
                  Demander un devis
                  <ArrowRight />
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tarifs-service">
        <div className="container">
          <SectionIntro
            id="tarifs-service"
            eyebrow="Budget"
            title={
              <>
                Des repères <span className="gradient-text">avant le devis.</span>
              </>
            }
            lead="Les offres ci-dessous couvrent l’ensemble des prestations. Le périmètre exact est arrêté après un premier échange."
          />
          <PricingCards />
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="autres-services">
        <div className="container">
          <h2 id="autres-services" className={`h3 ${styles.othersTitle}`}>
            Autres prestations
          </h2>
          <ul className={styles.others}>
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className={styles.otherLink}>
                  <span className={styles.otherIndex}>{item.index}</span>
                  <span className={styles.otherTitle}>{item.title}</span>
                  <ArrowRight className={styles.otherArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

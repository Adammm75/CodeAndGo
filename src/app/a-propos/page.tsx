import type { Metadata } from 'next';

import { FinalCta } from '@/components/FinalCta';
import { FounderSection } from '@/components/FounderSection';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { SectionIntro } from '@/components/SectionIntro';
import { site, values } from '@/data/site';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

import styles from './a-propos.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'À propos',
  description:
    'CodeAndGo est une agence web et IA indépendante fondée par Adam Mekkiou, développeur web full stack. Un interlocuteur unique, des décisions expliquées.',
  path: '/a-propos',
});

const manifesto = [
  'Un site n’a que quelques secondes pour être compris. Tout le reste — l’esthétique, la technique, les fonctionnalités — vient après cette première seconde de clarté.',
  'Un beau site qui ne génère aucun contact est un échec commercial. Nous partons donc de ce que le site doit produire, puis nous concevons à rebours.',
  'La performance n’est pas un bonus technique : c’est la première condition pour qu’un visiteur reste. Elle se décide pendant la construction, pas après.',
  'Un site doit rester utilisable sans son concepteur. Vous devez pouvoir le faire vivre, le modifier et le faire évoluer sans dépendre de quiconque.',
];

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'À propos', path: '/a-propos' },
        ])}
      />

      <PageHeader
        eyebrow="À propos"
        title={
          <>
            Une agence à taille humaine, <span className="gradient-text">volontairement.</span>
          </>
        }
        lead={`${site.name} est une structure indépendante. Vous parlez à la personne qui conçoit, développe et met en ligne votre site — pas à un intermédiaire qui transmettra.`}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'À propos', href: '/a-propos' },
        ]}
      />

      <section className="section" aria-labelledby="manifeste-titre">
        <div className="container">
          <SectionIntro
            id="manifeste-titre"
            eyebrow="Notre manifeste"
            title={
              <>
                Quatre convictions <span className="gradient-text">qui guident chaque projet.</span>
              </>
            }
          />

          <ol className={styles.manifesto}>
            {manifesto.map((text, index) => (
              <Reveal as="li" key={text} delay={index * 90} className={styles.conviction}>
                <span className={styles.convictionIndex}>{String(index + 1).padStart(2, '0')}</span>
                <p>{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-label="Le fondateur">
        <div className="container">
          <FounderSection />
        </div>
      </section>

      <section className="section" aria-labelledby="valeurs-titre">
        <div className="container">
          <SectionIntro
            id="valeurs-titre"
            eyebrow="Nos valeurs"
            title={
              <>
                Neuf principes <span className="gradient-text">tenus dans la durée.</span>
              </>
            }
            lead="Ce ne sont pas des mots posés sur une page : ce sont les critères qui tranchent nos arbitrages quand un projet devient complexe."
          />

          <ul className={styles.values}>
            {values.map((value, index) => (
              <Reveal
                as="li"
                key={value.title}
                delay={Math.min(index, 5) * 70}
                className={styles.value}
              >
                <h3 className={`h4 ${styles.valueTitle}`}>{value.title}</h3>
                <p className={styles.valueText}>{value.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="coordonnees-titre">
        <div className="container">
          <SectionIntro
            id="coordonnees-titre"
            eyebrow="Coordonnées"
            title="Où nous joindre"
            align="center"
          />

          <ul className={styles.contactGrid}>
            <Reveal as="li" className={styles.contactCard}>
              <h3 className={styles.contactLabel}>Téléphone</h3>
              <a href={site.contact.phoneHref} className={styles.contactValue}>
                {site.contact.phone}
              </a>
            </Reveal>
            <Reveal as="li" delay={80} className={styles.contactCard}>
              <h3 className={styles.contactLabel}>E-mail</h3>
              <a href={site.contact.emailHref} className={styles.contactValue}>
                {site.contact.email}
              </a>
            </Reveal>
            <Reveal as="li" delay={160} className={styles.contactCard}>
              <h3 className={styles.contactLabel}>Zone d’intervention</h3>
              <p className={styles.contactValue}>{site.contact.area}</p>
            </Reveal>
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

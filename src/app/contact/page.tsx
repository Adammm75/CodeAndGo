import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactForm } from '@/components/ContactForm';
import { ArrowRight, Mail, Phone } from '@/components/Icons';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { QrDevis } from '@/components/QrDevis';
import { Reveal } from '@/components/Reveal';
import { site } from '@/data/site';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

import styles from './contact.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    `Contactez CodeAndGo : téléphone ${site.contact.phone}, e-mail ${site.contact.email}. Réponse sous 24 à 48 heures ouvrées.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Écrivez-nous, <span className="gradient-text">on vous répond vite.</span>
          </>
        }
        lead="Une question, un projet en réflexion ou un simple avis à demander : le premier échange est gratuit et sans engagement."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <section className="section" aria-label="Formulaire de contact">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.form}>
              <ContactForm />
            </div>

            <Reveal from="right" delay={120} className={styles.asideWrap}>
              <aside className={styles.aside} aria-label="Coordonnées directes">
                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Par téléphone</h2>
                  <a href={site.contact.phoneHref} className={styles.value}>
                    <Phone width={15} height={15} />
                    {site.contact.phone}
                  </a>
                  <p className={styles.note}>Du lundi au vendredi, de 9 h à 19 h.</p>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Par e-mail</h2>
                  <a href={site.contact.emailHref} className={styles.value}>
                    <Mail width={15} height={15} />
                    {site.contact.email}
                  </a>
                  <p className={styles.note}>Réponse sous 24 à 48 heures ouvrées.</p>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Zone d’intervention</h2>
                  <p className={styles.value}>{site.contact.area}</p>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Réseaux</h2>
                  <ul className={styles.socials}>
                    {site.socials.map((social) => (
                      <li key={social.href}>
                        <a
                          href={social.href}
                          className={styles.social}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <QrDevis />

                <div className={styles.quote}>
                  <p className={styles.quoteText}>
                    Vous avez déjà un projet précis&nbsp;? Le formulaire de devis permet de cadrer
                    le besoin plus finement.
                  </p>
                  <Link href="/devis" className="btn btn--ghost btn--sm btn--block">
                    Demander un devis
                    <ArrowRight />
                  </Link>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';

import { FaqList } from '@/components/FaqList';
import { FinalCta } from '@/components/FinalCta';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { PricingCards } from '@/components/PricingCards';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { SectionIntro } from '@/components/SectionIntro';
import { faq } from '@/data/faq';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Tarifs',
  description:
    'Trois offres de création de site internet, à partir de 230 € en 3 fois sans frais. Périmètre, délais et inclusions détaillés, devis gratuit.',
  path: '/tarifs',
});

export default function TarifsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Tarifs', path: '/tarifs' },
        ])}
      />
      <JsonLd data={faqJsonLd(faq)} />

      <PageHeader
        eyebrow="Tarifs indicatifs"
        title={
          <>
            Un budget annoncé, <span className="gradient-text">pas découvert en route.</span>
          </>
        }
        lead="Trois points de départ selon l’ampleur du projet, réglables en trois fois sans frais. Chaque devis est ensuite établi sur mesure, après un échange, gratuitement et sans engagement."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Tarifs', href: '/tarifs' },
        ]}
      />

      <section className="section" aria-label="Nos offres">
        <div className="container">
          <PricingCards />
        </div>
      </section>

      <section className="section" aria-labelledby="tarifs-methode">
        <div className="container">
          <SectionIntro
            id="tarifs-methode"
            eyebrow="Ce que couvre le tarif"
            title={
              <>
                Toutes les étapes, <span className="gradient-text">de la découverte à la mise en ligne.</span>
              </>
            }
            lead="Le prix annoncé couvre la conception, le design, le développement, les tests et la mise en production. Aucun poste n’apparaît en cours de projet."
          />
          <ProcessTimeline />
        </div>
      </section>

      <section className="section" aria-labelledby="tarifs-faq">
        <div className="container container--narrow">
          <SectionIntro
            id="tarifs-faq"
            eyebrow="Questions fréquentes"
            title="Avant de demander un devis"
            align="center"
          />
          <FaqList />
        </div>
      </section>

      <FinalCta />
    </>
  );
}

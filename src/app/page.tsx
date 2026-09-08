import Link from 'next/link';

import { FaqList } from '@/components/FaqList';
import { FinalCta } from '@/components/FinalCta';
import { FounderSection } from '@/components/FounderSection';
import { Hero } from '@/components/Hero';
import { ArrowRight } from '@/components/Icons';
import { JsonLd } from '@/components/JsonLd';
import { KineticBand } from '@/components/KineticBand';
import { Manifesto } from '@/components/Manifesto';
import { PricingCards } from '@/components/PricingCards';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { ProjectGrid } from '@/components/ProjectGrid';
import { QualityConsole } from '@/components/QualityConsole';
import { Reassurance } from '@/components/Reassurance';
import { SectionIntro } from '@/components/SectionIntro';
import { ServiceSelector } from '@/components/ServiceSelector';
import { WhyUs } from '@/components/WhyUs';
import { faq } from '@/data/faq';
import { projects } from '@/data/projects';
import { faqJsonLd } from '@/lib/seo';

export default function HomePage() {
  const selection = projects.slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />

      <Hero />
      <KineticBand />
      <Reassurance />

      <section className="section" id="services" aria-labelledby="services-titre">
        <div className="container">
          <SectionIntro
            id="services-titre"
            eyebrow="Nos services"
            title={
              <>
                Quatre façons de faire <span className="gradient-text">avancer votre projet.</span>
              </>
            }
            lead="Chaque prestation répond à une situation précise. Sélectionnez celle qui ressemble le plus à la vôtre."
            aside={
              <Link href="/services" className="link-arrow">
                Toutes les prestations
                <ArrowRight />
              </Link>
            }
          />
          <ServiceSelector />
        </div>
      </section>

      <Manifesto />

      <WhyUs />

      <section className="section" id="realisations" aria-labelledby="realisations-titre">
        <div className="container">
          <SectionIntro
            id="realisations-titre"
            eyebrow="Sélection de projets"
            title={
              <>
                Des interfaces pensées <span className="gradient-text">pour être utilisées.</span>
              </>
            }
            lead="Trois sites en ligne, de l’auto-école à la boutique de mode : structure, hiérarchie de l’information et parcours de conversion. Chacun est consultable directement."
            aside={
              <Link href="/realisations" className="link-arrow">
                Toutes les réalisations
                <ArrowRight />
              </Link>
            }
          />
          <ProjectGrid projects={selection} />
        </div>
      </section>

      <section className="section" aria-labelledby="methode-titre">
        <div className="container">
          <SectionIntro
            id="methode-titre"
            eyebrow="Notre méthode"
            title={
              <>
                Six étapes, <span className="gradient-text">aucune zone d’ombre.</span>
              </>
            }
            lead="Vous savez en permanence où en est le projet, ce qui vient d’être validé et ce qui vous sera demandé ensuite."
          />
          <ProcessTimeline />
        </div>
      </section>

      <section className="section" aria-labelledby="performance-titre">
        <div className="container">
          <SectionIntro
            id="performance-titre"
            eyebrow="Performance & qualité"
            title={
              <>
                Un site rapide <span className="gradient-text">se lit et se retient.</span>
              </>
            }
            lead="La vitesse, l’accessibilité et la structure SEO sont traitées pendant la construction du site, pas ajoutées après coup."
          />
          <QualityConsole />
        </div>
      </section>

      <section className="section" id="tarifs" aria-labelledby="tarifs-titre">
        <div className="container">
          <SectionIntro
            id="tarifs-titre"
            eyebrow="Tarifs indicatifs"
            title={
              <>
                Des repères clairs, <span className="gradient-text">avant même le devis.</span>
              </>
            }
            lead="Trois points de départ selon l’ampleur du projet. Le montant définitif est établi après un échange."
            aside={
              <Link href="/tarifs" className="link-arrow">
                Détail des offres
                <ArrowRight />
              </Link>
            }
          />
          <PricingCards />
        </div>
      </section>

      <section className="section" aria-label="Le fondateur">
        <div className="container">
          <FounderSection />
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-titre">
        <div className="container container--narrow">
          <SectionIntro
            id="faq-titre"
            eyebrow="Questions fréquentes"
            title="Ce qu’on nous demande le plus souvent"
            align="center"
          />
          <FaqList />
        </div>
      </section>

      <FinalCta />
    </>
  );
}

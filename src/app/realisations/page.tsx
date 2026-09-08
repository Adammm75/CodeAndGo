import type { Metadata } from 'next';

import { FinalCta } from '@/components/FinalCta';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { ProjectFilter } from '@/components/ProjectFilter';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Réalisations',
  description:
    'Sites en ligne conçus par CodeAndGo : auto-école, plateforme éducative et boutique de mode. Chaque projet est consultable directement.',
  path: '/realisations',
});

export default function RealisationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Réalisations', path: '/realisations' },
        ])}
      />

      <PageHeader
        eyebrow="Réalisations"
        title={
          <>
            Des projets pensés <span className="gradient-text">avant d’être dessinés.</span>
          </>
        }
        lead="Chaque projet présenté ici est en ligne et consultable en un clic. Nous décrivons ce qui a été conçu et pourquoi — la structure, les arbitrages, le parcours — sans revendiquer de résultat commercial que nous ne pourrions pas prouver."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Réalisations', href: '/realisations' },
        ]}
      />

      <section className="section" aria-label="Liste des réalisations">
        <div className="container">
          <ProjectFilter />
        </div>
      </section>

      <FinalCta />
    </>
  );
}

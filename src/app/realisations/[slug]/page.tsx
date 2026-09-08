import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FinalCta } from '@/components/FinalCta';
import { ArrowRight, ArrowUpRight } from '@/components/Icons';
import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/PageHeader';
import { ProjectMockup } from '@/components/ProjectMockup';
import { ProjectShot } from '@/components/ProjectShot';
import { Reveal } from '@/components/Reveal';
import { getProject, projects } from '@/data/projects';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

import styles from './project.module.css';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMetadata({
      title: 'Projet introuvable',
      description: 'Ce projet n’existe pas ou n’est plus publié.',
      path: `/realisations/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/realisations/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Réalisations', path: '/realisations' },
          { name: project.title, path: `/realisations/${project.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        lead={project.summary}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Réalisations', href: '/realisations' },
          { label: project.title, href: `/realisations/${project.slug}` },
        ]}
      >
        {project.demo ? (
          <p className={styles.demoNotice}>
            <span className="demo-flag">Concept de démonstration</span>
            <span className={styles.demoText}>
              Projet conçu en interne pour illustrer notre approche. Il ne correspond à aucune
              mission client et ne revendique aucun résultat commercial.
            </span>
          </p>
        ) : null}

        {project.url ? (
          <p className={styles.liveNotice}>
            <a href={project.url} target="_blank" rel="noreferrer" className={styles.liveLink}>
              <span className={styles.liveDot} aria-hidden="true" />
              Voir le site en ligne
              <ArrowUpRight />
            </a>
            <span className={styles.liveHost}>{project.host}</span>
          </p>
        ) : null}
      </PageHeader>

      <section className="section" aria-label="Aperçu du projet">
        <div className="container">
          <Reveal from="scale" className="project-card">
            {project.image ? (
              <ProjectShot project={project} featured priority />
            ) : (
              <ProjectMockup variant={project.mockup} accent={project.accent} featured />
            )}
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="contexte-titre">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.main}>
              <Reveal>
                <h2 id="contexte-titre" className={`h2 ${styles.title}`}>
                  Le contexte
                </h2>
              </Reveal>
              <Reveal as="p" delay={80} className={styles.text}>
                {project.context}
              </Reveal>

              <Reveal delay={120}>
                <h2 className={`h2 ${styles.title}`}>La réponse</h2>
              </Reveal>
              <ul className={styles.answers}>
                {project.answer.map((item, itemIndex) => (
                  <Reveal as="li" key={item} delay={itemIndex * 80} className={styles.answer}>
                    <span className={styles.answerIndex}>
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                    <p>{item}</p>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal from="right" delay={140} className={styles.asideWrap}>
              <aside className={styles.aside} aria-label="Informations du projet">
                <dl className={styles.meta}>
                  <div>
                    <dt>Catégorie</dt>
                    <dd>{project.category}</dd>
                  </div>
                  <div>
                    <dt>Année</dt>
                    <dd>{project.year}</dd>
                  </div>
                  <div>
                    <dt>Nature</dt>
                    <dd>{project.demo ? 'Concept de démonstration' : 'Site en ligne'}</dd>
                  </div>
                </dl>

                <div className={styles.techBlock}>
                  <h2 className={styles.asideTitle}>Technologies</h2>
                  <ul className={styles.tech}>
                    {project.tech.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--ghost btn--block"
                  >
                    Ouvrir le site
                    <ArrowUpRight />
                  </a>
                ) : null}

                <Link href="/devis" className="btn btn--primary btn--block">
                  Un projet similaire ?
                  <ArrowRight />
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {next && next.slug !== project.slug ? (
        <section className="section section--tight" aria-label="Projet suivant">
          <div className="container">
            <Link href={`/realisations/${next.slug}`} className={styles.next}>
              <span className={styles.nextLabel}>Projet suivant</span>
              <span className={styles.nextTitle}>{next.title}</span>
              <ArrowRight className={styles.nextArrow} />
            </Link>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}

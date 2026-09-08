import Link from 'next/link';
import type { ReactNode } from 'react';

import { Reveal } from './Reveal';
import styles from './PageHeader.module.css';

type Crumb = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumb?: readonly Crumb[];
  children?: ReactNode;
};

/** En-tête commun aux pages intérieures. */
export function PageHeader({ eyebrow, title, lead, breadcrumb, children }: Props) {
  return (
    <header className={styles.header}>
      <div className="grid-lines" aria-hidden="true" />
      <span className={`halo halo--cyan ${styles.halo}`} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
            <ol className={styles.crumbs}>
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.href} className={styles.crumb}>
                  {index < breadcrumb.length - 1 ? (
                    <>
                      <Link href={crumb.href} className={styles.crumbLink}>
                        {crumb.label}
                      </Link>
                      <span aria-hidden="true" className={styles.crumbSep}>
                        /
                      </span>
                    </>
                  ) : (
                    <span aria-current="page" className={styles.crumbCurrent}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal as="p" className="eyebrow">
          {eyebrow}
        </Reveal>

        <Reveal delay={80}>
          <h1 className={`display ${styles.title}`}>{title}</h1>
        </Reveal>

        {lead ? (
          <Reveal as="p" delay={150} className={`lead ${styles.lead}`}>
            {lead}
          </Reveal>
        ) : null}

        {children ? (
          <Reveal delay={220} className={styles.extra}>
            {children}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

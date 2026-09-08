import Image from 'next/image';
import Link from 'next/link';

import { site } from '@/data/site';

import { ArrowRight, Mail, Phone } from './Icons';
import { Reveal } from './Reveal';
import styles from './FounderSection.module.css';

const commitments = [
  'Un interlocuteur unique, du premier échange à la mise en ligne',
  'Des décisions expliquées, jamais imposées',
  'Des étapes visibles et un périmètre écrit',
  'Un site conçu pour évoluer après sa mise en ligne',
];

export function FounderSection() {
  return (
    <div className={styles.layout}>
      <Reveal from="left" className={styles.portrait}>
        <div className={styles.frame} data-anim>
          <Image
            src={site.brand.circle}
            alt={`Logo ${site.name}`}
            width={420}
            height={420}
            className={styles.image}
            sizes="(max-width: 900px) 60vw, 380px"
          />
          <span className={styles.ring} aria-hidden="true" />
        </div>

        <div className={styles.identity}>
          <p className={styles.name}>{site.founder.name}</p>
          <p className={styles.role}>{site.founder.role}</p>
          <p className={styles.roleSecondary}>{site.founder.secondaryRole}</p>
        </div>
      </Reveal>

      <div className={styles.content}>
        <Reveal as="p" className="eyebrow">
          Le studio
        </Reveal>

        <Reveal delay={80}>
          <h2 className={`h2 ${styles.title}`}>
            Une structure indépendante,
            <br />
            <span className="gradient-text">pilotée par une seule personne.</span>
          </h2>
        </Reveal>

        <Reveal as="p" delay={150} className={`lead ${styles.lead}`}>
          CodeAndGo est une agence web et IA indépendante fondée par {site.founder.name},
          développeur web full stack. Pas de chaîne d’intermédiaires : la personne qui conçoit
          votre site est celle qui le développe, le met en ligne et vous en explique le
          fonctionnement.
        </Reveal>

        <Reveal as="ul" delay={210} className={styles.commitments}>
          {commitments.map((item) => (
            <li key={item} className={styles.commitment}>
              {item}
            </li>
          ))}
        </Reveal>

        <Reveal delay={280} className={styles.actions}>
          <Link href="/a-propos" className="btn btn--ghost btn--sm">
            En savoir plus
            <ArrowRight />
          </Link>
          <a href={site.contact.phoneHref} className={styles.contactLink}>
            <Phone />
            {site.contact.phone}
          </a>
          <a href={site.contact.emailHref} className={styles.contactLink}>
            <Mail />
            {site.contact.email}
          </a>
        </Reveal>
      </div>
    </div>
  );
}

import Link from 'next/link';

import { services } from '@/data/services';
import { legalNav, mainNav, site } from '@/data/site';

import { BrandLockup } from './BrandLockup';
import { ArrowUpRight, Mail, Phone } from './Icons';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <BrandLockup variant="full" />
          <p className={styles.pitch}>
            Agence web &amp; IA indépendante, spécialisée dans la création de sites internet
            professionnels et performants.
          </p>
          <p className={styles.signature}>Création · Refonte · SEO</p>

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
                  <ArrowUpRight width={13} height={13} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.columns} aria-label="Pied de page">
          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Navigation</h2>
            <ul className={styles.links}>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/devis" className={styles.link}>
                  Devis
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Prestations</h2>
            <ul className={styles.links}>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={styles.link}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Contact</h2>
            <ul className={styles.links}>
              <li>
                <a href={site.contact.phoneHref} className={`${styles.link} ${styles.contact}`}>
                  <Phone width={14} height={14} />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={site.contact.emailHref} className={`${styles.link} ${styles.contact}`}>
                  <Mail width={14} height={14} />
                  {site.contact.email}
                </a>
              </li>
              <li className={styles.area}>{site.contact.area}</li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © {year} {site.name} — {site.founder.name}. Tous droits réservés.
        </p>
        <ul className={styles.legal}>
          {legalNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.legalLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

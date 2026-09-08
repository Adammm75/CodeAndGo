import type { Metadata } from 'next';

import { site, siteUrl } from '@/data/site';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Retire la page des index quand elle n'a pas vocation à être référencée. */
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === '/' ? '' : path}`;
  const fullTitle = path === '/' ? `${site.name} — ${site.promise}` : `${title} — ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [
        {
          url: site.brand.ogImage,
          width: 1080,
          height: 1080,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [site.brand.ogImage],
    },
  };
}

/** Numéro au format E.164, dérivé de la source unique `site.contact`. */
const phoneE164 = site.contact.phoneHref.replace('tel:', '');

/** JSON-LD global : Organization + ProfessionalService + WebSite. */
export function organizationJsonLd() {
  const organization = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}${site.brand.circle}`,
    description: site.description,
    email: site.contact.email,
    telephone: phoneE164,
    founder: {
      '@type': 'Person',
      name: site.founder.name,
      jobTitle: site.founder.role,
    },
    sameAs: site.socials.map((social) => social.href),
    areaServed: { '@type': 'Country', name: 'France' },
  };

  const professionalService = {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#service`,
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}${site.brand.circle}`,
    description: site.description,
    email: site.contact.email,
    telephone: phoneE164,
    priceRange: '€€',
    parentOrganization: { '@id': `${siteUrl}/#organization` },
    address: { '@type': 'PostalAddress', addressCountry: 'FR' },
    areaServed: { '@type': 'Country', name: 'France' },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    inLanguage: 'fr-FR',
    description: site.description,
    publisher: { '@id': `${siteUrl}/#organization` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, professionalService, website],
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      name: item.name,
      item: `${siteUrl}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

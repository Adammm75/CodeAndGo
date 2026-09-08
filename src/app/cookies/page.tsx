import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalContent, ToComplete } from '@/components/LegalContent';
import { PageHeader } from '@/components/PageHeader';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Cookies',
  description:
    'Ce site ne dépose aucun cookie publicitaire ni traceur tiers. Détail des données stockées dans votre navigateur.',
  path: '/cookies',
});

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Traceurs"
        title="Cookies"
        lead="Ce site fonctionne sans cookie publicitaire et sans traceur tiers. Voici précisément ce qui est stocké."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Cookies', href: '/cookies' },
        ]}
      />

      <section className="section" aria-label="Politique relative aux cookies">
        <div className="container">
          <LegalContent updatedAt="3 septembre 2026">
            <h2>Aucun cookie publicitaire</h2>
            <p>
              Le site {site.name} ne dépose <strong>aucun cookie publicitaire</strong>, aucun
              traceur de réseau social et aucun outil de profilage. Aucun bandeau de consentement
              n’est donc affiché : il n’y a rien à accepter ou à refuser.
            </p>

            <h2>Ce qui est réellement stocké</h2>
            <p>
              Une seule information technique est enregistrée dans la mémoire de session de votre
              navigateur :
            </p>
            <ul>
              <li>
                <strong>cg-intro-played</strong> — retient que l’animation d’introduction a déjà
                été jouée, afin de ne pas la rejouer à chaque page. Cette information ne quitte
                jamais votre navigateur, ne nous est jamais transmise et disparaît à la fermeture
                de l’onglet.
              </li>
            </ul>
            <p>
              Il ne s’agit pas d’un cookie au sens strict mais d’un stockage de session. Il ne
              permet aucune identification et ne relève pas du consentement préalable.
            </p>

            <h2>Mesure d’audience</h2>
            <p>
              Aucune mesure d’audience n’est active par défaut. Si une solution de statistiques
              sans cookie venait à être activée, elle serait mentionnée ci-dessous, et cette page
              serait mise à jour en conséquence.
            </p>
            <ToComplete>
              À compléter uniquement si une mesure d’audience est activée : nom de l’outil,
              données mesurées, durée de conservation et existence ou non d’un dépôt de cookie.
            </ToComplete>

            <h2>Polices et ressources externes</h2>
            <p>
              Les polices de caractères sont servies directement depuis notre propre hébergement.
              Votre navigateur ne contacte donc aucun serveur tiers pour les charger, ce qui évite
              toute transmission de votre adresse IP à un service externe.
            </p>

            <h2>Liens vers les réseaux sociaux</h2>
            <p>
              Les liens vers nos comptes Instagram et TikTok sont de simples liens hypertexte : ils
              ne chargent aucun script tiers et ne déposent rien tant que vous ne les suivez pas.
              Une fois sur ces plateformes, leurs propres politiques s’appliquent.
            </p>

            <h2>Vos données personnelles</h2>
            <p>
              Le traitement des informations que vous nous transmettez volontairement est décrit
              sur la page <Link href="/confidentialite">Politique de confidentialité</Link>.
            </p>
          </LegalContent>
        </div>
      </section>
    </>
  );
}

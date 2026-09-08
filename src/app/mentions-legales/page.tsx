import type { Metadata } from 'next';

import { LegalContent, ToComplete } from '@/components/LegalContent';
import { PageHeader } from '@/components/PageHeader';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Mentions légales',
  description:
    'Mentions légales du site CodeAndGo : éditeur, hébergeur, propriété intellectuelle et responsabilité.',
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Mentions légales"
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Mentions légales', href: '/mentions-legales' },
        ]}
      />

      <section className="section" aria-label="Mentions légales">
        <div className="container">
          <LegalContent updatedAt="3 septembre 2026">
            <h2>Éditeur du site</h2>
            <p>
              Le site {site.name} est édité par {site.founder.name}, {site.founder.role}, exerçant
              en qualité d’entrepreneur individuel.
            </p>
            <ul>
              <li>Téléphone : {site.contact.phone}</li>
              <li>
                E-mail : <a href={site.contact.emailHref}>{site.contact.email}</a>
              </li>
              <li>Directeur de la publication : {site.founder.name}</li>
            </ul>

            <ToComplete>
              À compléter avant la mise en ligne : adresse postale du siège, numéro SIREN/SIRET,
              numéro de TVA intracommunautaire le cas échéant, et numéro d’inscription au
              répertoire des métiers ou au RCS. Ces mentions sont obligatoires au titre de
              l’article 6 de la loi pour la confiance dans l’économie numérique.
            </ToComplete>

            <h2>Hébergement</h2>
            <p>
              Le site est hébergé sur une infrastructure d’hébergement web professionnelle. Les
              coordonnées complètes de l’hébergeur doivent figurer ci-dessous.
            </p>
            <ToComplete>
              À compléter : dénomination sociale, adresse et numéro de téléphone de l’hébergeur
              effectivement retenu.
            </ToComplete>

            <h2>Propriété intellectuelle</h2>
            <p>
              L’ensemble des éléments composant ce site — structure, textes, identité visuelle,
              logo, illustrations, mises en page et code source — est protégé par le droit de la
              propriété intellectuelle et demeure la propriété de {site.name}, sauf mention
              contraire.
            </p>
            <p>
              Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle,
              par quelque procédé que ce soit et sur quelque support que ce soit, est interdite
              sans autorisation écrite préalable.
            </p>

            <h2>Projets présentés</h2>
            <p>
              Les projets figurant dans la rubrique « Réalisations » sont des{' '}
              <strong>sites réellement en ligne</strong>, dont l’adresse publique est indiquée sur
              chaque fiche. Les descriptions portent sur la conception et les choix de structure&nbsp;;
              aucun résultat commercial, aucune donnée chiffrée de performance et aucun témoignage
              client n’y sont revendiqués. Les marques, noms et contenus cités restent la propriété
              de leurs titulaires respectifs.
            </p>

            <h2>Responsabilité</h2>
            <p>
              Les informations publiées sur ce site sont fournies à titre indicatif et peuvent
              être modifiées à tout moment. Les tarifs affichés sont des points de départ : ils ne
              constituent pas une offre commerciale ferme et ne sauraient engager l’éditeur en
              dehors d’un devis écrit et signé.
            </p>
            <p>
              L’éditeur ne peut être tenu responsable des dommages directs ou indirects résultant
              de l’accès au site ou de son utilisation, ni du contenu des sites tiers vers
              lesquels des liens peuvent être proposés.
            </p>

            <h2>Droit applicable</h2>
            <p>
              Le présent site et ses mentions légales sont soumis au droit français. En cas de
              litige, et à défaut de résolution amiable, les tribunaux français seront seuls
              compétents.
            </p>

            <h2>Nous contacter</h2>
            <p>
              Pour toute question relative à ces mentions, écrivez à{' '}
              <a href={site.contact.emailHref}>{site.contact.email}</a> ou appelez le{' '}
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
            </p>
          </LegalContent>
        </div>
      </section>
    </>
  );
}

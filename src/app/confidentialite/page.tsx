import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalContent, ToComplete } from '@/components/LegalContent';
import { PageHeader } from '@/components/PageHeader';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Politique de confidentialité',
  description:
    'Quelles données CodeAndGo collecte, pourquoi, combien de temps elles sont conservées et comment exercer vos droits.',
  path: '/confidentialite',
});

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Vos données"
        title="Politique de confidentialité"
        lead="Nous collectons le strict nécessaire pour répondre à votre demande, rien de plus."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Confidentialité', href: '/confidentialite' },
        ]}
      />

      <section className="section" aria-label="Politique de confidentialité">
        <div className="container">
          <LegalContent updatedAt="3 septembre 2026">
            <h2>Responsable du traitement</h2>
            <p>
              Les données collectées sur ce site sont traitées par {site.founder.name}, éditeur du
              site {site.name}. Pour toute question relative à vos données, écrivez à{' '}
              <a href={site.contact.emailHref}>{site.contact.email}</a>.
            </p>

            <h2>Données collectées</h2>
            <p>
              Aucune donnée n’est collectée à votre insu. Les seules informations recueillies sont
              celles que vous saisissez volontairement dans nos formulaires :
            </p>
            <ul>
              <li>
                <strong>Formulaire de contact</strong> : nom, adresse e-mail, téléphone
                (facultatif) et contenu de votre message.
              </li>
              <li>
                <strong>Formulaire de devis</strong> : type de projet, objectifs, fourchette de
                budget, échéance souhaitée, besoins complémentaires, nom, adresse e-mail,
                téléphone et structure (facultatifs pour les deux derniers), ainsi que votre
                message éventuel.
              </li>
            </ul>
            <p>
              Nous ne collectons aucune donnée sensible au sens du RGPD, et nous ne demandons
              jamais d’informations bancaires ou de mot de passe par formulaire.
            </p>

            <h2>Finalité et base légale</h2>
            <p>
              Ces données servent uniquement à traiter votre demande, vous recontacter et, le cas
              échéant, établir un devis. La base légale du traitement est votre consentement
              explicite, recueilli par une case à cocher non pré-remplie, ainsi que l’exécution de
              mesures précontractuelles prises à votre demande.
            </p>
            <p>
              Vos données ne sont ni revendues, ni louées, ni utilisées à des fins publicitaires,
              ni exploitées pour du démarchage sans lien avec votre demande initiale.
            </p>

            <h2>Destinataires</h2>
            <p>
              Vos messages sont transmis par courrier électronique à l’éditeur du site et ne sont
              accessibles qu’à lui. L’acheminement des e-mails est assuré par un prestataire
              technique d’envoi, qui agit en qualité de sous-traitant et n’exploite pas ces
              données pour son propre compte.
            </p>
            <ToComplete>
              À compléter si l’hébergement, la messagerie ou un outil de suivi retenus impliquent
              un transfert de données hors de l’Union européenne : mentionner le prestataire
              concerné et le cadre juridique du transfert.
            </ToComplete>

            <h2>Durée de conservation</h2>
            <ul>
              <li>Demande sans suite : conservation pendant 12 mois, puis suppression.</li>
              <li>
                Demande ayant donné lieu à un devis ou à un contrat : conservation pendant la
                durée de la relation commerciale, puis selon les obligations légales de
                conservation comptable.
              </li>
            </ul>

            <h2>Vos droits</h2>
            <p>
              Conformément au Règlement général sur la protection des données et à la loi
              Informatique et Libertés, vous disposez d’un droit d’accès, de rectification,
              d’effacement, de limitation, d’opposition et de portabilité de vos données, ainsi
              que du droit de retirer votre consentement à tout moment.
            </p>
            <p>
              Pour exercer ces droits, écrivez à{' '}
              <a href={site.contact.emailHref}>{site.contact.email}</a>. Une réponse vous sera
              apportée dans un délai maximal d’un mois. Si la réponse ne vous satisfait pas, vous
              pouvez introduire une réclamation auprès de la CNIL.
            </p>

            <h2>Sécurité</h2>
            <p>
              Le site est servi en HTTPS. Les données transmises via les formulaires sont
              chiffrées en transit. Les envois sont limités en nombre par un mécanisme de
              protection contre les soumissions automatisées.
            </p>

            <h2>Cookies</h2>
            <p>
              L’usage des cookies et des technologies équivalentes est détaillé sur la page{' '}
              <Link href="/cookies">Cookies</Link>.
            </p>
          </LegalContent>
        </div>
      </section>
    </>
  );
}

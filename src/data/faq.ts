export type FaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
};

export const faq: readonly FaqItem[] = [
  {
    id: 'delais',
    question: 'Combien de temps faut-il pour créer mon site ?',
    answer:
      'Comptez deux à trois semaines pour un site vitrine concis, et trois à cinq semaines pour un site multi-pages. Le délai réel dépend surtout de la disponibilité de vos contenus : textes, photos et informations légales. Un projet e-commerce ou une refonte à fort enjeu SEO se planifie au cas par cas, après un atelier de cadrage.',
  },
  {
    id: 'paiement',
    question: 'Comment se déroule le paiement ?',
    answer:
      'Le devis est gratuit et sans engagement : vous ne payez rien tant que le périmètre n’est pas écrit et validé par vos soins. Le montant est ensuite réglé en trois fois sans frais — un tiers à la commande, un tiers à la validation de la maquette, le solde à la mise en ligne. Aucun poste n’apparaît en cours de route : ce qui n’est pas dans le devis fait l’objet d’un avenant chiffré à l’avance.',
  },
  {
    id: 'contenus',
    question: 'Dois-je fournir les textes et les photos ?',
    answer:
      'Vous connaissez votre métier mieux que quiconque : la matière vient de vous. En revanche, vous n’êtes pas seul face à la page blanche — je structure les contenus, propose des formulations et vous indique précisément ce qui manque. Si vous n’avez pas de photographies exploitables, nous en parlons dès le cadrage.',
  },
  {
    id: 'autonomie',
    question: 'Pourrai-je modifier mon site moi-même ensuite ?',
    answer:
      'Oui. Les zones destinées à évoluer — textes, actualités, tarifs, réalisations — sont identifiées pendant la conception et rendues modifiables sans compétence technique. Une prise en main en visioconférence et une documentation écrite sont livrées avec le site.',
  },
  {
    id: 'referencement',
    question: 'Le référencement est-il inclus ?',
    answer:
      'Le référencement technique est inclus par défaut : structure des titres, vitesse, balises, données structurées, sitemap et indexation. C’est le socle sans lequel aucune stratégie de contenu ne fonctionne. Le référencement éditorial dans la durée — production d’articles, netlinking, suivi de positions — est un accompagnement distinct, à définir ensemble.',
  },
  {
    id: 'hebergement',
    question: 'Qui gère le nom de domaine et l’hébergement ?',
    answer:
      'Les comptes sont créés à votre nom et vous en restez propriétaire, ce qui vous garantit de pouvoir partir à tout moment. Je m’occupe de la configuration technique, de la mise en ligne et du certificat de sécurité. Les frais de domaine et d’hébergement sont facturés par les prestataires, directement à vous, en toute transparence.',
  },
  {
    id: 'refonte',
    question: 'Je possède déjà un site : faut-il tout refaire ?',
    answer:
      'Pas nécessairement. La première étape est un audit : si la base technique est saine, une remise à niveau ciblée suffit parfois. Si une refonte s’impose, les pages qui apportent déjà du trafic sont inventoriées et protégées par un plan de redirections écrit avant le début des travaux.',
  },
  {
    id: 'ia',
    question: 'À quoi sert concrètement l’IA sur un site ?',
    answer:
      'À automatiser une tâche répétitive et identifiable : trier des demandes entrantes, résumer des documents, alimenter une recherche interne ou pré-qualifier un formulaire. L’IA n’est ajoutée que si elle fait gagner du temps de façon mesurable, avec un périmètre écrit, des garde-fous et une validation humaine sur tout ce qui sort côté client.',
  },
  {
    id: 'apres',
    question: 'Que se passe-t-il après la mise en ligne ?',
    answer:
      'Le site vous appartient et reste utilisable sans moi. L’offre Professionnel inclut un mois d’accompagnement pour les ajustements qui apparaissent une fois le site en usage réel. Au-delà, les évolutions sont réalisées à la demande, chiffrées à l’avance, sans abonnement imposé.',
  },
];

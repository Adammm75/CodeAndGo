export type Service = {
  readonly slug: string;
  readonly index: string;
  readonly title: string;
  readonly promise: string;
  readonly audience: string;
  readonly benefit: string;
  /** Objectif de conception, formulé honnêtement — jamais un résultat client garanti. */
  readonly objective: { readonly label: string; readonly value: string };
  readonly tags: readonly string[];
  readonly intro: string;
  readonly deliverables: readonly string[];
  readonly approach: readonly { readonly title: string; readonly text: string }[];
};

export const services: readonly Service[] = [
  {
    slug: 'sites-web',
    index: '01',
    title: 'Sites web',
    promise: 'Un site vitrine qui explique votre métier et déclenche la prise de contact.',
    audience: 'Artisans, professions libérales, PME, studios et indépendants.',
    benefit:
      'Un site clair, rapide et crédible, dont chaque section pousse le visiteur vers une action concrète : appeler, écrire ou demander un devis.',
    objective: { label: 'Objectif de conception', value: 'Chargement visé sous 2 s' },
    tags: ['Vitrine', 'Sur mesure', 'Responsive', 'Rédaction'],
    intro:
      'Un site vitrine n’a que quelques secondes pour être compris. Nous partons de votre activité réelle — ce que vous vendez, à qui, et pourquoi on vous choisit — puis nous construisons une structure de page qui répond à ces questions dans l’ordre où le visiteur se les pose.',
    deliverables: [
      'Arborescence et structure de contenu',
      'Design sur mesure, décliné mobile et desktop',
      'Intégration responsive et accessible',
      'Formulaire de contact fonctionnel',
      'Optimisation technique SEO de base',
      'Mise en ligne, nom de domaine et hébergement',
      'Prise en main et documentation',
    ],
    approach: [
      {
        title: 'Comprendre avant de dessiner',
        text: 'Un premier échange sert à cadrer votre offre, vos clients et vos concurrents. Le design vient après, jamais avant.',
      },
      {
        title: 'Une page, un objectif',
        text: 'Chaque section a une raison d’exister. Si elle ne rapproche pas le visiteur de la prise de contact, elle est retirée.',
      },
      {
        title: 'Un site que vous gardez la main dessus',
        text: 'Les contenus modifiables sont identifiés dès la conception pour que vous restiez autonome après la livraison.',
      },
    ],
  },
  {
    slug: 'e-commerce',
    index: '02',
    title: 'E-commerce',
    promise: 'Une boutique en ligne lisible, rassurante et pensée pour aller jusqu’au paiement.',
    audience: 'Commerçants, créateurs, marques et petites structures de vente en ligne.',
    benefit:
      'Un catalogue structuré, des fiches produit qui répondent aux objections et un tunnel d’achat réduit au strict nécessaire.',
    objective: { label: 'Objectif de conception', value: 'Tunnel d’achat en 3 étapes' },
    tags: ['Catalogue', 'Paiement', 'Tunnel', 'Logistique'],
    intro:
      'Une boutique ne se juge pas à son nombre de fonctionnalités mais au nombre de frictions qu’elle supprime. Nous concevons le parcours d’achat à partir des questions que se pose réellement un acheteur : est-ce que c’est pour moi, combien ça coûte, quand je le reçois, et que se passe-t-il si ça ne va pas.',
    deliverables: [
      'Architecture du catalogue et des catégories',
      'Modèle de fiche produit orienté conversion',
      'Panier et tunnel de commande simplifiés',
      'Intégration d’une solution de paiement',
      'Gestion des stocks et des commandes',
      'Pages légales liées à la vente en ligne',
      'Formation à la gestion quotidienne',
    ],
    approach: [
      {
        title: 'Le catalogue avant l’esthétique',
        text: 'Une boutique mal rangée ne se rattrape pas au design. Nous structurons d’abord les catégories, les filtres et les variantes.',
      },
      {
        title: 'Répondre aux objections dans la fiche',
        text: 'Livraison, retours, matières, tailles, délais : les informations qui bloquent l’achat sont placées avant le bouton, pas après.',
      },
      {
        title: 'Un tunnel court et honnête',
        text: 'Aucun frais surprise en fin de parcours, aucune étape ajoutée sans raison commerciale.',
      },
    ],
  },
  {
    slug: 'seo-refonte',
    index: '03',
    title: 'SEO & refonte',
    promise: 'Remettre à niveau un site existant sans perdre ce qu’il a déjà gagné.',
    audience: 'Structures dont le site est daté, lent, difficile à modifier ou mal positionné.',
    benefit:
      'Une base technique saine, une structure de contenu lisible par les moteurs et une migration qui préserve vos URL et votre historique.',
    objective: { label: 'Objectif de conception', value: 'Migration sans perte d’URL' },
    tags: ['Audit', 'Migration', 'Contenu', 'Technique'],
    intro:
      'Une refonte réussie commence par un inventaire : ce qui fonctionne aujourd’hui doit être conservé, ce qui bloque doit être identifié précisément. Nous auditons la structure, la vitesse, l’indexation et les contenus avant de proposer un plan de reprise.',
    deliverables: [
      'Audit technique, sémantique et éditorial',
      'Plan de redirections des anciennes URL',
      'Refonte du design et de l’ergonomie',
      'Optimisation des performances réelles',
      'Structuration des titres et des données structurées',
      'Suivi post-migration de l’indexation',
    ],
    approach: [
      {
        title: 'Inventorier avant de supprimer',
        text: 'Les pages qui apportent déjà du trafic sont repérées et protégées par un plan de redirections écrit.',
      },
      {
        title: 'Le SEO se joue dans la structure',
        text: 'Hiérarchie des titres, maillage interne, vitesse et balisage sémantique comptent davantage que les mots-clés ajoutés après coup.',
      },
      {
        title: 'Mesurer après la mise en ligne',
        text: 'Une refonte se surveille pendant les semaines qui suivent : indexation, erreurs, pages orphelines.',
      },
    ],
  },
  {
    slug: 'solutions-ia',
    index: '04',
    title: 'Solutions IA',
    promise: 'Intégrer l’IA là où elle fait gagner du temps, et nulle part ailleurs.',
    audience: 'Structures qui traitent des demandes répétitives, des documents ou du support client.',
    benefit:
      'Des automatisations ciblées — assistant de réponse, qualification de demandes, recherche interne — encadrées et vérifiables.',
    objective: { label: 'Objectif de conception', value: 'Périmètre d’usage écrit et limité' },
    tags: ['Assistant', 'Automatisation', 'Intégration', 'Cadrage'],
    intro:
      'L’IA n’a d’intérêt que sur une tâche précise, mesurable et répétée. Nous commençons par identifier ce qui vous coûte réellement du temps, puis nous décidons ensemble si une automatisation est justifiée — et ce qu’elle ne doit surtout pas décider seule.',
    deliverables: [
      'Cadrage du cas d’usage et de ses limites',
      'Choix du modèle et de l’hébergement des données',
      'Intégration dans votre site ou vos outils',
      'Garde-fous et validation humaine',
      'Documentation d’utilisation',
      'Suivi des coûts d’usage',
    ],
    approach: [
      {
        title: 'Un cas d’usage, pas une démonstration',
        text: 'Nous n’ajoutons pas d’IA pour l’affichage. Si un formulaire bien conçu suffit, nous le disons.',
      },
      {
        title: 'Des limites explicites',
        text: 'Ce que l’assistant peut répondre, ce qu’il doit refuser et ce qui repasse par un humain sont définis avant le développement.',
      },
      {
        title: 'Données maîtrisées',
        text: 'Le traitement des données, leur durée de conservation et leur localisation sont documentés dès le cadrage.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

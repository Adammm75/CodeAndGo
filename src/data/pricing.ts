export type Plan = {
  readonly slug: string;
  readonly name: string;
  readonly audience: string;
  /**
   * Mise en avant principale. On affiche d'abord la mensualité, beaucoup plus
   * lisible qu'un montant global, et le total reste indiqué juste en dessous :
   * rien n'est masqué, mais le premier chiffre lu n'est plus le plus gros.
   */
  readonly monthly: string | null;
  /** Montant total. `null` quand l'offre est établie uniquement sur devis. */
  readonly priceFrom: string | null;
  /** Ligne affichée à la place du prix quand il n'y a pas de montant public. */
  readonly priceNote: string;
  readonly delay: string;
  readonly summary: string;
  readonly includes: readonly string[];
  readonly recommended: boolean;
};

export const plans: readonly Plan[] = [
  {
    slug: 'essentiel',
    name: 'Essentiel',
    audience: 'Indépendants et jeunes structures qui ont besoin d’exister en ligne rapidement.',
    monthly: '130 €',
    priceFrom: '390 €',
    priceNote: 'soit 390 € au total, en 3 fois sans frais',
    delay: '2 à 3 semaines',
    summary:
      'Un site vitrine concis, complet et immédiatement crédible, concentré sur une seule action : vous contacter.',
    includes: [
      'Site vitrine jusqu’à 5 sections',
      'Design sur mesure, mobile et desktop',
      'Formulaire de contact fonctionnel',
      'Optimisation technique de base (SEO, vitesse)',
      'Nom de domaine et mise en ligne',
      'Prise en main en visioconférence',
    ],
    recommended: false,
  },
  {
    slug: 'professionnel',
    name: 'Professionnel',
    audience: 'PME et structures établies dont le site doit porter plusieurs offres.',
    monthly: '290 €',
    priceFrom: '870 €',
    priceNote: 'soit 870 € au total, en 3 fois sans frais',
    delay: '3 à 5 semaines',
    summary:
      'Un site multi-pages structuré autour de vos différentes offres, avec un travail éditorial et SEO approfondi.',
    includes: [
      'Site multi-pages (jusqu’à 8 pages)',
      'Pages dédiées par service ou par offre',
      'Aide à la structuration des contenus',
      'Optimisation SEO on-page complète',
      'Données structurées et pages légales',
      'Formulaire avancé ou demande de devis',
      'Autonomie sur les contenus modifiables',
      'Un mois d’accompagnement après la mise en ligne',
    ],
    recommended: true,
  },
  {
    slug: 'sur-mesure',
    name: 'Sur mesure',
    audience: 'E-commerce, refonte complexe, application métier ou intégration IA.',
    // Aucun montant affiché : le périmètre varie trop pour qu'un chiffre de
    // départ soit honnête, et un gros nombre isolé décourage avant l'échange.
    monthly: null,
    priceFrom: null,
    priceNote: 'Chiffré ensemble après un premier échange, sans engagement',
    delay: 'À définir au cadrage',
    summary:
      'Un projet cadré spécifiquement : boutique en ligne, migration à fort enjeu SEO ou automatisation assistée par IA.',
    includes: [
      'Atelier de cadrage et périmètre écrit',
      'Boutique en ligne ou fonctionnalités métier',
      'Refonte avec plan de redirections',
      'Intégrations tierces (paiement, CRM, API)',
      'Solutions IA encadrées et documentées',
      'Recette structurée avant mise en ligne',
      'Accompagnement et évolutions planifiées',
    ],
    recommended: false,
  },
];

/** Conditions commerciales rappelées sous la grille, en une ligne chacune. */
export const pricingTerms: readonly string[] = [
  'Devis gratuit et sans engagement',
  'Paiement en 3 fois sans frais',
  'Aucun frais caché en cours de projet',
];

export const pricingDisclaimer =
  'Les montants indiqués sont des points de départ, réglés en trois fois sans frais. Le tarif définitif dépend du périmètre retenu, du nombre de pages, des contenus à produire et des fonctionnalités ou intégrations nécessaires. Chaque devis est établi après un échange, gratuitement et sans engagement.';

/**
 * Source unique de vérité pour l'identité, les coordonnées et la navigation.
 * Toute modification de contenu transverse doit passer par ce fichier.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.codeandgo.fr'
).replace(/\/$/, '');

export const site = {
  name: 'CodeAndGo',
  legalName: 'CodeAndGo',
  tagline: 'Agence web & solutions IA · France',
  promise: 'Votre site web, conçu pour convaincre.',
  intro:
    'Nous concevons des sites rapides, modernes et pensés pour transformer l’intérêt de vos visiteurs en prises de contact.',
  description:
    'Agence web & IA indépendante en France. Création de sites internet professionnels, e-commerce, refonte, SEO et solutions IA sur mesure.',
  availability: 'Studio indépendant · Projets ouverts',
  founder: {
    name: 'Adam Mekkiou',
    role: 'Développeur web full stack freelance',
    secondaryRole: 'Product Owner IA & Blockchain',
  },
  contact: {
    phone: '06 05 87 80 58',
    phoneHref: 'tel:+33605878058',
    email: 'codeandgocontact@gmail.com',
    emailHref: 'mailto:codeandgocontact@gmail.com',
    /**
     * Destinataires internes des formulaires (devis et contact).
     * Chaque demande part vers TOUTES ces adresses. La variable
     * d'environnement `ADMIN_EMAIL` peut les remplacer sans toucher au code.
     */
    notify: ['codeandgocontact@gmail.com', 'adam.mekkiou@outlook.fr'],
    area: 'France · à distance et sur site',
  },
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/codeandgoo/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@codeandgoweb' },
  ],
  brand: {
    /* Version web du logo : 256 px, 15 Ko. L'original 1080 px est conserve
       hors du dossier servi, dans `assets-source/brand/`. */
    circle: '/brand/logo-circle.webp',
    /* Carte de partage au format attendu par les reseaux (1200x630), et non
       le logo carre : un logo 1:1 est recadre au centre par la plupart des
       plateformes. */
    ogImage: '/og.jpg',
  },
} as const;

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export const mainNav: readonly NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export const legalNav: readonly NavItem[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
  { label: 'Cookies', href: '/cookies' },
];

/** Signaux de réassurance — capacités de travail, jamais des résultats chiffrés. */
export const reassurance: readonly string[] = [
  '100 % responsive',
  'SEO prêt dès la conception',
  'Performance optimisée',
  'Accompagnement personnalisé',
  'Livraison clé en main',
];

export const values: readonly { title: string; text: string }[] = [
  {
    title: 'Création',
    text: 'Chaque projet part d’une page blanche : pas de gabarit recyclé, pas de mise en page interchangeable.',
  },
  {
    title: 'Performance',
    text: 'Un site rapide se lit, se parcourt et se retient. La vitesse fait partie du design, pas de l’optimisation finale.',
  },
  {
    title: 'Confiance',
    text: 'Un interlocuteur unique, des décisions expliquées et des étapes visibles du premier échange à la mise en ligne.',
  },
  {
    title: 'Clarté',
    text: 'Un message compris en quelques secondes vaut mieux qu’une prouesse graphique que personne ne déchiffre.',
  },
  {
    title: 'Proximité',
    text: 'Vous parlez directement à la personne qui conçoit et développe votre site, sans intermédiaire.',
  },
  {
    title: 'Transparence',
    text: 'Un périmètre écrit, un budget annoncé, des délais tenus et aucun coût qui apparaît en cours de route.',
  },
  {
    title: 'Sur mesure',
    text: 'L’interface suit votre activité et vos priorités commerciales, pas l’inverse.',
  },
  {
    title: 'Simplicité',
    text: 'Vous devez pouvoir mettre à jour vos contenus sans appeler un développeur.',
  },
  {
    title: 'Durabilité',
    text: 'Un socle technique maintenable, documenté et prêt à évoluer après la mise en ligne.',
  },
];

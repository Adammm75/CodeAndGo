/**
 * Sélection de projets.
 *
 * Les projets listés ici sont des sites RÉELLEMENT EN LIGNE : le champ `url`
 * pointe vers la version publique, consultable par le visiteur. Rien n'est
 * décrit qui ne soit pas vérifiable sur le site lui-même.
 *
 * Règle de publication : aucun résultat commercial, aucune donnée chiffrée de
 * performance et aucun témoignage ne peuvent être ajoutés ici sans accord écrit
 * du client concerné. Le champ `demo` reste disponible pour un éventuel concept
 * interne, affiché alors explicitement comme tel.
 */

export type ProjectCategory = 'Site vitrine' | 'E-commerce' | 'Refonte & SEO' | 'Solutions IA';

export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly year: string;
  readonly summary: string;
  readonly context: string;
  readonly answer: readonly string[];
  readonly tech: readonly string[];
  /** Capture du site publié, servie en devanture. `null` = maquette CSS. */
  readonly image: string | null;
  /** Aperçu flouté minuscule (16x10) encodé en base64, pour éviter le trou blanc. */
  readonly blur: string;
  /** Adresse publique du site en ligne. `null` pour un concept interne. */
  readonly url: string | null;
  /** Nom de domaine affiché à côté du lien, sans protocole. */
  readonly host: string | null;
  /** true = concept interne, affiché comme tel. */
  readonly demo: boolean;
  /** Palette d'accent utilisée par le mockup CSS. */
  readonly accent: 'cyan' | 'blue' | 'violet';
  /** Type de maquette dessinée en CSS pour la vignette. */
  readonly mockup: 'landing' | 'shop' | 'dashboard' | 'editorial';
};

export const projects: readonly Project[] = [
  {
    slug: 'b2d-conduite',
    image: '/realisations/b2d-conduite.webp',
    blur:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAQCdASoQAAoAAwBSJYwCdAEKpDHyYAAA/ukDm7PsECkRwK3QwmqvIWlJD4r/AAA=',
    title: 'B2D Conduite',
    category: 'Site vitrine',
    year: '2026',
    summary:
      'Le site d’une auto-école du Val-d’Oise, construit pour que le futur élève trouve sa formule, son tarif et son bouton d’inscription sans jamais téléphoner.',
    context:
      'Une auto-école certifiée Qualiopi à Montigny-lès-Cormeilles, avec sept formations distinctes — permis B manuelle et automatique, conduite accompagnée, conduite supervisée, perfectionnement, code de la route et voiture sans permis. Autant de formules dont les différences, les prérequis et les prix se racontaient jusque-là au comptoir ou au téléphone.',
    answer: [
      'Une page d’accueil qui pose d’emblée les trois repères attendus : la certification Qualiopi, le paiement en trois fois et le code en ligne illimité.',
      'Un catalogue de sept formations où chaque formule dispose de sa propre page : public visé, déroulé, durée et tarif, pour que la comparaison se fasse seule.',
      'Une inscription en ligne accessible depuis n’importe quel point du parcours, et un forfait mis en avant avec son prix barré lorsqu’une remise est active.',
      'Une structure de page locale — adresse, zone desservie, données structurées — pour les recherches « auto-école » aux alentours de Montigny-lès-Cormeilles.',
    ],
    tech: ['Next.js', 'TypeScript', 'Inscription en ligne', 'SEO local', 'Données structurées'],
    url: 'https://b2-d-conduite-auto-ecole-tihj.vercel.app/',
    host: 'b2-d-conduite-auto-ecole-tihj.vercel.app',
    demo: false,
    accent: 'cyan',
    mockup: 'landing',
  },
  {
    slug: 'logbook',
    image: '/realisations/logbook.webp',
    blur:
      'data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAQAgCdASoQAAoAAwBSJZgC7AEVchWiTY6gAP73WrCNCYHoDaIkQh6R2N/JYUjansCeCtUM2AVepNR/Ro7dspqVtib+GeF4lBHzOzQ/MbcL+NkfHlx59w/Lv3GUVXC3TkPyUMyVVo55hpbM6AAAAA==',
    title: 'Logbook',
    category: 'Solutions IA',
    year: '2026',
    summary:
      'Une plateforme éducative où les enseignants corrigent à la voix, et où l’IA synthétise leurs commentaires sans jamais décider à leur place.',
    context:
      'La correction écrite prend du temps et se lit mal. Un enseignant annote des dizaines de copies, l’élève parcourt la note et referme sa feuille. Tout le travail de l’un se perd sur le trajet vers l’autre.',
    answer: [
      'Un enregistrement vocal attaché à chaque copie, partagé aux élèves par un QR code unique valable toute l’année — aucun compte à créer côté élève.',
      'Des tableaux de bord qui agrègent les commentaires par compétence, par élève et par classe, à partir des critères d’évaluation de l’enseignant.',
      'Une génération d’appréciations de bulletin construite sur les corrections orales déjà dictées, que l’enseignant relit et corrige avant publication.',
      'Un cadre explicite : hébergement en France, conformité RGPD, et l’enseignant qui garde la main à chaque étape de la chaîne.',
    ],
    tech: ['Application web', 'Traitement audio', 'IA de synthèse', 'Tableaux de bord', 'RGPD'],
    url: 'https://www.logbook.education/',
    host: 'logbook.education',
    demo: false,
    accent: 'violet',
    mockup: 'dashboard',
  },
  {
    slug: 'maivana-editions',
    image: '/realisations/maivana-editions.webp',
    blur:
      'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAQCdASoQAAoAAwBSJYwCdADB4IsgAP7R8RYwgagvhddZFvdUfbILV0x/KP1EXQvxJ+n5XqbTHJoFWh4A0c3VRIAAAA==',
    title: 'Maïvana Éditions',
    category: 'E-commerce',
    year: '2026',
    summary:
      'Une boutique de mode pudique conçue comme une revue : on lit la fabrication d’une pièce avant d’en voir le prix.',
    context:
      'Une jeune marque avec une capsule très courte — deux pièces, deux coupes, quatre tailles. Trop peu de références pour un catalogue classique, où trois vignettes alignées auraient donné l’impression d’une boutique vide.',
    answer: [
      'Un parcours en éditions numérotées plutôt qu’en catalogue : la capsule se lit comme un numéro, avec sa ligne éditoriale et son ordre de lecture.',
      'Un récit de fabrication en cinq étapes, de la première question posée au tissu retenu, qui installe la valeur de la pièce avant l’affichage du prix.',
      'Deux patrons distincts — Standard et Curvy — présentés côte à côte avec leurs différences de construction, plutôt qu’une taille agrandie renommée.',
      'Un comité de rédaction où les clientes votent réellement les coloris et les cols des pièces à venir, avec une date de clôture affichée.',
    ],
    tech: ['Next.js', 'Catalogue éditorial', 'Guide des tailles', 'Consultations clientes'],
    url: 'https://maivana-boutique-fisk.vercel.app/editions',
    host: 'maivana-boutique-fisk.vercel.app',
    demo: false,
    accent: 'blue',
    mockup: 'shop',
  },
];

/**
 * Catégories déduites des projets réellement publiés : aucun filtre ne peut
 * donc renvoyer une grille vide.
 */
export const projectCategories: readonly ProjectCategory[] = [
  ...new Set(projects.map((project) => project.category)),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

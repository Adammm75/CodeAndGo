export type Differentiator = {
  readonly index: string;
  readonly title: string;
  readonly text: string;
};

export const differentiators: readonly Differentiator[] = [
  {
    index: '01',
    title: 'Design sur mesure',
    text: 'Aucun gabarit acheté, aucune mise en page recyclée d’un projet à l’autre. Votre site ressemble à votre activité, pas au thème du mois.',
  },
  {
    index: '02',
    title: 'Mobile-first',
    text: 'La majorité de vos visiteurs arrive sur téléphone. La version mobile est donc conçue en premier, pas repliée à la fin du projet.',
  },
  {
    index: '03',
    title: 'Performance & SEO',
    text: 'Vitesse, structure sémantique et indexation sont traitées pendant la construction. Un site lent perd ses visiteurs avant même d’avoir convaincu.',
  },
  {
    index: '04',
    title: 'Autonomie',
    text: 'Vous pouvez mettre à jour vos contenus sans dépendre d’un développeur. Les zones modifiables sont prévues dès la conception.',
  },
  {
    index: '05',
    title: 'Accompagnement humain',
    text: 'Un interlocuteur unique, du premier échange à la mise en ligne. Les décisions sont expliquées, les étapes visibles, les délais annoncés.',
  },
];

/**
 * Objectifs de qualité visés sur chaque projet.
 * Ce ne sont PAS des audits déjà obtenus : les scores réels dépendent des
 * contenus, des intégrations tierces et de l'hébergement retenu.
 */
export const qualityTargets: readonly { readonly label: string; readonly value: number; readonly display: string }[] = [
  { label: 'Performance', value: 90, display: '90+' },
  { label: 'Accessibilité', value: 95, display: '95 %' },
  { label: 'Bonnes pratiques', value: 95, display: '95 %' },
  { label: 'SEO', value: 95, display: '95 %' },
];

export const qualityDisclaimer =
  'Objectifs de conception, à mesurer sur chaque projet selon ses contenus et intégrations.';

export const qualityPoints: readonly { readonly title: string; readonly text: string }[] = [
  {
    title: 'La rapidité est une fonctionnalité',
    text: 'Un visiteur qui attend s’en va. La vitesse est un critère de conception au même titre que la lisibilité, pas un réglage de dernière minute.',
  },
  {
    title: 'Priorité au contenu visible',
    text: 'Ce que le visiteur voit en premier se charge en premier. Le reste arrive sans bloquer l’affichage ni faire sauter la mise en page.',
  },
  {
    title: 'Des interactions immédiates',
    text: 'Un clic doit répondre tout de suite. Le JavaScript est réservé à ce qui en a réellement besoin.',
  },
  {
    title: 'Navigation au clavier',
    text: 'Menus, onglets, accordéons et formulaires s’utilisent entièrement au clavier, avec un focus toujours visible.',
  },
  {
    title: 'Structure SEO',
    text: 'Hiérarchie de titres cohérente, métadonnées uniques par page, sitemap et maillage interne pensés dès l’arborescence.',
  },
  {
    title: 'Données structurées',
    text: 'Balisage Organization, ProfessionalService et WebSite pour que les moteurs comprennent qui vous êtes et ce que vous proposez.',
  },
];

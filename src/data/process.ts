export type ProcessStep = {
  readonly index: string;
  readonly title: string;
  readonly text: string;
  readonly output: string;
};

export const processSteps: readonly ProcessStep[] = [
  {
    index: '01',
    title: 'Découverte',
    text: 'Un échange pour comprendre votre activité, vos clients, ce qui vous distingue et ce que le site doit réellement produire.',
    output: 'Besoin clarifié',
  },
  {
    index: '02',
    title: 'Stratégie',
    text: 'Arborescence, hiérarchie des messages et parcours de conversion. Nous décidons ce qui apparaît, dans quel ordre et pourquoi.',
    output: 'Structure validée',
  },
  {
    index: '03',
    title: 'Design',
    text: 'Direction artistique, maquettes mobile et desktop, système de composants. Vous voyez le site avant qu’il n’existe.',
    output: 'Maquettes approuvées',
  },
  {
    index: '04',
    title: 'Développement',
    text: 'Intégration soignée, code maintenable, performances et accessibilité traitées pendant la construction, pas après.',
    output: 'Site fonctionnel',
  },
  {
    index: '05',
    title: 'Tests',
    text: 'Vérification sur mobile, tablette et desktop, navigation clavier, formulaires, liens, vitesse et indexation.',
    output: 'Recette signée',
  },
  {
    index: '06',
    title: 'Mise en ligne',
    text: 'Domaine, hébergement, redirections, suivi et prise en main. Vous repartez avec un site que vous savez utiliser.',
    output: 'Site en production',
  },
];

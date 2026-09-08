/**
 * Schéma partagé du formulaire de devis.
 * Les mêmes règles servent à la validation côté navigateur et côté serveur :
 * le client ne fait que du confort, le serveur reste la source de vérité.
 */

export const projectTypes = [
  { value: 'site-vitrine', label: 'Site vitrine' },
  { value: 'e-commerce', label: 'Boutique en ligne' },
  { value: 'refonte', label: 'Refonte d’un site existant' },
  { value: 'seo', label: 'Référencement & performance' },
  { value: 'ia', label: 'Solution IA / automatisation' },
  { value: 'autre', label: 'Autre projet' },
] as const;

export const goalOptions = [
  { value: 'contacts', label: 'Recevoir plus de demandes de contact' },
  { value: 'credibilite', label: 'Gagner en crédibilité' },
  { value: 'vendre', label: 'Vendre en ligne' },
  { value: 'visibilite', label: 'Être trouvé sur les moteurs de recherche' },
  { value: 'moderniser', label: 'Moderniser un site dépassé' },
  { value: 'automatiser', label: 'Automatiser des tâches répétitives' },
] as const;

export const budgetOptions = [
  { value: 'moins-500', label: 'Moins de 500 €' },
  { value: '500-1000', label: '500 € à 1 000 €' },
  { value: '1000-2500', label: '1 000 € à 2 500 €' },
  { value: 'plus-2500', label: 'Plus de 2 500 €' },
  { value: 'a-definir', label: 'À définir ensemble' },
] as const;

export const timelineOptions = [
  { value: 'urgent', label: 'Dès que possible' },
  { value: '1-mois', label: 'Dans le mois' },
  { value: '1-3-mois', label: 'Dans un à trois mois' },
  { value: 'exploration', label: 'Je me renseigne' },
] as const;

export const needOptions = [
  { value: 'redaction', label: 'Rédaction des textes' },
  { value: 'photos', label: 'Photographies / visuels' },
  { value: 'logo', label: 'Logo ou identité visuelle' },
  { value: 'domaine', label: 'Nom de domaine & hébergement' },
  { value: 'multilingue', label: 'Site multilingue' },
  { value: 'blog', label: 'Blog ou actualités' },
  { value: 'reservation', label: 'Prise de rendez-vous en ligne' },
  { value: 'maintenance', label: 'Maintenance après livraison' },
] as const;

export type QuotePayload = {
  projectType: string;
  goals: string[];
  budget: string;
  timeline: string;
  needs: string[];
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  consent: boolean;
  /** Champ leurre : doit rester vide. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof QuotePayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function allowed(options: readonly { value: string }[], value: unknown): value is string {
  return typeof value === 'string' && options.some((option) => option.value === value);
}

function allowedList(options: readonly { value: string }[], value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => allowed(options, item));
}

/** Normalise une entrée inconnue (corps de requête) en payload exploitable. */
export function normalizeQuote(input: unknown): QuotePayload {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const text = (key: string): string => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '');

  return {
    projectType: text('projectType'),
    goals: allowedList(goalOptions, raw.goals),
    budget: text('budget'),
    timeline: text('timeline'),
    needs: allowedList(needOptions, raw.needs),
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    company: text('company'),
    message: text('message'),
    consent: raw.consent === true,
    website: text('website'),
  };
}

export function validateQuote(payload: QuotePayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!allowed(projectTypes, payload.projectType)) {
    errors.projectType = 'Sélectionnez le type de projet qui correspond le mieux à votre besoin.';
  }
  if (payload.goals.length === 0) {
    errors.goals = 'Indiquez au moins un objectif.';
  }
  if (!allowed(budgetOptions, payload.budget)) {
    errors.budget = 'Sélectionnez une fourchette de budget, même approximative.';
  }
  if (!allowed(timelineOptions, payload.timeline)) {
    errors.timeline = 'Indiquez votre échéance souhaitée.';
  }
  if (payload.name.length < 2) {
    errors.name = 'Indiquez votre nom (2 caractères minimum).';
  } else if (payload.name.length > 80) {
    errors.name = 'Ce nom dépasse 80 caractères.';
  }
  if (!emailPattern.test(payload.email)) {
    errors.email = 'Indiquez une adresse e-mail valide, par exemple nom@domaine.fr.';
  }
  if (payload.phone && !/^[+0-9\s().-]{6,25}$/.test(payload.phone)) {
    errors.phone = 'Ce numéro de téléphone n’est pas reconnu.';
  }
  if (payload.company.length > 120) {
    errors.company = 'Ce nom de structure dépasse 120 caractères.';
  }
  if (payload.message.length > 3000) {
    errors.message = 'Le message est limité à 3 000 caractères.';
  }
  if (!payload.consent) {
    errors.consent = 'Votre accord est nécessaire pour que nous puissions traiter la demande.';
  }

  return errors;
}

/** Étapes du formulaire et champs vérifiés à chaque passage. */
export const quoteSteps = [
  { id: 'projet', title: 'Votre projet', fields: ['projectType'] },
  { id: 'objectifs', title: 'Vos objectifs', fields: ['goals'] },
  { id: 'budget', title: 'Budget & délais', fields: ['budget', 'timeline'] },
  { id: 'besoins', title: 'Vos besoins', fields: [] },
  { id: 'coordonnees', title: 'Vos coordonnées', fields: ['name', 'email', 'phone', 'company'] },
  { id: 'recapitulatif', title: 'Récapitulatif', fields: ['consent'] },
] as const satisfies readonly {
  id: string;
  title: string;
  fields: readonly (keyof QuotePayload)[];
}[];

export function labelOf(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

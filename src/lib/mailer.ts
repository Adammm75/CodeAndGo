/**
 * Envoi d'e-mail par SMTP (Gmail), via Nodemailer.
 *
 * Aucune clé en dur : tout vient de l'environnement. Si la configuration
 * manque, on le dit explicitement plutôt que de faire croire à un envoi
 * réussi — c'est la règle qui prime sur toutes les autres dans ce fichier.
 */

import nodemailer, { type Transporter } from 'nodemailer';

import { site } from '@/data/site';

export type MailResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'provider-error'; detail: string };

type SendInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Destinataires internes.
 *
 * Par défaut les adresses déclarées dans `site.contact.notify` ; `ADMIN_EMAIL`
 * les remplace et accepte plusieurs adresses séparées par une virgule ou un
 * point-virgule. Les doublons sont éliminés pour ne jamais envoyer deux fois
 * le même message à la même boîte.
 */
export function recipients(): string[] {
  const fromEnv = (process.env.ADMIN_EMAIL ?? '')
    .split(/[,;]/)
    .map((address) => address.trim())
    .filter(Boolean);

  const list = fromEnv.length > 0 ? fromEnv : [...site.contact.notify];
  return [...new Set(list.map((address) => address.toLowerCase()))];
}

/**
 * L'hôte, l'identifiant et le mot de passe d'application dépendent du compte
 * Gmail : aucune valeur par défaut n'est possible. Les destinataires, eux,
 * sont toujours définis.
 */
export function isMailerConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      recipients().length > 0,
  );
}

/**
 * Un seul transport pour tout le processus.
 *
 * Le recréer à chaque message rouvrirait une connexion TLS et rejouerait
 * l'authentification à chaque envoi. Les délais d'attente sont explicites :
 * sans eux, un port filtré laisse la requête du visiteur suspendue jusqu'au
 * délai d'expiration du serveur.
 */
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const port = Number(process.env.SMTP_PORT ?? 587);

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 exige `secure: true`, 587 exige `false` puis passe en STARTTLS.
    // La variable fait foi, avec repli sur la convention du port.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return transporter;
}

export async function sendMail({ subject, text, replyTo }: SendInput): Promise<MailResult> {
  const user = process.env.SMTP_USER;
  const to = recipients();

  if (!process.env.SMTP_HOST || !user || !process.env.SMTP_PASSWORD || to.length === 0) {
    return {
      ok: false,
      reason: 'not-configured',
      detail:
        'Variables manquantes : SMTP_HOST, SMTP_USER et SMTP_PASSWORD doivent être définies (les destinataires ont une valeur par défaut).',
    };
  }

  try {
    await getTransporter().sendMail({
      // Gmail réécrit l'expéditeur s'il ne correspond pas au compte
      // authentifié : on utilise donc directement l'adresse du compte.
      from: `${site.name} <${user}>`,
      to,
      subject,
      text,
      // Le détail qui change tout à l'usage : « Répondre » dans la boîte de
      // réception répond au visiteur, pas à soi-même.
      ...(replyTo ? { replyTo } : {}),
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, reason: 'provider-error', detail: describe(error) };
  }
}

/** Message d'erreur lisible côté serveur, avec les causes SMTP courantes. */
function describe(error: unknown): string {
  if (!(error instanceof Error)) return 'Erreur inconnue.';

  const code = (error as NodeJS.ErrnoException).code;
  const hint =
    code === 'EAUTH'
      ? " — identifiants refusés : SMTP_PASSWORD doit être un mot de passe d'application Gmail de 16 caractères, pas le mot de passe du compte."
      : code === 'ETIMEDOUT' || code === 'ECONNECTION' || code === 'ESOCKET'
        ? ' — connexion impossible : vérifiez que SMTP_PORT et SMTP_SECURE vont par paire (587 + false, ou 465 + true).'
        : '';

  return `${code ? `[${code}] ` : ''}${error.message}${hint}`.slice(0, 500);
}

/**
 * Limitation de débit simple, en mémoire du processus.
 * Suffisante contre les envois répétés depuis un même poste ; elle ne
 * remplace pas une protection côté hébergeur sur une infrastructure répartie.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const previous = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (previous.length >= MAX_PER_WINDOW) {
    hits.set(key, previous);
    return false;
  }

  previous.push(now);
  hits.set(key, previous);

  // Purge opportuniste pour éviter que la Map ne grossisse indéfiniment.
  if (hits.size > 500) {
    for (const [existingKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(existingKey);
    }
  }

  return true;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'inconnu';
}

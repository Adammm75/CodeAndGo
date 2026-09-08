import { NextResponse } from 'next/server';

import { clientKey, isMailerConfigured, rateLimit, recipients, sendMail } from '@/lib/mailer';
import {
  budgetOptions,
  goalOptions,
  labelOf,
  needOptions,
  normalizeQuote,
  projectTypes,
  timelineOptions,
  validateQuote,
  type QuotePayload,
} from '@/lib/quote';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function buildMessage(payload: QuotePayload): string {
  const lines = [
    'Nouvelle demande de devis — codeandgo.fr',
    '',
    `Nom             : ${payload.name}`,
    `E-mail          : ${payload.email}`,
    `Téléphone       : ${payload.phone || '—'}`,
    `Structure       : ${payload.company || '—'}`,
    '',
    `Type de projet  : ${labelOf(projectTypes, payload.projectType)}`,
    `Objectifs       : ${payload.goals.map((goal) => labelOf(goalOptions, goal)).join(', ')}`,
    `Budget          : ${labelOf(budgetOptions, payload.budget)}`,
    `Échéance        : ${labelOf(timelineOptions, payload.timeline)}`,
    `Besoins         : ${
      payload.needs.length > 0
        ? payload.needs.map((need) => labelOf(needOptions, need)).join(', ')
        : '—'
    }`,
    '',
    'Message :',
    payload.message || '—',
    '',
    `Consentement    : accordé le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
  ];

  return lines.join('\n');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Requête illisible : le corps attendu est au format JSON.' },
      { status: 400 },
    );
  }

  const payload = normalizeQuote(body);

  // Champ leurre : rempli uniquement par un robot.
  if (payload.website) {
    return NextResponse.json(
      { ok: false, message: 'Demande refusée : le formulaire a été rempli de façon incohérente.' },
      { status: 400 },
    );
  }

  const errors = validateQuote(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Certaines informations sont incomplètes ou invalides.',
        errors,
      },
      { status: 400 },
    );
  }

  if (!rateLimit(clientKey(request))) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Trop de demandes envoyées depuis cette connexion. Réessayez dans quelques minutes ou écrivez-nous directement.',
      },
      { status: 429 },
    );
  }

  // Aucun faux succès : si l'envoi n'est pas configuré, on le dit.
  if (!isMailerConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'L’envoi des demandes n’est pas encore configuré sur ce serveur : votre message n’a pas été transmis. Contactez-nous directement par téléphone ou par e-mail, nous vous répondrons aussi vite.',
      },
      { status: 503 },
    );
  }

  const result = await sendMail({
    subject: `Devis — ${labelOf(projectTypes, payload.projectType)} — ${payload.name}`,
    text: buildMessage(payload),
    replyTo: payload.email,
  });

  if (!result.ok) {
    // Le détail fournisseur reste côté serveur ; le visiteur reçoit un message clair.
    console.error(
      `[devis] envoi impossible vers ${recipients().join(', ')} :`,
      result.reason,
      result.detail,
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          'Votre demande n’a pas pu être transmise à cause d’une erreur technique. Merci de nous contacter directement par téléphone ou par e-mail.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Votre demande a bien été envoyée. Nous revenons vers vous sous 24 à 48 heures ouvrées.',
  });
}

import { NextResponse } from 'next/server';

import { clientKey, isMailerConfigured, rateLimit, recipients, sendMail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

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

  const raw = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '');

  const name = text('name');
  const email = text('email');
  const phone = text('phone');
  const message = text('message');
  const consent = raw.consent === true;

  if (text('website')) {
    return NextResponse.json(
      { ok: false, message: 'Demande refusée : le formulaire a été rempli de façon incohérente.' },
      { status: 400 },
    );
  }

  const errors: Errors = {};
  if (name.length < 2) errors.name = 'Indiquez votre nom (2 caractères minimum).';
  if (!emailPattern.test(email)) errors.email = 'Indiquez une adresse e-mail valide.';
  if (message.length < 10) errors.message = 'Décrivez votre demande en quelques mots (10 caractères minimum).';
  else if (message.length > 3000) errors.message = 'Le message est limité à 3 000 caractères.';
  if (!consent) errors.consent = 'Votre accord est nécessaire pour que nous puissions vous répondre.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: 'Certaines informations sont incomplètes ou invalides.', errors },
      { status: 400 },
    );
  }

  if (!rateLimit(clientKey(request))) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Trop de messages envoyés depuis cette connexion. Réessayez dans quelques minutes ou appelez-nous directement.',
      },
      { status: 429 },
    );
  }

  if (!isMailerConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'L’envoi des messages n’est pas encore configuré sur ce serveur : votre message n’a pas été transmis. Contactez-nous directement par téléphone ou par e-mail.',
      },
      { status: 503 },
    );
  }

  const result = await sendMail({
    subject: `Contact — ${name}`,
    text: [
      'Nouveau message — codeandgo.fr',
      '',
      `Nom       : ${name}`,
      `E-mail    : ${email}`,
      `Téléphone : ${phone || '—'}`,
      '',
      'Message :',
      message,
    ].join('\n'),
    replyTo: email,
  });

  if (!result.ok) {
    console.error(
      `[contact] envoi impossible vers ${recipients().join(', ')} :`,
      result.reason,
      result.detail,
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          'Votre message n’a pas pu être transmis à cause d’une erreur technique. Merci de nous contacter directement par téléphone ou par e-mail.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Votre message a bien été envoyé. Nous vous répondons sous 24 à 48 heures ouvrées.',
  });
}

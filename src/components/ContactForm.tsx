'use client';

import { useId, useState } from 'react';

import { ArrowRight, Check } from './Icons';
import styles from './QuoteWizard.module.css';

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'consent', string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
    website: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!(key in previous)) return previous;
      const next = { ...previous };
      delete next[key as keyof Errors];
      return next;
    });
  };

  /** Mêmes règles que côté serveur : le serveur reste la source de vérité. */
  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = 'Indiquez votre nom (2 caractères minimum).';
    if (!emailPattern.test(values.email.trim())) next.email = 'Indiquez une adresse e-mail valide.';
    if (values.phone && !/^[+0-9\s().-]{6,25}$/.test(values.phone)) {
      next.phone = 'Ce numéro de téléphone n’est pas reconnu.';
    }
    if (values.message.trim().length < 10) {
      next.message = 'Décrivez votre demande en quelques mots (10 caractères minimum).';
    }
    if (!values.consent) {
      next.consent = 'Votre accord est nécessaire pour que nous puissions vous répondre.';
    }
    return next;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result: { ok?: boolean; message?: string; errors?: Errors } = await response.json();

      if (response.ok && result.ok) {
        setStatus('sent');
        setServerMessage(result.message ?? 'Votre message a bien été envoyé.');
        return;
      }

      setStatus('error');
      setServerMessage(result.message ?? 'Votre message n’a pas pu être envoyé.');
      if (result.errors) setErrors(result.errors);
    } catch {
      setStatus('error');
      setServerMessage(
        'Impossible de joindre le serveur. Vérifiez votre connexion, ou appelez-nous directement.',
      );
    }
  };

  if (status === 'sent') {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneIcon} aria-hidden="true">
          <Check width={22} height={22} />
        </span>
        <h2 className={`h3 ${styles.doneTitle}`}>Message envoyé</h2>
        <p className={styles.doneText}>{serverMessage}</p>
      </div>
    );
  }

  return (
    <form className={styles.panel} onSubmit={submit} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Ne pas remplir</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => set('website', event.target.value)}
        />
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-name`}>
            Votre nom
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={`${uid}-name`}
            className={styles.input}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => set('name', event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          />
          {errors.name ? (
            <p id={`${uid}-name-error`} className={styles.error} role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-email`}>
            Votre e-mail
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={`${uid}-email`}
            className={styles.input}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => set('email', event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
          />
          {errors.email ? (
            <p id={`${uid}-email-error`} className={styles.error} role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-phone`}>
            Téléphone
            <span className={styles.hint}>Facultatif</span>
          </label>
          <input
            id={`${uid}-phone`}
            className={styles.input}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => set('phone', event.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
          />
          {errors.phone ? (
            <p id={`${uid}-phone-error`} className={styles.error} role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className={styles.full}>
          <label className={styles.label} htmlFor={`${uid}-message`}>
            Votre message
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id={`${uid}-message`}
            className={styles.textarea}
            rows={6}
            maxLength={3000}
            value={values.message}
            onChange={(event) => set('message', event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          />
          {errors.message ? (
            <p id={`${uid}-message-error`} className={styles.error} role="alert">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.consentBlock}>
        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => set('consent', event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
          />
          <span>
            J’accepte que ces informations soient utilisées par CodeAndGo pour me recontacter au
            sujet de ma demande.
          </span>
        </label>
        {errors.consent ? (
          <p id={`${uid}-consent-error`} className={styles.error} role="alert">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === 'error' && serverMessage ? (
        <p className={styles.serverError} role="alert">
          {serverMessage}
        </p>
      ) : null}

      <div className={styles.actions}>
        <span />
        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
          {status === 'sending' ? null : <ArrowRight />}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useId, useRef, useState } from 'react';

import {
  budgetOptions,
  goalOptions,
  labelOf,
  needOptions,
  projectTypes,
  quoteSteps,
  timelineOptions,
  validateQuote,
  type FieldErrors,
  type QuotePayload,
} from '@/lib/quote';
import { site } from '@/data/site';

import { ArrowRight, Check } from './Icons';
import styles from './QuoteWizard.module.css';

const emptyPayload: QuotePayload = {
  projectType: '',
  goals: [],
  budget: '',
  timeline: '',
  needs: [],
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  consent: false,
  website: '',
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuotePayload>(emptyPayload);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();

  const current = quoteSteps[step];
  const isLast = step === quoteSteps.length - 1;

  const set = <K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) => {
    setData((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!(key in previous)) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const toggle = (key: 'goals' | 'needs', value: string) => {
    const list = data[key];
    set(key, list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  /** Ne valide que les champs de l'étape courante. */
  const validateStep = (): boolean => {
    if (!current) return true;
    const all = validateQuote(data);
    const stepErrors: FieldErrors = {};

    for (const field of current.fields) {
      const message = all[field];
      if (message) stepErrors[field] = message;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const goTo = (index: number) => {
    setStep(index);
    // Le titre reprend le focus : la progression est annoncée au lecteur d'écran.
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < quoteSteps.length - 1) goTo(step + 1);
  };

  const back = () => {
    setErrors({});
    if (step > 0) goTo(step - 1);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLast) {
      next();
      return;
    }

    const all = validateQuote(data);
    if (Object.keys(all).length > 0) {
      setErrors(all);
      // On renvoie l'utilisateur à la première étape qui pose problème.
      const faulty = quoteSteps.findIndex((quoteStep) =>
        quoteStep.fields.some((field) => all[field]),
      );
      if (faulty >= 0) goTo(faulty);
      return;
    }

    setStatus('sending');
    setServerMessage('');

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result: { ok?: boolean; message?: string; errors?: FieldErrors } =
        await response.json();

      if (response.ok && result.ok) {
        setStatus('sent');
        setServerMessage(result.message ?? 'Votre demande a bien été envoyée.');
        return;
      }

      setStatus('error');
      setServerMessage(
        result.message ?? 'Votre demande n’a pas pu être envoyée. Merci de réessayer.',
      );
      if (result.errors) setErrors(result.errors);
    } catch {
      setStatus('error');
      setServerMessage(
        'Impossible de joindre le serveur. Vérifiez votre connexion, ou contactez-nous directement par téléphone.',
      );
    }
  };

  if (status === 'sent') {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneIcon} aria-hidden="true">
          <Check width={22} height={22} />
        </span>
        <h2 className={`h3 ${styles.doneTitle}`}>Demande envoyée</h2>
        <p className={styles.doneText}>{serverMessage}</p>
        <p className={styles.doneHint}>
          Un besoin urgent&nbsp;? Vous pouvez aussi nous appeler directement au{' '}
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.wizard} onSubmit={submit} noValidate>
      {/* Champ leurre : invisible et hors du parcours clavier. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Ne pas remplir</label>
        <input
          id={`${uid}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(event) => set('website', event.target.value)}
        />
      </div>

      <ol className={styles.steps}>
        {quoteSteps.map((quoteStep, index) => (
          <li key={quoteStep.id} className={styles.stepItem}>
            <button
              type="button"
              className={`${styles.stepButton} ${index === step ? styles.stepCurrent : ''} ${
                index < step ? styles.stepDone : ''
              }`}
              onClick={() => (index < step ? goTo(index) : undefined)}
              disabled={index > step}
              aria-current={index === step ? 'step' : undefined}
            >
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.stepLabel}>{quoteStep.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={styles.panel}>
        <h2 ref={headingRef} tabIndex={-1} className={`h3 ${styles.panelTitle}`}>
          {current?.title}
          <span className={styles.panelCount}>
            Étape {step + 1} sur {quoteSteps.length}
          </span>
        </h2>

        {/* --- 1. Type de projet --- */}
        {current?.id === 'projet' ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Quel type de projet souhaitez-vous lancer ?</legend>
            <div className={styles.choices}>
              {projectTypes.map((option) => (
                <label key={option.value} className={styles.choice}>
                  <input
                    type="radio"
                    name="projectType"
                    value={option.value}
                    checked={data.projectType === option.value}
                    onChange={() => set('projectType', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <FieldError id={`${uid}-projectType`} message={errors.projectType} />
          </fieldset>
        ) : null}

        {/* --- 2. Objectifs --- */}
        {current?.id === 'objectifs' ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              Qu’attendez-vous de ce site ? Plusieurs réponses possibles.
            </legend>
            <div className={styles.choices}>
              {goalOptions.map((option) => (
                <label key={option.value} className={styles.choice}>
                  <input
                    type="checkbox"
                    name="goals"
                    value={option.value}
                    checked={data.goals.includes(option.value)}
                    onChange={() => toggle('goals', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <FieldError id={`${uid}-goals`} message={errors.goals} />
          </fieldset>
        ) : null}

        {/* --- 3. Budget & délais --- */}
        {current?.id === 'budget' ? (
          <>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Quel budget avez-vous en tête ?</legend>
              <div className={styles.choices}>
                {budgetOptions.map((option) => (
                  <label key={option.value} className={styles.choice}>
                    <input
                      type="radio"
                      name="budget"
                      value={option.value}
                      checked={data.budget === option.value}
                      onChange={() => set('budget', option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              <FieldError id={`${uid}-budget`} message={errors.budget} />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Dans quel délai souhaitez-vous démarrer ?</legend>
              <div className={styles.choices}>
                {timelineOptions.map((option) => (
                  <label key={option.value} className={styles.choice}>
                    <input
                      type="radio"
                      name="timeline"
                      value={option.value}
                      checked={data.timeline === option.value}
                      onChange={() => set('timeline', option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              <FieldError id={`${uid}-timeline`} message={errors.timeline} />
            </fieldset>
          </>
        ) : null}

        {/* --- 4. Besoins --- */}
        {current?.id === 'besoins' ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              De quoi avez-vous besoin en plus du site ? Facultatif.
            </legend>
            <div className={styles.choices}>
              {needOptions.map((option) => (
                <label key={option.value} className={styles.choice}>
                  <input
                    type="checkbox"
                    name="needs"
                    value={option.value}
                    checked={data.needs.includes(option.value)}
                    onChange={() => toggle('needs', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* --- 5. Coordonnées --- */}
        {current?.id === 'coordonnees' ? (
          <div className={styles.fields}>
            <Field
              id={`${uid}-name`}
              label="Votre nom"
              required
              value={data.name}
              error={errors.name}
              autoComplete="name"
              onChange={(value) => set('name', value)}
            />
            <Field
              id={`${uid}-email`}
              label="Votre e-mail"
              type="email"
              required
              value={data.email}
              error={errors.email}
              autoComplete="email"
              onChange={(value) => set('email', value)}
            />
            <Field
              id={`${uid}-phone`}
              label="Téléphone"
              type="tel"
              hint="Facultatif"
              value={data.phone}
              error={errors.phone}
              autoComplete="tel"
              onChange={(value) => set('phone', value)}
            />
            <Field
              id={`${uid}-company`}
              label="Structure"
              hint="Facultatif"
              value={data.company}
              error={errors.company}
              autoComplete="organization"
              onChange={(value) => set('company', value)}
            />
            <div className={styles.full}>
              <label className={styles.label} htmlFor={`${uid}-message`}>
                Votre projet en quelques mots
                <span className={styles.hint}>Facultatif</span>
              </label>
              <textarea
                id={`${uid}-message`}
                className={styles.textarea}
                rows={5}
                maxLength={3000}
                value={data.message}
                onChange={(event) => set('message', event.target.value)}
                aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                aria-invalid={errors.message ? true : undefined}
              />
              <FieldError id={`${uid}-message`} message={errors.message} />
            </div>
          </div>
        ) : null}

        {/* --- 6. Récapitulatif --- */}
        {current?.id === 'recapitulatif' ? (
          <div className={styles.summary}>
            <dl className={styles.recap}>
              <Row label="Type de projet" value={labelOf(projectTypes, data.projectType)} />
              <Row
                label="Objectifs"
                value={data.goals.map((goal) => labelOf(goalOptions, goal)).join(', ')}
              />
              <Row label="Budget" value={labelOf(budgetOptions, data.budget)} />
              <Row label="Échéance" value={labelOf(timelineOptions, data.timeline)} />
              <Row
                label="Besoins"
                value={
                  data.needs.length > 0
                    ? data.needs.map((need) => labelOf(needOptions, need)).join(', ')
                    : '—'
                }
              />
              <Row label="Nom" value={data.name} />
              <Row label="E-mail" value={data.email} />
              <Row label="Téléphone" value={data.phone || '—'} />
              <Row label="Structure" value={data.company || '—'} />
              <Row label="Message" value={data.message || '—'} />
            </dl>

            <div className={styles.consentBlock}>
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(event) => set('consent', event.target.checked)}
                  aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
                  aria-invalid={errors.consent ? true : undefined}
                />
                <span>
                  J’accepte que ces informations soient utilisées par CodeAndGo pour me
                  recontacter au sujet de ma demande. Elles ne sont ni revendues ni utilisées à
                  d’autres fins.
                </span>
              </label>
              <FieldError id={`${uid}-consent`} message={errors.consent} />
            </div>
          </div>
        ) : null}

        {status === 'error' && serverMessage ? (
          <p className={styles.serverError} role="alert">
            {serverMessage}
          </p>
        ) : null}

        <div className={styles.actions}>
          {step > 0 ? (
            <button type="button" className="btn btn--ghost" onClick={back}>
              Retour
            </button>
          ) : (
            <span />
          )}

          {isLast ? (
            <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
              {status === 'sending' ? null : <ArrowRight />}
            </button>
          ) : (
            <button type="button" className="btn btn--primary" onClick={next}>
              Continuer
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

/* --- Sous-composants --- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.recapRow}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className={styles.error} role="alert">
      {message}
    </p>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  hint?: string;
  error?: string;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  hint,
  error,
  autoComplete,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : null}
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </label>
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
      />
      <FieldError id={id} message={error} />
    </div>
  );
}

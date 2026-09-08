# CodeAndGo — site officiel

Site de **CodeAndGo**, agence web & solutions IA indépendante en France.
« Votre site web, conçu pour convaincre. »

Next.js 15 (App Router), React 19, TypeScript strict, CSS Modules. Aucune
bibliothèque d’animation : tout le mouvement repose sur CSS et
`IntersectionObserver`.

## Démarrer

```bash
npm install
```

```bash
npm run dev
```

Le site est alors servi sur http://localhost:3000.

## Scripts

| Script              | Rôle                                             |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Serveur de développement                         |
| `npm run build`     | Build de production                              |
| `npm run start`     | Sert le build de production                      |
| `npm run lint`      | ESLint (configuration plate, CLI ESLint)         |
| `npm run typecheck` | Vérification TypeScript sans émission            |

## Variables d’environnement

Copiez `.env.example` en `.env` à la racine et renseignez les valeurs.

| Variable               | Obligatoire  | Rôle                                                   |
| ---------------------- | ------------ | ------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | recommandé   | URL canonique (métadonnées, sitemap, Open Graph)         |
| `SMTP_HOST`            | pour l'envoi | `smtp.gmail.com`                                        |
| `SMTP_PORT`            | pour l'envoi | `587` (avec `SMTP_SECURE=false`) ou `465` (avec `true`) |
| `SMTP_SECURE`          | pour l'envoi | `false` en 587, `true` en 465 — les deux vont par paire |
| `SMTP_USER`            | pour l'envoi | Adresse Gmail complète du compte expéditeur             |
| `SMTP_PASSWORD`        | pour l'envoi | **Mot de passe d'application** de 16 caractères         |
| `ADMIN_EMAIL`          | facultatif   | Remplace les destinataires par défaut (séparés par `,`) |

### Mettre l'envoi en service

L'envoi passe par le SMTP de Gmail (Nodemailer). Le mot de passe du compte
Google **ne fonctionne pas** : Google a bloqué l'authentification SMTP par mot
de passe en 2022. Il faut un mot de passe d'application dédié.

1. Activer la validation en deux étapes sur
   [myaccount.google.com](https://myaccount.google.com) → Sécurité. Sans elle,
   l'étape suivante n'existe pas.
2. Créer un mot de passe d'application sur
   [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
   Les 16 caractères ne sont affichés qu'une seule fois ; les espaces sont
   acceptés ou non, indifféremment.
3. Renseigner `SMTP_USER` et `SMTP_PASSWORD` dans `.env` à la racine.
4. En production, recopier chaque variable dans les réglages de l'hébergeur
   (section *Environment Variables*) puis redéployer : le fichier `.env` reste
   sur le poste de développement, il n'est jamais lu en ligne.

Les destinataires internes sont déclarés dans `site.contact.notify`
(`src/data/site.ts`) et surchargeables par `ADMIN_EMAIL` : **codeandgocontact@gmail.com**
et **adam.mekkiou@outlook.fr**. Chaque demande part vers les deux, avec
l'adresse du visiteur en `reply-to` pour répondre d'un simple « Répondre ».

Gmail réécrit l'expéditeur pour qu'il corresponde au compte authentifié : les
messages partent donc de `SMTP_USER`. Pour écrire depuis une adresse du nom de
domaine, il faut soit déclarer un alias dans Gmail (Paramètres → Comptes →
Envoyer des e-mails en tant que), soit passer par un service d'envoi dédié.
À noter aussi : un compte Gmail gratuit est limité à environ 500 envois par
jour — largement suffisant pour un formulaire de contact.

#### Diagnostic

| Symptôme                                | Cause                                                          |
| --------------------------------------- | -------------------------------------------------------------- |
| `EAUTH` / `535 Invalid login`           | Mot de passe du compte au lieu du mot de passe d'application     |
| L'envoi reste bloqué puis expire         | `SMTP_PORT` et `SMTP_SECURE` incohérents (465 exige `true`)     |
| Fonctionne en local, pas en ligne       | Variables non recopiées chez l'hébergeur                       |
| L'expéditeur affiché n'est pas le bon    | Réécriture Gmail : voir l'alias ci-dessus                       |

Tant que la configuration SMTP n'est pas renseignée, les routes `/api/devis`
et `/api/contact` répondent **503 avec un message explicite** : aucun faux
succès n'est jamais affiché au visiteur.

`.env` est ignoré par Git. Aucun secret ne doit être committé.

## Structure

```
src/
  app/            routes App Router, API, sitemap, robots, manifest
  components/     composants d'interface (un CSS Module par composant)
  data/           contenus centralisés (services, projets, tarifs, FAQ…)
  lib/            SEO, validation du devis, envoi d'e-mail (SMTP)
public/brand/     identité visuelle CodeAndGo
```

Tout le contenu éditorial vit dans `src/data/`. Pour modifier un tarif, une
question de FAQ ou un projet, il n’est pas nécessaire de toucher au JSX.

## Réalisations

Les projets de `src/data/projects.ts` sont des **concepts de démonstration**
conçus en interne (`demo: true`), affichés comme tels dans l’interface. Aucun
client réel, aucun résultat commercial et aucun témoignage n’y figure. Ne
passez un projet à `demo: false` qu’avec l’accord écrit du client concerné.

De même, les scores de la section « Performance & qualité » sont des
**objectifs de conception**, pas des audits obtenus.

## Accessibilité & mouvement

- Navigation entièrement au clavier (menu, onglets, accordéon, formulaires).
- Lien d’évitement, focus visible, hiérarchie de titres cohérente.
- `prefers-reduced-motion` désactive tout mouvement non essentiel ; le contenu
  reste intégralement lisible.
- Sans JavaScript, une règle `<noscript>` rend visibles les blocs animés ; et
  si `IntersectionObserver` ne répond pas, un filet de sécurité les révèle
  après 1,5 s.

## Avant la mise en ligne

Deux pages légales contiennent des encadrés « à compléter » qui appellent des
informations que seul l’exploitant possède :

- `/mentions-legales` — adresse du siège, SIREN/SIRET, TVA, coordonnées de
  l’hébergeur retenu ;
- `/confidentialite` — mention d’un éventuel transfert de données hors UE.

Renseignez également `NEXT_PUBLIC_SITE_URL` avec le domaine définitif.

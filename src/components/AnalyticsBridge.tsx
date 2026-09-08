import Script from 'next/script';

/**
 * Mesure d'audience optionnelle et sans cookie (Plausible).
 *
 * Tant que `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` n'est pas renseignée, ce composant
 * ne rend rien du tout : aucun script tiers n'est chargé, aucune donnée n'est
 * envoyée, et la page « Cookies » reste exacte.
 */
export function AnalyticsBridge() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      src="https://plausible.io/js/script.js"
      data-domain={domain}
      strategy="afterInteractive"
    />
  );
}

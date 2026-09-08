type Props = {
  /** Objet JSON-LD déjà construit côté serveur. */
  data: unknown;
};

/**
 * Injecte des données structurées. Le contenu est produit par notre propre
 * code (jamais une saisie utilisateur), et on neutralise `<` par sécurité pour
 * éviter toute fermeture prématurée de la balise script.
 */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

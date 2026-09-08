import type { ReactNode } from 'react';

import styles from './LegalContent.module.css';

type Props = {
  children: ReactNode;
  /** Date de dernière révision du texte, affichée en tête. */
  updatedAt: string;
};

/** Mise en forme éditoriale commune aux pages légales. */
export function LegalContent({ children, updatedAt }: Props) {
  return (
    <div className={styles.prose}>
      <p className={styles.updated}>Dernière mise à jour : {updatedAt}</p>
      {children}
    </div>
  );
}

/** Encart signalant une information que l'exploitant doit renseigner. */
export function ToComplete({ children }: { children: ReactNode }) {
  return <p className={styles.toComplete}>{children}</p>;
}

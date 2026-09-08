import Image from 'next/image';

import styles from './QrDevis.module.css';

/**
 * QR code vers le formulaire de devis.
 *
 * Volontairement masqué sur les appareils tactiles : un téléphone ne peut pas
 * scanner son propre écran, le bloc n'y serait qu'un encombrement. Il sert au
 * visiteur sur ordinateur qui veut poursuivre sur son mobile, et à montrer
 * l'écran à quelqu'un d'autre.
 *
 * Le SVG n'est pas optimisé : 1,5 Ko, net à toutes les tailles, et le passer
 * par l'optimiseur d'images n'apporterait rien.
 */
export function QrDevis() {
  return (
    <div className={styles.card}>
      <div className={styles.frame}>
        <Image
          src="/brand/qr-devis.svg"
          alt="QR code menant au formulaire de demande de devis de CodeAndGo"
          width={132}
          height={132}
          className={styles.code}
          unoptimized
        />
      </div>
      <div className={styles.text}>
        <p className={styles.title}>Scannez pour un devis gratuit</p>
        <p className={styles.note}>
          Ouvre le formulaire sur votre téléphone. Réponse sous 24 à 48 heures ouvrées.
        </p>
      </div>
    </div>
  );
}

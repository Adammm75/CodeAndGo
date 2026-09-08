/**
 * Génère le QR code affiché sur la page Contact.
 *
 * Le fichier produit est versionné : ce script n'a besoin d'être relancé que
 * si l'adresse cible change.
 *
 *   node scripts/generate-qr.mjs
 */
import { writeFile } from 'node:fs/promises';
import QRCode from 'qrcode';

const TARGET = 'https://www.codeandgo.fr/devis';
const OUTPUT = new URL('../public/brand/qr-devis.svg', import.meta.url);

const svg = await QRCode.toString(TARGET, {
  type: 'svg',
  // Niveau Q : le code reste lisible même partiellement masqué ou photographié
  // de biais, ce qui arrive souvent quand on scanne un écran.
  errorCorrectionLevel: 'Q',
  // Zone de silence réglementaire : sans elle, beaucoup de lecteurs échouent.
  margin: 2,
  color: { dark: '#050810', light: '#ffffff' },
});

await writeFile(OUTPUT, svg, 'utf8');
console.log(`QR code écrit : public/brand/qr-devis.svg → ${TARGET}`);

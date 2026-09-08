import { Spark } from './Icons';
import styles from './KineticBand.module.css';

const words = ['STRATÉGIE', 'DESIGN', 'DÉVELOPPEMENT', 'IA', 'PERFORMANCE'];

function Sequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <span className={styles.sequence} aria-hidden={duplicate || undefined}>
      {words.map((word) => (
        <span key={word} className={styles.item}>
          <span className={styles.word}>{word}</span>
          <Spark className={styles.star} width={13} height={13} />
        </span>
      ))}
    </span>
  );
}

/**
 * Bandeau typographique cinétique.
 * Le contenu est dupliqué uniquement pour obtenir une boucle continue :
 * la copie est masquée aux technologies d'assistance.
 */
export function KineticBand() {
  return (
    <div className={styles.band} data-anim>
      <div className={styles.rail}>
        <div className={styles.track}>
          <Sequence />
          <Sequence duplicate />
        </div>
      </div>
    </div>
  );
}

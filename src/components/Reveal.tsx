import type { CSSProperties, ElementType, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Direction d'entrée. */
  from?: 'bottom' | 'left' | 'right' | 'scale';
  /** Décalage en millisecondes, pour orchestrer une série d'éléments. */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * Marque un bloc comme révélable au scroll. L'observation est faite une seule
 * fois par MotionDirector, qui ajoute la classe `is-visible`.
 * Sans JavaScript, une règle <noscript> rend tout visible immédiatement.
 */
/**
 * Les décalages sont compressés ici plutôt que dans la vingtaine d'appels :
 * l'effet de cascade reste lisible, mais le dernier élément d'une série
 * n'attend plus une demi-seconde avant de commencer à apparaître.
 */
const MAX_DELAY_MS = 170;

export function Reveal({
  children,
  from = 'bottom',
  delay = 0,
  as: Tag = 'div',
  className,
  style,
}: Props) {
  const staggered = Math.min(Math.round(delay * 0.55), MAX_DELAY_MS);
  const variant =
    from === 'left'
      ? 'reveal--left'
      : from === 'right'
        ? 'reveal--right'
        : from === 'scale'
          ? 'reveal--scale'
          : '';

  return (
    <Tag
      className={['reveal', variant, className ?? ''].filter(Boolean).join(' ')}
      style={{ ...style, ...(staggered ? { '--reveal-delay': `${staggered}ms` } : {}) } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

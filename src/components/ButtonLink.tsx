import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArrowRight } from './Icons';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'sm';
  withArrow?: boolean;
  block?: boolean;
  className?: string;
};

/**
 * Lien d'action. On utilise volontairement un <a>/<Link> et non un <button> :
 * ces éléments naviguent, ils ne déclenchent pas d'action.
 */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  block = false,
  className,
}: Props) {
  const classes = [
    'btn',
    variant === 'primary' ? 'btn--primary' : 'btn--ghost',
    size === 'sm' ? 'btn--sm' : '',
    block ? 'btn--block' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
        {withArrow ? <ArrowRight /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {withArrow ? <ArrowRight /> : null}
    </Link>
  );
}

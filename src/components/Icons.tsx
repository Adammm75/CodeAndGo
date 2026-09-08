import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Toutes les icônes sont décoratives : le sens est porté par le texte adjacent. */
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5l3.2 3.2L13 5" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 2.5H3.2A1.2 1.2 0 002 3.8C2 9 7 14 12.2 14a1.2 1.2 0 001.3-1.2v-2.3l-2.8-1-1.2 1.5a9.6 9.6 0 01-3.5-3.5L7.5 6.3l-1-2.6z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="1.8" y="3.3" width="12.4" height="9.4" rx="1.4" />
      <path d="M2.4 4.4L8 8.6l5.6-4.2" />
    </svg>
  );
}

export function Spark(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={1.2}>
      <path d="M8 1.6l1.5 4.9L14.4 8l-4.9 1.5L8 14.4l-1.5-4.9L1.6 8l4.9-1.5z" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

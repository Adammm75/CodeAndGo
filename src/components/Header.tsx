'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { mainNav, site } from '@/data/site';

import { BrandLockup } from './BrandLockup';
import { ArrowRight, Close, Menu } from './Icons';
import styles from './Header.module.css';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);

  // Fond du header + barre de progression de lecture, en une seule frame.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? Math.min(scrollTop / height, 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      // On ne sollicite React qu'au franchissement du seuil, pas à chaque
      // frame de défilement.
      const next = scrollTop > 12;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Le menu se ferme dès qu'on change de page.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Verrouillage du scroll, Échap et piège à focus pendant l'ouverture.
  useEffect(() => {
    if (!open) return;

    document.body.dataset.scrollLocked = 'true';
    const panel = panelRef.current;
    // Capturé ici : la valeur de la ref peut changer d'ici le nettoyage.
    const toggle = toggleRef.current;
    const previous = document.activeElement as HTMLElement | null;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        // La restauration du focus est faite une seule fois, au nettoyage.
        close();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (item) => item.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      delete document.body.dataset.scrollLocked;
      // On rend le focus à l'élément d'origine s'il est toujours dans le
      // document ; à défaut, au bouton du menu, pour ne jamais le perdre.
      const restore =
        previous && document.contains(previous) && previous !== document.body ? previous : toggle;
      restore?.focus?.();
    };
  }, [open, close]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`${styles.header} ${scrolled ? styles.isScrolled : ''}`}>
      <div className={`container ${styles.bar}`}>
        <BrandLockup priority />

        <nav className={styles.nav} aria-label="Navigation principale">
          <ul className={styles.navList}>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/devis" className={`btn btn--primary btn--sm ${styles.cta}`}>
            Parler de mon projet
            <ArrowRight />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close /> : <Menu />}
            <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          </button>
        </div>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <div ref={progressRef} className={styles.progressBar} />
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <nav className={styles.panelNav} aria-label="Navigation mobile">
          <ul>
            {mainNav.map((item, index) => (
              <li key={item.href} style={{ '--i': index } as React.CSSProperties}>
                <Link
                  href={item.href}
                  className={styles.panelLink}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <span className="num">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.panelFooter}>
          <Link href="/devis" className="btn btn--primary btn--block">
            Demander un devis
            <ArrowRight />
          </Link>
          <a href={site.contact.phoneHref} className={styles.panelContact}>
            {site.contact.phone}
          </a>
          <a href={site.contact.emailHref} className={styles.panelContact}>
            {site.contact.email}
          </a>
        </div>
      </div>
    </header>
  );
}

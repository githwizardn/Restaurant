import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollTo(targetId: string): void {
    if (typeof document === 'undefined') return;

    const el = document.getElementById(targetId);
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }
}
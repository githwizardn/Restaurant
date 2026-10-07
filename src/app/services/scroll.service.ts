import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollTo(targetId: string): void {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(targetId);
    if (!el) return;
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
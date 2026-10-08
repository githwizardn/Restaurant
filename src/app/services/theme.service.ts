import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'burger-lions:theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      if (!this.isBrowser) return;

      const root = document.documentElement;
      root.setAttribute('data-theme', currentTheme);

      try {
        localStorage.setItem(STORAGE_KEY, currentTheme);
      } catch {
        /* ignore */
      }
    });
  }

  toggle(): void {
    this.theme.update(current => (current === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this.theme.set(theme);
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) return 'dark';

    // 1. შენახული არჩევანი
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      /* ignore */
    }

    // 2. სისტემის პრეფერენსი
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    // 3. Default — dark
    return 'dark';
  }
}
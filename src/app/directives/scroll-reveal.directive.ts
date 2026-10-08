import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type RevealVariant =
  | 'fade-up'
  | 'fade-in'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private _variant: RevealVariant = 'fade-up';

  /** Animation variant. Default: 'fade-up' */
  @Input() set appScrollReveal(value: RevealVariant | '' | null | undefined) {
    this._variant = value && value.length > 0 ? value : 'fade-up';
  }
  get appScrollReveal(): RevealVariant {
    return this._variant;
  }

  /** Delay in milliseconds. Use for stagger effect. Default: 0 */
  @Input() revealDelay = 0;

  /** Intersection threshold (0-1). Default: 0.15 */
  @Input() revealThreshold = 0.15;

  /** If true, reveals once and stays. If false, toggles. Default: true */
  @Input() revealOnce = true;

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const host = this.hostRef.nativeElement;
    const variant = this._variant;

    host.classList.add('reveal', `reveal-${variant}`);

    if (this.revealDelay) {
      host.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    // Fallback: if no browser, no IO support, or reduced motion → show immediately
    if (
      !this.isBrowser ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      host.classList.add('revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (this.revealOnce) {
              this.observer?.unobserve(entry.target);
            }
          } else if (!this.revealOnce) {
            entry.target.classList.remove('revealed');
          }
        }
      },
      {
        threshold: this.revealThreshold,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
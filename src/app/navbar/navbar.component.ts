import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../services/scroll.service';
import { ThemeService } from '../services/theme.service';

interface NavItem {
  label: string;
  link: string;
  sectionId: string;
}

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly themeService = inject(ThemeService);

  private observer?: IntersectionObserver;

  menuItems: NavItem[] = [
    { label: 'მთავარი', link: '#home', sectionId: 'home' },
    { label: 'ჩვენს შესახებ', link: '#about-us', sectionId: 'about-us' },
    { label: 'მზარეულები', link: '#chefs', sectionId: 'chefs' },
    { label: 'მენიუ', link: '#menu', sectionId: 'menu' },
    { label: 'გალერეა', link: '#gallery', sectionId: 'gallery' },
    { label: 'კონტაქტი', link: '#contacts', sectionId: 'contacts' },
  ];

  isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 992;
  isTransparentBg = true;
  activeSection: string | null = null;
  mobileMenuOpen = false;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            this.cdr.markForCheck();
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px' }
    );

    this.menuItems.forEach(item => {
      const el = document.getElementById(item.sectionId);
      if (el) this.observer!.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isSmallScreen = window.innerWidth <= 992;
    if (this.isSmallScreen) this.mobileMenuOpen = false;
    this.cdr.markForCheck();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const transparent = window.scrollY < 90;
    if (transparent !== this.isTransparentBg) {
      this.isTransparentBg = transparent;
      this.cdr.markForCheck();
    }
  }

  navigate(event: Event, link: string): void {
    event.preventDefault();
    this.scrollService.scrollTo(link.slice(1));
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  get isLightTheme(): boolean {
    return this.themeService.theme() === 'light';
  }
}
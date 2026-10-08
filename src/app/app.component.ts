import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { MenuComponent } from './menu/menu.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollService } from './services/scroll.service';
import { SeoService } from './services/seo.service';
import { ThemeService } from './services/theme.service';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    AboutComponent,
    TeamComponent,
    MenuComponent,
    CardCarouselComponent,
    BookingFormComponent,
    FooterComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly scrollService = inject(ScrollService);
  private readonly seo = inject(SeoService);
  private readonly cdr = inject(ChangeDetectorRef);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private readonly themeService = inject(ThemeService);

  private ticking = false;

  hasScrolledPastHome = false;

  readonly galleryImages: string[] = [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800',
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  ];

  ngOnInit(): void {
    this.seo.updateTitle('მთავარი');
    this.seo.updateMetaTags({
      description:
        'Burger Lions — ხელნაკეთი ბურგერები ახალი ინგრედიენტებით. ვარკეთილი, თბილისი. შეუკვეთეთ ონლაინ.',
      url: 'https://angular-beta-eight-80.vercel.app/',
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;

    requestAnimationFrame(() => {
      const next = window.scrollY > window.innerHeight - 750;
      if (next !== this.hasScrolledPastHome) {
        this.hasScrolledPastHome = next;
        this.cdr.markForCheck();
      }
      this.ticking = false;
    });
  }

  scrollToBookingTable(): void {
    this.scrollService.scrollTo('booking-table');
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    this.scrollService.scrollTo('home');
  }

  trackByIndex(index: number): number {
    return index;
  }
}
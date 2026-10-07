import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { MenuComponent } from './menu/menu.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollService } from './services/scroll.service';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private scrollService = inject(ScrollService);
  private ticking = false;

  hasScrolledPastHome = false;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.hasScrolledPastHome = window.scrollY > window.innerHeight - 750;
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

  galleryImages = [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800',
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
    'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=800',
  ];
}
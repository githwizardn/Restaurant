import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Dish {
  img: string;
  title: string;
  description: string;
  price: string;
}

@Component({
  selector: 'card-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCarouselComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  private intervalId?: ReturnType<typeof setInterval>;
  private resizeTimer?: ReturnType<typeof setTimeout>;
  private autoplayPaused = false;

  readonly dishes: Dish[] = [
    {
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&fm=webp&q=80',
      title: 'ობელიქსი',
      description: 'საქონლის ხორცი 300 გრ, ჩედარი 3 ფენა, სპეც სოუსი.',
      price: '25.80₾',
    },
    {
      img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&fm=webp&q=80',
      title: 'თეთრი ლომი',
      description: 'ხორცი 300 გრ, ემენტალი 4 ფენა, კამემბერი 4 ფენა.',
      price: '29.80₾',
    },
    {
      img: 'https://imageproxy.wolt.com/menu/menu-images/686380e482ce7348b615eaea/a82c4148-bb2f-11f1-94dd-6e5a255720cc_197.jpg_c_20260928152752?w=600',
      title: '5 ყველის ბურგერი',
      description: 'საქონლის ხორცი 300გრ, ჩედარი, პარმეზანი, მიმოლეტე.',
      price: '33.80₾',
    },
    {
      img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&fm=webp&q=80',
      title: 'ჰალაპენიო ბურგერი',
      description: 'ხორცი 300 გრ, ჩედარი 4 ფენა, კარამელიზირებული ჰალაპენიო.',
      price: '31.80₾',
    },
    {
      img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&fm=webp&q=80',
      title: 'ზევსი',
      description: 'საქონლის ხორცი 300გრ, ბეკონი, ჩედარი 3 ფენა.',
      price: '34.80₾',
    },
    {
      img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&fm=webp&q=80',
      title: 'სფინქსი (მწვადბურგერი)',
      description: 'ხორცი 300 გრ, ღორის ხორცი 200 გრ, ჰალაპენიოს სოუსი.',
      price: '36.80₾',
    },
  ];

  visibleCount = 4;
  offset = 0;

  get visibleDishes(): Dish[] {
    const n = this.dishes.length;
    return Array.from(
      { length: this.visibleCount },
      (_, i) => this.dishes[(this.offset + i) % n]
    );
  }

  ngOnInit(): void {
    this.updateVisibleCount();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.updateVisibleCount();
      this.cdr.markForCheck();
    }, 150);
  }

  startAutoplay(): void {
    this.stopAutoplay();
    this.intervalId = setInterval(() => {
      if (!this.autoplayPaused) this.next();
    }, 4000);
  }

  stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  next(): void {
    this.offset = (this.offset + 1) % this.dishes.length;
    this.cdr.markForCheck();
  }

  prev(): void {
    this.offset =
      (this.offset - 1 + this.dishes.length) % this.dishes.length;
    this.cdr.markForCheck();
  }

  pause(): void {
    this.autoplayPaused = true;
  }

  resume(): void {
    this.autoplayPaused = false;
  }

  trackByTitle(_: number, dish: Dish): string {
    return dish.title;
  }

  private updateVisibleCount(): void {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    this.visibleCount = w <= 600 ? 1 : w <= 992 ? 2 : w <= 1200 ? 3 : 4;
  }
}
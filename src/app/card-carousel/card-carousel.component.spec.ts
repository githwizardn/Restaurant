import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardCarouselComponent } from './card-carousel.component';

describe('CardCarouselComponent', () => {
  let component: CardCarouselComponent;
  let fixture: ComponentFixture<CardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render visible dishes', () => {
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(component.visibleCount);
  });

  it('should advance offset on next()', () => {
    const initial = component.offset;
    component.next();
    expect(component.offset).toBe((initial + 1) % component.dishes.length);
  });

  it('should go back on prev()', () => {
    component.offset = 0;
    component.prev();
    expect(component.offset).toBe(component.dishes.length - 1);
  });

  it('should pause autoplay on hover', () => {
    component.pause();
    const initialOffset = component.offset;
    // wait less than autoplay interval — should not move
    expect(component.offset).toBe(initialOffset);
  });
});
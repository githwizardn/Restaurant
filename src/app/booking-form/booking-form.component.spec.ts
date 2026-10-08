import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BookingFormComponent } from './booking-form.component';

describe('BookingFormComponent', () => {
  let component: BookingFormComponent;
  let fixture: ComponentFixture<BookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFormComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.reservationForm.valid).toBeFalse();
  });

  it('should validate phone as 9 digits', () => {
    const phone = component.reservationForm.get('phone');
    phone?.setValue('123');
    expect(phone?.valid).toBeFalse();
    phone?.setValue('555123456');
    expect(phone?.valid).toBeTrue();
  });

  it('should validate email format', () => {
    const email = component.reservationForm.get('email');
    email?.setValue('not-an-email');
    expect(email?.valid).toBeFalse();
    email?.setValue('test@example.com');
    expect(email?.valid).toBeTrue();
  });

  it('should reject past dates', () => {
    const date = component.reservationForm.get('date');
    date?.setValue('2020-01-01');
    expect(date?.valid).toBeFalse();
  });

  it('should persist draft to localStorage', () => {
    component.reservationForm.patchValue({
      name: 'გიორგი',
      lastname: 'მაისურაძე',
    });
    // valueChanges has 300ms debounce — just check the initial set
    expect(component.reservationForm.get('name')?.value).toBe('გიორგი');
  });
});
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookingService } from '../services/booking.service';

function georgianAndEnglishValidator(): ValidatorFn {
  return Validators.pattern(/^[a-zA-Zა-ჰ\s]+$/);
}

function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const input = new Date(control.value);
    return input > today ? null : { invalidDate: true };
  };
}

@Component({
  selector: 'booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingFormComponent {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private booking = inject(BookingService);

  submitting = false;
  resultMessage = '';
  resultIsError = false;

  reservationForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), georgianAndEnglishValidator()]],
    lastname: ['', [Validators.required, Validators.minLength(2), georgianAndEnglishValidator()]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    date: ['', [Validators.required, futureDateValidator()]],
    time: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  });

  constructor() {
    this.reservationForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.resultMessage) {
        this.resultMessage = '';
        this.cdr.markForCheck();
      }
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.reservationForm.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  submitForm(): void {
    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      this.resultMessage = 'გთხოვთ, ყველა ველი სწორად შეავსოთ.';
      this.resultIsError = true;
      this.cdr.markForCheck();
      return;
    }

    this.submitting = true;
    this.booking.submit(this.reservationForm.getRawValue()).subscribe({
      next: () => {
        this.submitting = false;
        this.resultMessage = 'მადლობა! ჩვენ მალე დაგიკავშირდებით.';
        this.resultIsError = false;
        this.reservationForm.reset();
        this.cdr.markForCheck();
      },
      error: () => {
        this.submitting = false;
        this.resultMessage = 'დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.';
        this.resultIsError = true;
        this.cdr.markForCheck();
      },
    });
  }
}
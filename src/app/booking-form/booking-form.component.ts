import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
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
import { debounceTime } from 'rxjs/operators';
import { BookingService } from '../services/booking.service';
import { environment } from '../../environments/environment';

const DRAFT_STORAGE_KEY = 'burger-lions:booking-draft';

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
export class BookingFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly booking = inject(BookingService);

  submitting = false;
  resultMessage = '';
  resultIsError = false;
  whatsappLink = '';

  readonly reservationForm = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        georgianAndEnglishValidator(),
      ],
    ],
    lastname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        georgianAndEnglishValidator(),
      ],
    ],
    phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    date: ['', [Validators.required, futureDateValidator()]],
    time: [
      '',
      [
        Validators.required,
        Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
      ],
    ],
  });

  constructor() {
    this.reservationForm.valueChanges
      .pipe(takeUntilDestroyed(), debounceTime(300))
      .subscribe(value => {
        // Save draft (except the moment when submitting just finished)
        if (!this.submitting) {
          try {
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(value));
          } catch {
            /* ignore quota / private mode errors */
          }
        }

        // Clear result message once user starts typing again
        if (this.resultMessage) {
          this.resultMessage = '';
          this.whatsappLink = '';
          this.cdr.markForCheck();
        }
      });
  }

  ngOnInit(): void {
    this.restoreDraft();
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
      this.whatsappLink = '';
      this.cdr.markForCheck();
      return;
    }

    this.submitting = true;
    this.resultMessage = '';
    this.whatsappLink = '';
    this.cdr.markForCheck();

    const payload = this.reservationForm.getRawValue();

    this.booking.submit(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.resultMessage = 'მადლობა! ჩვენ მალე დაგიკავშირდებით.';
        this.resultIsError = false;
        this.whatsappLink = this.buildWhatsappLink(payload);

        this.reservationForm.reset();
        try {
          localStorage.removeItem(DRAFT_STORAGE_KEY);
        } catch {
          /* ignore */
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.submitting = false;
        this.resultMessage =
          'დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.';
        this.resultIsError = true;
        this.whatsappLink = '';
        this.cdr.markForCheck();
      },
    });
  }

  private buildWhatsappLink(payload: {
    name: string;
    lastname: string;
    phone: string;
    date: string;
    time: string;
  }): string {
    const text =
      `გამარჯობა! მინდა მაგიდის დაჯავშნა:%0A` +
      `სახელი: ${payload.name} ${payload.lastname}%0A` +
      `ტელეფონი: ${payload.phone}%0A` +
      `თარიღი: ${payload.date}%0A` +
      `დრო: ${payload.time}`;
    return `https://wa.me/${environment.whatsappNumber}?text=${text}`;
  }

  private restoreDraft(): void {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        this.reservationForm.patchValue(parsed, { emitEvent: false });
      }
    } catch {
      /* ignore */
    }
  }
}
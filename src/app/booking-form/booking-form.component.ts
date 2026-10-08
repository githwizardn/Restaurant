import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

interface BookingPayload {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

function georgianAndEnglishValidator(): ValidatorFn {
  return Validators.pattern(/^[a-zA-Zა-ჰ\s]+$/);
}

function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const input = new Date(control.value);
    return input >= today ? null : { invalidDate: true };
  };
}

function maxDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const max = new Date();
    max.setFullYear(max.getFullYear() + 1);
    const input = new Date(control.value);
    return input <= max ? null : { dateTooFar: true };
  };
}

/**
 * რესტორანი ღიაა 10:00 – 01:00
 * ბოლო ჯავშანი მიიღება 00:00-მდე (1 საათი დაკეტვამდე).
 * პრაქტიკულად ვალიდური დრო: 10:00 – 23:59.
 */
function workingHoursValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const [h, m] = (control.value as string).split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;

    const totalMinutes = h * 60 + m;

    if (totalMinutes < 600) {
      return { beforeOpening: true };
    }

    if (totalMinutes > 1439) {
      return { afterClosing: true };
    }

    return null;
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
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // === Wizard state ===
  readonly currentStep = signal(0);
  readonly totalSteps = 3;
  readonly steps = [
    { label: 'დრო', icon: 'fa-calendar-day' },
    { label: 'კონტაქტი', icon: 'fa-user' },
    { label: 'დეტალები', icon: 'fa-circle-check' },
  ];

  // === Form state ===
  submitting = false;
  resultMessage = '';
  resultIsError = false;
  whatsappLink = '';
  showSuccess = false;
  successData: BookingPayload | null = null;

  // === Guests ===
  guests = 2;
  readonly maxGuests = 20;
  readonly minGuests = 1;

  // === Quick picks ===
  readonly quickTimes = ['12:00', '13:00', '18:00', '19:00', '20:00', '21:00'];
  readonly quickDates = [
    { label: 'დღეს', offset: 0 as number, dayOfWeek: undefined as number | undefined },
    { label: 'ხვალ', offset: 1 as number, dayOfWeek: undefined as number | undefined },
    { label: 'ზეგ', offset: 2 as number, dayOfWeek: undefined as number | undefined },
    { label: 'შაბათს', offset: 0 as number, dayOfWeek: 6 as number | undefined },
  ];

  // === Min/Max dates ===
  readonly minDate = new Date().toISOString().split('T')[0];
  readonly maxDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  })();

  readonly reservationForm = this.fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), georgianAndEnglishValidator()],
    ],
    lastname: [
      '',
      [Validators.required, Validators.minLength(2), georgianAndEnglishValidator()],
    ],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^5\d{2}\s?\d{3}\s?\d{3}$/)],
    ],
    email: ['', [Validators.email]],
    date: ['', [Validators.required, futureDateValidator(), maxDateValidator()]],
    time: [
      '',
      [
        Validators.required,
        Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
        workingHoursValidator(),
      ],
    ],
    guests: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
    notes: ['', [Validators.maxLength(300)]],
  });

  constructor() {
    this.reservationForm.valueChanges
      .pipe(takeUntilDestroyed(), debounceTime(300))
      .subscribe(value => {
        if (!this.submitting) {
          try {
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(value));
          } catch {
            /* ignore */
          }
        }

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

  // ================================================================
  // WIZARD NAVIGATION
  // ================================================================

  get stepControls(): string[][] {
    return [
      ['date', 'time', 'guests'],
      ['name', 'lastname', 'phone', 'email'],
      ['notes'],
    ];
  }

  get currentStepValid(): boolean {
    const controls = this.stepControls[this.currentStep()];
    return controls.every(c => {
      const ctrl = this.reservationForm.get(c);
      if (c === 'email' && !ctrl?.value) return true;
      return ctrl?.valid;
    });
  }

  get isLastStep(): boolean {
    return this.currentStep() === this.totalSteps - 1;
  }

  get isFirstStep(): boolean {
    return this.currentStep() === 0;
  }

  nextStep(): void {
    if (!this.currentStepValid) {
      this.stepControls[this.currentStep()].forEach(c => {
        this.reservationForm.get(c)?.markAsTouched();
      });
      this.cdr.markForCheck();
      return;
    }

    if (this.currentStep() < this.totalSteps - 1) {
      this.currentStep.update(s => s + 1);
      this.cdr.markForCheck();
    } else {
      this.submitForm();
    }
  }

  prevStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
      this.cdr.markForCheck();
    }
  }

  goToStep(index: number): void {
    if (index <= this.currentStep()) {
      this.currentStep.set(index);
      this.cdr.markForCheck();
    }
  }

  get progress(): number {
    const required = ['date', 'time', 'name', 'lastname', 'phone'];
    const filled = required.filter(c => this.reservationForm.get(c)?.valid).length;
    return Math.round((filled / required.length) * 100);
  }

  // ================================================================
  // GUESTS
  // ================================================================

  incrementGuests(): void {
    if (this.guests < this.maxGuests) {
      this.guests++;
      this.reservationForm.patchValue({ guests: this.guests });
      this.cdr.markForCheck();
    }
  }

  decrementGuests(): void {
    if (this.guests > this.minGuests) {
      this.guests--;
      this.reservationForm.patchValue({ guests: this.guests });
      this.cdr.markForCheck();
    }
  }

  // ================================================================
  // QUICK PICKS
  // ================================================================

  selectTime(time: string): void {
    this.reservationForm.patchValue({ time });
    this.reservationForm.get('time')?.markAsDirty();
    this.cdr.markForCheck();
  }

  selectDate(offset: number, dayOfWeek?: number): void {
    const d = new Date();
    if (typeof dayOfWeek === 'number') {
      const currentDay = d.getDay();
      let diff = dayOfWeek - currentDay;
      if (diff <= 0) diff += 7;
      d.setDate(d.getDate() + diff);
    } else {
      d.setDate(d.getDate() + offset);
    }
    const iso = d.toISOString().split('T')[0];
    this.reservationForm.patchValue({ date: iso });
    this.reservationForm.get('date')?.markAsDirty();
    this.cdr.markForCheck();
  }

  isQuickDateActive(offset: number, dayOfWeek?: number): boolean {
    const current = this.reservationForm.get('date')?.value;
    if (!current) return false;
    const d = new Date();
    if (typeof dayOfWeek === 'number') {
      const currentDay = d.getDay();
      let diff = dayOfWeek - currentDay;
      if (diff <= 0) diff += 7;
      d.setDate(d.getDate() + diff);
    } else {
      d.setDate(d.getDate() + offset);
    }
    return current === d.toISOString().split('T')[0];
  }

  // ================================================================
  // VALIDATION HELPERS
  // ================================================================

  isInvalid(field: string): boolean {
    const ctrl = this.reservationForm.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  hasError(field: string, errorCode: string): boolean {
    const ctrl = this.reservationForm.get(field);
    if (!ctrl) return false;
    const touched = ctrl.dirty || ctrl.touched;
    return !!ctrl.errors?.[errorCode] && touched;
  }

  // ================================================================
  // SUBMIT
  // ================================================================

  submitForm(): void {
    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      this.resultMessage = 'გთხოვთ, ყველა ველი სწორად შეავსოთ.';
      this.resultIsError = true;
      this.cdr.markForCheck();
      return;
    }

    this.submitting = true;
    this.resultMessage = '';
    this.cdr.markForCheck();

    const payload = this.reservationForm.getRawValue() as BookingPayload;

    this.booking.submit(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successData = payload;
        this.showSuccess = true;
        this.resultIsError = false;
        this.whatsappLink = this.buildWhatsappLink(payload);

        this.fireConfetti();

        this.reservationForm.reset({ guests: 2 } as any);
        this.guests = 2;
        this.currentStep.set(0);

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
        this.cdr.markForCheck();
      },
    });
  }

  resetForm(): void {
    this.showSuccess = false;
    this.successData = null;
    this.whatsappLink = '';
    this.currentStep.set(0);
    this.reservationForm.reset({ guests: 2 } as any);
    this.guests = 2;
    this.cdr.markForCheck();
  }

  // ================================================================
  // CONFETTI
  // ================================================================

  private async fireConfetti(): Promise<void> {
    if (!this.isBrowser) return;
    try {
      const mod = await import('canvas-confetti');
      const confetti = (mod as any).default ?? (mod as any);

      const duration = 2500;
      const animationEnd = Date.now() + duration;
      const colors = ['#ffcc33', '#ffffff', '#ffaa00', '#ffdd55'];

      const frame = () => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return;

        const particleCount = 40 * (timeLeft / duration);
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 9999,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    } catch {
      /* ignore */
    }
  }

  // ================================================================
  // CALENDAR EXPORT (.ics)
  // ================================================================

  downloadCalendar(): void {
    if (!this.successData) return;

    const { name, lastname, date, time, guests, phone, notes } = this.successData;
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    const start = new Date(year, month - 1, day, hour, minute);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const formatDate = (d: Date): string => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return (
        d.getUTCFullYear() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) +
        'T' +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        '00Z'
      );
    };

    const description = [
      `სახელი: ${name} ${lastname}`,
      `ტელეფონი: ${phone}`,
      `სტუმრები: ${guests}`,
      notes ? `შენიშვნა: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Burger Lions//Booking//KA',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@burgerlions.ge`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `SUMMARY:Burger Lions — მაგიდის ჯავშანი (${guests} სტუმარი)`,
      `DESCRIPTION:${description}`,
      'LOCATION:41 ერთიანობისთვის მებრძოლთა ქ, Tbilisi 0163',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Burger Lions — შეხსენება 1 საათით ადრე',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `burger-lions-${date}-${time.replace(':', '')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ================================================================
  // WHATSAPP
  // ================================================================

  private buildWhatsappLink(payload: BookingPayload): string {
    const text =
      `გამარჯობა! მინდა მაგიდის დაჯავშნა:%0A` +
      `სახელი: ${payload.name} ${payload.lastname}%0A` +
      `ტელეფონი: ${payload.phone}%0A` +
      `თარიღი: ${payload.date}%0A` +
      `დრო: ${payload.time}%0A` +
      `სტუმრები: ${payload.guests}` +
      (payload.notes ? `%0Aშენიშვნა: ${payload.notes}` : '');
    return `https://wa.me/${environment.whatsappNumber}?text=${text}`;
  }

  // ================================================================
  // DRAFT
  // ================================================================

  private restoreDraft(): void {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        this.reservationForm.patchValue(parsed, { emitEvent: false });
        if (typeof parsed.guests === 'number') {
          this.guests = parsed.guests;
        }
      }
    } catch {
      /* ignore */
    }
  }

  // ================================================================
  // HELPERS
  // ================================================================

  formatDateKa(iso: string): string {
    if (!iso) return '';
    const date = new Date(iso);
    const monthsKa = [
      'იანვარი',
      'თებერვალი',
      'მარტი',
      'აპრილი',
      'მაისი',
      'ივნისი',
      'ივლისი',
      'აგვისტო',
      'სექტემბერი',
      'ოქტომბერი',
      'ნოემბერი',
      'დეკემბერი',
    ];
    const daysKa = [
      'კვირა',
      'ორშაბათი',
      'სამშაბათი',
      'ოთხშაბათი',
      'ხუთშაბათი',
      'პარასკევი',
      'შაბათი',
    ];
    return `${date.getDate()} ${monthsKa[date.getMonth()]}, ${date.getFullYear()} (${daysKa[date.getDay()]})`;
  }
}
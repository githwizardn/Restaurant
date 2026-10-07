import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface BookingRequest {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  date: string;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);

  /**
   * Set this to your real endpoint.
   * Easiest option — Formspree (free): https://formspree.io
   * Paste your endpoint here, e.g. 'https://formspree.io/f/xyzabc'
   */
  private endpoint = 'REPLACE_WITH_YOUR_ENDPOINT';

  submit(data: BookingRequest): Observable<unknown> {
    if (this.endpoint === 'REPLACE_WITH_YOUR_ENDPOINT') {
      console.warn('[BookingService] Demo mode: no endpoint configured.');
      return of({ ok: true }).pipe(delay(800));
    }
    return this.http.post(this.endpoint, data, {
      headers: { Accept: 'application/json' },
    });
  }
}
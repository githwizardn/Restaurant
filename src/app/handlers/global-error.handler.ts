import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    // ყოველთვის დალოგე კონსოლში
    console.error('[GlobalErrorHandler]', error);

    // Production-ში — აქ შეგიძლია გაგზავნო Sentry-ში, LogRocket-ში, ა.შ.
    if (environment.production) {
      // მაგ: Sentry.captureException(error);
    }
  }
}
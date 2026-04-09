import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/assets/i18n/')) {
    return next(req);
  }
  const ngxSpinnerService = inject(NgxSpinnerService);
  ngxSpinnerService.show();
  return next(req).pipe(finalize(() => ngxSpinnerService.hide()));
};

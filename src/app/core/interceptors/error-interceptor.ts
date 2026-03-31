import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const hotToastService = inject(HotToastService);
  return next(req).pipe(
    catchError((err) => {
      hotToastService.error(err.error.message);
      return throwError(() => err);
    }),
  );
};
